"use client";

import { useEffect } from "react";

import { useJobAnalytics } from "@/hooks/useJobAnalytics";
import { MultipleLineChart } from "@/components/Charts/MultipleLineChart";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import JobSummaryCards from "@/components/JobComponent/JobSummaryCards";
import ReportHeader from "@/components/ReportComponents/ReportHeader";

const Report = () => {
  const {
    isLoading,
    jobAnalytics,
    setEndDate,
    setPeriod,
    setStateDate,
    startDate,
    endDate,
    setMonth,
    setYear,
    month,
    year,
    handleGetJobAnalytics,
  } = useJobAnalytics();

  useEffect(() => {
    handleGetJobAnalytics();
  }, [year, month]);

  return (
    <main className="relative">
      <DashboardNav />{" "}
      <section className="padding-x py-28 bg-[#F6FDF9] min-h-screen ">
        <ReportHeader
          setMonth={setMonth}
          setYear={setYear}
          month={month}
          year={year}
          currentLink={1}
        />
        <JobSummaryCards />
        <MultipleLineChart chartData={jobAnalytics} />
      </section>
    </main>
  );
};

export default Report;
