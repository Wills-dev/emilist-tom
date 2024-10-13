import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import EditMaterialInfoForm from "@/components/MaterialComponents/EditMaterialInfoForm";

const EditMaterialInfo = ({ params }: any) => {
  const materialId = params.materialId;

  return (
    <main className="relative">
      <DashboardNav />
      <EditMaterialInfoForm materialId={materialId} />
    </main>
  );
};

export default EditMaterialInfo;
