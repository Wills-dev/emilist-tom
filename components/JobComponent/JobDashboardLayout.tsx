import { JobLinks } from "@/constants";

import JobSummaryCards from "./JobSummaryCards";
import ToggleLinks from "../DashboardComponents/ToggleLinks";
import DashboardNav from "../DashboardComponents/DashboardNav";

interface JobDashboardLayoutProps {
  children: React.ReactNode;
}

const JobDashboardLayout = ({ children }: JobDashboardLayoutProps) => {
  return (
    <main className="relative">
      <DashboardNav />
      <div className="py-28 padding-x">
        <JobSummaryCards />
        <ToggleLinks links={JobLinks} />
        {children}
      </div>
    </main>
  );
};

export default JobDashboardLayout;
