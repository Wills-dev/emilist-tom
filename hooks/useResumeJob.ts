import { useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

import toast from "react-hot-toast";

export const useResumeJob = () => {
  const [loadResume, setLoadResume] = useState(false);
  const [rerenderr, setRerender] = useState(false);

  const resumeJob = async (jobId: string, applicantId: string) => {
    setLoadResume(true);
    try {
      const pauseJobDetails = {
        jobId,
        applicantId,
      };
      await axiosInstance.post(`/resumeJob`, pauseJobDetails);
      toast.success(`You have successfully resumed project`, toastOptions);
      setRerender((prev) => !prev);
    } catch (error: any) {
      console.log("error  rsuming project", error);
      promiseErrorFunction(error);
    } finally {
      setLoadResume(false);
    }
  };
  return {
    resumeJob,
    loadResume,
    rerenderr,
  };
};
