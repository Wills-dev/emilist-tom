import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import MessageContent from "@/components/MessageComponent/MessageContent";

const page = () => {
  return (
    <main className="relative">
      <DashboardNav />
      <MessageContent />
    </main>
  );
};

export default page;
