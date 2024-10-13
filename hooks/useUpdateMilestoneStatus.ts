import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useUpdateMilestoneStatus = () => {
  const [loadStatus, setLoadStatus] = useState(false);
  const [rerenderrr, setRerender] = useState(false);

  const updateStatus = async (jobId: string, milestoneId: string) => {
    setLoadStatus(true);
    try {
      const updateDetails = {
        jobId,
        milestoneId,
      };
      await axiosInstance.post(`/updateCompleteMilestoneStatus`, updateDetails);
      toast.success(`Milestone status update to completed`, toastOptions);
      setRerender((prev) => !prev);
    } catch (error: any) {
      console.log("error updating milestone status", error);
      promiseErrorFunction(error);
    } finally {
      setLoadStatus(false);
    }
  };
  return {
    updateStatus,
    loadStatus,
    rerenderrr,
  };
};
