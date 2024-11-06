"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";

import Pagination from "react-responsive-pagination";

import { AuthContext } from "@/utils/AuthState";
import { useGetProjectByStatus } from "@/hooks/useGetProjectByStatus useGetProjectByStatus";
import { formatOverDueDate } from "@/helpers";

const OverdueProjects = () => {
  const { currentUser } = useContext(AuthContext);

  const {
    isLoading,
    allProjects,
    search,
    handleChange,
    getAllProjectsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
  } = useGetProjectByStatus();

  useEffect(() => {
    if (currentUser) {
      getAllProjectsByStatus("overdue");
    }
  }, [currentUser]);
  return (
    <>
      {isLoading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[40vh] w-full">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 mt-10">
          {allProjects?.length < 1 ? (
            <div className="text-gray-500">
              <h6 className="sm:text-xl">
                {" "}
                You do not have any overdue project
              </h6>
              <p className="max-sm:text-sm">
                Keep track of overdue projects here.
              </p>
            </div>
          ) : (
            <>
              {allProjects?.map((project: any, index: number) => (
                <Link
                  key={index}
                  href={
                    project?.type === "biddable"
                      ? `/dashboard/project/info/biddable/${project._id}`
                      : project?.type === "regular"
                      ? `/dashboard/project/info/regular/${project._id} `
                      : `/dashboard/project/info/direct/${project._id}`
                  }
                  className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b max-md:flex-col gap-4 max-md:justify-start max-md:items-start"
                >
                  <div className="flex ">
                    <h6 className="sm:text-xl font-semibold">
                      {project?.title && project?.title}
                    </h6>
                  </div>
                  <div className="rounded-xl flex-c justify-end gap-8 max-sm:gap-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
                        Milestone
                      </p>
                      <h6 className="font-bold  max-sm:text-sm  whitespace-nowrap">
                        {project?.milestoneProgress &&
                          project?.milestoneProgress}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
                        Due date
                      </p>
                      <div className=" flex items-center justify-center bg-[#FFF1F2] w-[85px] h-[30px] max-sm:h-[25px] max-sm:w-[70px] rounded-[20px] ">
                        <p className="text-[#FF5D7A]  sm:text-[14px] font-medium text-xs whitespace-nowrap">
                          {project?.dueDate &&
                            formatOverDueDate(project?.dueDate)}
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

export default OverdueProjects;
