import PausedJobs from "@/components/JobComponent/PausedJobs";
import JobDashboardLayout from "@/components/JobComponent/JobDashboardLayout";

const page = () => {
  return (
    <JobDashboardLayout>
      <PausedJobs />
    </JobDashboardLayout>
  );
};

export default page;
