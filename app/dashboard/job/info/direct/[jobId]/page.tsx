import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import DirectJobInfo from "@/components/JobComponent/DirectJobInfo";

const DirectJobInfoPage = ({ params }: any) => {
  const jobId = params.jobId;

  return (
    <main className="relative">
      <DashboardNav />
      <DirectJobInfo jobId={jobId} />
    </main>
  );
};

export default DirectJobInfoPage;
