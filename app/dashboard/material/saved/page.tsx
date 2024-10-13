"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

import { FaHeart } from "react-icons/fa";
import Pagination from "react-responsive-pagination";

import StarRating from "@/components/StarRating/StarRating";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useGetUserSavedMaterials } from "@/hooks/useGetUserSavedMaterials";
import { useUnsaveMaterial } from "@/hooks/useUnsaveMaterial";

const SavedMaterials = () => {
  const { handleUnsaveMaterial, unsaveRerenderr } = useUnsaveMaterial();
  const {
    saveLoading,
    allUserSavedMaterialsData,
    allUserSavedMaterials,
    search,
    handlePageChange,
    currentPage,
    totalPages,
    getAllUserSavedMaterials,
  } = useGetUserSavedMaterials();

  useEffect(() => {
    getAllUserSavedMaterials();
  }, [unsaveRerenderr]);

  return (
    <main className="relative">
      <DashboardNav />
      <section className="pt-28 padding-x pb-20">
        <div className="flex-c-b gap-4 pb-6">
          <h1 className=" text-2xl font-bold  max-sm:text-lg pt-6">
            Saved Materials
          </h1>
        </div>
        {saveLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="flex max-lg:flex-col-reverse lg:gap-12  gap-6 w-full">
            <div className="flex-1 w-full flex flex-col gap-4">
              <>
                {allUserSavedMaterials?.length < 1 ? (
                  <p className="py-2">No expert or service saved</p>
                ) : (
                  <>
                    {allUserSavedMaterials?.length > 0 &&
                    allUserSavedMaterialsData?.length < 1 ? (
                      <p className="py-2">
                        No result found, try searching for something else
                      </p>
                    ) : (
                      <>
                        {allUserSavedMaterialsData?.map((material: any) => (
                          <div
                            key={material._id}
                            className="w-full grid md:grid-cols-5 grid-cols-6 gap-3 py-4 sm:px-6 px-2 hover:bg-gray-100 duration-300 shadow rounded-2xl"
                          >
                            <Image
                              src={material?.Images && material?.Images[0]}
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
                                  {material?.product_name &&
                                    Capitalize(material?.product_name)}
                                </Link>
                                {material?.description &&
                                material?.description.length > 200 ? (
                                  <p className="max-sm:text-sm">
                                    {material?.description.slice(0, 200)}...
                                    <Link
                                      href={`/material/info/${material._id}`}
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
                                    <span className="sm:text-sm text-xs">
                                      (51)
                                    </span>
                                  </div>
                                </div>
                                <div className="flex-c-b sm:py-2">
                                  <div className="flex-c gap-2">
                                    <Image
                                      src="/assets/dummyImages/profilePic.png"
                                      width={50}
                                      height={50}
                                      alt="profile-pic"
                                      className="object-cover h-8 w-8 rounded-full"
                                    />
                                    <h6 className="sm:text-sm text-xs">
                                      Victor Kings
                                      {/* {material?.firstname &&
                                Capitalize(material?.firstname)}{" "}
                              {material?.lastname &&
                                Capitalize(material?.lastname)} */}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-c md:flex-col md:items-end justify-between">
                                <div className="flex flex-col gap-1">
                                  <p className="sm:text-2xl font-bold text-primary-green">
                                    ₦{" "}
                                    {material?.price &&
                                      numberWithCommas(material?.price)}
                                  </p>
                                </div>

                                <button className="view-btn max-sm:text-sm">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                            <div className="col-span-1 max-md:hidden" />
                            <div className="md:col-span-4 col-span-6 border-t-1 border-[#B8B9B8] flex-c justify-end sm:gap-10 gap-5 pt-2">
                              <div className="flex-c gap-2 cursor-pointer">
                                <span
                                  className="block text-xl text-pink-500 cursor-pointer"
                                  onClick={() =>
                                    handleUnsaveMaterial(material._id)
                                  }
                                >
                                  <FaHeart />
                                </span>
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
            </div>
            <div className="w-1/4"></div>
          </div>
        )}
      </section>
    </main>
  );
};

export default SavedMaterials;
