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

export const useApplyForBiddableJob = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const hasMounted = useRef(false);

  const [bidLoading, setBidLoading] = useState(false);
  const [applyRerender, setRerender] = useState(false);
  const [openBidModal, setOpenBidModal] = useState(false);
  const [percentage, setPercentage] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | string>(0);
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      milestoneId: "",
      achievement: "",
      amount: 0,
    },
  ]);

  const handleCancelBidModal = () => {
    setOpenBidModal(false);
  };

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
      return true;
    } else {
      false;
    }
  };

  const updateAmounts = (newPercentages: number[]) => {
    if (!maxPrice) {
      toast.error("Please enter total amount.", toastOptions);
      return;
    }

    const updatedMilestones = newPercentages.map((percent, index) => ({
      ...milestones[index],
      amount: (percent / 100) * Number(maxPrice),
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

  const applyForBiddableJob = async (e: any, jobId: string) => {
    e.preventDefault();

    console.log("first");

    if (!currentUser) {
      return router.push("/login");
    }
    if (validateTotalPercentage()) {
      return;
    }

    setBidLoading(true);
    try {
      const applyJobPayload = {
        jobId,
        type: "biddable",
        maximumPrice: Number(maxPrice),
        milestones,
      };
      await axiosInstance.post(`/jobs/apply-job`, applyJobPayload);
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
    handleSetPercentage,
    setMaxPrice,
    maxPrice,
    milestones,
    handleCancelBidModal,
    openBidModal,
    setOpenBidModal,
    applyRerender,
    handleAchievementChange,
    setMilestones,
    setPercentage,
    percentage,
  };
};
