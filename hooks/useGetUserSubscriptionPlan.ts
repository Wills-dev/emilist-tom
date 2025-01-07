import { useEffect, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetUserSubscriptionPlan = () => {
  const [userPlan, setUserPlan] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const getUserPlan = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/subscription/get-user-subscription`
      );
      setUserPlan(data?.data);
    } catch (error) {
      console.log("error loading user subscription plan", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserPlan();
  }, []);

  return {
    loading,
    userPlan,
  };
};
