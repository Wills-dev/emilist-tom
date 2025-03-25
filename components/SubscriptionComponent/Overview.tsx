"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import SubscriptionToggle from "./SubscriptionToggle";

import { convertDateFormat, numberWithCommas } from "@/helpers";
import { useGetUserSubscriptionPlan } from "@/hooks/useGetUserSubscriptionPlan";
import { DataTable } from "../DashboardComponents/DataTable";
import { Column } from "@/app/dashboard/subscription/overview/Column";

const reviewWorkers = [1, 2, 3, 4, 5];

const Overview = () => {
  const { loading, userPlan } = useGetUserSubscriptionPlan();
  const [totalDays, setTotalDays] = useState<number>(0);
  const [elapsedDays, setElapsedDays] = useState<number>(0);

  useEffect(() => {
    const calculateProgress = () => {
      if (!userPlan?.startDate || !userPlan?.endDate) return;

      const start = new Date(userPlan.startDate).getTime();
      const end = new Date(userPlan.endDate).getTime();
      const now = Date.now();

      if (isNaN(start) || isNaN(end) || end <= start) {
        setElapsedDays(0);
        setTotalDays(0);
        return;
      }

      // Calculate total days
      const total = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalDays(total);

      // Calculate elapsed days
      const elapsed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      setElapsedDays(Math.min(elapsed, total)); // Ensure elapsed doesn't exceed total
    };

    calculateProgress();
  }, [userPlan]);

  return (
    <section className="py-28 padding-x">
      <SubscriptionToggle currentLink={1} />
      {loading ? (
        <div className="flex-c w-full min-h-[70vh] justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="flex gap-6 max-lg:flex-col mt-6">
            <div className="w-full flex-1 shadow-md rounded-[10px] p-6">
              <div className="w-full flex justify-between">
                <h5 className="text-lg font-medium  max-sm:text-lg">
                  {userPlan?.planId?.name}
                </h5>
                {userPlan?.planId?.price === 0 ? (
                  <h5 className="text-3xl font-extrabold max-sm:text-2xl py-2">
                    Free
                  </h5>
                ) : (
                  <h5 className="text-3xl font-extrabold max-sm:text-2xl py-2">
                    ₦
                    {userPlan?.planId?.price &&
                      numberWithCommas(userPlan?.planId?.price)}
                    <span className="text-[#6B7280] font-medium max-sm:text-sm font-inter">
                      /{userPlan?.planId?.duration === "yearly" ? "yr" : "mo"}
                    </span>
                  </h5>
                )}
              </div>
              <div className="grid grid-cols-10 gap-5 mt-6">
                {userPlan?.planId?.price !== 0 && (
                  <div className="col-span-6 w-full max-md:col-span-10">
                    <h6 className="font-medium text-[#737774] max-sm:text-sm mb-1">
                      {elapsedDays}/{totalDays}
                    </h6>
                    <div className="flex items-center w-full gap-4">
                      <div className="flex-1">
                        <progress
                          className="progress lg:max-w-56 lg:w-full w-56"
                          value={(elapsedDays / totalDays) * 100 || 0}
                          max="100"
                        ></progress>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className={`col-span-4 max-md:col-span-10 w-full flex max-md:justify-start ${
                    userPlan?.planId?.price !== 0
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <Link
                    href="/dashboard/subscription/plans"
                    className="bg-primary-green w-[151px] py-[12px] text-[#fcfefd] rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap text-center"
                  >
                    Upgrade Plan
                  </Link>
                </div>
              </div>
            </div>
            {userPlan?.planId?.price !== 0 && (
              <div className="w-full flex-1 shadow-md rounded-[10px] p-6 flex items-center">
                <div className="">
                  <p className="font-medium text-[#737774] max-sm:text-sm py-4">
                    Next Payment
                  </p>
                  <h5 className="text-xl font-semibold max-sm:text-lg">
                    on{" "}
                    {userPlan?.endDate && convertDateFormat(userPlan?.endDate)}
                  </h5>
                </div>
              </div>
            )}
          </div>
          <div className="w-full mt-6">
            <h6 className="sm:text-lg font-semibold">Invoice</h6>
            {/* <div className="w-full">
              <DataTable columns={Column} data={reviewWorkers} searchValue="" />
            </div> */}
            <div className="flex flex-col gap-6 w-full mt-4">
              {reviewWorkers.slice(0, 5).map((star, index) => (
                <div
                  className="flex-c-b shadow-md px-8 py-4 rounded-[5px] flex-wrap gap-4 max-sm:px-4"
                  key={index}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/icons/bi_file-earmark-pdf-fill.svg"
                      alt="arrow-right"
                      width={32}
                      height={32}
                      className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
                    />
                    <h6 className="font-semibold  max-sm:text-sm">
                      Invoice.2022/10.pdf
                    </h6>
                  </div>
                  <div className="flex-c gap-2 sm:hidden">
                    <Image
                      src="/public/assets/icons/"
                      alt="arrow-right"
                      width={24}
                      height={24}
                      className="object-contain w-5 h-5 max-sm:w-4 max-sm:h-4"
                    />
                    <h6 className="font-semibold text-primary-green max-sm:text-sm">
                      Download
                    </h6>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className=" text-sm font-medium text-[#737774] max-sm:text-xs">
                      Date of invoice
                    </p>
                    <h6 className="font-semibold max-sm:text-sm">
                      Aug 29, 2022
                    </h6>
                  </div>
                  <div className="flex items-center gap-2 max-sm:hidden">
                    <Image
                      src="/assets/icons/document-download.svg"
                      alt="arrow-right"
                      width={24}
                      height={24}
                      className="object-contain w-5 h-5 max-sm:w-4 max-sm:4"
                    />
                    <h6 className="font-semibold text-primary-green max-sm:text-sm">
                      Download
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Overview;
