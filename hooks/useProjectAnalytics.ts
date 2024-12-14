import { useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useProjectAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectAnalytics, setProjectAnalytics] = useState<any>([]);
  const [startDate, setStateDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState<any>(new Date().getFullYear());

  const handleGetJobAnalytics = async () => {
    try {
      const monthQuery = month ? `&month=${month}` : "";
      const { data } = await axiosInstance.get(
        `/jobs/user-project-analytics?year=${year}${monthQuery}`
      );
      setProjectAnalytics(data?.data);
    } catch (error) {
      console.log("error fetching job analytics", error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    projectAnalytics,
    setEndDate,
    setStateDate,
    startDate,
    endDate,
    handleGetJobAnalytics,
    setMonth,
    setYear,
    month,
    year,
  };
};
