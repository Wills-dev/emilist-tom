import { useEffect, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetSubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [planType, setPlanType] = useState<"monthly" | "yearly">("monthly");
  const [isLoading, setIsLoading] = useState(false);

  const getSubscriptionPlans = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/subscription/get-plans?duration=${planType}`
      );
      setPlans(data?.data);
    } catch (error) {
      console.log("error getting subscription plans", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptionPlans();
  }, [planType]);

  return {
    plans,
    isLoading,
    planType,
    setPlanType,
  };
};
