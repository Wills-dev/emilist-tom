import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import ServiceDetails from "@/components/ServiceComponent/ServiceDetails";

const Service = async ({ params }: any) => {
  const { serviceId } = await params;
  return (
    <main className="relative">
      <DashboardNav />
      <ServiceDetails serviceId={serviceId} />
    </main>
  );
};

export default Service;
