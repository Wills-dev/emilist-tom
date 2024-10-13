import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import BiddableJobInfo from "@/components/JobComponent/BiddableJobInfo";

const BiddableJobInfoPage = ({ params }: any) => {
  const jobId = params.jobId;
  return (
    <main className="relative">
      <DashboardNav />
      <BiddableJobInfo jobId={jobId} />
    </main>
  );
};

export default BiddableJobInfoPage;
