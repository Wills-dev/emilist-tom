import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import BiddableProjectDetail from "@/components/ProjectComponents/BiddableProjectDetail";

const page = ({ params }: any) => {
  const jobId = params.jobId;

  return (
    <main className="relative">
      <DashboardNav />
      <BiddableProjectDetail jobId={jobId} />
    </main>
  );
};

export default page;
