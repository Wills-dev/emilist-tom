import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useRespondQuote = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [rerenderrr, setRerenderrr] = useState(false);
  const [inputCount, setInputCount] = useState<number>(0);
  const [amount, setAmount] = useState<number | string>(0);
  const [respondQuoteLoading, setRespondQuoteLoading] = useState(false);
  const [milestoneAmounts, setMilestoneAmounts] = useState<string[]>([]);
  const [milestonePercentage, setMilestonePercentage] = useState<number[]>([]);

  const handleMilestonePercentageChange = (index: number, value: number) => {
    if (!amount) {
      toast.error(`Price can't be empty!`, toastOptions);
      return;
    }
    const newValues = [...milestonePercentage];
    newValues[index] = value;

    const sum = newValues.reduce((acc, val) => acc + val, 0);

    if (sum > 100) {
      toast.error("All milestones percentage must sum to 100%!", toastOptions);
      return;
    }

    if (index === inputCount - 1) {
      // Ensure the last value is adjusted to fit the total of 100
      newValues[index] =
        100 - newValues.slice(0, -1).reduce((acc, val) => acc + val, 0);
    }

    if (newValues[index] < 0) {
      newValues[index] = 0;
    }

    setMilestonePercentage(newValues);
    updateAmounts(newValues);
  };

  const handleBlur = () => {
    const sum = milestonePercentage.reduce((acc, val) => acc + val, 0);
    if (sum > 100) {
      toast.error("All milestones percentage must sum to 100%!", toastOptions);
    }
  };

  const updateAmounts = (newValues: number[]) => {
    const newAmounts = newValues.map((value) => getProportionateAmount(value));
    setMilestoneAmounts(newAmounts);
  };

  const getProportionateAmount = (value: number): any => {
    const totalAmount = Number(amount);
    const percentage = (value / 100) * totalAmount;
    return percentage?.toFixed(2);
  };

  const respondQuote = async (e: any, jobId: string) => {
    e.preventDefault();
    if (!currentUser) {
      return router.push("/login");
    }

    if (!amount) {
      return toast.error(`Price can't be empty!`, toastOptions);
    }

    const newValues = [...milestonePercentage];

    const sum = newValues.reduce((acc, val) => acc + val, 0);

    if (sum !== 100) {
      toast.error("All milestones percentage must sum to 100%!", toastOptions);
      return;
    }
    setRespondQuoteLoading(true);
    try {
      await axiosInstance.post(`/respondQuote/${jobId}`, {
        amount: amount.toString(),
        milestoneAmounts: milestoneAmounts,
        userId: currentUser?.unique_id,
      });
      toast.success("Quote response sent successfully!", toastOptions);
      setRerenderrr((prev) => !prev);
    } catch (error) {
      console.log("error responding to quote", error);
      promiseErrorFunction(error);
    } finally {
      setRespondQuoteLoading(false);
    }
  };

  return {
    respondQuoteLoading,
    amount,
    setAmount,
    milestoneAmounts,
    milestonePercentage,
    handleMilestonePercentageChange,
    respondQuote,
    rerenderrr,
    handleBlur,
    inputCount,
    setInputCount,
  };
};
