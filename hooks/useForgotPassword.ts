import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please provide email!", toastOptions);
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post(`/auth/forgot-password`, { email });

      toast.success("OTP has been sent to your email", toastOptions);
      router.push(`/reset-password/${encodeURIComponent(email)}`);
    } catch (error) {
      console.log("error from forgot password", error);
      promiseErrorFunction(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    setEmail,
    email,
    handleForgotPassword,
  };
};
