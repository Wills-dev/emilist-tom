import ActiveJobs from "@/components/JobComponent/ActiveJobs";
import JobDashboardLayout from "@/components/JobComponent/JobDashboardLayout";

const page = () => {
  return (
    <JobDashboardLayout>
      <ActiveJobs />
    </JobDashboardLayout>
  );
};

export default page;
