import EmilistExpertSection from "@/components/EmilistExpertSection/EmilistExpertSection";
import ListAllJobs from "@/components/ListAllJobs/ListAllJobs";
import MainLayout from "@/components/MainLayout/MainLayout";
import HomeLinks from "@/components/HomeComponents/HomeLinks";
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
