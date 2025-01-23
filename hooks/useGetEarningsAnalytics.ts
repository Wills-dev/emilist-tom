import { useState } from "react";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetEarningsAnalytics = () => {
  const currentYear = new Date().getFullYear();
  const [isLoad, setIsLoad] = useState(false);
  const [earnings, setEarnings] = useState<any>([]);

  const getUserEarnings = async (year?: string) => {
    setIsLoad(true);
    try {
      const { data } = await axiosInstance.get(
        `/transaction/fetch-user-earning?year=${year || currentYear}`
      );
      console.log("data", data);
      setEarnings(data);
    } catch (error) {
      console.log("error getting user earnings", error);
    } finally {
      setIsLoad(false);
    }
  };

  return { getUserEarnings, isLoad, earnings };
};
