import { useEffect } from "react";

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

import ProjectSummaryCards from "./ProjectSummaryCards";

import { BarCharts } from "../Charts/BarChart";
import { useProjectAnalytics } from "@/hooks/useProjectAnalytics";

const chartConfigNew = {
  totalProjects: {
    label: "New projects",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigActive = {
  totalActiveProjects: {
    label: "Active projects",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigPaused = {
  totalPausedProjects: {
    label: "Paused  projects",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigOverdue = {
  totalOverdueProjects: {
    label: "Overdue projects",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigCompleted = {
  totalCompletedProjects: {
    label: "Completed projects",
    color: "#25C269",
  },
} satisfies ChartConfig;

const ProjectReport = () => {
  const {
    isLoading,
    projectAnalytics,
    handleGetJobAnalytics,
    setMonth,
    setYear,
    month,
    year,
  } = useProjectAnalytics();

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
    <>
      {" "}
      <ProjectSummaryCards />
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
          chartData={projectAnalytics}
          title="New Projects"
          chartConfig={chartConfigNew}
          dataKey="totalProjects"
        />
        <BarCharts
          chartData={projectAnalytics}
          title="Active Projects"
          chartConfig={chartConfigActive}
          dataKey="totalActiveProjects"
        />
        <BarCharts
          chartData={projectAnalytics}
          title="Paused Projects"
          chartConfig={chartConfigPaused}
          dataKey="totalPausedProjects"
        />
        <BarCharts
          chartData={projectAnalytics}
          title="Overdue Projects"
          chartConfig={chartConfigOverdue}
          dataKey="totalOverdueProjects"
        />
        <BarCharts
          chartData={projectAnalytics}
          title="Completed Projects"
          chartConfig={chartConfigCompleted}
          dataKey="totalCompletedProjects"
        />
      </div>
    </>
  );
};

export default ProjectReport;
