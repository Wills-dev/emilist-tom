"use client";

import Link from "next/link";

import PopularSection from "../Skeleton/PopularSection";

import { useFetchExperts } from "@/hooks/useFetchExperts";
import { Capitalize, numberWithCommas } from "@/helpers";

const ExpertHomeData = () => {
  const { loading, allExperts } = useFetchExperts();
  return (
    <>
      {loading ? (
        <PopularSection />
      ) : (
        <div className="flex items-center w-full overflow-x-scroll gap-4 sm:mt-6 py-4 hide-scrollbar">
          {allExperts?.map((expert: any) => (
            <div key={expert?.id} className="flex flex-col gap-4">
              <Link
                href={`/expert/info/${expert?.id}`}
                className="flex flex-col gap-2 group"
              >
                <div className="max-w-[400px] w-96 max-md:w-72 h-64 max-md:h-52 overflow-hidden rounded-lg bg-slate-500">
                  {/* <Imae
              src=""
              alt="logo"
              width={380}
              height={276}
              className="object-cover w-full h-full  group-hover:scale-110 transition-all duration-300 ease-out"
            /> */}
                </div>
                <h4 className="w-full font-medium sm:text-xl group-hover:text-primary-green transition-all duration-300 ease-out">
                  {expert?.service && Capitalize(expert?.service)}
                </h4>
                <p className="w-full flex-c text-center text-sm max-md:text-xs">
                  <span className="text-gray-500">Start price:</span>{" "}
                  <span className="ml-2 font-semibold">
                    ₦{numberWithCommas(expert?.startingprice)}{" "}
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
        </div>
      )}
    </>
  );
};

export default ExpertHomeData;
