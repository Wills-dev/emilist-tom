import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";
import { CartContext } from "@/utils/CartState";

export const useCheckoutCart = () => {
  const { setCartRerender } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (code?: string) => {
    setIsLoading(true);
    const payload = code ? { code } : {};
    try {
      await axiosInstance.post(`/cart/checkout`, payload);
      toast.success("Order plcaed", toastOptions);
      setCartRerender((prev: boolean) => !prev);
    } catch (error) {
      console.log("error checking out", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    handleCheckout,
  };
};
