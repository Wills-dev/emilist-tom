import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const usePromote = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [target, setTarget] = useState("");
  const [expectedClicks, setExpectedClicks] = useState<number | undefined>(
    undefined
  );

  const handlePromote = async (type: string, id: string) => {
    if (!endDate || !startDate || !target || !expectedClicks) {
      return toast.error("Please fill all fields", toastOptions);
    }
    setIsLoad(true);
    try {
      const payload = {
        target,
        startDate,
        endDate,
        type,
        expectedClicks,
      };
      const { data } = await axiosInstance.post(
        `/subscription/promote/${id}`,
        payload
      );
      toast.success("Promotion successful!", toastOptions);
      setEndDate("");
      setStartDate("");
      setTarget("");
      setExpectedClicks(0);
      setIsOpen(false);
      console.log("data", data);
    } catch (error) {
      console.log("error promoting", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoad(false);
    }
  };

  return {
    expectedClicks,
    setExpectedClicks,
    target,
    setTarget,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoad,
    handlePromote,
    isOpen,
    setIsOpen,
  };
};
