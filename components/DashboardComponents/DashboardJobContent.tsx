"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect } from "react";

import { CiSearch } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { Popconfirm, PopconfirmProps } from "antd";

import Pagination from "react-responsive-pagination";

import DashboardLinks from "./DashboardLinks";

import { AuthContext } from "@/utils/AuthState";
import { useSaveJob } from "@/hooks/useSaveJob";
import { useUnsaveJob } from "@/hooks/useUnSaveJob";
import { useAddClicks } from "@/hooks/useAddClicks";
import { useBlackListJob } from "@/hooks/useBlackListJob";
import { useFetchJobs } from "@/hooks/useFetchJobs";
import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";
import { getCurrencySign } from "@/helpers/getCurrencySign";
import ReadMore from "../ReadMore/ReadMore";

const DashboardJobContent = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const { addClicks } = useAddClicks();
  const { handleSaveJob, rerender } = useSaveJob();
  const { handleUnsaveJob, unsaveRerenderr } = useUnsaveJob();
  const { handleBlackListJob, rerenderrr } = useBlackListJob();

  const {
    isLoading,
    allJobs,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    getAllJobs,
  } = useFetchJobs();

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  useEffect(() => {
    getAllJobs();
  }, [rerender, unsaveRerenderr, rerenderrr]);

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
            <Link href="/dashboard/job/list-new-job">Post a Job</Link>
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
            <button type="submit" className="text-xl" onClick={getAllJobs}>
              {" "}
              <CiSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleChange}
              className="focus:outline-none max-md:text-14 w-full bg-white"
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>
      </div>
      <>
        {isLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            {allJobs?.length < 1 ? (
              <>
                {search ? (
                  <p className="py-8 text-gray-400 text-sm">
                    No result found, try searching for something else
                  </p>
                ) : (
                  <p className="py-8 text-gray-400 text-sm">No job listed</p>
                )}
              </>
            ) : (
              <>
                {allJobs?.map((job: any, index: number) => (
                  <div
                    className="w-full py-4  border-b-1 border-[#B8B9B8]"
                    key={index}
                  >
                    <div className="w-full pb-5">
                      <h5 className="hover:text-primary-green transition-all sm:text-xl  font-semibold ">
                        <Link
                          href={
                            job?.type === "biddable"
                              ? `/dashboard/job/info/biddable/${job._id}`
                              : `/dashboard/job/info/regular/${job._id}`
                          }
                          onClick={() =>
                            addClicks("job", job._id, userId || null)
                          }
                        >
                          {job?.title && Capitalize(job?.title)}
                        </Link>
                      </h5>
                    </div>
                    <div className="flex-c-b flex-wrap">
                      <h6 className="text-[#737774] text-sm font-medium max-sm:text-xs">
                        {job?.type === "biddable" ? "Max price" : "Budget"}:{" "}
                        {job?.currency && getCurrencySign(job?.currency)}
                        {job?.budget && numberWithCommas(job?.budget)}
                        {job?.maximumPrice &&
                          numberWithCommas(job?.maximumPrice)}
                      </h6>

                      <h6 className="text-[#737774] text-sm  font-medium max-sm:text-sm whitespace-nowrap">
                        Posted:{" "}
                        {job?.createdAt && formatCreatedAt(job.createdAt)}
                      </h6>
                    </div>
                    {
                      <ReadMore
                        text={job?.description || ""}
                        maxLength={300}
                        style="text-sm font-medium max-sm:text-sm py-2"
                      />
                    }
                    <div className="flex-c-b gap-10 max-sm:gap-5 ">
                      <h6 className="text-[#737774] text-sm  font-medium max-sm:text-sm max-sm:hidden">
                        Job duration: {job?.duration?.number}{" "}
                        {job?.duration?.period}
                      </h6>
                      <div className="flex-c justify-end gap-10 max-sm:gap-4 ">
                        {job?.liked ? (
                          <span
                            className="block text-xl text-[#054753] cursor-pointer"
                            onClick={() => handleUnsaveJob(job._id)}
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
                            onClick={() => handleSaveJob(job._id)}
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
                        <Popconfirm
                          placement="leftTop"
                          title="Block job"
                          description="Are you sure you want to block this job?"
                          onConfirm={() => handleBlackListJob(job?._id)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Image
                            src="/assets/icons/flag.svg"
                            alt="menu"
                            width={20}
                            height={20}
                            className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
                          />
                        </Popconfirm>
                      </div>
                    </div>
                    <div className="flex-c ">
                      <span className="block text-xl mr-1">
                        <IoLocationSharp />
                      </span>
                      <p className="flex-c text-[#737774] font-medium max-sm:text-sm py-2 flex-1 truncate">
                        {" "}
                        {job.location && job.location}
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
  );
};

export default DashboardJobContent;
