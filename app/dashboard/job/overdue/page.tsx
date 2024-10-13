import OverdueJobs from "@/components/JobComponent/OverdueJobs";
import JobDashboardLayout from "@/components/JobComponent/JobDashboardLayout";

const page = () => {
  return (
    <JobDashboardLayout>
      <OverdueJobs />
    </JobDashboardLayout>
  );
};

export default page;
