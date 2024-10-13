import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import toast from "react-hot-toast";

import { ResetPasswordType } from "@/types";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useResetPassword = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [resetPasswordDetails, setResetPasswordDetails] =
    useState<ResetPasswordType>({
      otp: "",
      newPassword: "",
    });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResetPasswordDetails({
      ...resetPasswordDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string
  ) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please provide email!");
      router.push(`/forgot-password`);
      return;
    }
    if (!resetPasswordDetails.newPassword || !resetPasswordDetails.otp) {
      return toast.error("Please enter OTP & new password", toastOptions);
    } else if (resetPasswordDetails.newPassword.length < 6) {
      return toast.error("Password can't be less than 6", toastOptions);
    }
    setLoading(true);
    try {
      const { otp, newPassword } = resetPasswordDetails;
      const resetPasswordPayload = {
        otp,
        email,
        newPassword,
      };

      await axiosInstance.post(`/auth/reset-password`, resetPasswordPayload);
      toast.success(`Password reset successfully`, toastOptions);
      setResetPasswordDetails({
        otp: "",
        newPassword: "",
      });
      router.push(`/login`);
    } catch (error: any) {
      console.log("error resetting password", error);
      setLoading(false);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleResetPassword,
    resetPasswordDetails,
    loading,
    setInputType,
    inputType,
  };
};
