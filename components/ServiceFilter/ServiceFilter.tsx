import Image from "next/image";
import React, { useRef } from "react";

import StarRating from "../StarRating/StarRating";

import { noticePeriod, selectList, serviceRating } from "@/constants";

interface expertTypee {
  value: string;
  title: string;
}

interface ServiceFilterProps {
  minValue: number;
  setMinValue: (minValue: number) => void;
  maxValue: number;
  setMaxValue: (maxValue: number) => void;
  expertType: string;
  setExpertType: (expert: string) => void;
  handleMinChange: any;
  handleMaxChange: any;
  rating: string;
  setRating: (rating: string) => void;
  noOfReviews: string | undefined;
  setNoOfReviews: (reviews: string) => void;
  location: string;
  setLocation: (location: string) => void;
  noticePeriodd: number | undefined;
  setNoticePeriod: (period: number) => void;
  fetchBusinesses: () => Promise<void>;
}

const ServiceFilter = ({
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  expertType,
  setExpertType,
  handleMinChange,
  handleMaxChange,
  rating,
  setRating,
  noOfReviews,
  setNoOfReviews,
  location,
  setLocation,
  noticePeriodd,
  setNoticePeriod,
  fetchBusinesses,
}: ServiceFilterProps) => {
  const progressRef = useRef(null);

  const minAllowed = 0;
  const maxAllowed = 10000000;

  const getTrackBackgroundStyle = () => {
    const minPercentage =
      ((minValue - minAllowed) / (maxAllowed - minAllowed)) * 100;
    const maxPercentage =
      ((maxValue - minAllowed) / (maxAllowed - minAllowed)) * 100;

    return {
      background: `linear-gradient(
          to right,
          #d3d3d3 ${minPercentage}%,
          #22c55e ${minPercentage}%,
          #22c55e ${maxPercentage}%,
          #d3d3d3 ${maxPercentage}%
        )`,
    };
  };

  return (
    <div className="col-span-3 border-r-1">
      <h4 className="sm:text-2xl font-semibold pb-1 border-b-1 w-full">
        Filter
      </h4>
      <div className="">
        {/* <div className="py-6 pr-6 border-b-1">
          <h2 className="font-bold text-lg mb-4">Starting Price</h2>
          <div className="relative w-full range-input">
       

            <input
              type="range"
              name=""
              id=""
              value={minValue}
              onChange={handleMinChange}
              className="range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
            />

            <input
              type="range"
              name=""
              id=""
              value={maxValue}
              onChange={handleMaxChange}
              className="range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
            />
          </div>
   
          <div className="flex justify-between mt-4">
            <div>
              <label htmlFor="min" className="block text-gray-500">
                Min
              </label>
              <input
                id="min"
                type="number"
                className="border bg-white border-gray-300 rounded p-2 w-20 outline-none focus:border-primary-green"
                value={minValue}
                onChange={(e) => handleMinChange(e as any)}
              />
            </div>
            <span>-</span>
            <div>
              <label htmlFor="max" className="block text-gray-500">
                Max
              </label>
              <input
                id="max"
                type="number"
                className="border bg-white border-gray-300 rounded p-2 w-20 outline-none focus:border-primary-green"
                value={maxValue}
                onChange={(e) => handleMaxChange(e as any)}
              />
            </div>
          </div>
        </div> */}
        <div className="w-full  border-b-1 py-6">
          <h6 className="text-lg font-semibold  max-sm:text-sm">Select List</h6>
          <div className="flex flex-col gap-4 mt-3">
            {selectList?.map((expertTypee: expertTypee, index: number) => (
              <div
                className="flex-c"
                key={index}
                onClick={() => {
                  setExpertType(expertTypee?.value);
                  fetchBusinesses();
                }}
              >
                <Image
                  src={
                    expertType === expertTypee?.value
                      ? "/assets/icons/circle-color.svg"
                      : "/assets/icons/circle.svg"
                  }
                  alt="menu"
                  width={25}
                  height={25}
                  className="object-contain w-6 h-6"
                />{" "}
                <label htmlFor="all" className="ml-3">
                  {expertTypee?.title}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full  border-b-1 py-6">
          <h6 className="text-lg font-semibold  max-sm:text-sm">Rating</h6>
          <div className="flex flex-col gap-4 my-3">
            {serviceRating?.map((ratingg) => (
              <div
                className="flex items-center gap-4"
                key={ratingg?.count}
                onClick={() => {
                  setRating(ratingg?.value);
                  fetchBusinesses();
                }}
              >
                <Image
                  src={
                    rating === ratingg?.value
                      ? "/assets/icons/circle-color.svg"
                      : "/assets/icons/circle.svg"
                  }
                  alt="menu"
                  width={25}
                  height={25}
                  className="object-contain w-6 h-6"
                />{" "}
                <StarRating rating={ratingg?.count} />
                <span className="">& Above</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full  border-b-1 py-6 pr-6">
          <h6 className="text-lg font-semibold  max-sm:text-sm">Reviews</h6>
          <div className="">
            <input
              type="number"
              value={noOfReviews}
              onChange={(e) => setNoOfReviews(e.target.value)}
              placeholder="Number of Reviews"
              className="border-1 rounded w-full text-sm p-2 mt-4 bg-white outline-none focus:border-primary-green border-gray-300"
            />
            <button
              type="button"
              onClick={fetchBusinesses}
              className="text-primary-green text-center text-sm font-semibold w-[290px] py-4"
            >
              APPLY
            </button>
          </div>
        </div>
        <div className="w-full  border-b-1 py-6 pr-6">
          <h6 className="text-lg font-semibold  max-sm:text-sm">Location</h6>
          <div className="">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="border-1 rounded w-full text-sm p-2 mt-4 bg-white outline-none focus:border-primary-green border-gray-300"
            />
            <button
              type="button"
              onClick={fetchBusinesses}
              className="text-primary-green text-center text-sm font-semibold w-[290px] py-4"
            >
              APPLY
            </button>
          </div>
        </div>
        <div className="w-full  border-b-1 py-6">
          <h6 className="text-lg font-semibold  max-sm:text-sm">
            Notice Period
          </h6>
          <div className="flex flex-col gap-4 mt-3">
            {noticePeriod?.map((period, index) => (
              <div
                className="flex-c cursor-pointer"
                key={index}
                onClick={() => {
                  setNoticePeriod(period?.value);
                  fetchBusinesses();
                }}
              >
                <Image
                  src={
                    noticePeriodd === period?.value
                      ? "/assets/icons/circle-color.svg"
                      : "/assets/icons/circle.svg"
                  }
                  alt="menu"
                  width={25}
                  height={25}
                  className="object-contain w-6 h-6"
                />{" "}
                <label htmlFor="all" className="ml-3">
                  {period?.title}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="w-full  border-b-1 py-6">
          <h6 className="text-lg font-semibold  max-sm:text-sm">
            Expert Level
          </h6>
          <div className="flex flex-col gap-4 my-3">
            {serviceRating?.map((rating) => (
              <div className="flex items-center gap-4" key={rating?.count}>
                <Image
                  src="/assets/icons/circle.svg"
                  alt="menu"
                  width={25}
                  height={25}
                  className="object-contain w-6 h-6"
                />{" "}
                <span className="">Level {rating?.count} & Above</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ServiceFilter;
