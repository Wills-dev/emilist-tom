import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import UserMaterialInfo from "@/components/MaterialComponents/UserMaterialInfo";

const MaterialInfo = async ({ params }: any) => {
  const { materialId } = params;

  return (
    <main className="relative">
      <DashboardNav />
      <UserMaterialInfo materialId={materialId} />
    </main>
  );
};

export default MaterialInfo;
