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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MaterialReviewContentProps {
  materialId: string;
}

const MaterialReviewContent = ({ materialId }: MaterialReviewContentProps) => {
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
      <div className="flex flex-col pt-10 gap-10 max-w-[820px] w-full">
        <div className="p-4 bg-white flex gap-4 w-full">
          <Image
            width={20}
            height={20}
            src="/assets/dummyImages/profilePic.png"
            alt="profile pic"
            className="sm:w-20 w-16 sm:h-20 h-16 object-cover  rounded-full"
          />
          <div className="flex flex-col gap-6">
            <div className="flex-c gap-4 flex-wrap">
              <h3 className="sm:text-lg font-semibold">Wills Cash</h3>
              <div className="flex items-center">
                <StarRating rating={4} />
                <span className="ml-2 text-sm font-semibold text-[#ff9933]">
                  50
                </span>
              </div>
            </div>
            <p className="text-gray-500 mt-2 max-sm:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              mollitia quae magnam temporibus laudantium reprehenderit, porro
              quia? Expedita debitis cumque saepe non ducimus? Sint mollitia,
              earum a obcaecati, distinctio adipisci accusantium ipsam
              reprehenderit expedita cupiditate ipsa quasi, molestias
              repudiandae maiores?
            </p>
            <p className="text-gray-400 max-sm:text-sm">
              Published 2 hours ago
            </p>
            <div className="flex-c gap-12">
              <button className="sm:text-lg font-medium flex-c">
                <Image
                  src="/assets/icons/like.svg"
                  width={8}
                  height={8}
                  alt="like"
                  className="object-contain sm:w-8 sm:h-8 w-6 h-6 pr-2"
                />
                Helpful
              </button>
              <button className="sm:text-lg font-medium flex-c">
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
        <div className="flex justify-center">
          <button className="text-primary-green flex-c gap-2 font-medium">
            <Image
              src="/assets/icons/add.svg"
              width={8}
              height={8}
              alt="add"
              className="w-6 h-6 object-contain"
            />
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialReviewContent;
