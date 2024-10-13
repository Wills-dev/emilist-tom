import EmilistExpertSection from "@/components/EmilistExpertSection/EmilistExpertSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import MainLayout from "@/components/MainLayout/MainLayout";
import PopularExperts from "@/components/PopularExperts/PopularExperts";

const HireExperts = () => {
  return (
    <MainLayout>
      <HeroSection currentLink={1} />
      <PopularExperts />
      <EmilistExpertSection />
    </MainLayout>
  );
};

export default HireExperts;
