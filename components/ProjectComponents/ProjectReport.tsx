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

import ProjectSummaryCards from "./ProjectSummaryCards";

import { useProjectAnalytics } from "@/hooks/useProjectAnalytics";
import { ProjectMultipleLineChart } from "../ReportComponents/ProjectMultipleLineChart";

const ProjectReport = () => {
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
      <ProjectMultipleLineChart chartData={projectAnalytics} />
    </>
  );
};

export default ProjectReport;
