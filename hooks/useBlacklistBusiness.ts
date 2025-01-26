import { useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useBlacklistBusiness = () => {
  const [load, setLoad] = useState(false);

  const handleBlacklistBuisness = async (businessId: string) => {
    setLoad(true);
    try {
      await axiosInstance.patch(`/business/mute-business/${businessId}`);
      toast.success("Business  blacklisted", toastOptions);
      window.history.back();
    } catch (error) {
      console.log("error blacklisting business", error);
      promiseErrorFunction(error);
    } finally {
      setLoad(false);
    }
  };
  return {
    load,
    handleBlacklistBuisness,
  };
};
