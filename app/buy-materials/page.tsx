"use client";

import Link from "next/link";
import Image from "next/image";

import Pagination from "react-responsive-pagination";

import MainLayout from "@/components/MainLayout/MainLayout";
import MainLinks from "@/components/MainLinks/MainLinks";
import MaterialFilter from "@/components/MaterialFilter/MaterialFilter";
import StarRating from "@/components/StarRating/StarRating";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useAddMaterialToCart } from "@/hooks/useAddMaterialToCart";
import { useFetchMaterials } from "@/hooks/useFetchMaterials";
import { useSaveMaterials } from "@/hooks/useSaveMaterials";
import { useUnsaveMaterial } from "@/hooks/useUnsaveMaterial";
import { useEffect } from "react";
import ReadMore from "@/components/ReadMore/ReadMore";

const BuyMaterials = () => {
  const { handleSaveMaterial, rerender } = useSaveMaterials();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();
  const { handleUnsaveMaterial, unsaveRerenderr } = useUnsaveMaterial();

  const {
    loading,
    allMaterials,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    getAllMaterials,
    handleMinChange,
    handleMaxChange,
    rating,
    setRating,
    minValue,
    maxValue,
    noOfReviews,
    setNoOfReviews,
    totalProducts,
  } = useFetchMaterials();

  useEffect(() => {
    getAllMaterials();
  }, [rerender, unsaveRerenderr]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getAllMaterials();
  };
  return (
    <MainLayout>
      <MainLinks
        title="Explore Material"
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {cartLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-white h-full z-50 opacity-40" />
      )}
      <div className="padding-ctn pt-10 pb-16">
        {loading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[50vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-10 pt-10">
            <MaterialFilter
              minValue={minValue}
              maxValue={maxValue}
              handleMinChange={handleMinChange}
              handleMaxChange={handleMaxChange}
              rating={rating}
              setRating={setRating}
              noOfReviews={noOfReviews}
              setNoOfReviews={setNoOfReviews}
              getAllMaterials={getAllMaterials}
            />
            <div className="col-span-7 pl-6">
              {totalProducts > 0 ? (
                <h6 className="text-[#737774] text-sm mb-4">
                  {totalProducts} results found
                </h6>
              ) : (
                <h6 className="text-[#737774] text-sm mb-4">No result found</h6>
              )}
              <div className="flex flex-col gap-5">
                <>
                  {allMaterials?.map((material: any) => (
                    <div
                      key={material._id}
                      className="w-full grid md:grid-cols-5 grid-cols-6 gap-3 py-4 sm:px-6 px-2 hover:bg-gray-100 duration-300 shadow rounded-2xl"
                    >
                      <Image
                        src={
                          material?.images[0] && material?.images[0]?.imageUrl
                        }
                        width={140}
                        height={100}
                        alt="service"
                        className="md:col-span-1 col-span-2 object-cover w-full sm:h-36  h-28 rounded-lg "
                      />
                      <div className="col-span-4 flex justify-between max-md:flex-col md:gap-10 gap-2">
                        <div className="flex flex-col gap-2 flex-1">
                          <Link
                            href={`/material/info/${material._id}`}
                            className="sm:text-2xl font-bold hover:text-primary-green duration-300"
                          >
                            {material?.name && Capitalize(material?.name)}
                          </Link>
                          <ReadMore
                            text={material?.description}
                            maxLength={200}
                            style="max-sm:text-sm"
                          />
                          <div className="flex-c-b  sm:gap-4 gap-2 flex-wrap">
                            <div className="flex-c gap-1 max-sm:text-sm ">
                              <StarRating rating={4} />{" "}
                              <span className="sm:text-sm text-xs">(51)</span>
                            </div>
                          </div>
                          <div className="flex-c-b sm:py-2">
                            <Link
                              href={`/profile/about/${material?.userId?._id}`}
                              className="flex-c gap-2 group"
                            >
                              {material?.userId?.profileImage ? (
                                <Image
                                  src={material?.userId?.profileImage}
                                  width={50}
                                  height={50}
                                  alt="profile-pic"
                                  className="object-cover h-8 w-8 rounded-full"
                                />
                              ) : (
                                <p className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                                  {material?.userId?.fullName
                                    ? material?.userId?.fullName[0].toUpperCase()
                                    : material?.userId?.userName[0].toUpperCase()}
                                </p>
                              )}
                              <h6 className="sm:text-sm text-xs group-hover:text-primary-green duration-300 transition-all">
                                {material?.userId?.fullName ||
                                  material?.userId?.userName}
                              </h6>
                            </Link>
                          </div>
                        </div>
                        <div className="flex-c md:flex-col md:items-end justify-between">
                          <div className="flex flex-col gap-1">
                            <p className="sm:text-2xl font-bold text-primary-green">
                              {material?.currency}{" "}
                              {material?.price &&
                                numberWithCommas(material?.price)}
                            </p>
                          </div>

                          <button
                            className="view-btn max-sm:text-sm"
                            onClick={() => addMaterialToCart(material._id)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      <div className="col-span-1 max-md:hidden" />
                      <div className="md:col-span-4 col-span-6 border-t-1 border-[#B8B9B8] flex-c justify-end sm:gap-10 gap-5 py-2">
                        <div className="flex-c gap-2 cursor-pointer">
                          {material?.liked ? (
                            <span
                              className="block text-xl text-[#054753] cursor-pointer"
                              onClick={() => handleUnsaveMaterial(material._id)}
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
                              className="block text-xl cursor-pointer"
                              onClick={() => handleSaveMaterial(material._id)}
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
                          <p className="sm:text-sm text-xs">Favourite</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {totalProducts > 10 && (
                    <div className="md:w-2/3 w-full">
                      <Pagination
                        current={currentPage}
                        total={totalPages}
                        onPageChange={handlePageChange}
                        extraClassName="justify-content-start"
                      />
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BuyMaterials;
