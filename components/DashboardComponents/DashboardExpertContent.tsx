"use client";

import Link from "next/link";
import Image from "next/image";

import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import Pagination from "react-responsive-pagination";

import DashboardLinks from "./DashboardLinks";
import StarRating from "../StarRating/StarRating";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useFetchExperts } from "@/hooks/useFetchExperts";

const DashboardExpertContent = () => {
  const {
    loading,
    allExperts,
    allExpertsData,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
  } = useFetchExperts();

  return (
    <div className="col-span-7 max-lg:col-span-10 w-full bg-white p-6 rounded-lg max-sm:px-3">
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-2xl font-medium max-sm:text-lg">
          Explore Emilist
        </h2>
      </div>
      <div className="flex flex-col w-full gap-4 border-b-1 border-[#B8B9B8]">
        <div className="flex-c-b w-full mt-6 gap-2">
          <DashboardLinks />
          <button className="custom-btn">
            <Link href="/expert/register">Join as an expert</Link>
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
            <button type="submit" className="text-xl">
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
            {allExperts?.length < 1 ? (
              <p className="py-2">No expert or service listed</p>
            ) : (
              <>
                {allExperts?.length > 0 && allExpertsData.length < 1 ? (
                  <p className="py-2">
                    No result found, try searching for something else
                  </p>
                ) : (
                  <>
                    {allExpertsData?.map((expert: any) => (
                      <div
                        key={expert.id}
                        className="w-full grid md:grid-cols-5 grid-cols-6 gap-3 py-4 sm:px-6 hover:bg-gray-100 duration-300"
                      >
                        <Image
                          src="/assets/images/privateExpertImg.png"
                          width={140}
                          height={100}
                          alt="service"
                          className="md:col-span-1 col-span-2 object-cover w-full sm:h-36  h-28 rounded-lg "
                        />
                        <div className="col-span-4 flex justify-between max-md:flex-col md:gap-10 gap-2">
                          <div className="flex flex-col gap-2 flex-1">
                            <h4 className="sm:text-2xl font-bold">
                              {expert?.service && Capitalize(expert?.service)}
                            </h4>
                            <p className="max-sm:text-sm">{expert?.bio}</p>
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
                                  src="/assets/dummyImages/profilePic.png"
                                  width={50}
                                  height={50}
                                  alt="profile-pic"
                                  className="object-cover h-8 w-8 rounded-full"
                                />
                                <h6 className="sm:text-sm text-xs">
                                  {expert?.firstname &&
                                    Capitalize(expert?.firstname)}{" "}
                                  {expert?.lastname &&
                                    Capitalize(expert?.lastname)}
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
                                ₦{" "}
                                {expert?.startingprice &&
                                  numberWithCommas(expert?.startingprice)}
                              </p>
                              <p className="sm:text-sm text-xs">
                                Starting price
                              </p>
                            </div>

                            <Link
                              href={`/expert/info/${expert?.id}`}
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
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardExpertContent;
