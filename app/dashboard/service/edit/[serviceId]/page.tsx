import EditService from "@/components/ServiceComponent/EditService";
import RegistrationLayout from "@/components/ExpertComponents/RegistrationLayout";

const page = async ({ params }: any) => {
  const { serviceId } = await params;

  return (
    <RegistrationLayout>
      <EditService serviceId={serviceId} />
    </RegistrationLayout>
  );
};

export default page;
