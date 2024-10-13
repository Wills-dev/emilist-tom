"use client";

import { useContext, useEffect } from "react";

import { AuthContext } from "@/utils/AuthState";
import { useGetProjectByStatus } from "@/hooks/useGetProjectByStatus useGetProjectByStatus";
import {
  countCompleteMilestones,
  formatDueDate,
  formatStartDate,
} from "@/helpers";
import Link from "next/link";

const ActiveProjects = () => {
  const { currentUser, userLoading } = useContext(AuthContext);

  const {
    isLoading,
    allProjects,
    allProjectsData,
    search,
    handleChange,
    getAllProjectsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
  } = useGetProjectByStatus();

  useEffect(() => {
    if (currentUser) {
      getAllProjectsByStatus(currentUser.unique_id, "active");
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
          {allProjects.length < 1 ? (
            <div className="text-gray-500">
              <h6 className="text-xl text-[#282828]">
                {" "}
                You do not have any project at the moment
              </h6>
              <p>Keep track of all active project here.</p>
            </div>
          ) : (
            <>
              {allProjectsData?.map((project: any, index: number) => (
                <Link
                  key={index}
                  href={
                    project?.jobType === "biddable"
                      ? `/dashboard/project/info/biddable/${project?.jobId}`
                      : `/dashboard/project/info/regular/${project?.jobId}`
                  }
                  className="col-span-2 w-full min-w-full max-md:col-span-3 border-[1px] border-[#D0CFCF] rounded-[10px] p-6 max-sm:px-3 flex justify-between items-center max-md:flex-col gap-4 max-md:justify-start max-md:items-start"
                >
                  <div className="flex ">
                    <h6 className="text-[#030A05]  text-[20px] font-[600] leading-[28px] max-sm:text-[16px] max-sm:leading-[20px]">
                      {project?.jobTitle && project?.jobTitle}
                    </h6>
                  </div>
                  <div className="rounded-[20px] flex justify-end items-center gap-8 max-sm:gap-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                        Milestone
                      </p>
                      <h6 className="text-[#303632]  text-[16px] font-[700] leading-[24px] max-sm:text-[13px]  whitespace-nowrap">
                        {project?.milestoneDetails &&
                          countCompleteMilestones(project?.milestoneDetails)}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                        Start Date
                      </p>
                      <h6 className="text-[#303632]  text-[16px] font-[700] leading-[24px] max-sm:text-[13px]  whitespace-nowrap">
                        {project?.startDate &&
                          formatStartDate(project?.startDate)}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                        Due date
                      </p>
                      <div className=" flex items-center justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-[20px]">
                        <p className="text-[#25C269]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                          {project?.dueDate && formatDueDate(project?.dueDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ActiveProjects;
