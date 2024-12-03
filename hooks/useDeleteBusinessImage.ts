import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDeleteBusinessImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleDeleteFetchedBusinessImage = async (
    businessId: string,
    imageId: string
  ) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(
        `/business/delete-business/${businessId}/image/${imageId}`
      );
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
    handleDeleteFetchedBusinessImage,
    isLoading,
    rerender,
  };
};
