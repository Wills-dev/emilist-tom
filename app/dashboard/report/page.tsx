import { MultipleLineChart } from "@/components/Charts/MultipleLineChart";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import JobSummaryCards from "@/components/JobComponent/JobSummaryCards";
import ReportHeader from "@/components/ReportComponents/ReportHeader";

const Report = () => {
  return (
    <main className="relative">
      <DashboardNav />{" "}
      <section className="padding-x py-28 bg-[#F6FDF9] min-h-screen ">
        <ReportHeader currentLink={1} />
        <JobSummaryCards />
        <MultipleLineChart />
      </section>
    </main>
  );
};

export default Report;
