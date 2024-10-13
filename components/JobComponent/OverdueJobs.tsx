"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";

import Pagination from "react-responsive-pagination";

import { AuthContext } from "@/utils/AuthState";
import { useGetJobByStatus } from "@/hooks/useGetJobByStatus";
import { countCompleteMilestones, formatOverDueDate } from "@/helpers";

const OverdueJobs = () => {
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
      getAllJobsByStatus(currentUser.unique_id, "overdue");
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
            <div className="text-gray-500">
              <h6 className="sm:text-xl"> You do not have any overdue job</h6>
              <p className="max-sm:text-sm">Keep track of overdue jobs here.</p>
            </div>
          ) : (
            <>
              {allJobsData?.map((job: any, index: number) => (
                <Link
                  key={index}
                  href={
                    job?.jobType === "biddable"
                      ? `/dashboard/job/info/biddable/${job._id}`
                      : job?.jobType === "regular"
                      ? `/dashboard/job/info/regular/${job._id} `
                      : `/dashboard/job/info/direct/${job._id}`
                  }
                  className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b max-md:flex-col gap-4 max-md:justify-start max-md:items-start"
                >
                  <div className="flex ">
                    <h6 className="sm:text-xl font-semibold">
                      {job?.jobTitle && job?.jobTitle}
                    </h6>
                  </div>
                  <div className="rounded-xl flex-c justify-end gap-8 max-sm:gap-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
                        Milestone
                      </p>
                      <h6 className="font-bold  max-sm:text-sm  whitespace-nowrap">
                        {job?.milestoneDetails &&
                          countCompleteMilestones(job?.milestoneDetails)}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
                        Due date
                      </p>
                      <div className=" flex items-center justify-center bg-[#FFF1F2] w-[85px] h-[30px] max-sm:h-[25px] max-sm:w-[70px] rounded-[20px] ">
                        <p className="text-[#FF5D7A]  sm:text-[14px] font-medium text-xs whitespace-nowrap">
                          {job?.dueDate && formatOverDueDate(job?.dueDate)}
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

export default OverdueJobs;
