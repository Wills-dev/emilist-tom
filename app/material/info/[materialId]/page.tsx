import MainLayout from "@/components/MainLayout/MainLayout";
import MaterialInfo from "@/components/MaterialComponents/MaterialInfo";

const page = async ({ params }: any) => {
  const { materialId } = await params;

  return (
    <MainLayout>
      <MaterialInfo materialId={materialId} />
    </MainLayout>
  );
};

export default page;
