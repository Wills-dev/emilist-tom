"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { CiSearch } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Pagination from "react-responsive-pagination";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useAddMaterialToCart } from "@/hooks/useAddMaterialToCart";
import { useFetchMaterials } from "@/hooks/useFetchMaterials";
import { useSaveMaterials } from "@/hooks/useSaveMaterials";
import { useUnsaveMaterial } from "@/hooks/useUnsaveMaterial";

import StarRating from "../StarRating/StarRating";
import MaterialFilter from "../MaterialFilter/MaterialFilter";

const MaterialCatalog = () => {
  const searchParams = useSearchParams();

  const material = searchParams.get("q");
  const locationQuery = searchParams.get("location");

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
    getAllMaterials(material, locationQuery);
  }, [rerender, unsaveRerenderr, material, locationQuery]);

  return (
    <section className="py-28 max-lg:py-24 padding-x">
      {cartLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-white h-full z-50 opacity-40" />
      )}
      <div className="flex md:items-end gap-10 max-md:flex-col">
        <div className="flex flex-col gap-4 flex-1">
          <h2 className="sm:text-4xl font-bold text-lg capitalize">
            {material ? material : locationQuery ? locationQuery : null}
          </h2>
          <p className="max-sm:text-sm">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enimt.
          </p>
        </div>
        <div className="flex-1 w-full flex justify-end">
          <div className="flex-1 flex-c gap-2 px-2 py-3 rounded-lg border-[#737774] border-1 focus-within:border-primary-green  max-sm:py-1 shadow-lg max-w-[500px]">
            <button
              type="submit"
              className="text-xl"
              onClick={() => {
                if (!search) {
                  return;
                }
                getAllMaterials();
              }}
            >
              {" "}
              <CiSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleChange}
              className="focus:outline-none max-md:text-14 w-full bg-white"
            />
          </div>
        </div>
      </div>
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
                      src={material?.images[0] && material?.images[0]?.imageUrl}
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
                        {material?.description &&
                        material?.description.length > 200 ? (
                          <p className="max-sm:text-sm">
                            {material?.description.slice(0, 200)}...
                            <Link
                              href={`/material/info/${material.Id}`}
                              className="underline text-primary-green text-xs"
                            >
                              Read more
                            </Link>
                          </p>
                        ) : (
                          <p className="max-sm:text-sm">
                            {material?.description}
                          </p>
                        )}
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
                            <FaHeart />
                          </span>
                        ) : (
                          <span
                            className="block text-xl cursor-pointer"
                            onClick={() => handleSaveMaterial(material._id)}
                          >
                            <FaRegHeart />
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
    </section>
  );
};

export default MaterialCatalog;
