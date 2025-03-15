"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useFilterBusiness } from "@/hooks/useFilterBusiness";

import Pagination from "react-responsive-pagination";
import MainLinks from "@/components/MainLinks/MainLinks";
import MainLayout from "@/components/MainLayout/MainLayout";
import StarRating from "@/components/StarRating/StarRating";
import ServiceFilter from "@/components/ServiceFilter/ServiceFilter";

const HireExperts = () => {
  const {
    fetchBusinesses,
    loading,
    search,
    businesses,
    totalPages,
    currentPage,
    handleChange,
    handlePageChange,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    expertType,
    setExpertType,
    handleMinChange,
    handleMaxChange,
    rating,
    setRating,
    noOfReviews,
    setNoOfReviews,
    location,
    setLocation,
    noticePeriod,
    setNoticePeriod,
    totalBuinesses,
  } = useFilterBusiness();

  useEffect(() => {
    fetchBusinesses();
  }, [currentPage]);

  return (
    <MainLayout>
      <MainLinks />
      <div className="padding-ctn pt-10 pb-16">
        {loading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[50vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-10 pt-10">
            <ServiceFilter
              minValue={minValue}
              setMinValue={setMinValue}
              maxValue={maxValue}
              setMaxValue={setMaxValue}
              expertType={expertType}
              setExpertType={setExpertType}
              handleMinChange={handleMinChange}
              handleMaxChange={handleMaxChange}
              rating={rating}
              setRating={setRating}
              noOfReviews={noOfReviews}
              setNoOfReviews={setNoOfReviews}
              location={location}
              setLocation={setLocation}
              noticePeriodd={noticePeriod}
              setNoticePeriod={setNoticePeriod}
              fetchBusinesses={fetchBusinesses}
            />
            <div className="col-span-7 pl-6">
              {totalBuinesses > 0 ? (
                <h6 className="text-[#737774] text-sm mb-4">
                  {totalBuinesses} results found
                </h6>
              ) : (
                <h6 className="text-[#737774] text-sm mb-4">No result found</h6>
              )}
              <div className="flex flex-col gap-5">
                <>
                  {businesses?.map((expert: any) => (
                    <div
                      key={expert._id}
                      className="w-full grid md:grid-cols-5 grid-cols-6 gap-3 py-4 sm:px-6 hover:bg-gray-100 duration-300 shadow rounded-3xl"
                    >
                      {Array.isArray(expert?.businessImages) &&
                      expert?.businessImages[0]?.imageUrl ? (
                        <Image
                          src={expert?.businessImages[0]?.imageUrl}
                          alt={expert?.services[0]}
                          width={380}
                          height={276}
                          className="md:col-span-1 col-span-2 object-cover w-full sm:h-36  h-28 rounded-lg "
                        />
                      ) : (
                        <Image
                          src="/assets/images/Logo.svg"
                          alt={expert?.services[0]}
                          width={130}
                          height={30}
                          className="md:col-span-1 col-span-2 object-contain w-full sm:h-36  h-28 rounded-lg shadow px-2"
                        />
                      )}
                      <div className="col-span-4 flex justify-between max-md:flex-col md:gap-10 gap-2">
                        <div className="flex flex-col gap-2 flex-1">
                          <h4 className="sm:text-2xl font-bold">
                            {expert?.services[0] &&
                              Capitalize(expert?.services[0])}
                          </h4>
                          {expert?.bio && expert?.bio.length > 100 ? (
                            <p className=" text-xs">
                              {expert?.bio.slice(0, 100)}...
                              <span className=" text-primary-green">
                                Read more
                              </span>
                            </p>
                          ) : (
                            <p className="sm:text-sm">{expert?.bio}</p>
                          )}
                          <div className="flex-c-b  sm:gap-4 gap-2 flex-wrap">
                            <div className="flex-c gap-1 max-sm:text-sm ">
                              <StarRating rating={4} />{" "}
                              <span className="sm:text-sm text-xs">(51)</span>
                            </div>
                            <div className="flex-c gap-1">
                              <Image
                                src="/assets/icons/briefcase.svg"
                                width={40}
                                height={40}
                                alt="brief-case"
                                className="w-4 h-4 object-contain"
                              />
                              <p className="sm:text-sm text-xs">
                                52 Jobs completed
                              </p>
                            </div>
                          </div>
                          <div className="flex-c-b sm:py-2">
                            <div className="flex-c gap-2">
                              <Image
                                src={
                                  expert?.profileImage ||
                                  "/assets/dummyImages/profilePic.png"
                                }
                                width={50}
                                height={50}
                                alt="profile-pic"
                                className="object-cover h-8 w-8 rounded-full"
                              />
                              <h6 className="sm:text-sm text-xs">
                                {expert?.firstName &&
                                  Capitalize(expert?.firstName)}{" "}
                                {expert?.lastName &&
                                  Capitalize(expert?.lastName)}
                              </h6>
                            </div>
                            <div className="max-sm:text-xs font-medium uppercase">
                              Level 5
                            </div>
                          </div>
                        </div>
                        <div className="flex-c md:flex-col md:items-end justify-between">
                          <div className="flex flex-col gap-1">
                            <p className="sm:text-2xl font-bold text-primary-green">
                              {expert?.currency}{" "}
                              {expert?.startingPrice
                                ? numberWithCommas(expert?.startingPrice)
                                : 0}
                            </p>
                            <p className="sm:text-sm text-xs">Starting price</p>
                          </div>

                          <Link
                            href={`/expert/info/${expert?._id}`}
                            className="view-btn max-sm:text-sm"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                      <div className="col-span-1 max-md:hidden" />
                      <div className="md:col-span-4 col-span-6 border-t-1 border-[#B8B9B8] flex-c justify-end sm:gap-10 gap-5 py-2">
                        <div className="flex-c gap-2 cursor-pointer">
                          <span className="text-lg block">
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
                          <p className="sm:text-sm text-xs">Favourite</p>
                        </div>
                        <div className="flex-c gap-2 cursor-pointer">
                          <span className="text-lg block">
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
                          </span>
                          <p className="sm:text-sm text-xs">Compare</p>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HireExperts;
