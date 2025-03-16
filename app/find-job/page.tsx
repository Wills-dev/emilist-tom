"use client";

import Link from "next/link";
import Image from "next/image";

import Pagination from "react-responsive-pagination";

import MainLayout from "@/components/MainLayout/MainLayout";
import HomeLinks from "@/components/HomeComponents/HomeLinks";
import ListAllJobs from "@/components/ListAllJobs/ListAllJobs";
import EmilistExpertSection from "@/components/EmilistExpertSection/EmilistExpertSection";
// import HeroSection from "@/components/HeroSection/HeroSection";

const FindJob = () => {
  return (
    <MainLayout>
      <ListAllJobs />
    </MainLayout>
  );
};

export default FindJob;
