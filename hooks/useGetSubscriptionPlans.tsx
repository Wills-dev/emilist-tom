import { useEffect, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetSubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSubscriptionPlans = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/subscription/get-plans`);
      setPlans(data?.data);
    } catch (error) {
      console.log("error getting subscription plans", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptionPlans();
  }, []);

  return {
    plans,
    isLoading,
  };
};
