import EmilistExpertSection from "@/components/EmilistExpertSection/EmilistExpertSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import MainLayout from "@/components/MainLayout/MainLayout";
import PopularMaterials from "@/components/PopularMaterials/PopularMaterials";

const BuyMaterials = () => {
  return (
    <MainLayout>
      <HeroSection currentLink={3} />
      <PopularMaterials bgColor="bg-[#F7F7F7]" />
      <EmilistExpertSection />
    </MainLayout>
  );
};

export default BuyMaterials;
