"use client";

import Image from "next/image";
import { useState } from "react";

import { FaStar } from "react-icons/fa";

import StarRating from "../StarRating/StarRating";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ExpertReviewContent = () => {
  const stars = [5, 4, 3, 2, 1];

  const [filter, setFilter] = useState("");

  const handleChange = (value: string) => {
    setFilter(value);
  };
  return (
    <div className="padding-x pt-28 pb-10">
      <div className="flex-c gap-2">
        <h6 className="sm:text-3xl text-xl font-bold">51 Reviews</h6>
        <div className="flex-c gap-1">
          <StarRating rating={4} />
          <p className="sm:text-sm text-xs text-gray-300">(51)</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 py-10">
        <div className="flex-1 flex flex-col gap-5">
          {stars.map((star, index) => (
            <div className="flex-c gap-4" key={index}>
              <p className="text-[#054753] font-semibold max-sm:text-sm">
                {star} Stars
              </p>
              <div className="h-[16px] sm:min-w-[480px] sm:w-[480px]  min-w-[260px] w-[260px] rounded-full bg-slate-300">
                <div className="h-full w-[60%] bg-[#ff9933] rounded-full"></div>
              </div>
              <p className="text-[#054753] max-sm:text-sm">(40)</p>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <p className="sm:text-xl font-semibold">Rating Breakdown</p>
          <div className="flex-c gap-10">
            <p className="max-sm:text-sm">Seller communication level</p>
            <div className="flex-c gap-2">
              <p className="max-sm:text-sm text-[#ff9933]">4</p>
              <span className="text-xl">
                {" "}
                <FaStar className="text-[#ff9933]" />
              </span>
            </div>
          </div>
          <div className="flex-c gap-10">
            <p className="max-sm:text-sm">Service as described</p>
            <div className="flex-c gap-2">
              <p className="max-sm:text-sm text-[#ff9933]">4.2</p>
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
              <SelectItem value="most recent">Most recent</SelectItem>
              <SelectItem value="most relevant">Most relevant</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ExpertReviewContent;
