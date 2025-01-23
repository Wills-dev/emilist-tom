import Nav from "@/components/Nav/Nav";
import AboutUser from "@/components/AboutUser/AboutUser";

const page = async ({ params }: any) => {
  const { userId } = await params;
  return (
    <main className="relative min-h-screen h-full bg-[#F6FDF9]">
      <Nav />
      <AboutUser userId={userId} />
    </main>
  );
};

export default page;
