"use client";

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

import ReportHeader from "@/components/ReportComponents/ReportHeader";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import EarningSummaryCards from "@/components/ReportComponents/EarningSummaryCards";

import { ExpenseAreaChart } from "@/components/Charts/ExpenseAreaChart";
import { EarningAreaChart } from "@/components/Charts/EarningAreaChart";
import { useGetEarningsAnalytics } from "@/hooks/useGetEarningsAnalytics";

const Earnings = () => {
  const {
    getUserEarnings,
    isLoad,
    earnings,
    currency,
    setCurrency,
    year,
    setYear,
  } = useGetEarningsAnalytics();

  useEffect(() => {
    getUserEarnings();
  }, [currency, year]);

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
  };
  const handleYearChange = (value: string) => {
    setYear(value);
  };

  return (
    <main className="relative  min-h-screen">
      <DashboardNav />{" "}
      <section className="padding-x py-28 bg-[#F6FDF9] min-h-screen ">
        <ReportHeader />
        {isLoad ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[40vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            <EarningSummaryCards earnings={earnings} />

            <div className="flex-c-b mt-6  gap-4 flex-wrap">
              <Select value={currency} onValueChange={handleCurrencyChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currency</SelectLabel>
                    <SelectItem value="NGN">NGN</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
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

            <div className="flex flex-col gap-6 mt-6">
              <EarningAreaChart earnings={earnings} />
              <ExpenseAreaChart earnings={earnings} />
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Earnings;
