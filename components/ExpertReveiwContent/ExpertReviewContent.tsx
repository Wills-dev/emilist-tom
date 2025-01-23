"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";

import StarRating from "../StarRating/StarRating";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBusinessReviews } from "@/hooks/useGetBusinessReviews";
import { formatCreatedAt, numberWithCommas } from "@/helpers";
import { getRatingPercentage } from "@/helpers/getRatingPercentage";
import { useMarkBusinessReviewHelpful } from "@/hooks/useMarkBusinessReviewHelpful";

interface ExpertReviewContentProps {
  businessId: string;
}

const ExpertReviewContent = ({ businessId }: ExpertReviewContentProps) => {
  const { markReviewBusinessHelpful } = useMarkBusinessReviewHelpful();
  const {
    data,
    reviews,
    isLoading,
    getReviews,
    totalPages,
    setCurrentPage,
    currentPage,
  } = useGetBusinessReviews();

  const [filter, setFilter] = useState("mostRelevant");

  const handleChange = (value: string) => {
    setFilter(value);
  };

  const loadMoreReviews = (businessId: string, sort: string) => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      getReviews(businessId, sort);
    }
  };

  useEffect(() => {
    getReviews(businessId, filter);
  }, [filter, businessId]);

  return (
    <div className="padding-x pt-28 pb-10">
      {isLoading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[60vh]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="flex-c gap-2">
            <h6 className="sm:text-3xl text-xl font-bold">
              {reviews?.numberOfRatings &&
                numberWithCommas(reviews?.numberOfRatings)}{" "}
              Review{reviews?.numberOfRatings > 1 && "s"}
            </h6>
            <div className="flex-c gap-1">
              <StarRating rating={reviews?.averageRating || 0} />
              <p className="sm:text-sm text-xs text-gray-300">
                (
                {reviews?.numberOfRatings &&
                  numberWithCommas(reviews?.numberOfRatings)}
                )
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-10 py-10">
            <div className="flex-1 flex flex-col gap-5">
              {Array.from({ length: 5 }, (_, index) => {
                const starRating = 5 - index; // Start from 5 and count down to 1
                const percentage = reviews?.starCounts
                  ? getRatingPercentage(reviews?.starCounts, starRating)
                  : "0%";
                const count = reviews?.starCounts?.[starRating] || 0;

                return (
                  <div key={starRating} className="flex-c gap-4">
                    <p className="text-[#054753] font-semibold max-sm:text-sm">
                      {starRating} Stars
                    </p>
                    <div className="h-[16px] sm:min-w-[480px] sm:w-[480px] min-w-[260px] w-[260px] rounded-full bg-slate-300">
                      <div
                        className="h-full bg-[#ff9933] rounded-full"
                        style={{ width: percentage }}
                      ></div>
                    </div>
                    <p className="text-[#054753] max-sm:text-sm">({count})</p>
                  </div>
                );
              })}
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <p className="sm:text-xl font-semibold">Rating Breakdown</p>
              <div className="flex-c gap-10">
                <p className="max-sm:text-sm">Seller communication level</p>
                <div className="flex-c gap-2">
                  <p className="max-sm:text-sm text-[#ff9933]">
                    {reviews?.averageCommunicationRating}
                  </p>
                  <span className="text-xl">
                    {" "}
                    <FaStar className="text-[#ff9933]" />
                  </span>
                </div>
              </div>
              <div className="flex-c gap-10">
                <p className="max-sm:text-sm">Service as described</p>
                <div className="flex-c gap-2">
                  <p className="max-sm:text-sm text-[#ff9933]">
                    {" "}
                    {reviews?.serviceAsSeen}
                  </p>
                  <span className="text-xl">
                    {" "}
                    <FaStar className="text-[#ff9933]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-c gap-4 text-gray-600 border-b-1 border-gray-400 py-6">
            <div className="flex-c gap-2">
              <Image
                height={6}
                width={6}
                alt="filter"
                src="/assets/icons/filter.svg"
                className="w-6 h-6 object-contain"
              />
              <p className="">Filter</p>
            </div>
            <Select value={filter} onValueChange={handleChange}>
              <SelectTrigger className="w-[180px] border-gray-400 border-1 shadow">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="mostRecent">Most recent</SelectItem>
                  <SelectItem value="mostRelevant">Most relevant</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col pt-10 gap-10 max-w-[820px] w-full">
            {data?.map((review: any, index: number) => (
              <div className="p-4 bg-white flex gap-4 w-full" key={index}>
                {review?.userId?.profileImage ? (
                  <Image
                    width={20}
                    height={20}
                    src={review?.userId?.profileImage}
                    alt="profile pic"
                    className="sm:w-20 w-16 sm:h-20 h-16 object-cover  rounded-full"
                  />
                ) : (
                  <p className="sm:w-20 w-16 sm:h-20 h-16 rounded-full bg-slate-200 flex-c justify-center font-bold">
                    {review?.userId?.userName?.[0]?.toUpperCase()}
                  </p>
                )}
                <div className="flex flex-col gap-6">
                  <div className="flex-c gap-4 flex-wrap">
                    <h3 className="sm:text-lg font-semibold">
                      {" "}
                      {review?.userId?.fullName
                        ? review?.userId?.fullName
                        : review?.userId?.userName}
                    </h3>
                    <div className="flex items-center">
                      <StarRating rating={review?.rating} />
                      {/* <span className="ml-2 text-sm font-semibold text-[#ff9933]">
                    50
                  </span> */}
                    </div>
                  </div>
                  <p className="text-gray-500 mt-2 max-sm:text-sm">
                    {review?.comment}
                  </p>
                  <p className="text-gray-400 max-sm:text-sm">
                    Published{" "}
                    {review?.createdAt && formatCreatedAt(review?.createdAt)}
                  </p>
                  <div className="flex-c gap-12">
                    <button
                      className="sm:text-lg font-medium flex-c"
                      onClick={() =>
                        markReviewBusinessHelpful(review?._id, true)
                      }
                    >
                      <Image
                        src="/assets/icons/like.svg"
                        width={8}
                        height={8}
                        alt="like"
                        className="object-contain sm:w-8 sm:h-8 w-6 h-6 pr-2"
                      />
                      Helpful
                    </button>
                    <button
                      className="sm:text-lg font-medium flex-c"
                      onClick={() =>
                        markReviewBusinessHelpful(review?._id, false)
                      }
                    >
                      <Image
                        src="/assets/icons/dislike.svg"
                        width={8}
                        height={8}
                        alt="dislike"
                        className="object-contain sm:w-8 sm:h-8 w-6 h-6 pr-2"
                      />
                      Not Helpful
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              {totalPages > 1 && (
                <button
                  className="text-primary-green flex-c gap-2 font-medium"
                  onClick={() => loadMoreReviews(businessId, filter)}
                >
                  <Image
                    src="/assets/icons/add.svg"
                    width={8}
                    height={8}
                    alt="add"
                    className="w-6 h-6 object-contain"
                  />
                  Load more
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpertReviewContent;
