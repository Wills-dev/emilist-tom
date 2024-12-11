import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import BiddableProjectDetail from "@/components/ProjectComponents/BiddableProjectDetail";

const page = async ({ params }: any) => {
  const { jobId } = await params;

  return (
    <main className="relative">
      <DashboardNav />
      <BiddableProjectDetail jobId={jobId} />
    </main>
  );
};

export default page;
