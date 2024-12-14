import { useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useJobAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobAnalytics, setJobAnalytics] = useState<any>([]);
  const [startDate, setStateDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState<any>(new Date().getFullYear());

  const handleGetJobAnalytics = async () => {
    try {
      const monthQuery = month ? `&month=${month}` : "";
      const { data } = await axiosInstance.get(
        `/jobs/user-job-analytics?year=${year}${monthQuery}`
      );
      setJobAnalytics(data?.data);
    } catch (error) {
      console.log("error fetching job analytics", error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    jobAnalytics,
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
