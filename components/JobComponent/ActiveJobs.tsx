"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";

import Pagination from "react-responsive-pagination";

import { AuthContext } from "@/utils/AuthState";
import { useGetJobByStatus } from "@/hooks/useGetJobByStatus";
import {
  countCompleteMilestones,
  formatDueDate,
  formatStartDate,
} from "@/helpers";

const ActiveJobs = () => {
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
      getAllJobsByStatus(currentUser.unique_id, "active");
    }
  }, [currentUser]);

  return (
    <>
      {isLoading || userLoading ? (
        <div className="flex-c justify-center text-green-500 mt-6 h-[40vh] w-full">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 mt-10">
          {allJobs.length < 1 ? (
            <div className="">
              <h6 className="sm:text-xl"> No active job</h6>
              <p className="max-sm:text-xs">
                Keep track of all active jobs here.
              </p>
              <p>
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
              {allJobsData?.map((job: any, index: number) => (
                <Link
                  key={index}
                  href={
                    job?.jobType === "biddable"
                      ? `/dashboard/job/active/info/biddable/${job._id}`
                      : job?.jobType === "regular"
                      ? `/dashboard/job/active/info/regular/${job._id}`
                      : `/dashboard/job/active/info/direct/${job._id}`
                  }
                  className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b hover:border-primary-green transition-all duration-300"
                >
                  <div className="flex ">
                    <h6 className="sm:text-xl font-semibold">
                      {job?.jobTitle && job?.jobTitle}
                    </h6>
                  </div>
                  <div className="rounded-xl flex-c justify-end gap-8 max-sm:gap-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F] sm:text-sm font-medium text-xs whitespace-nowrap">
                        Milestone
                      </p>
                      <h6 className="font-bold max-sm:text-sm whitespace-nowrap">
                        {job?.milestoneDetails &&
                          countCompleteMilestones(job?.milestoneDetails)}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
                        Start Date
                      </p>
                      <h6 className="font-bold  max-sm:text-sm whitespace-nowrap">
                        {job?.startDate && formatStartDate(job?.startDate)}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
                        Due date
                      </p>
                      <div className=" flex-c justify-center bg-[#F0FDF5] h-[30px] max-sm:h-[25px]  rounded-[20px]">
                        <p className="text-[#25C269]  sm:text-sm font-medium text-xs whitespace-nowrap px-4">
                          {job?.dueDate && formatDueDate(job?.dueDate)}
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
      )}
    </>
  );
};

export default ActiveJobs;
