"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa";

import MainLayout from "@/components/MainLayout/MainLayout";
import StarRating from "@/components/StarRating/StarRating";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import ReviewSlider from "@/components/ReviewSlider/ReviewSlider";
import SimillarProducts from "@/components/MaterialComponents/SimillarProducts";
import ProductDescription from "@/components/MaterialComponents/ProductDescription";
import OtherProductFromSeller from "@/components/MaterialComponents/OtherProductFromSeller";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useSaveMaterials } from "@/hooks/useSaveMaterials";
import { useUnsaveMaterial } from "@/hooks/useUnsaveMaterial";
import { useGetMaterialInfo } from "@/hooks/useGetMaterialInfo";
import { useAddMaterialToCart } from "@/hooks/useAddMaterialToCart";
import { useGetUserSavedMaterials } from "@/hooks/useGetUserSavedMaterials";
import ShareLink from "@/components/modals/ShareLink";

const page = ({ params }: any) => {
  const materialId = params.materialId;

  const [link, setLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { handleSaveMaterial, rerender } = useSaveMaterials();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();
  const { handleUnsaveMaterial, unsaveRerenderr } = useUnsaveMaterial();
  const { loading, getMaterialInfo, materialInfo } = useGetMaterialInfo();
  const { allUserSavedMaterials, getAllUserSavedMaterials } =
    useGetUserSavedMaterials();

  const isSaved = () =>
    allUserSavedMaterials?.some(
      (savedMaterial: any) => savedMaterial.id === materialId
    );

  useEffect(() => {
    getMaterialInfo(materialId);
    getAllUserSavedMaterials();
  }, [materialId, rerender, unsaveRerenderr]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpen = (url: string) => {
    setIsModalOpen(true);
    setLink(url);
  };

  return (
    <MainLayout>
      <div className="gap-8 pt-28 pb-4 padding-x">
        {cartLoading && (
          <div className="absolute top-0 left-0 w-full min-h-screen bg-white h-full z-50 opacity-40" />
        )}

        {loading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[70vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="w-full pt-12">
            <ShareLink
              handleCancel={handleCancel}
              isModalOpen={isModalOpen}
              link={link}
              textToCopy={`https://emilist.com/material/info/${materialId}`}
              title="Share material"
            />
            <div className="flex-c sm:gap-8 gap-5 justify-end pb-5">
              {isSaved() ? (
                <span
                  className="block text-xl text-pink-500 cursor-pointer"
                  onClick={() => handleUnsaveMaterial(materialId)}
                >
                  <FaHeart />
                </span>
              ) : (
                <span
                  className="block text-xl cursor-pointer"
                  onClick={() => handleSaveMaterial(materialId)}
                >
                  <FaRegHeart />
                </span>
              )}
              <Image
                src="/assets/icons/flag.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
              />
              <Image
                src="/assets/icons/share.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
                onClick={() =>
                  handleOpen("Check out this material on Emilist!")
                }
              />
            </div>
            <section className="grid grid-cols-5 gap-5 max-lg:grid-cols-4">
              <ImageSlider materialInfo={materialInfo} />
              <div className="col-span-2 max-lg:col-span-2 max-md:col-span-4">
                <h4 className="sm:text-3xl text-lg font-bold mb-4">
                  {materialInfo?.productName &&
                    Capitalize(materialInfo?.productName)}
                </h4>
                <div className="flex flex-col gap-2 font-inter">
                  <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
                    <div className="flex-c gap-2 flex-1">
                      <h6 className="font-medium max-sm:text-sm">Brand:</h6>
                      <p className=" max-sm:text-sm">
                        {" "}
                        {materialInfo?.brand && Capitalize(materialInfo?.brand)}
                      </p>
                    </div>
                    <div className="flex-c gap-2 flex-1">
                      <h6 className="font-medium max-sm:text-sm">Supplier:</h6>
                      <Link
                        href="/profile/about"
                        className="text-primary-green underline  max-sm:text-sm"
                      >
                        James Habib
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-between gap-2 max-sm:flex-col ">
                    <div className="flex-c gap-2 flex-1">
                      <h6 className="font-medium max-sm:text-sm">Category:</h6>
                      <p className="max-sm:text-sm">
                        {" "}
                        {materialInfo?.category}
                      </p>
                    </div>
                    <div className="flex-c gap-2 flex-1">
                      <h6 className="font-medium max-sm:text-sm">Location:</h6>
                      <p className="max-sm:text-sm">
                        {" "}
                        {materialInfo?.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex-c gap-5">
                    <h6 className="font-medium max-sm:text-sm">Rating</h6>
                    <div className="flex-c text-[#8A8D8B] max-sm:text-sm gap-1">
                      <StarRating rating={4} />
                      4.0
                    </div>
                  </div>
                </div>
                <h3 className="lg:text-lg font-bold text-primary-green  mt-5">
                  {" "}
                  ₦{" "}
                  {materialInfo?.price && numberWithCommas(materialInfo?.price)}
                </h3>
                <p className="font-medium max-sm:text-sm mt-2 ">Price</p>
                <button
                  className="bg-primary-green px-6 py-5 text-white rounded-lg font-bold mt-10 whitespace-nowrap max-lg:mt-5 max-sm:text-sm max-sm:py-3 w-full hover:bg-green-600 transition-all duration-300"
                  onClick={() => addMaterialToCart(materialId)}
                >
                  Add to cart
                </button>
              </div>
            </section>
            <ProductDescription description={materialInfo?.description} />
            <section className="border-b-1 border-gray-400 pb-8">
              {" "}
              <div className="flex-c-b gap-6 max-w-[676px] w-full">
                <h6 className="sm:text-2xl text-lg font-semibold">
                  What people loved about this product
                </h6>
                <Link
                  href={`/material/info/all-reviews/${2}`}
                  className="text-primary-green sm:text-sm text-xs hover:text-green-600 duration-300 transition-all"
                >
                  See all reviews
                </Link>
              </div>
              <div className="py-6">
                <ReviewSlider />
              </div>
            </section>
            <OtherProductFromSeller />
            <SimillarProducts />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default page;
