import { ProjectLinks } from "@/constants";

import ProjectSummaryCards from "./ProjectSummaryCards";
import ToggleLinks from "../DashboardComponents/ToggleLinks";
import DashboardNav from "../DashboardComponents/DashboardNav";

interface ProjectDashboardLayoutProps {
  children: React.ReactNode;
}

const ProjectDashboardLayout = ({ children }: ProjectDashboardLayoutProps) => {
  return (
    <main className="relative">
      <DashboardNav />
      <div className="py-28 padding-x min-h-screen">
        <ProjectSummaryCards />
        <ToggleLinks links={ProjectLinks} />
        {children}
      </div>
    </main>
  );
};

export default ProjectDashboardLayout;
