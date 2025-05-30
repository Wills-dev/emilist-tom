import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";
import {
  formatInputTextNumberWithCommas,
  removeCommas,
} from "@/helpers/formatInputTextNumberWithCommas";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maximumPrice = formatInputTextNumberWithCommas(value);
    setMaxPrice(maximumPrice);
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

  // Handler to update a specific percentage
  const handleSetPercentage = (index: number, value: number) => {
    if (!maxPrice) {
      toast.error("Please enter total amount.", toastOptions);
      return;
    }
    const updatedPercentages = [...percentage];
    updatedPercentages[index] = value;

    const maximumPrice = removeCommas(maxPrice.toString());

    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone, i) =>
        i === index
          ? { ...milestone, amount: (value / 100) * Number(maximumPrice) }
          : milestone
      )
    );

    setPercentage(updatedPercentages);
  };

  // Handler to update achievement text
  const handleAchievementChange = (index: number, newAchievement: string) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone, i) =>
        i === index ? { ...milestone, achievement: newAchievement } : milestone
      )
    );
  };

  const applyForBiddableJob = async (
    e: any,
    jobId: string,
    businessId: string
  ) => {
    e.preventDefault();

    if (!currentUser) {
      return router.push("/login");
    }
    if (validateTotalPercentage()) {
      return;
    }

    if (currentUser?.businesses.length === 0) {
      toast.error("Please add a business to proceed", toastOptions);
      return;
    }
    if (!businessId) {
      toast.error("Please select a business", toastOptions);
      return;
    }

    setBidLoading(true);
    const maximumPrice = removeCommas(maxPrice.toString());
    try {
      const applyJobPayload = {
        jobId,
        type: "biddable",
        maximumPrice: Number(maximumPrice),
        milestones,
        businessId,
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
    handleChange,
  };
};
