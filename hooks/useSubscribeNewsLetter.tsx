import { useState } from "react";

import toast from "react-hot-toast";

import { promiseErrorFunction, toastOptions } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useSubscribeNewsLetter = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(`Please provide your email`, toastOptions);
      return;
    }
    setLoading(true);
    try {
      const emailData = {
        email,
      };
      await axiosInstance.post("/newslettersubscribe", emailData);
      toast.success(
        `You have successfully subscribed to our newsletter`,
        toastOptions
      );
      setEmail("");
    } catch (error: any) {
      console.log("error on login", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setEmail,
    email,
    handleSubmit,
  };
};
