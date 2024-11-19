"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";

import Pagination from "react-responsive-pagination";

import { AuthContext } from "@/utils/AuthState";
import { useGetProjectByStatus } from "@/hooks/useGetProjectByStatus useGetProjectByStatus";

const NewProjects = () => {
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
      getAllProjectsByStatus("pending");
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
          {allProjects.length < 1 ? (
            <div className="text-gray-500">
              <h6 className="text-xl text-[#282828]">
                {" "}
                You do not have any new project at the moment
              </h6>
              <p>Keep track of new projects here.</p>
            </div>
          ) : (
            <>
              {allProjects.map((project: any, index: number) => (
                <Link
                  key={index}
                  href={
                    project?.type === "biddable"
                      ? `/dashboard/job/info/biddable/${project?._id}`
                      : project?.type === "regular"
                      ? `/dashboard/job/info/regular/${project?._id}`
                      : `/dashboard/job/info/direct/${project?._id}`
                  }
                  className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex justify-between items-center"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-[#737774] font-medium max-sm:text-xs">
                      {project?.type === "direct"
                        ? "Open this direct job to accept or decline."
                        : "Statement of work"}
                    </p>
                    <h6 className="sm:text-lg font-semibold">
                      {project?.title && project?.title}
                    </h6>
                  </div>

                  <div className="bg-[#ECECEC] rounded-[20px] flex justify-center items-center w-[125px] h-[34px] max-sm:h-[30px] max-sm:w-[101px]">
                    <p className="text-[#303632] font-[600] max-sm:text-xs whitespace-nowrap">
                      Pending
                    </p>
                  </div>
                </Link>
              ))}
              <div className="col-span-2 w-full min-w-full max-md:col-span-3">
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

export default NewProjects;
