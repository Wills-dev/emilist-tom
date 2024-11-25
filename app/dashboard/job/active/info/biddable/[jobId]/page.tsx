import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import ActiveJobInfo from "@/components/JobComponent/ActiveJobInfo";

const page = ({ params }: any) => {
  const jobId = params.jobId;

  return (
    <main className="relative">
      <DashboardNav />
      <ActiveJobInfo jobId={jobId} />
    </main>
  );
};

export default page;
