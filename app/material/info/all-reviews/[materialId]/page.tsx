import MainLayout from "@/components/MainLayout/MainLayout";
import MaterialReviewContent from "@/components/MaterialReviewContent/MaterialReviewContent";

const page = async ({ params }: any) => {
  const { materialId } = await params;
  return (
    <MainLayout>
      <MaterialReviewContent materialId={materialId} />
    </MainLayout>
  );
};

export default page;
