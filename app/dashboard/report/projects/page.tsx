"use client";

import { useEffect } from "react";

import { useProjectAnalytics } from "@/hooks/useProjectAnalytics";
import { MultipleLineChart } from "@/components/Charts/MultipleLineChart";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import ReportHeader from "@/components/ReportComponents/ReportHeader";
import ProjectSummaryCards from "@/components/ProjectComponents/ProjectSummaryCards";
import { ProjectMultipleLineChart } from "@/components/ReportComponents/ProjectMultipleLineChart";

const page = () => {
  const {
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
  } = useProjectAnalytics();

  useEffect(() => {
    handleGetJobAnalytics();
  }, [year, month]);

  return (
    <main className="relative">
      <DashboardNav />{" "}
      <section className="padding-x py-28 bg-[#F6FDF9] min-h-screen ">
        <ReportHeader />
        <ProjectSummaryCards />
        <div className="flex-c gap-5">
          <div className=" min-w-[137px] w-[137px]  max-w-[137px] rounded-lg h-[50px] px-4 bg-white focus:outline-none focus-within:border-primary-green focus-within:border-1 max-sm:h-[46px] ">
            <select
              className="bg-white outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm text-[#002913]"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option>Monthly</option>
              <option value="">Reset</option>
              <option value={1}>Jan</option>
              <option value={2}>Feb</option>
              <option value={3}>Mar</option>
              <option value={4}>Apr</option>
              <option value={5}>May</option>
              <option value={6}>Jun</option>
              <option value={7}>Jul</option>
              <option value={8}>Aug</option>
              <option value={9}>Sep</option>
              <option value={10}>Oct</option>
              <option value={11}>Nov</option>
              <option value={12}>Dec</option>
            </select>
          </div>
          <div className=" min-w-[137px] w-[137px]  max-w-[137px] rounded-lg h-[50px] px-4 bg-white focus:outline-none focus-within:border-primary-green focus-within:border-1  max-sm:h-[46px] ">
            <select
              className="bg-white outline-none  min-w-full w-full h-full max-w-full max-sm:text-[14px] text-[#002913]"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
            </select>
          </div>
        </div>
        <ProjectMultipleLineChart chartData={projectAnalytics} />
      </section>
    </main>
  );
};

export default page;
