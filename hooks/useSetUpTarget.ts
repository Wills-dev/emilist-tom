import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useSetUpTarget = () => {
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState({
    job: "",
    invites: "",
    referrals: "",
    amount: "",
    currency: "NGN",
  });

  const handleChnage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTarget((details) => ({
      ...details,
      [name]: value,
    }));
  };

  const handleSubmitTarget = async () => {
    const { job, invites, referrals, amount, currency } = target;
    if (!duration) {
      return toast.error(`Please select duration`);
    } else if (!job && !invites && !referrals && !amount) {
      return toast.error(`Set at least one target before submitting.`);
    }
    setLoading(true);

    try {
      const payload = {
        duration,
        job,
        invites,
        referrals,
        amount,
        currency,
      };
      const data = await axiosInstance.post(`/target/create-target`, payload);
      console.log("data", data);
      toast.success(`Successful`, toastOptions);
      setDuration("");
      setTarget({
        job: "",
        invites: "",
        referrals: "",
        amount: "",
        currency: "",
      });
    } catch (error) {
      console.log("error setting target", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    duration,
    setDuration,
    target,
    handleChnage,
    loading,
    handleSubmitTarget,
  };
};
