"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

import { Popconfirm, PopconfirmProps } from "antd";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Pagination from "react-responsive-pagination";

import { useSaveJob } from "@/hooks/useSaveJob";
import { useUnsaveJob } from "@/hooks/useUnSaveJob";
import { useFetchJobs } from "@/hooks/useFetchJobs";
import { useBlackListJob } from "@/hooks/useBlackListJob";
import { useGetUserSavedJobs } from "@/hooks/useGetUserSavedJobs";
import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";

import JobDashboardLayout from "@/components/JobComponent/JobDashboardLayout";

const Lead = () => {
  const { handleSaveJob, rerender } = useSaveJob();
  const { handleUnsaveJob, unsaveRerenderr } = useUnsaveJob();
  const { handleBlackListJob, rerenderrr } = useBlackListJob();
  const { saveLoading, allUserSavedJobs, getAllUserSavedJobs } =
    useGetUserSavedJobs();

  const {
    isLoading,
    allJobs,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    getAllJobs,
    search,
  } = useFetchJobs();

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  useEffect(() => {
    getAllJobs();
    getAllUserSavedJobs();
  }, [rerender, unsaveRerenderr, rerenderrr]);

  return (
    <JobDashboardLayout>
      <div className="grid  grid-cols-10">
        <div className="col-span-7 max-lg:col-span-10 w-full max-sm:px-3">
          <>
            {isLoading || saveLoading ? (
              <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
                <span className="loading loading-bars loading-lg"></span>
              </div>
            ) : (
              <>
                {allJobs?.length < 1 ? (
                  <p className="py-2">No job listed</p>
                ) : (
                  <>
                    {allJobs?.length < 1 && search ? (
                      <p className="py-2">
                        No result found, try searching for something else
                      </p>
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
                                >
                                  {job?.title && Capitalize(job?.title)}
                                </Link>
                              </h5>
                            </div>
                            <div className="flex-c-b flex-wrap">
                              <h6 className="text-[#737774] text-sm font-medium max-sm:text-xs">
                                {job?.type === "biddable"
                                  ? "Max price"
                                  : "Budget"}
                                : {job?.currency}{" "}
                                {job?.budget && numberWithCommas(job?.budget)}
                                {job?.maximumPrice &&
                                  numberWithCommas(job?.maximumPrice)}
                              </h6>

                              <h6 className="text-[#737774] text-sm  font-medium max-sm:text-sm whitespace-nowrap">
                                Date Posted:{" "}
                                {job?.createdAt &&
                                  formatCreatedAt(job.createdAt)}
                              </h6>
                            </div>
                            {job?.description &&
                            job?.description.length > 300 ? (
                              <p className="text-sm font-medium max-sm:text-sm py-2">
                                {job?.Description.slice(0, 300)}...
                                <Link
                                  href={
                                    job?.type === "biddable"
                                      ? `/job/info/biddable/${job._id}`
                                      : `/job/info/regular/${job._id}`
                                  }
                                  className="underline text-primary-green text-xs"
                                >
                                  Read more
                                </Link>
                              </p>
                            ) : (
                              <p className="text-sm font-medium max-sm:text-sm py-2">
                                {job?.description}
                              </p>
                            )}
                            <div className="flex-c gap-10 max-sm:gap-5 ">
                              <h6 className="text-[#737774] text-sm  font-medium max-sm:text-sm max-sm:hidden">
                                Job duration: {job?.duration?.number}{" "}
                                {job?.duration?.period}
                              </h6>
                            </div>
                            <div className="flex-c-b gap-8">
                              <div className="flex-c justify-end gap-10 max-sm:gap-4 ">
                                {job?.liked ? (
                                  <span
                                    className="block text-xl text-pink-500 cursor-pointer"
                                    onClick={() => handleUnsaveJob(job._id)}
                                  >
                                    <FaHeart />
                                  </span>
                                ) : (
                                  <span
                                    className="block text-xl cursor-pointer"
                                    onClick={() => handleSaveJob(job._id)}
                                  >
                                    <FaRegHeart />
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
          </>
        </div>
      </div>
    </JobDashboardLayout>
  );
};

export default Lead;
