import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import ActiveJobInfo from "@/components/JobComponent/ActiveJobInfo";

const page = async ({ params }: any) => {
  const { jobId } = await params;

  return (
    <main className="relative">
      <DashboardNav />
      <ActiveJobInfo jobId={jobId} />
    </main>
  );
};

export default page;
