import EditFormOne from "@/components/ServiceComponent/EditFormOne";
import RegistrationLayout from "@/components/ExpertComponents/RegistrationLayout";

const page = ({ params }: any) => {
  const serviceId = params?.serviceId;

  return (
    <RegistrationLayout>
      <EditFormOne serviceId={serviceId} />
    </RegistrationLayout>
  );
};

export default page;
