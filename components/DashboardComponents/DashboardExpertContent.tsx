"use client";

import Link from "next/link";
import Image from "next/image";

import { CiSearch } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoCopy, IoCopyOutline } from "react-icons/io5";
import Pagination from "react-responsive-pagination";

import DashboardLinks from "./DashboardLinks";
import StarRating from "../StarRating/StarRating";
import CompareSearch from "../Compare/CompareSearch";

import { useCompare } from "@/hooks/useCompare";
import { Capitalize, numberWithCommas } from "@/helpers";
import { useGetBusinesses } from "@/hooks/useGetBusinesses";
import { useContext, useEffect } from "react";
import { CompareContext } from "@/utils/CompareState";
import { useLikeBusiness } from "@/hooks/useLikeBusiness";
import { useUnlikeBusiness } from "@/hooks/useUnlikeBusiness";
import { getCurrencySign } from "@/helpers/getCurrencySign";

const DashboardExpertContent = () => {
  const { compare } = useCompare();
  const { compareServices, rrerender } = useContext(CompareContext);
  const { handleLikeBusiness, rerender } = useLikeBusiness();
  const { handleUnlikeBusiness, unsaveRerenderr } = useUnlikeBusiness();
  const {
    businesses,
    loading,
    search,
    totalPages,
    currentPage,
    handleChange,
    handlePageChange,
    fetchBusinesses,
  } = useGetBusinesses();

  useEffect(() => {
    fetchBusinesses();
  }, [rerender, unsaveRerenderr, rrerender]);

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
            {compareServices?.length > 0 && <CompareSearch />}
            {businesses?.length < 1 ? (
              <p className="py-2">No expert or service listed</p>
            ) : (
              <>
                {totalPages > 0 && businesses?.length < 1 ? (
                  <p className="py-2">
                    No result found, try searching for something else
                  </p>
                ) : (
                  <>
                    {businesses?.map((expert: any) => (
                      <div
                        key={expert._id}
                        className="w-full grid md:grid-cols-5 grid-cols-6 gap-3 py-4 sm:px-6 hover:bg-gray-100 duration-300"
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
                                <StarRating rating={expert?.averageRating} />{" "}
                                <span className="sm:text-sm text-xs">
                                  (
                                  {expert?.totalReviews &&
                                    numberWithCommas(expert?.totalReviews)}
                                  )
                                </span>
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
                                  {expert?.completedJobs &&
                                    numberWithCommas(
                                      expert?.completedJobs
                                    )}{" "}
                                  Jobs completed
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
                                {expert?.currency &&
                                  getCurrencySign(expert?.currency)}
                                {expert?.startingPrice
                                  ? numberWithCommas(expert?.startingPrice)
                                  : 0}
                              </p>
                              <p className="sm:text-sm text-xs">
                                Starting price
                              </p>
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
                            {expert?.liked ? (
                              <span
                                className="block text-xl text-[#054753] cursor-pointer"
                                onClick={() =>
                                  handleUnlikeBusiness(expert?._id)
                                }
                              >
                                <FaHeart />
                              </span>
                            ) : (
                              <span
                                className="block text-xl cursor-pointer"
                                onClick={() => handleLikeBusiness(expert?._id)}
                              >
                                <FaRegHeart />
                              </span>
                            )}
                            <p className="sm:text-sm text-xs">Favourite</p>
                          </div>
                          <button
                            className="flex-c gap-2 cursor-pointer"
                            onClick={() => compare(expert._id)}
                          >
                            {expert?.isCompared ? (
                              <span className="text-lg block text-primary-green">
                                <IoCopy />
                              </span>
                            ) : (
                              <span className="text-lg block">
                                <IoCopyOutline />
                              </span>
                            )}
                            <span className="sm:text-sm text-xs">Compare</span>
                          </button>
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
