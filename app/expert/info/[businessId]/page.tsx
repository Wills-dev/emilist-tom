import MainLayout from "@/components/MainLayout/MainLayout";
import ExpertDetails from "@/components/ExpertComponents/ExpertDetails";

const page = ({ params }: any) => {
  const businessId = params?.businessId;
  return (
    <MainLayout>
      <ExpertDetails businessId={businessId} />
    </MainLayout>
  );
};

export default page;
