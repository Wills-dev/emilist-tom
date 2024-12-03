"use client";

import Link from "next/link";
import Image from "next/image";

import PopularSection from "../Skeleton/PopularSection";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useGetBusinesses } from "@/hooks/useGetBusinesses";

const ExpertHomeData = () => {
  const { handleHorizontalScroll, data, containerRef, loading, hasMore } =
    useGetBusinesses();

  return (
    <>
      <div
        ref={containerRef}
        onScroll={handleHorizontalScroll}
        className="flex w-full overflow-x-scroll gap-4 sm:mt-6 py-4 hide-scrollbar"
      >
        {data?.map((expert: any, index: number) => (
          <div key={index} className="flex flex-col gap-4">
            <Link
              href={`/expert/info/${expert?._id}`}
              className="flex flex-col gap-2 group"
            >
              <div className="max-w-[400px] w-96 max-md:w-72 h-64 max-md:h-52 overflow-hidden rounded-lg flex-c justify-center shadow">
                {Array.isArray(expert?.businessImages) &&
                expert?.businessImages[0]?.imageUrl ? (
                  <Image
                    src={expert?.businessImages[0]?.imageUrl}
                    alt={expert?.services[0]}
                    width={380}
                    height={276}
                    className="object-cover w-full h-full  group-hover:scale-110 transition-all duration-300 ease-out"
                  />
                ) : (
                  <Image
                    src="/assets/images/Logo.svg"
                    alt={expert?.services[0]}
                    width={130}
                    height={30}
                    className="object-contain w-auto h-auto  group-hover:scale-110 transition-all duration-300 ease-out"
                  />
                )}
              </div>
              <h4 className="w-full font-medium sm:text-xl group-hover:text-primary-green transition-all duration-300 ease-out">
                {expert?.services[0] && Capitalize(expert?.services[0])}
              </h4>
              <p className="w-full flex-c text-center text-sm max-md:text-xs">
                <span className="text-gray-500">Start price:</span>{" "}
                <span className="ml-2 font-semibold">
                  {expert?.currency}{" "}
                  {expert?.startingPrice
                    ? numberWithCommas(expert?.startingPrice)
                    : 0}
                </span>
              </p>
            </Link>
            <Link
              href="/catalog/services"
              className="border-1 border-gray-700 rounded-lg px-4 py-2 font-medium max-md:text-sm w-fit hover:border-gray-500 hover:text-gray-500 transition-all duration-300"
            >
              See experts near you
            </Link>
          </div>
        ))}
        {loading && <PopularSection />}
        {!hasMore && (
          <div className=" flex items-center justify-center pr-5">
            <p className="text-gray-500 text-center whitespace-nowrap">
              {" "}
              No more experts
            </p>
          </div>
        )}
        {/* {&& (
          <div className="text-center mt-4 text-gray-500">
            No more experts to load.
          </div>
        )} */}
      </div>
    </>
  );
};

export default ExpertHomeData;
