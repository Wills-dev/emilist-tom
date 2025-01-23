import MainLayout from "@/components/MainLayout/MainLayout";
import ExpertReviewContent from "@/components/ExpertReveiwContent/ExpertReviewContent";

const BusinessReview = async ({ params }: any) => {
  const { businessId } = await params;
  return (
    <MainLayout>
      <ExpertReviewContent businessId={businessId} />
    </MainLayout>
  );
};

export default BusinessReview;
