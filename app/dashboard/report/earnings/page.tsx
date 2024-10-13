import ReportHeader from "@/components/ReportComponents/ReportHeader";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import EarningSummaryCards from "@/components/ReportComponents/EarningSummaryCards";

import { BarCharts } from "@/components/Charts/BarChart";

const Earnings = () => {
  return (
    <main className="relative">
      <DashboardNav />{" "}
      <section className="padding-x py-28 bg-[#F6FDF9] min-h-screen ">
        <ReportHeader currentLink={1} />
        <EarningSummaryCards />
        <BarCharts />
      </section>
    </main>
  );
};

export default Earnings;
