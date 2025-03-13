import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import PlannedMaintenanceForm from "@/components/PlannedMaintenanceForm/PlannedMaintenanceForm";

const PlannedMaintenance = () => {
  return (
    <main className="relative">
      <DashboardNav />
      <PlannedMaintenanceForm />
    </main>
  );
};

export default PlannedMaintenance;
