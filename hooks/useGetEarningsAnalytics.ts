import { axiosInstance } from "@/axiosInstance/baseUrls";
import React, { useState } from "react";

export const useGetEarningsAnalytics = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [earnings, setEarnings] = useState<any>([]);

  const getUserEarnings = async () => {
    setIsLoad(true);
    try {
      const { data } = await axiosInstance.get(``);
    } catch (error) {
      console.log("error getting user earnings", error);
    } finally {
      setIsLoad(false);
    }
  };
  return {};
};
