import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useApplyForBiddableJob = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [bidLoading, setBidLoading] = useState(false);
  const [applyRerender, setRerender] = useState(false);
  const [inputCount, setInputCount] = useState<number>(0);
  const [openBidModal, setOpenBidModal] = useState(false);
  const [amount, setAmount] = useState<number | string>(0);
  const [milestoneAmounts, setMilestoneAmounts] = useState<number[]>([]);
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

  const handleCancelBidModal = () => {
    setOpenBidModal(false);
  };

  const applyForBiddableJob = async (e: any, jobId: string) => {
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
    setBidLoading(true);
    try {
      const bidDetails = {
        bidAmount: amount,
        milestoneAmount: milestoneAmounts,
        userId: currentUser?.unique_id,
        isRequestQuote: false,
      };
      await axiosInstance.post(`/applyBiddableJob/${jobId}`, bidDetails);
      setOpenBidModal(false);
      setRerender((prev) => !prev);
      toast.success(`Application submitted`, toastOptions);
    } catch (error: any) {
      console.log("error applying for biddable job", error);
      promiseErrorFunction(error);
    } finally {
      setBidLoading(false);
    }
  };

  return {
    applyForBiddableJob,
    bidLoading,
    setAmount,
    amount,
    milestoneAmounts,
    milestonePercentage,
    inputCount,
    setInputCount,
    handleMilestonePercentageChange,
    handleCancelBidModal,
    openBidModal,
    setOpenBidModal,
    applyRerender,
    handleBlur,
  };
};
