import CompletedJobs from "@/components/JobComponent/CompletedJobs";
import JobDashboardLayout from "@/components/JobComponent/JobDashboardLayout";

const page = () => {
  return (
    <JobDashboardLayout>
      <CompletedJobs />
    </JobDashboardLayout>
  );
};

export default page;
