import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useAcceptDirectJob = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleAcceptDirectJob = async (
    applicationId: string,
    status: string,
    businessId?: string
  ) => {
    setIsLoad(true);
    try {
      const payload: Record<string, any> = { status };
      if (status === "accepted" && businessId) {
        payload.businessId = businessId;
      }
      await axiosInstance.patch(
        `/jobs/accept-direct-job/${applicationId}`,
        payload
      );
      setRerender((prev) => !prev);
      if (status === "accepted") {
        toast.success("Job accepted.", toastOptions);
      } else {
        toast.success("Job declined.", toastOptions);
      }
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
