import ListNewJobForm from "@/components/JobComponent/ListNewJobForm";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";

const ListNewJob = () => {
  return (
    <main className="relative w-full">
      <DashboardNav />
      <ListNewJobForm />
    </main>
  );
};

export default ListNewJob;
