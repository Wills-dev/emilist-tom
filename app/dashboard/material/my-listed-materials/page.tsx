"use client";

import Link from "next/link";
import Image from "next/image";

import Pagination from "react-responsive-pagination";

import StarRating from "@/components/StarRating/StarRating";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useGetUserMaterials } from "@/hooks/useGetUserMaterials";
import { getCurrencySign } from "@/helpers/getCurrencySign";
import ReadMore from "@/components/ReadMore/ReadMore";

const MyListMaterials = () => {
  const {
    handleChange,
    handlePageChange,
    isLoading,
    search,
    totalPages,
    currentPage,
    myMaterials,
  } = useGetUserMaterials();

  return (
    <main className="relative">
      <DashboardNav />
      <section className="pt-28 padding-x pb-20">
        <div className="flex-c-b gap-4 py-6">
          <h1 className=" text-2xl font-bold  max-sm:text-lg ">
            Listed Materials
          </h1>
          <Link
            href="/dashboard/material/list-new-material"
            className="custom-btn max-sm:h_idden"
          >
            List a New Material
          </Link>
        </div>
        {isLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="flex max-lg:flex-col-reverse lg:gap-12  gap-6 w-full">
            <div className="flex-1 w-full flex flex-col gap-4">
              <>
                {myMaterials.length < 1 ? (
                  <p className="py-2">No expert or service listed</p>
                ) : (
                  <>
                    {myMaterials.length < 1 && totalPages > 0 && search ? (
                      <p className="py-2">
                        No result found, try searching for something else
                      </p>
                    ) : (
                      <>
                        {myMaterials?.map((material: any) => (
                          <div
                            key={material._id}
                            className="w-full grid md:grid-cols-5 grid-cols-6 gap-3 py-8 sm:px-6 hover:bg-gray-100 duration-300 shadow rounded-2xl px-2"
                          >
                            <Image
                              src={
                                material?.images[0] &&
                                material?.images[0]?.imageUrl
                              }
                              width={140}
                              height={100}
                              alt="service"
                              className="md:col-span-1 col-span-2 object-cover w-full sm:h-36  h-28 rounded-lg "
                            />
                            <div className="col-span-4 flex justify-between max-md:flex-col md:gap-10 gap-2">
                              <div className="flex flex-col gap-2 flex-1">
                                <Link
                                  href={`/dashboard/material/info/${material._id}`}
                                  className="sm:text-2xl font-bold hover:text-primary-green duration-300"
                                >
                                  {material?.name && Capitalize(material?.name)}
                                </Link>
                                <ReadMore
                                  text={material?.description || ""}
                                  maxLength={180}
                                  style="max-sm:text-sm"
                                />
                                <div className="flex-c-b  sm:gap-4 gap-2 flex-wrap">
                                  <div className="flex-c gap-1 max-sm:text-sm ">
                                    <StarRating
                                      rating={material?.averageRating || 0}
                                    />{" "}
                                    <span className="sm:text-sm text-xs">
                                      ({material?.totalReviews || 0})
                                    </span>
                                  </div>
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

                                <Link
                                  href="/dashboard/report?r=Insights"
                                  className="view-btn max-sm:text-sm"
                                >
                                  view Insight
                                </Link>
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

export default MyListMaterials;
