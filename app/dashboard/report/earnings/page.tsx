"use client";

import ReportHeader from "@/components/ReportComponents/ReportHeader";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import EarningSummaryCards from "@/components/ReportComponents/EarningSummaryCards";

import { ExpenseAreaChart } from "@/components/Charts/ExpenseAreaChart";
import { EarningAreaChart } from "@/components/Charts/EarningAreaChart";
import { useGetEarningsAnalytics } from "@/hooks/useGetEarningsAnalytics";
import { useEffect } from "react";

const Earnings = () => {
  const { getUserEarnings, isLoad, earnings } = useGetEarningsAnalytics();

  useEffect(() => {
    getUserEarnings();
  }, []);
  return (
    <main className="relative  min-h-screen">
      <DashboardNav />{" "}
      <section className="padding-x py-28 bg-[#F6FDF9] min-h-screen ">
        <ReportHeader />
        <EarningSummaryCards />

        <div className="flex flex-col gap-6 mt-6">
          <EarningAreaChart />
          <ExpenseAreaChart />
        </div>
      </section>
    </main>
  );
};

export default Earnings;
