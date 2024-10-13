"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import Pagination from "react-responsive-pagination";

import ShareLink from "@/components/modals/ShareLink";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";

import { useGetAllJobByAUser } from "@/hooks/useGetAllJobByAUser";
import { formatCreatedAt, numberWithCommas } from "@/helpers";
import { CiSearch } from "react-icons/ci";

const MyListedJobs = () => {
  const [link, setLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    allUserJobs,
    loading,
    allUserJobsData,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterName,
    filterService,
    setFilterName,
    setFilterService,
    handleFilterJob,
    loadFilter,
  } = useGetAllJobByAUser();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpen = (url: string) => {
    setIsModalOpen(true);
    setLink(url);
  };

  return (
    <main className="relative">
      <DashboardNav />
      <section className="padding-x py-28">
        {loadFilter ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-60 bg-white z-50"></div>
        ) : null}
        <h1 className=" text-3xl font-bold  max-sm:text-xl  my-4">
          My Listed Jobs
        </h1>
        {loading ? (
          <div className="flex-c justify-center text-green-500 mt-6 h-[60vh] w-full">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-2 max-md:col-span-3 flex flex-col w-full gap-6">
              {/* search for mobile  */}
              <form className="flex-1 max-w-[300px] flex-c-b mt-5 md:hidden">
                <div className="flex-1 flex items-center px-4 py-3 rounded-lg border-[#737774] border-1 focus-within:border-primary-green max-sm:px-1 max-sm:py-2 shadow-md">
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
                    className="focus:outline-none bg-white max-md:text-xs w-full"
                    value={search}
                    onChange={handleChange}
                  />
                </div>
              </form>

              <>
                {allUserJobs.length < 1 ? (
                  <p className="">
                    You haven't listed any job yet. Click{" "}
                    <Link
                      href="/dashboard/job/list-new-job"
                      className="text-green-500 font-bold"
                    >
                      here{" "}
                    </Link>{" "}
                    to list a Job
                  </p>
                ) : (
                  <>
                    {" "}
                    {allUserJobs?.length > 0 && allUserJobsData.length < 1 ? (
                      <p className="">
                        No job matched your search, Trying search for something
                        else
                      </p>
                    ) : (
                      <>
                        {allUserJobsData?.map((job: any, index: number) => (
                          <div
                            className="w-full p-4  shadow-md rounded-xl"
                            key={index}
                          >
                            <ShareLink
                              handleCancel={handleCancel}
                              isModalOpen={isModalOpen}
                              link={link}
                              title="Share job"
                              textToCopy={
                                job?.jobType === "biddable"
                                  ? `https://emilist.com/dashboard/job/info/biddable/${job._id}`
                                  : job?.jobType === "regular"
                                  ? `https://emilist.com/dashboard/job/info/regular/${job._id}`
                                  : `https://emilist.com/dashboard/job/info/direct/${job._id}`
                              }
                            />
                            <Link
                              href={
                                job?.jobType === "biddable"
                                  ? `/dashboard/job/info/biddable/${job._id}`
                                  : job?.jobType === "regular"
                                  ? `/dashboard/job/info/regular/${job._id}`
                                  : `/dashboard/job/info/direct/${job._id}`
                              }
                              className="w-full"
                            >
                              <div className="flex-c-b w-full pb-5">
                                <h5 className="sm:text-2xl font-semibold truncate">
                                  {job?.jobTitle
                                    ? job?.jobTitle
                                    : job?.projectTitle
                                    ? job?.projectTitle
                                    : null}
                                </h5>
                                <div className="flex-c justify-end gap-3 max-sm:gap-2 ">
                                  <h6 className="text-sm font-medium max-sm:text-xs">
                                    Posted:{" "}
                                    {job?.createdAt &&
                                      formatCreatedAt(job.createdAt)}
                                  </h6>
                                </div>
                              </div>
                              <div className="flex-c-b">
                                {job?.jobType === "biddable" ? (
                                  <h6 className="text-[#737774] text-sm font-medium max-sm:text-xs">
                                    Max price: ₦
                                    {job?.maxPrice
                                      ? numberWithCommas(job.maxPrice)
                                      : job.amount
                                      ? numberWithCommas(job.amount)
                                      : numberWithCommas(job?.budget)}
                                  </h6>
                                ) : (
                                  <h6 className="text-[#737774] text-sm font-medium max-sm:text-xs whitespace-nowrap">
                                    Budget: ₦
                                    {job?.amount
                                      ? numberWithCommas(job.amount)
                                      : job.budget}
                                  </h6>
                                )}
                                <h6 className="text-[#737774] text-sm font-medium max-sm:text-xs">
                                  Job duration:{" "}
                                  {job?.projectDuration && job?.projectDuration}{" "}
                                  {job?.durationType && job?.durationType}
                                </h6>
                              </div>

                              <p className="text-[#303632] text-sm font-medium max-sm:text-xs py-2">
                                {job?.Description
                                  ? job?.Description.length < 450
                                    ? job?.Description
                                    : `${job?.Description?.slice(0, 450)}...`
                                  : job?.description
                                  ? job?.description?.length < 450
                                    ? job?.description
                                    : `${job.description?.slice(0, 450)}...`
                                  : null}
                              </p>
                            </Link>

                            <div className=" flex-c gap-8 flex-wrap max-sm:gap-4 max-sm:justify-between">
                              <p className="flex-c text-[#737774] font-medium max-sm:text-xs py-2 whitespace-nowrap ">
                                {" "}
                                <Image
                                  src="/assets/icons/location.svg"
                                  alt="location"
                                  width={20}
                                  height={20}
                                  className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-2"
                                />
                                {job?.location && job?.location}
                              </p>
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
                                  {job?.applicants?.length
                                    ? job?.applicants?.length
                                    : job.applicants
                                    ? job.applicants
                                    : 0}{" "}
                                  Applicants
                                </p>
                              </div>
                              <p
                                className="flex-c text-[#737774] font-medium max-sm:text-sm py-2 whitespace-nowrap cursor-pointer w-fit"
                                onClick={() => handleOpen("fhhfhffhhfhfh")}
                              >
                                {" "}
                                <Image
                                  src="/assets/icons/share.svg"
                                  alt="location"
                                  width={20}
                                  height={20}
                                  className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-2"
                                />
                                Share
                              </p>
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
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
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
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                  />
                  <div className="flex justify-center items-center">
                    <button
                      className="text-primary-green text-center text-sm font-semibold py-4"
                      onClick={handleFilterJob}
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

export default MyListedJobs;
