import ReportHeader from "@/components/ReportComponents/ReportHeader";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import EarningSummaryCards from "@/components/ReportComponents/EarningSummaryCards";

import { BarCharts } from "@/components/Charts/BarChart";
import { ExpenseAreaChart } from "@/components/Charts/ExpenseAreaChart";
import { EarningAreaChart } from "@/components/Charts/EarningAreaChart";

const Earnings = () => {
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
