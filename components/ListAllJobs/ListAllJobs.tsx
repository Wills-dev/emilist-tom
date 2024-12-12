"use client";

import Link from "next/link";
import Image from "next/image";

import { HiUser } from "react-icons/hi2";
import { TbShare3 } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";
import Pagination from "react-responsive-pagination";

import ListedHomeJobs from "../Skeleton/ListedHomeJobs";
import ListedHomeExperts from "../Skeleton/ListedHomeExperts";

import { useFetchJobs } from "@/hooks/useFetchJobs";
import { useGetBusinesses } from "@/hooks/useGetBusinesses";
import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";
import { CiSearch } from "react-icons/ci";
import { serviceList } from "@/constants";

const ListAllJobs = () => {
  const { businesses, loading } = useGetBusinesses();
  const {
    isLoading,
    allJobs,
    search,
    handleChange,
    getAllJobs,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterService,
    setFilterService,
  } = useFetchJobs();

  return (
    <section className="padding-y padding-x">
      <div className="grid grid-cols-10 gap-6 pt-28">
        <div className="col-span-2 max-xl:col-span-3 max-md:col-span-10 pt-10">
          <form className="flex lg:flex-col  gap-4">
            <div className=" flex-1 w-full border-1  border-[#b8b9b8] rounded-lg p-2 flex-c gap-2">
              <input
                type="text"
                placeholder="Search for jobs..."
                className="flex-1 w-full max-md:text-sm bg-white"
                value={search}
                onChange={handleChange}
              />
              <button type="submit" className="text-xl" onClick={getAllJobs}>
                {" "}
                <CiSearch />
              </button>
            </div>
            <div className="w-full max-lg:hidden">
              <label htmlFor="reviews" className="font-semibold pt-6 pb-1">
                Filter by category
              </label>
              <select
                name=""
                id="filter"
                className="border-1 border-[#b8b9b8] rounded-lg w-full max-md:text-sm p-2 bg-white"
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
              >
                <option defaultValue=""> Select</option>
                {serviceList?.map((service, index) => (
                  <option key={index} value={service} className="capitalize">
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full border-b-1 border-[#d9d9d9] pb-4 max-lg:hidden">
              <label
                htmlFor="location"
                className="sm:text-lg font-semibold pt-6 pb-1"
              >
                Filter by location
              </label>
              <input
                type="text"
                id="location"
                className="border-1 border-[#b8b9b8] rounded-lg w-full max-sm:text-sm p-2 bg-white"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center max-lg:hidden">
              <button
                type="submit"
                className="text-primary-green text-center max-sm:text-sm font-semibold "
                onClick={getAllJobs}
              >
                APPLY
              </button>
            </div>
          </form>
          <div className="py-10 max-lg:hidden">
            <p className="">
              Meet new customers, Sign up to start growing your business
            </p>
            <div className="flex-c justify-center">
              <button className="custom-btn mt-5">
                <Link href="/register/expert">Get Started</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 max-xl:col-span-7 max-lg:col-span-10 w-full">
          <h2 className="text-3xl font-bold max-md:text-lg pb-2 pl-0 ">
            Explore Jobs
          </h2>
          {isLoading ? (
            <ListedHomeJobs />
          ) : (
            <>
              <div className="w-full flex flex-col border-1">
                {allJobs?.map((job: any) => (
                  <div
                    key={job._id}
                    className="w-full p-4 border-b-1 hover:bg-gray-100 transition-all duration-300"
                  >
                    <Link
                      href={
                        job?.type === "biddable"
                          ? `/dashboard/job/info/biddable/${job._id}`
                          : `/dashboard/job/info/regular/${job._id}`
                      }
                    >
                      <div className="flex-c-b w-full ">
                        <h5 className="sm:text-lg font-semibold">
                          {job?.title && Capitalize(job?.title)}
                        </h5>
                        <div className="flex-c justify-end gap-3 max-sm:gap-2 ">
                          <h6 className="text-sm font-msdium max-sm:text-xs">
                            {job?.createdAt && formatCreatedAt(job.createdAt)}
                          </h6>
                        </div>
                      </div>

                      <div className="flex-c-b pt-5 text-[#737774]">
                        <h6 className=" text-sm font-medium max-sm:text-xs">
                          {job?.type === "biddable" ? "Max price" : "Budget"}:{" "}
                          {job?.currency}{" "}
                          {job?.budget && numberWithCommas(job?.budget)}
                          {job?.maximumPrice &&
                            numberWithCommas(job?.maximumPrice)}
                        </h6>
                        <h6 className="text-sm font-medium max-sm:text-xs">
                          Duration: {job?.duration?.number}{" "}
                          {job?.duration?.period}
                        </h6>
                      </div>
                      {job?.description && job?.description.length > 300 ? (
                        <p className="font-medium text-sm py-2">
                          {job?.description.slice(0, 300)}...
                          <span className="underline text-primary-green">
                            Read more
                          </span>
                        </p>
                      ) : (
                        <p className="font-medium text-sm py-2">
                          {job?.description}
                        </p>
                      )}
                      <p className="flex-c gap-1 whitespace-nowrap text-sm">
                        {" "}
                        <span className="text-lg">
                          <MdLocationOn />
                        </span>
                        {job?.location}
                      </p>
                    </Link>
                    <div className="flex-c gap-8 flex-wrap max-sm:gap-4 max-sm:justify-between text-[#737774]  font-medium text-sm pt-4">
                      <div className="flex-c justify-end gap-1  ">
                        <span className="text-lg">
                          <HiUser />
                        </span>
                        <p className=" whitespace-nowrap ">
                          {job?.applications?.length &&
                            numberWithCommas(job?.applications?.length)}{" "}
                          {job?.applications > 1 ? "Applicants" : "Applicant"}
                        </p>
                      </div>
                      <button className="flex-c gap-1  whitespace-nowrap cursor-pointer hover:text-primary-green transition-all duration-300">
                        <span className="text-xl">
                          <TbShare3 />
                        </span>
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={handlePageChange}
                  extraClassName="justify-content-start"
                />
              )}
            </>
          )}
        </div>
        {businesses?.length && (
          <div className="col-span-3 max-xl:hidden py-10">
            <div className=" border-x-1 border-t-1 pt-4 rounded-lg">
              <h2 className="sm:text-lg font-bold  px-6 ">
                Other services for you
              </h2>
              {loading ? (
                <ListedHomeExperts />
              ) : (
                <div className=" flex flex-col mt-4">
                  {businesses?.slice(0, 5).map((expert: any) => (
                    <div
                      className=" w-full border-b-1 px-6 hover:bg-gray-100 transition-all duration-300 py-4"
                      key={expert?._id}
                    >
                      <Link
                        href="/catalog/expert"
                        className="flex gap-2 w-full "
                      >
                        {Array.isArray(expert?.businessImages) &&
                        expert?.businessImages[0]?.imageUrl ? (
                          <Image
                            src={expert?.businessImages[0]?.imageUrl}
                            alt={expert?.services[0]}
                            width={380}
                            height={276}
                            className="object-cover w-20 h-20 rounded-full shadow"
                          />
                        ) : (
                          <Image
                            src="/assets/images/Logo.svg"
                            alt={expert?.services[0]}
                            width={130}
                            height={30}
                            className="object-contain w-20 h-20 rounded-full shadow"
                          />
                        )}
                        <div className="flex flex-col flex-1">
                          <h2 className=" truncate  text-sm  font-bold ">
                            {expert?.services[0] &&
                              Capitalize(expert?.services[0])}
                          </h2>
                          {expert?.bio && expert?.bio.length > 100 ? (
                            <p className=" text-xs">
                              {expert?.bio.slice(0, 100)}...
                              <span className=" text-primary-green">
                                Read more
                              </span>
                            </p>
                          ) : (
                            <p className="text-xs">{expert?.bio}</p>
                          )}
                        </div>
                      </Link>
                      <div className="flex justify-end gap-6 text-gray-600">
                        <Link
                          href={`/expert/info/${expert?._id}`}
                          className="text-sm font-semibold hover:text-primary-green transition-all duration-300"
                        >
                          View
                        </Link>
                        <Link
                          href="/register/expert"
                          className="text-sm font-semibold hover:text-primary-green transition-all duration-300"
                        >
                          Join
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListAllJobs;
