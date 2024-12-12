"use client";

import Image from "next/image";
import Link from "next/link";

import PopularSection from "../Skeleton/PopularSection";

import { useFetchMaterials } from "@/hooks/useFetchMaterials";
import { Capitalize, numberWithCommas } from "@/helpers";

const MaterialHomeData = () => {
  const { handleHorizontalScroll, data, containerRef, loading, hasMore } =
    useFetchMaterials();

  return (
    <>
      {" "}
      <div
        ref={containerRef}
        onScroll={handleHorizontalScroll}
        className="flex  w-full overflow-x-scroll gap-4 sm:mt-6 py-4 hide-scrollbar"
      >
        {data?.map((material: any, i: number) => (
          <div className="flex flex-col gap-4" key={i}>
            <Link
              href={`/material/info/${material?._id}`}
              className="flex flex-col gap-2 group"
            >
              <div className="max-w-[400px] w-96 max-md:w-72 h-64 max-md:h-52 overflow-hidden rounded-lg bg-white flex-c justify-center">
                {Array.isArray(material?.images) &&
                material?.images[0]?.imageUrl ? (
                  <Image
                    src={material?.images[0]?.imageUrl}
                    alt="product"
                    width={380}
                    height={276}
                    className="object-cover w-full h-full  group-hover:scale-110 transition-all duration-300 ease-out"
                  />
                ) : (
                  <Image
                    src="/assets/images/Logo.svg"
                    alt="logo"
                    width={130}
                    height={30}
                    className="object-contain w-auto h-auto  group-hover:scale-110 transition-all duration-300 ease-out"
                  />
                )}
              </div>
              <h4 className="w-full font-medium sm:text-xl group-hover:text-primary-green transition-all duration-300 ease-out">
                {material?.name && Capitalize(material?.name)}
              </h4>
              <p className="w-full flex-c text-center text-sm max-md:text-xs">
                <span className="text-gray-500">Price:</span>{" "}
                <span className="ml-2 font-semibold">
                  {material?.currency}{" "}
                  {material?.price && numberWithCommas(material?.price)}
                </span>
              </p>
            </Link>
            <Link
              href="/catalog/material"
              className="border-1 border-gray-700 rounded-lg px-4 py-2 font-medium max-md:text-sm w-fit hover:border-gray-500 hover:text-gray-500 transition-all duration-300"
            >
              See more materials
            </Link>
          </div>
        ))}
        {loading && <PopularSection />}
        {!hasMore && data?.length > 10 && (
          <div className=" flex items-center justify-center pr-5">
            <p className="text-gray-500 text-center whitespace-nowrap">
              {" "}
              No more materials
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MaterialHomeData;
