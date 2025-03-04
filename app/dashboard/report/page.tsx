"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartConfig } from "@/components/ui/chart";

import { BarCharts } from "@/components/Charts/BarChart";
import { useJobAnalytics } from "@/hooks/useJobAnalytics";

import JobSummaryCards from "@/components/JobComponent/JobSummaryCards";
import ReportHeader from "@/components/ReportComponents/ReportHeader";
import ProjectReport from "@/components/ProjectComponents/ProjectReport";
import InsightContent from "@/components/ReportComponents/InsightContent";
import FinanceReport from "@/components/DashboardComponents/FinanceReport";
import TargetInfo from "@/components/ServiceComponent/TargetInfo";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import ReportSidebar from "@/components/ReportComponents/ReportSidebar";

const chartConfigLead = {
  totalOverdueJobs: {
    label: "Lead jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigNew = {
  totalJobs: {
    label: "New jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigActive = {
  totalActiveJobs: {
    label: "Active jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigPaused = {
  totalPausedJobs: {
    label: "Paused  jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigOverdue = {
  totalOverdueJobs: {
    label: "Overdue jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigCompleted = {
  totalCompletedJobs: {
    label: "Completed jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const Report = () => {
  const searchParams = useSearchParams();

  const report = searchParams.get("r");

  const [currentLink, setCurrentLink] = useState(report || "Jobs");
  const {
    isLoading,
    jobAnalytics,
    setMonth,
    setYear,
    month,
    year,
    handleGetJobAnalytics,
  } = useJobAnalytics();

  useEffect(() => {
    handleGetJobAnalytics();
  }, [year, month]);

  const handleMonthChange = (value: string) => {
    setMonth(value);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
  };

  return (
    <main className="relative">
      <DashboardNavbar />{" "}
      <div className="bg-[#F6FDF9] flex">
        <ReportSidebar />
        <div className="w-72 min-w-72 max-xl:hidden" />
        <section className="2xl:padding-x xl:px-10 max-xl:padding-x py-28  min-h-screen flex-1 w-full max-w-full ">
          <ReportHeader
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
          />

          {currentLink === "Jobs" && (
            <>
              <JobSummaryCards />
              <div className="flex-c-b mt-6  gap-4 flex-wrap">
                <Select value={month} onValueChange={handleMonthChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Month</SelectLabel>
                      <SelectItem value="1">Jan</SelectItem>
                      <SelectItem value="2">Feb</SelectItem>
                      <SelectItem value="3">Mar</SelectItem>
                      <SelectItem value="4">Apr</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">Jun</SelectItem>
                      <SelectItem value="7">Jul</SelectItem>
                      <SelectItem value="8">Aug</SelectItem>
                      <SelectItem value="9">Sep</SelectItem>
                      <SelectItem value="10">Oct</SelectItem>
                      <SelectItem value="11">Nov</SelectItem>
                      <SelectItem value="11">Dec</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select value={year} onValueChange={handleYearChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Year</SelectLabel>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-full gap-4 py-4 max-w-full flex-wrap">
                <BarCharts
                  chartData={jobAnalytics}
                  title="Leads"
                  chartConfig={chartConfigLead}
                  dataKey="totalOverdueJobs"
                />
                <BarCharts
                  chartData={jobAnalytics}
                  title="New Jobs"
                  chartConfig={chartConfigNew}
                  dataKey="totalJobs"
                />
                <BarCharts
                  chartData={jobAnalytics}
                  title="Active Jobs"
                  chartConfig={chartConfigActive}
                  dataKey="totalActiveJobs"
                />
                <BarCharts
                  chartData={jobAnalytics}
                  title="Paused Jobs"
                  chartConfig={chartConfigPaused}
                  dataKey="totalPausedJobs"
                />
                <BarCharts
                  chartData={jobAnalytics}
                  title="Overdue Jobs"
                  chartConfig={chartConfigOverdue}
                  dataKey="totalOverdueJobs"
                />
                <BarCharts
                  chartData={jobAnalytics}
                  title="Completed Jobs"
                  chartConfig={chartConfigCompleted}
                  dataKey="totalCompletedJobs"
                />
              </div>
              {/* <MultipleLineChart chartData={jobAnalytics} /> */}
            </>
          )}
          {currentLink === "Projects" && <ProjectReport />}
          {currentLink === "Insights" && <InsightContent />}
          {currentLink === "Earning" && <FinanceReport />}
          {currentLink === "Target" && <TargetInfo />}
        </section>
      </div>
    </main>
  );
};

export default Report;
