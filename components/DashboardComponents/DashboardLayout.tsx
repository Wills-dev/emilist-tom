import DashboardNav from "./DashboardNav";
import DashboardCards from "./DashboardCards";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="relative">
      <DashboardNav />
      <section className="sm:pt-28 pt-20 bg-[#F0FDF5] w-full padding-x min-h-screen">
        <div className="grid grid-cols-11 gap-4 py-10 max-sm:pt-4">
          <div className="lg:col-span-8 col-span-11  w-full flex flex-col gap-4 ">
            <DashboardHeader />
            <div className="lg:hidden max-lg:col-span-11 w-full">
              <DashboardCards />
            </div>
            {children}
          </div>
          <div className="col-span-3 w-full max-lg:hidden">
            <DashboardCards />
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
