import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import DirectProjectDetail from "@/components/ProjectComponents/DirectProjectDetail";
import React from "react";

const page = ({ params }: any) => {
  const jobId = params.jobId;

  return (
    <main className="relative">
      <DashboardNav />
      <DirectProjectDetail jobId={jobId} />
    </main>
  );
};

export default page;
