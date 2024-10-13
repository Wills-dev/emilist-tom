import { useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useVerifyEmail = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<number | string | undefined>("");

  const handleVerifyEmail = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string
  ) => {
    e.preventDefault();
    if (!email) {
      toast.error("No email! contact support");
      return;
    }
    if (!otp) {
      toast.error("Please enter OTP!", toastOptions);
      return;
    }
    try {
      setLoading(true);
      const verifyEmailPayload = {
        email,
        otp,
      };
      await axiosInstance.post(`/auth/verify-email`, verifyEmailPayload);
      toast.success(`Email verified successfully`, toastOptions);
      setOtp("");
      setLoading(false);
      router.push(`/login`);
    } catch (error: any) {
      console.log("error verifying email", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleVerifyEmail,
    loading,
    setOtp,
    otp,
  };
};
