"use client";

import Image from "next/image";
import Link from "next/link";

import Pagination from "react-responsive-pagination";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";

import { formatCreatedAt, numberWithCommas } from "@/helpers";
import { useGetUserAppliedJobs } from "@/hooks/useGetUserAppliedJobs";
import { CiSearch } from "react-icons/ci";

const page = () => {
  const {
    isLoading,
    allAplliedJobs,
    allAppliedJobsData,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    userLoading,
  } = useGetUserAppliedJobs();

  return (
    <main className="relative">
      {" "}
      <DashboardNav />
      <section className="padding-x py-28">
        <h1 className=" text-3xl font-[700] leading-[36px] max-sm:text-xl max-sm:leading-[30px] my-4 text-[#282828]">
          Applications
        </h1>
        {isLoading || userLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[60vh] w-full">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-2 max-md:col-span-3 flex flex-col w-full gap-6">
              {/* search for mobile  */}
              <form className="flex-1 max-w-[300px] flex items-center justify-between mt-5 md:hidden">
                <div className="flex-1 flex items-center px-4 py-3 rounded-lg border-[#737774] border-[1px] focus-within:border-primary-green max-sm:px-1 max-sm:py-2 shadow-md">
                  <Image
                    src="/assets/icons/search-normal.svg"
                    alt="menu"
                    width={16}
                    height={16}
                    className="object-contain mr-3 max-sm:mr-1"
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className="focus:outline-none text-[#737774] font-exo text-base max-md:text-[10px] w-full"
                    value={search}
                    onChange={handleChange}
                  />
                </div>
              </form>

              {allAplliedJobs.length < 1 ? (
                <p className="text-[#282828]">No applied job yet.</p>
              ) : (
                <>
                  {allAplliedJobs?.length > 0 &&
                  allAppliedJobsData.length < 1 ? (
                    <p className="text-[#282828]">
                      No job matched your search, Trying search for something
                      else
                    </p>
                  ) : (
                    <>
                      {" "}
                      {allAppliedJobsData?.map((job: any, index: number) => (
                        <Link
                          href={
                            job?.type === "biddable"
                              ? `/dashboard/job/info/biddable/${job._id}`
                              : job?.type === "regular"
                              ? `/dashboard/job/info/regular/${job._id}`
                              : `/dashboard/job/info/direct/${job._id}`
                          }
                          key={index}
                        >
                          <div className="w-full p-4  shadow-md rounded-[20px]">
                            <div className="flex justify-between items-center w-full pb-5">
                              <h5 className="text-[#000000] text-[20px] leading-[24px] font-[600] max-sm:text-[16px]">
                                {job?.jobTitle && job?.jobTitle}
                              </h5>
                              <div className="flex justify-end items-center gap-3 max-sm:gap-2 ">
                                <h6 className="text-[#000000] text-[14px] leading-[20px] font-[500] max-sm:text-[12px]">
                                  {job?.createdAt &&
                                    formatCreatedAt(job.createdAt)}
                                </h6>
                                <Image
                                  src="/assets/icons/menudot.svg"
                                  alt="menu"
                                  width={20}
                                  height={20}
                                  className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                                />
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              {job?.type === "biddable" ? (
                                <>
                                  <h6 className="text-[#737774] text-[14px] leading-[20px] font-[500] max-sm:text-[12px]">
                                    Max price: ₦
                                    {job?.maxPrice &&
                                      numberWithCommas(job.maxPrice)}
                                  </h6>
                                </>
                              ) : (
                                <h6 className="text-[#737774] text-[14px] leading-[20px] font-[500] max-sm:text-[12px] whitespace-nowrap">
                                  Budget: ₦
                                  {job?.amount && numberWithCommas(job.amount)}
                                </h6>
                              )}
                              <h6 className="text-[#737774] text-[14px] leading-[20px] font-[500] max-sm:text-[12px]">
                                Est Time:{" "}
                                {job?.projectDuration && job?.projectDuration}
                              </h6>
                            </div>

                            <p className="text-[#303632] text-[14px] leading-[20px] font-[500] max-sm:text-[12px] py-2">
                              {job?.description
                                ? job?.description.length < 450
                                  ? job?.description
                                  : `${job?.description?.slice(0, 450)}...`
                                : null}
                            </p>
                            <div className="flex items-center gap-8 flex-wrap max-sm:gap-4 max-sm:justify-between">
                              <p className="flex items-center text-[#737774] text-[16px] leading-[20px] font-[500] max-sm:text-[13px] py-2 whitespace-nowrap ">
                                {" "}
                                <Image
                                  src="/assets/icons/location.png"
                                  alt="location"
                                  width={20}
                                  height={20}
                                  className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] mr-2"
                                />
                                {job?.location && job?.location}
                              </p>
                              <div className="flex justify-end items-center gap-2 max-sm:gap-4 ">
                                {" "}
                                <Image
                                  src="/assets/icons/face.png"
                                  alt="menu"
                                  width={20}
                                  height={20}
                                  className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                                />
                                <p className="text-[#303632] text-[14px] leading-[20px] font-[500] max-sm:text-[12px] whitespace-nowrap ">
                                  {job?.applicants && job.applicants?.length}{" "}
                                  Applicants
                                </p>
                              </div>
                              <p className="flex items-center text-[#737774] text-[16px] leading-[20px] font-[500] max-sm:text-[13px] py-2 whitespace-nowrap ">
                                {" "}
                                <Image
                                  src="/assets/icons/share.svg"
                                  alt="location"
                                  width={20}
                                  height={20}
                                  className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] mr-2"
                                />
                                Share
                              </p>
                            </div>
                          </div>
                        </Link>
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
            </div>
            <div className="col-span-1  max-md:hidden">
              {/* search for web  */}
              <form className=" flex-1 w-full flex-c-b mb-10 max-md:hidden">
                <div className="flex-1 flex-c px-4 py-2 rounded-lg  border-[#b8b9b8] border-1 focus-within:border-primary-green max-sm:px-1 max-sm:py-1 shadow-sm">
                  <span className="text-lg">
                    <CiSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    className="focus:outline-none text-[#737774] text-sm max-md:text-xs w-full bg-white"
                    value={search}
                    onChange={handleChange}
                  />
                </div>
              </form>
              <div className="flex flex-col gap-4 my-4 ">
                <h6 className="text-lg font-semibold pt-4  max-sm:text-sm ">
                  Job title
                </h6>
                <div className="mr-2">
                  <input
                    type="text"
                    placeholder="Enter job title"
                    className="border-1 border-[#b8b9b8] rounded-lg w-full text-sm px-2 py-2 focus:outline-none bg-white focus:border-primary-green "
                    // value={filterName}
                    // onChange={(e) => setFilterName(e.target.value)}
                  />
                </div>
                <h6 className="text-lg font-semibold pt-4 max-sm:text-sm">
                  Services
                </h6>
                <div className="mr-2">
                  <select
                    name=""
                    id="filter"
                    className="border-1 border-[#b8b9b8] rounded-lg w-full bg-white text-sm px-2 py-2  focus:outline-none focus:border-primary-green"
                    // value={filterService}
                    // onChange={(e) => setFilterService(e.target.value)}
                  >
                    <option defaultValue="selected"> Select</option>
                    <option value="contruction"> Construction</option>
                    <option value="Software"> Software</option>
                  </select>
                </div>
              </div>
              <div className="w-full  border-b-1 border-[#d9d9d9] shadow-sm">
                <h6 className="text-lg font-semibold pt-4 max-sm:text-sm">
                  Location
                </h6>
                <div className="mr-2">
                  <input
                    type="text"
                    placeholder="Location"
                    className="border-1 border-[#b8b9b8] bg-white rounded-lg w-full text-sm px-2 py-2 mt-4 focus:outline-none focus:border-primary-green"
                    // value={filterLocation}
                    // onChange={(e) => setFilterLocation(e.target.value)}
                  />
                  <div className="flex justify-center items-center">
                    <button
                      className="text-primary-green text-center text-sm font-semibold py-4"
                      //   onClick={handleFilterJob}
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
