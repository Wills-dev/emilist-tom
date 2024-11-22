import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const useDiscount = () => {
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discount, setDiscount] = useState();
  const [code, setCode] = useState("");

  const handleSubmitDiscount = async (e: any) => {
    e.preventDefault();
    if (!code) {
      toast.error("Enter code code!", toastOptions);
      return;
    }
    setDiscountLoading(true);
    try {
      const { data } = await axiosInstance.post(`/cart/apply-discount-code`, {
        code: "2FJXXFR",
      });
    } catch (error) {
      console.log("error applying discount", error);
      promiseErrorFunction(error);
    } finally {
      setDiscountLoading(false);
    }
  };
  return {
    handleSubmitDiscount,
    discount,
    discountLoading,
    code,
    setCode,
  };
};
