"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import Pagination from "react-responsive-pagination";

import StarRating from "../StarRating/StarRating";
import ServiceFilter from "../ServiceFilter/ServiceFilter";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useFilterBusiness } from "@/hooks/useFilterBusiness";

const ServiceCatalog = () => {
  const searchParams = useSearchParams();

  const service = searchParams.get("q");
  const locationQuery = searchParams.get("location");

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
    fetchBusinesses(service, locationQuery);
  }, [currentPage, service, locationQuery]);

  return (
    <section className="py-28 max-lg:py-24 padding-x">
      <div className="flex md:items-end gap-10 max-md:flex-col">
        <div className="flex flex-col gap-4 flex-1">
          <h2 className="sm:text-4xl font-bold text-lg capitalize">
            {service ? service : locationQuery ? locationQuery : null}
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
                fetchBusinesses();
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
                              {expert?.lastName && Capitalize(expert?.lastName)}
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
                          <FaRegHeart />
                        </span>
                        <p className="sm:text-sm text-xs">Favourite</p>
                      </div>
                      <div className="flex-c gap-2 cursor-pointer">
                        <span className="text-lg block">
                          <IoCopyOutline />
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
    </section>
  );
};

export default ServiceCatalog;
