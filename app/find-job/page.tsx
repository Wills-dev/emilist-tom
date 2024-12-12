import MainLayout from "@/components/MainLayout/MainLayout";
import HomeLinks from "@/components/HomeComponents/HomeLinks";
import ListAllJobs from "@/components/ListAllJobs/ListAllJobs";
import EmilistExpertSection from "@/components/EmilistExpertSection/EmilistExpertSection";
// import HeroSection from "@/components/HeroSection/HeroSection";

const FindJob = () => {
  return (
    <MainLayout>
      {/* <HeroSection currentLink={2} /> */}
      <HomeLinks />
      <ListAllJobs />
      <EmilistExpertSection />
    </MainLayout>
  );
};

export default FindJob;
