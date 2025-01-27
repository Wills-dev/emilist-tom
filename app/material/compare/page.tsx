"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";

import { RiDeleteBin6Line } from "react-icons/ri";

import MainLayout from "@/components/MainLayout/MainLayout";

import { Capitalize, numberWithCommas } from "@/helpers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCurrencySign } from "@/helpers/getCurrencySign";
import { useCompareMaterial } from "@/hooks/useCompareMaterial";
import { CompareMaterialContext } from "@/utils/CompareMaterialState";
import { useAddMaterialToCart } from "@/hooks/useAddMaterialToCart";

const page = () => {
  const { compareMaterial } = useCompareMaterial();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();

  const { compareLoading, compareMaterials } = useContext(
    CompareMaterialContext
  );

  return (
    <MainLayout>
      {cartLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-white h-full z-50 opacity-40" />
      )}
      <div className="padding-x pt-28">
        <h2 className="text-3xl leading-9 font-bold text-gray-900 max-md:text-xl">
          Compare
        </h2>
        {compareLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="relative flex my-10">
            {compareMaterials.length > 0 ? (
              <>
                <div className="absolute left-0 sm:w-52 w-28 bg-white flex flex-col font-semibold max-sm:text-sm">
                  <div className="w-full h-[330px] border-b-1 py-6" />
                  <p className="py-6">Product name</p>
                  <p className="py-6 h-[200px]">Description</p>
                  <p className="py-6">Ratings</p>
                  <p className="py-6">Reviews</p>
                  <p className="py-6">Brand</p>
                  <p className="py-6">Category</p>
                  <p className="py-6">Sub category</p>
                  <p className="py-6">Available quantity</p>
                  <p className="py-6">Location</p>
                  <p className="py-6">Store name</p>
                </div>
                <div className="sm:w-52 w-28" />
                <div className="flex-1 w-full flex overflow-x-auto ">
                  {compareMaterials?.map((material: any, index: number) => (
                    <div
                      className="flex flex-col max-sm:text-sm max-w-[250px] w-[250px] min-w-[250px]"
                      key={index}
                    >
                      <div className="w-full h-[330px] border-b-1 px-2 py-6">
                        {Array.isArray(material?.images) &&
                        material?.images[0]?.imageUrl ? (
                          <Image
                            src={material?.images[0]?.imageUrl}
                            alt={material?.name}
                            width={380}
                            height={276}
                            className="object-cover min-w-full h-[170px] "
                          />
                        ) : (
                          <Image
                            src="/assets/images/Logo.svg"
                            alt={material?.name}
                            width={130}
                            height={30}
                            className="object-contain min-w-full  h-[170px] border-1 "
                          />
                        )}
                        <div className="mt-2">
                          <div className="flex justify-between gap-1">
                            <div className="">
                              <h3
                                className={`text-lg font-bold text-primary-green  ${
                                  material?.isDiscounted &&
                                  "opacity-35 line-through"
                                }`}
                              >
                                {material?.currency &&
                                  getCurrencySign(material?.currency)}
                                {material?.price
                                  ? numberWithCommas(material?.price)
                                  : 0}
                              </h3>
                              {material?.isDiscounted && (
                                <h3 className="lg:text-lg font-bold text-primary-green">
                                  {" "}
                                  {material?.currency &&
                                    getCurrencySign(material?.currency)}
                                  {material?.discountedPrice &&
                                    numberWithCommas(material?.discountedPrice)}
                                </h3>
                              )}
                            </div>

                            <button
                              className="font-semibold  max-sm:text-sm py-1 custom-btn"
                              onClick={() => addMaterialToCart(material?._id)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="px-2 py-6 border-b-1">
                        {" "}
                        {material?.name && Capitalize(material?.name)}
                      </p>
                      <p className="px-2 py-6 h-[200px] overflow-y-auto border-b-1">
                        {" "}
                        {material?.description}
                      </p>
                      <p className="px-2 py-6  border-b-1">
                        {material?.averageRating
                          ? numberWithCommas(material?.averageRating)
                          : 0}
                      </p>
                      <p className="px-2 py-6  border-b-1">
                        {" "}
                        {material?.totalReviews
                          ? numberWithCommas(material?.totalReviews)
                          : 0}
                      </p>
                      <p className="px-2 py-6  border-b-1">
                        {" "}
                        {material?.brand}
                      </p>
                      <p className="px-2 py-6  border-b-1">
                        {" "}
                        {material?.category && Capitalize(material?.category)}
                      </p>
                      <p className="px-2 py-6  border-b-1">
                        {" "}
                        {material?.subCategory &&
                          Capitalize(material?.subCategory)}
                      </p>
                      <p className="px-2 py-6  border-b-1">
                        {material?.availableQuantity &&
                          numberWithCommas(material?.availableQuantity)}
                      </p>
                      <p className="px-2 py-6  border-b-1">
                        {material?.location}
                      </p>
                      <p className="px-2 py-6  border-b-1">
                        {material?.storeName}
                      </p>
                      <div className="flex-c gap-2 justify-center py-6">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <button
                                className="text-red-500"
                                onClick={() => compareMaterial(material?._id)}
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove business</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <Link
                          href={`/profile/about/${material?.userId?._id}`}
                          className=" text-center border-1 border-[#303632] text-sm max-sm:text-xs py-3 rounded-[10px] w-36"
                        >
                          Seller Profile
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-c text-lg">
                <p>
                  No Material added to compare list.{" "}
                  <Link
                    href="/dashboard/material"
                    className="text-primary-green"
                  >
                    {" "}
                    Click here
                  </Link>{" "}
                  to see all materials.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default page;
