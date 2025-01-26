"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect } from "react";

import { CiSearch } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Pagination from "react-responsive-pagination";

import DashboardLinks from "./DashboardLinks";
import StarRating from "../StarRating/StarRating";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useSaveMaterials } from "@/hooks/useSaveMaterials";
import { useUnsaveMaterial } from "@/hooks/useUnsaveMaterial";
import { useFetchMaterials } from "@/hooks/useFetchMaterials";
import { useAddMaterialToCart } from "@/hooks/useAddMaterialToCart";
import { AuthContext } from "@/utils/AuthState";
import { useAddClicks } from "@/hooks/useAddClicks";
import { getCurrencySign } from "@/helpers/getCurrencySign";

const DashboardMaterialContent = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const { addClicks } = useAddClicks();
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
  } = useFetchMaterials();

  useEffect(() => {
    getAllMaterials();
  }, [rerender, unsaveRerenderr]);

  return (
    <div className="col-span-7 max-lg:col-span-10 w-full bg-white p-6 rounded-lg max-sm:px-3">
      {cartLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-white h-full z-50 opacity-40" />
      )}
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-2xl font-medium max-sm:text-lg">
          Explore Emilist
        </h2>
      </div>
      <div className="flex flex-col w-full gap-4 border-b-1 border-[#B8B9B8]">
        <div className="flex-c-b w-full mt-6 gap-2">
          <DashboardLinks />
          <button className="custom-btn">
            <Link href="/dashboard/material/list-new-material">
              Post a product
            </Link>
          </button>
        </div>
        <div className="flex justify-between w-full sm:gap-8 gap-4 pb-6 max-md:flex-col">
          <div className="flex-1">
            <p className=" max-sm:text-sm">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint.
            </p>
          </div>
          <div className="flex-1 flex-c gap-2 px-2 py-3 rounded-lg border-[#737774] border-1 focus-within:border-primary-green  max-sm:py-1 shadow-lg">
            <button
              type="submit"
              className="text-xl"
              onClick={() => getAllMaterials()}
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
      <div className="flex flex-col">
        {loading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            {allMaterials?.length < 1 ? (
              <p className="py-2">No materials</p>
            ) : (
              <>
                {allMaterials?.length < 1 && totalPages < 1 && search ? (
                  <p className="py-2">
                    No result found, try searching for something else
                  </p>
                ) : (
                  <>
                    {allMaterials?.map((material: any) => (
                      <div
                        key={material._id}
                        className="w-full grid md:grid-cols-5 grid-cols-6 gap-3 py-4 sm:px-6 px-2 hover:bg-gray-100 duration-300"
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
                              onClick={() =>
                                addClicks(
                                  "materials",
                                  material._id,
                                  userId || null
                                )
                              }
                              className="sm:text-2xl font-bold hover:text-primary-green duration-300"
                            >
                              {material?.name && Capitalize(material?.name)}
                            </Link>
                            {material?.description &&
                            material?.description.length > 200 ? (
                              <p className="max-sm:text-sm">
                                {material?.description.slice(0, 200)}...
                                <Link
                                  href={`/material/info/${material._id}`}
                                  className="underline text-primary-green text-xs"
                                  onClick={() =>
                                    addClicks(
                                      "materials",
                                      material._id,
                                      userId || null
                                    )
                                  }
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
                                {material?.currency &&
                                  getCurrencySign(material?.currency)}
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
                                className="block cursor-pointer"
                                onClick={() =>
                                  handleUnsaveMaterial(material._id)
                                }
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
                                className="block cursor-pointer"
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
                    <div className="md:w-2/3 w-full">
                      <Pagination
                        current={currentPage}
                        total={totalPages}
                        onPageChange={handlePageChange}
                        extraClassName="justify-content-start"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardMaterialContent;
