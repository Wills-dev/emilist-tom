import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import ServiceDetails from "@/components/ServiceComponent/ServiceDetails";

const Service = ({ params }: any) => {
  const serviceId = params?.serviceId;
  return (
    <main className="relative">
      <DashboardNav />
      <ServiceDetails serviceId={serviceId} />
    </main>
  );
};

export default Service;
