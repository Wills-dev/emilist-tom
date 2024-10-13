import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction } from "@/helpers";

export const useResendOtp = () => {
  const [load, setLoad] = useState(false);

  const handleResendOtp = async (email: string) => {
    if (!email) {
      toast.error("No email! contact support");
      return;
    }
    try {
      await axiosInstance.post(`/auth/resend-otp`, { email });
      toast.success("OTP has been resent!");
    } catch (error: any) {
      console.log("error resending otp", error);
      promiseErrorFunction(error);
    } finally {
      setLoad(false);
    }
  };
  return {
    handleResendOtp,
    load,
  };
};
