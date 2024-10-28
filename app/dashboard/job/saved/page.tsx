"use client";

import Image from "next/image";
import Link from "next/link";

import Pagination from "react-responsive-pagination";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";

import { formatCreatedAt, numberWithCommas } from "@/helpers";
import { useGetUserSavedJobs } from "@/hooks/useGetUserSavedJobs";
import { IoLocationSharp } from "react-icons/io5";

const Page = () => {
  const {
    saveLoading,
    allUserSavedJobs,
    handlePageChange,
    currentPage,
    totalPages,
  } = useGetUserSavedJobs();

  return (
    <main className="relative min-h-screen">
      <DashboardNav />
      <section className="padding-x py-28">
        <h1 className=" text-3xl font-[700] leading-[36px] max-sm:text-xl max-sm:leading-[30px] my-4 text-[#282828]">
          Saved Jobs
        </h1>
        {saveLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 w-full">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-3">
            <div className="col-span-2 max-md:col-span-3 flex flex-col w-full gap-6">
              {allUserSavedJobs?.length > 0 ? (
                <>
                  {allUserSavedJobs?.map((data: any, index: number) => (
                    <Link
                      href={
                        data?.type === "biddable"
                          ? `/dashboard/job/info/biddable/${data._id}`
                          : `/dashboard/job/info/regular/${data._id}`
                      }
                      key={index}
                    >
                      <div className="w-full p-4 shadow-md rounded-[20px] group">
                        {/* Render job details here using 'data' */}

                        <div className="flex justify-between items-center w-full pb-5">
                          <h5 className="text-[#000000] text-[20px] leading-[24px] font-[600] max-sm:text-[16px] group-hover:text-primary-green transition-all">
                            {data?.title}
                          </h5>
                        </div>
                        <h6 className="text-[#737774] text-[14px] leading-[20px] font-[500] max-sm:text-[12px]">
                          {data?.type === "biddable" ? "Max price" : "Budget"}:{" "}
                          {data?.currency}{" "}
                          {data?.budget && numberWithCommas(data?.budget)}
                          {data?.maximumPrice &&
                            numberWithCommas(data?.maximumPrice)}
                          {" - "} Date posted:{" "}
                          {data?.createdAt && formatCreatedAt(data?.createdAt)}
                        </h6>
                        <p className="text-[#303632] text-[14px] leading-[20px] font-[500] max-sm:text-[12px] py-2">
                          {data?.description
                            ? data?.description.length < 450
                              ? data?.description
                              : `${data?.description?.slice(0, 450)}...`
                            : null}
                        </p>
                        <div className="flex-c-b">
                          <div className="">
                            {" "}
                            Est Time: {data?.duration?.number}{" "}
                            {data?.duration?.period}
                          </div>
                          <div className="flex justify-end items-center gap-2 max-sm:gap-4 ">
                            {" "}
                            <Image
                              src="/assets/icons/user.svg"
                              alt="menu"
                              width={20}
                              height={20}
                              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                            />
                            <p className="text-[#303632] text-[14px] leading-[20px] font-[500] max-sm:text-[12px] ">
                              {data?.applicants && data.applicants.length}{" "}
                              Applicants
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="flex items-center text-[#737774] text-[16px] leading-[20px] font-[500] max-sm:text-[13px] py-2">
                            {" "}
                            <span className="block text-xl mr-1">
                              <IoLocationSharp />
                            </span>
                            {data.location}
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
              ) : (
                <p>No Liked Jobs for now</p>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Page;
