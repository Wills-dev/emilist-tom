import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

interface Milestone {
  milestoneId: string;
  achievement: string;
  amount: number;
}

export const useRespondQuote = () => {
  const router = useRouter();

  const hasMounted = useRef(false);

  const { currentUser } = useContext(AuthContext);

  const [rerenderrr, setRerenderrr] = useState(false);
  const [amount, setAmount] = useState<number | string>(0);
  const [percentage, setPercentage] = useState<number[]>([]);
  const [respondQuoteLoading, setRespondQuoteLoading] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      milestoneId: "",
      achievement: "",
      amount: 0,
    },
  ]);

  // Debounce check function
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const debounceCheck = setTimeout(() => {
      if (percentage.length > 0 && percentage[0] !== 0) {
        validateTotalPercentage();
      }
    }, 2000);

    return () => clearTimeout(debounceCheck);
  }, [percentage]);

  // Validate that total percentage equals 100%
  const validateTotalPercentage = () => {
    const totalPercentage = percentage.reduce((sum, p) => sum + p, 0);
    if (totalPercentage !== 100) {
      toast.error("Total percentage must equal 100%.", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const updateAmounts = (newPercentages: number[]) => {
    if (!amount) {
      toast.error("Please enter total amount.", toastOptions);
      return;
    }

    const updatedMilestones = newPercentages.map((percent, index) => ({
      ...milestones[index],
      amount: (percent / 100) * Number(amount),
    }));

    setMilestones(updatedMilestones);
    setPercentage(newPercentages);
  };

  // Handler to update a specific percentage
  const handleSetPercentage = (index: number, value: number) => {
    const updatedPercentages = [...percentage];
    updatedPercentages[index] = value;
    updateAmounts(updatedPercentages);
  };

  // Handler to update achievement text
  const handleAchievementChange = (index: number, newAchievement: string) => {
    const updatedMilestones = milestones.map((milestone, i) =>
      i === index ? { ...milestone, achievement: newAchievement } : milestone
    );
    setMilestones(updatedMilestones);
  };

  const respondQuote = async (e: any, jobId: string) => {
    e.preventDefault();
    if (!currentUser) {
      return router.push("/login");
    }

    if (!amount) {
      return toast.error(`Price can't be empty!`, toastOptions);
    }

    if (!validateTotalPercentage()) {
      return;
    }
    setRespondQuoteLoading(true);
    try {
      await axiosInstance.patch(`/jobs/post-quote`, {
        jobId,
        totalAmount: amount,
        milestones,
      });
      toast.success("Quote sent!", toastOptions);
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
    milestones,
    respondQuote,
    rerenderrr,
    handleAchievementChange,
    setMilestones,
    setPercentage,
    percentage,
    handleSetPercentage,
  };
};
