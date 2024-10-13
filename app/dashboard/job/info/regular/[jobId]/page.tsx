import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import RegularJobInfo from "@/components/JobComponent/RegularJobInfo";

const RegularJobInfoPage = ({ params }: any) => {
  const jobId = params.jobId;

  return (
    <main className="relative">
      <DashboardNav />
      <RegularJobInfo jobId={jobId} />
    </main>
  );
};

export default RegularJobInfoPage;
