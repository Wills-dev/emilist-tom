"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";

import Pagination from "react-responsive-pagination";

import { AuthContext } from "@/utils/AuthState";
import { useGetJobByStatus } from "@/hooks/useGetJobByStatus";

const NewJobs = () => {
  const { currentUser, userLoading } = useContext(AuthContext);
  const {
    isLoading,
    allJobs,
    allJobsData,
    search,
    handleChange,
    getAllJobsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
  } = useGetJobByStatus();

  useEffect(() => {
    if (currentUser) {
      getAllJobsByStatus(currentUser.unique_id, "pending");
    }
  }, [currentUser]);

  return (
    <>
      {isLoading || userLoading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[40vh] w-full">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 mt-10">
          {allJobs.length < 1 ? (
            <div className="">
              <h6 className="sm:text-xl"> No pending or amended job</h6>
              <p className="max-sm:text-sm">
                Keep track of all pending and amended jobs here.
              </p>
              <p className="max-sm:text-sm">
                Want to create a new job?{" "}
                <Link
                  href="/dashboard/job/list-new-job"
                  className="text-primary-green"
                >
                  Click here
                </Link>{" "}
              </p>
            </div>
          ) : (
            <>
              {allJobsData?.map((job: any, index: string) => (
                <Link
                  key={index}
                  href={
                    job?.jobType === "biddable"
                      ? `/dashboard/job/info/biddable/${job._id}`
                      : job?.jobType === "regular"
                      ? `/dashboard/job/info/regular/${job._id} `
                      : `/dashboard/job/info/direct/${job._id}`
                  }
                  className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b hover:border-primary-green transition-all duration-300"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-[#737774]  font-medium max-sm:text-sm">
                      Statement of work{" "}
                    </p>
                    <h6 className="sm:text-xl font-semibold">
                      {job?.jobTitle && job?.jobTitle}
                    </h6>
                  </div>
                  <div
                    className={` rounded-xl flex-c justify-center h-[34px] max-sm:h-[30px] px-3 ${
                      job?.jobStatus === "pending"
                        ? "bg-[#ECECEC]"
                        : "bg-[#FFF6E5]"
                    }`}
                  >
                    <p
                      className={`  font-semibold max-sm:text-sm whitespace-nowrap ${
                        job?.jobStatus === "pending"
                          ? "text-[#303632]"
                          : "text-[#FF9933]"
                      }`}
                    >
                      {job?.jobStatus && job?.jobStatus}
                    </p>
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
      )}{" "}
    </>
  );
};

export default NewJobs;
