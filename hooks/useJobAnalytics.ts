import { axiosInstance } from "@/axiosInstance/baseUrls";
import React, { useState } from "react";

export const useJobAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobAnalytics, setJobAnalytics] = useState<any>([]);
  const [startDate, setStateDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [period, setPeriod] = useState("day");

  const handleGetJobAnalytics = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/jobs/user-job-analytics?filterBy=${period}&startDate=2024-10-20&endDate=2024-11-07`
      );
      setJobAnalytics(data?.data);
      console.log("data", data);
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
    setPeriod,
    setStateDate,
    startDate,
    endDate,
    handleGetJobAnalytics,
  };
};
