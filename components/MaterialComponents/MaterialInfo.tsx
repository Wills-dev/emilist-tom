"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { getCurrencySign } from "@/helpers/getCurrencySign";
import { useSaveMaterials } from "@/hooks/useSaveMaterials";
import { useUnsaveMaterial } from "@/hooks/useUnsaveMaterial";
import { useGetMaterialInfo } from "@/hooks/useGetMaterialInfo";
import { useAddMaterialToCart } from "@/hooks/useAddMaterialToCart";

import { Capitalize, numberWithCommas } from "@/helpers";

import ShareLink from "../modals/ShareLink";
import SimillarProducts from "./SimillarProducts";
import StarRating from "../StarRating/StarRating";
import ImageSlider from "../ImageSlider/ImageSlider";
import ProductDescription from "./ProductDescription";
import ReviewSlider from "../ReviewSlider/ReviewSlider";
import OtherProductFromSeller from "./OtherProductFromSeller";
import { useGetMaterialReview } from "@/hooks/useGetMaterialReview";
import ReviewSliderLoader from "../ReviewSlider/ReviewSliderLoader";
import { useCompareMaterial } from "@/hooks/useCompareMaterial";
import { CompareMaterialContext } from "@/utils/CompareMaterialState";
import CompareSearch from "../Compare/CompareSearch";

interface MaterialInfoProps {
  materialId: string;
}

const MaterialInfo = ({ materialId }: MaterialInfoProps) => {
  const [link, setLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { compareMaterials, rrerender } = useContext(CompareMaterialContext);

  const { compareMaterial } = useCompareMaterial();
  const { data, isLoadin, getReviews } = useGetMaterialReview();
  const { handleSaveMaterial, rerender } = useSaveMaterials();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();
  const { handleUnsaveMaterial, unsaveRerenderr } = useUnsaveMaterial();
  const { loading, getMaterialInfo, materialInfo } = useGetMaterialInfo();

  useEffect(() => {
    getMaterialInfo(materialId);
  }, [materialId, rerender, unsaveRerenderr, rrerender]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpen = (url: string) => {
    setIsModalOpen(true);
    setLink(url);
  };

  useEffect(() => {
    getReviews(materialId, "mostRecent");
  }, []);

  return (
    <div className="gap-8 pt-28 pb-4 padding-ctn">
      {cartLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-white h-full z-50 opacity-40" />
      )}

      {loading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[70vh]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="w-full pt-12">
          {compareMaterials.length > 0 && (
            <CompareSearch title="materials" link="/material/compare" />
          )}
          <ShareLink
            handleCancel={handleCancel}
            isModalOpen={isModalOpen}
            link={`https://emilist.com/material/info/${materialId}`}
            textToCopy={link}
            title="Share material"
            id={materialId}
          />
          <div className="flex-c sm:gap-8 gap-5 justify-end pb-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {materialInfo?.liked ? (
                    <span
                      className="block cursor-pointer"
                      onClick={() => handleUnsaveMaterial(materialId)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#054753"
                        className="size-6"
                      >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className="block  cursor-pointer"
                      onClick={() => handleSaveMaterial(materialId)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#5E625F"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </span>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {!materialInfo?.liked ? (
                    <p>Like material</p>
                  ) : (
                    <p>Unlike material</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span onClick={() => compareMaterial(materialId)}>
                    {!materialInfo?.isCompared ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#5E625F"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#3ad873"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
                          clipRule="evenodd"
                        />
                        <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                        <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                      </svg>
                    )}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Compare material</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share material</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <section className="grid grid-cols-5 gap-5 max-lg:grid-cols-4">
            <ImageSlider materialInfo={materialInfo?.product} />
            <div className="col-span-2 max-lg:col-span-2 max-md:col-span-4">
              <h4 className="sm:text-3xl text-lg font-bold mb-4">
                {materialInfo?.product?.name &&
                  Capitalize(materialInfo?.product?.name)}
              </h4>
              <div className="flex flex-col gap-2 font-inter">
                <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
                  <div className="flex-c gap-2 flex-1">
                    <h6 className="font-medium max-sm:text-sm">Brand:</h6>
                    <p className=" max-sm:text-sm">
                      {" "}
                      {materialInfo?.product?.brand &&
                        Capitalize(materialInfo?.product?.brand)}
                    </p>
                  </div>
                  <div className="flex-c gap-2 flex-1">
                    <h6 className="font-medium max-sm:text-sm">Supplier:</h6>
                    <Link
                      href={`/profile/about/${materialInfo?.product?.userId?._id}`}
                      className="text-primary-green underline  max-sm:text-sm"
                    >
                      {materialInfo?.product?.userId?.fullName ||
                        materialInfo?.product?.userId?.userName}
                    </Link>
                  </div>
                </div>
                <div className="flex justify-between gap-2 max-sm:flex-col ">
                  <div className="flex-c gap-2 flex-1">
                    <h6 className="font-medium max-sm:text-sm">Category:</h6>
                    <p className="max-sm:text-sm">
                      {" "}
                      {materialInfo?.product?.category}
                    </p>
                  </div>
                  <div className="flex-c gap-5 flex-1">
                    <h6 className="font-medium max-sm:text-sm">Rating</h6>
                    <div className="flex-c text-[#8A8D8B] max-sm:text-sm gap-1">
                      <StarRating rating={materialInfo?.averageRating | 0} />
                      {materialInfo?.averageRating || 0}
                    </div>
                  </div>
                </div>
                <div className="flex-c gap-2 flex-1">
                  <h6 className="font-medium max-sm:text-sm">Location:</h6>
                  <p className="max-sm:text-sm">
                    {" "}
                    {materialInfo?.product?.location}
                  </p>
                </div>
              </div>
              <h3
                className={`lg:text-lg font-bold text-primary-green  mt-5 ${
                  materialInfo?.product?.isDiscounted &&
                  "opacity-35 line-through"
                }`}
              >
                {" "}
                {materialInfo?.product?.currency &&
                  getCurrencySign(materialInfo?.product?.currency)}
                {materialInfo?.product?.price &&
                  numberWithCommas(materialInfo?.product?.price)}
              </h3>
              {materialInfo?.product?.isDiscounted && (
                <h3 className="lg:text-lg font-bold text-primary-green  mt-5">
                  {" "}
                  {materialInfo?.product?.currency &&
                    getCurrencySign(materialInfo?.product?.currency)}
                  {materialInfo?.product?.discountedPrice &&
                    numberWithCommas(materialInfo?.product?.discountedPrice)}
                </h3>
              )}
              <p className="font-medium max-sm:text-sm mt-2 ">Price</p>
              <button
                className="bg-primary-green px-6 py-5 text-white rounded-lg font-bold mt-10 whitespace-nowrap max-lg:mt-5 max-sm:text-sm max-sm:py-3 w-full hover:bg-green-600 transition-all duration-300"
                onClick={() => addMaterialToCart(materialId)}
              >
                Add to cart
              </button>
            </div>
          </section>
          <ProductDescription materialInfo={materialInfo?.product} />
          <section className="border-b-1 border-gray-400 pb-8">
            {" "}
            <div className="flex-c-b gap-6 max-w-[676px] w-full">
              <h6 className="sm:text-2xl text-lg font-semibold">
                What people loved about this product
              </h6>
              {data?.length > 0 && (
                <Link
                  href={`/material/info/all-reviews/${materialId}`}
                  className="text-primary-green sm:text-sm text-xs hover:text-green-600 duration-300 transition-all"
                >
                  See all reviews
                </Link>
              )}
            </div>
            <div className="py-6">
              {isLoadin ? (
                <ReviewSliderLoader />
              ) : (
                <>
                  {data?.length > 0 ? (
                    <ReviewSlider reviews={data} />
                  ) : (
                    <p>No review for this material</p>
                  )}
                </>
              )}
            </div>
          </section>
          <OtherProductFromSeller
            supplierInfo={materialInfo?.product?.userId}
          />
          <SimillarProducts materialId={materialId} />
        </div>
      )}
    </div>
  );
};

export default MaterialInfo;
