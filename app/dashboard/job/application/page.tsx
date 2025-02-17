"use client";

import Image from "next/image";
import Link from "next/link";

import Pagination from "react-responsive-pagination";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";

import { formatCreatedAt, numberWithCommas } from "@/helpers";
import { useGetUserAppliedJobs } from "@/hooks/useGetUserAppliedJobs";
import { CiSearch } from "react-icons/ci";
import { serviceList } from "@/constants";

const page = () => {
  const {
    isLoading,
    allAplliedJobs,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    userLoading,
    filterService,
    setFilterService,
    filterName,
    setFilterName,
    filterLocation,
    setFilterLocation,
    getAllJobs,
  } = useGetUserAppliedJobs();

  const checkAll =
    search || filterLocation || filterName || filterService || "";

  return (
    <main className="relative">
      {" "}
      <DashboardNav />
      <section className="padding-x py-28">
        <h1 className=" sm:text-3xl font-bold text-xl my-4">Applications</h1>
        {isLoading || userLoading ? (
          <div className="flex-c justify-center text-green-500 mt-6 h-[60vh] w-full">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-2 max-md:col-span-3 flex flex-col w-full gap-6">
              {/* search for mobile  */}
              <form className="max-w-[350px] mt-5 md:hidden">
                <div className="flex-1 flex-c px-4 py-3 rounded-lg border-[#737774] border-1 focus-within:border-primary-green max-sm:px-2 shadow-md gap-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="focus:outline-none bg-white max-md:text-xs w-full flex-1"
                    value={search}
                    onChange={handleChange}
                    style={{ fontSize: "16px" }}
                  />
                  <button type="button" onClick={getAllJobs}>
                    {" "}
                    <CiSearch />
                  </button>
                </div>
              </form>

              {allAplliedJobs?.length < 1 ? (
                <>
                  {checkAll ? (
                    <p className="">
                      No job matched your search or filter, Try something else.
                    </p>
                  ) : (
                    <p className="">No applied job yet.</p>
                  )}
                </>
              ) : (
                <>
                  {allAplliedJobs?.map((job: any, index: number) => (
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
                        <div className="flex-c-b w-full pb-5">
                          <h5 className="sm:text-2xl font-semibold truncate">
                            {job?.title && job?.title}
                          </h5>
                          <div className="flex-c justify-end gap-3 max-sm:gap-2 ">
                            <h6 className="text-sm font-medium max-sm:text-xs">
                              Posted:{" "}
                              {job?.createdAt && formatCreatedAt(job.createdAt)}
                            </h6>
                          </div>
                        </div>
                        <div className="flex-c-b">
                          {job?.type === "biddable" ? (
                            <h6 className="text-[#737774] text-sm font-medium max-sm:text-xs">
                              Max price: {job?.currency}{" "}
                              {job?.maximumPrice &&
                                numberWithCommas(job.maximumPrice)}
                            </h6>
                          ) : (
                            <h6 className="text-[#737774] text-sm font-medium max-sm:text-xs whitespace-nowrap">
                              Budget: {job?.currency}{" "}
                              {job?.budget && numberWithCommas(job.budget)}
                            </h6>
                          )}
                          <h6 className="text-[#737774] text-sm font-medium max-sm:text-xs">
                            Job duration: {job?.duration?.number}{" "}
                            {job?.duration?.period}{" "}
                          </h6>
                        </div>

                        <p className="text-[#303632] text-sm font-medium max-sm:text-xs py-2">
                          {job?.description
                            ? job?.description?.length < 450
                              ? job?.description
                              : `${job.description?.slice(0, 450)}...`
                            : null}
                        </p>
                        <div className=" flex-c gap-8 flex-wrap max-sm:gap-4 max-sm:justify-between">
                          <h6 className="text-sm font-medium max-sm:text-xs capitalize">
                            Job type: {job?.type && job?.type}
                          </h6>
                          <div className="flex-c justify-end gap-2 max-sm:gap-4 ">
                            {" "}
                            <Image
                              src="/assets/icons/user.svg"
                              alt="menu"
                              width={20}
                              height={20}
                              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                            />
                            <p className="text-[#303632] text-sm font-medium max-sm:text-xs whitespace-nowrap ">
                              {job?.applications
                                ? job?.applications?.length
                                : 0}{" "}
                              Applicants
                            </p>
                          </div>
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
            </div>
            <div className="col-span-1  max-md:hidden">
              {/* search for web  */}
              <form className=" w-full mb-10 max-md:hidden">
                <div className="flex-c px-4 py-2 rounded-lg  border-[#b8b9b8] border-1 focus-within:border-primary-green max-sm:px-2 max-sm:py-1 shadow-sm">
                  <input
                    type="text"
                    placeholder="Search"
                    className="focus:outline-none text-sm  w-full bg-white"
                    value={search}
                    onChange={handleChange}
                    style={{ fontSize: "16px" }}
                  />
                  <button onClick={getAllJobs}>
                    {" "}
                    <CiSearch />
                  </button>
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
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    style={{ fontSize: "16px" }}
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
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                  >
                    <option defaultValue=""> Select</option>
                    {serviceList?.map((service, index) => (
                      <option
                        key={index}
                        value={service}
                        className="capitalize"
                      >
                        {service}
                      </option>
                    ))}
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
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    style={{ fontSize: "16px" }}
                  />
                  <div className="flex justify-center items-center">
                    <button
                      className="text-primary-green text-center text-sm font-semibold py-4"
                      onClick={getAllJobs}
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
