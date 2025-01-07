import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useAddDiscountToMaterial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [discountPrice, setDiscountPrice] = useState<any>(undefined);

  const addDiscountPrice = async (materialId: string) => {
    if (!discountPrice) {
      return toast.error("Add discount price!", toastOptions);
    }
    setIsLoading(true);
    try {
      await axiosInstance.patch(
        `/material/add-product-discount/${materialId}`,
        {
          discount: discountPrice,
        }
      );
      toast.success("Discount price added!", toastOptions);
      setIsOpen(false);
      setDiscountPrice(undefined);
    } catch (error) {
      console.log("error adding discount price", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    isLoading,
    discountPrice,
    setDiscountPrice,
    addDiscountPrice,
  };
};
