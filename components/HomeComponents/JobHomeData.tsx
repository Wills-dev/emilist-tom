"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { AuthContext } from "@/utils/AuthState";
import { useAddClicks } from "@/hooks/useAddClicks";
import { useFetchJobs } from "@/hooks/useFetchJobs";
import { Capitalize, numberWithCommas } from "@/helpers";
import JobSkeleton from "../Skeleton/JobSkeleton";

const JobHomeData = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const { addClicks } = useAddClicks();
  const { isLoading, handleHorizontalScroll, data, containerRef, hasMore } =
    useFetchJobs();

  return (
    <div
      ref={containerRef}
      onScroll={handleHorizontalScroll}
      className="flex w-full overflow-x-scroll gap-4 sm:mt-6 py-4 hide-scrollbar"
    >
      {data?.map((job: any, i: number) => (
        <Link
          href={
            job?.type === "biddable"
              ? `/dashboard/job/info/biddable/${job._id}`
              : `/dashboard/job/info/regular/${job._id}`
          }
          className=" w-80 min-w-80 py-8 sm:px-6 px-3 border-1 flex flex-col hover:border-primary-green hover:bg-gray-00 transition-all duration-300 group"
          onClick={() => addClicks("job", job._id, userId || null)}
        >
          <h6 className="font-bold truncate text-lg group-hover:text-primary-green transition-all duration-300">
            {" "}
            {job?.title && Capitalize(job?.title)}
          </h6>
          <p className="truncate"> {job?.description}</p>

          <p className="w-full flex-c text-center text-sm max-md:text-xs pt-4">
            <span className="text-gray-500">
              {job?.type === "regular" ? "Budget" : "Max price"}:
            </span>{" "}
            <span className="ml-2 font-semibold">
              {job?.currency}{" "}
              {job?.budget
                ? numberWithCommas(job?.budget)
                : job?.maximumPrice
                ? numberWithCommas(job?.maximumPrice)
                : null}{" "}
            </span>
          </p>
        </Link>
      ))}
      {isLoading && <JobSkeleton />}
      {!hasMore && data?.length > 10 && (
        <div className=" flex items-center justify-center pr-5">
          <p className="text-gray-500 text-center whitespace-nowrap">
            {" "}
            No more jobs
          </p>
        </div>
      )}
    </div>
  );
};

export default JobHomeData;
