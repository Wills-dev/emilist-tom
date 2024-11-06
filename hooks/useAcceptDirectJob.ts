import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useAcceptDirectJob = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleAcceptDirectJob = async (jobId: string, status: string) => {
    setIsLoad(true);
    try {
      const { data } = await axiosInstance.patch(
        `/jobs/accept-direct-job/${jobId}`,
        {
          status: status,
        }
      );
      setRerender((prev) => !prev);
      toast.success("Job accepted.", toastOptions);
    } catch (error) {
      console.log("error accepting direct job", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoad(false);
    }
  };
  return {
    handleAcceptDirectJob,
    isLoad,
    rerender,
  };
};
