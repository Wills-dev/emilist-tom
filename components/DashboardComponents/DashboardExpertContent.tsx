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
import { useAddClicks } from "@/hooks/useAddClicks";
import { AuthContext } from "@/utils/AuthState";

const DashboardExpertContent = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const { compare } = useCompare();
  const { addClicks } = useAddClicks();
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
                              onClick={() =>
                                addClicks(
                                  "business",
                                  expert?._id,
                                  userId || null
                                )
                              }
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
                                onClick={() => handleLikeBusiness(expert?._id)}
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
                          <button
                            className="flex-c gap-2 cursor-pointer"
                            onClick={() => compare(expert._id)}
                          >
                            {expert?.isCompared ? (
                              <span className="text-lg block text-primary-green">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="#3ad873"
                                  className="size-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
                                    clipRule="evenodd"
                                  />
                                  <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                                  <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                                </svg>
                              </span>
                            ) : (
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
