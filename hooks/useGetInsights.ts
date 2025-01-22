import { axiosInstance } from "@/axiosInstance/baseUrls";
import React, { useEffect, useState } from "react";

export const useGetInsights = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any>({});

  const getInsights = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/auth/insights`);
      console.log("data", data);
      setInsights(data);
    } catch (error) {
      console.log("error loading insights", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInsights();
  }, []);

  return {
    loading,
    insights,
  };
};
