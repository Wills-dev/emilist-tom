import DashboardNav from "@/components/DashboardComponents/DashboardNav";

const page = ({ params }: any) => {
  const jobId = params.jobId;

  return (
    <main className="relavie">
      <DashboardNav />
    </main>
  );
};

export default page;
