import React, { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDeleteJobImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleDeleteFetchedJobImage = async (
    jobId: string,
    imageId: string
  ) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/jobs/remove-job/${jobId}/file/${imageId}`);
      setRerender((prev) => !prev);
      toast.success("Image deleted", toastOptions);
    } catch (error) {
      console.log("error deleting job image", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleDeleteFetchedJobImage,
    isLoading,
    rerender,
  };
};
