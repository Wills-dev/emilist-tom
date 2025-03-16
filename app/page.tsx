import MainLayout from "@/components/MainLayout/MainLayout";
import PopularJobs from "@/components/PopularJobs/PopularJobs";
import MainSection from "@/components/MainSection/MainSection";
import PopularExperts from "@/components/PopularExperts/PopularExperts";
import MainCategories from "@/components/MainCategories/MainCategories";
import PopularMaterials from "@/components/PopularMaterials/PopularMaterials";
import EmilistExpertSection from "@/components/EmilistExpertSection/EmilistExpertSection";

export default function Home() {
  return (
    <MainLayout>
      <MainSection />
      <MainCategories />
      <PopularExperts />
      <PopularMaterials bgColor="bg-[#F7F7F7]" />
      <PopularJobs />
      <EmilistExpertSection />
    </MainLayout>
  );
}
