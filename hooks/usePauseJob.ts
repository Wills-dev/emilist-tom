import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const usePauseJob = () => {
  const [rerender, setRerender] = useState(false);
  const [loadPause, setLoadPause] = useState(false);

  const pauseJob = async (jobId: string, applicantId: string) => {
    setLoadPause(true);
    try {
      const pauseJobDetails = {
        jobId,
        applicantId,
      };
      await axiosInstance.post(`/pauseJob`, pauseJobDetails);
      toast.success(`You have successfully paused this project`, toastOptions);

      setRerender((prev) => !prev);
    } catch (error: any) {
      console.log("error pausing project", error);
      promiseErrorFunction(error);
    } finally {
      setLoadPause(false);
    }
  };
  return {
    pauseJob,
    loadPause,
    rerender,
  };
};
