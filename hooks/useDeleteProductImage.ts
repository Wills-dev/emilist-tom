import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDeleteProductImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleDeleteFetchedProductImage = async (
    materialId: string,
    imageId: string
  ) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(
        `/material/delete-product/${materialId}/image/${imageId}`
      );
      setRerender((prev) => !prev);
      toast.success("Image deleted", toastOptions);
    } catch (error) {
      console.log("error deleting material image", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleDeleteFetchedProductImage,
    isLoading,
    rerender,
  };
};
