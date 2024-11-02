import React, { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDeleteJobImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleDeleteFetchedJobImage = async (imageId: string) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.delete(`/job/${imageId}`);
      console.log("data deleting job image", data);
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
