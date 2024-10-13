import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import RegularProjectDetail from "@/components/ProjectComponents/RegularProjectDetail";

const page = ({ params }: any) => {
  const jobId = params.jobId;

  return (
    <main className="relative">
      <DashboardNav />
      <RegularProjectDetail jobId={jobId} />
    </main>
  );
};

export default page;
