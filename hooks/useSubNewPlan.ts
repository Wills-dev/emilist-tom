import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useSubNewPlan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymenntMethod] = useState("");
  const [durationType, setDurationType] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const handleSubNewPlan = async (
    e: React.FormEvent,
    planId: string,
    isRenew: boolean
  ) => {
    e.preventDefault();

    if (!paymentMethod) {
      return toast.error("Please select payment method", toastOptions);
    }
    if (!currency) {
      return toast.error("Please select currency", toastOptions);
    }

    setLoading(true);
    try {
      const payload = {
        planId,
        paymentMethod,
        currency,
        durationType,
        isRenew,
      };
      const { data } = await axiosInstance.post(
        `/subscription/subscribe-plan`,
        payload
      );
      console.log("data", data);
      // setIsOpen(false);
    } catch (error) {
      console.log("error creating subscrip[tion plan", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    currency,
    setCurrency,
    loading,
    paymentMethod,
    setPaymenntMethod,
    handleSubNewPlan,
    durationType,
    setDurationType,
  };
};
