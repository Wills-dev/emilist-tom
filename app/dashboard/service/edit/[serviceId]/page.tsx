import DashboardNav from "@/components/DashboardComponents/DashboardNav";

const page = ({ params }: any) => {
  const serviceId = params?.serviceId;

  return (
    <main className="relative">
      <DashboardNav />
      <section className="pt-28 text-4xl font-bold text-center flex-c justify-center h-[50vh]">
        Coming soon!!!
      </section>
    </main>
  );
};

export default page;
