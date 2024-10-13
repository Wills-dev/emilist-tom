import NewProjects from "@/components/ProjectComponents/NewProjects";
import ProjectDashboardLayout from "@/components/ProjectComponents/ProjectDashboardLayout";

const page = () => {
  return (
    <ProjectDashboardLayout>
      <NewProjects />
    </ProjectDashboardLayout>
  );
};

export default page;
