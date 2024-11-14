import { axiosInstance } from "@/axiosInstance/baseUrls";
import React, { useState } from "react";

export const useJobAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobAnalytics, setJobAnalytics] = useState<any>([]);
  const [startDate, setStateDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [period, setPeriod] = useState("day");
  const [month, setMonth] = useState<undefined | number>(undefined);
  const [year, setYear] = useState(new Date().getFullYear());

  console.log("new Date().getFullYear()", new Date().getFullYear());

  const handleGetJobAnalytics = async () => {
    try {
      const monthQuery = month ? `&month=${month}` : "";
      const { data } = await axiosInstance.get(
        `/jobs/user-job-analytics?year=${year}${monthQuery}`
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
    setMonth,
    setYear,
    month,
    year,
  };
};
