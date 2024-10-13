"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { dashboardMsgProfiles } from "@/constants/dummy";

const DashboardCards = () => {
  const currentDate = new Date();

  const getLastNDays = (date: Date, n: number) => {
    const dates = [];
    for (let i = 1; i <= n; i++) {
      const previousDate = new Date(date);
      previousDate.setDate(date.getDate() - i);
      dates.push(previousDate);
    }
    return dates.reverse();
  };

  const getNextNDays = (date: Date, n: number) => {
    const dates = [];
    for (let i = 1; i <= n; i++) {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };

  const [last3Days, setLast3Days] = useState(getLastNDays(currentDate, 2));
  const [next3Days, setNext3Days] = useState(getNextNDays(currentDate, 4));
  return (
    <div className="flex flex-col gap-4 w-full max-lg:overflow-x-scroll max-lg:flex-row">
      <div className="bg-white w-full p-6 max-sm:px-3 flex flex-col gap-6 rounded-lg">
        <h4 className="capitalize sm:text-lg font-semibold">
          {currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </h4>
        <div className="flex w-full gap-3 overflow-x-scroll">
          {last3Days.map((date, index) => (
            <div className="rounded-3xl" key={index}>
              <div className=" shadow w-7 max-w-7 min-w-7 rounded-3xl">
                <div className="p-2 m-1 flex-c-b flex-col gap-1 h-14">
                  <h6 className="capitalize text-xs text-[#B8B9B8]">
                    {date
                      .toLocaleDateString("en-US", { weekday: "short" })
                      .charAt(0)}
                  </h6>
                  <p className="capitalize text-xs font-semibold text-[#737774]">
                    {date.toLocaleDateString("en-US", { day: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="rounded-3xl">
            <div className=" shadow w-7 max-w-7 min-w-7 rounded-3xl">
              <div className="p-2 m-1 flex-c-b flex-col gap-1 h-14 bg-primary-green rounded-3xl">
                <h6 className="capitalize text-sm text-white">
                  {currentDate
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .charAt(0)}
                </h6>
                <p className="capitalize text-xs font-semibold text-white">
                  {currentDate.toLocaleDateString("en-US", { day: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          {next3Days.map((date, index) => (
            <div className="rounded-3xl" key={index}>
              <div className="shadow w-7 max-w-7 min-w-7 rounded-3xl">
                <div className="p-2 m-1 flex-c-b flex-col gap-1 h-14">
                  <h6 className="capitalize text-xs text-[#B8B9B8]">
                    {date
                      .toLocaleDateString("en-US", { weekday: "short" })
                      .charAt(0)}
                  </h6>
                  <p className="capitalize text-xs font-semibold text-[#737774]">
                    {date.toLocaleDateString("en-US", { day: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white w-full rounded-lg p-6 max-sm:px-3 max-sm:min-w-min">
        <h4 className="sm:text-lg font-medium">Your Target for this month</h4>
        <div className="flex flex-col gap-4 my-5 ">
          <div className="flex flex-col gap-4 max-lg:flex-row max-lg:items-center w-full">
            <div className="text-sm font-medium max-sm:text-xs">
              <h6 className="">Jobs</h6>
              <div className="flex-c w-full gap-4">
                <div className="flex-1">
                  <progress
                    className="progress lg:max-w-56 lg:w-full w-56"
                    value="57"
                    max="100"
                  ></progress>
                </div>
                <p>57%</p>
              </div>
            </div>
            <div className="text-sm font-medium max-sm:text-xs">
              <h6 className="">Amount earned</h6>
              <div className="flex-c w-full gap-4">
                <div className="flex-1">
                  <progress
                    className="progress progress-warning lg:max-w-56 lg:w-full w-56"
                    value="40"
                    max="100"
                  ></progress>
                </div>
                <p>40%</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-lg:flex-row max-lg:items-center w-full">
            <div className="text-sm font-medium max-sm:text-xs">
              <h6 className="">Clients referring you</h6>
              <div className="flex-c w-full gap-4">
                <div className="flex-1">
                  <progress
                    className="progress progress-success lg:max-w-56 lg:w-full w-56"
                    value="40"
                    max="100"
                  ></progress>
                </div>
                <p>40%</p>
              </div>
            </div>
            <div className="text-sm font-medium max-sm:text-xs">
              <h6 className="">Friends invited</h6>
              <div className="flex-c w-full gap-4">
                <div className="flex-1">
                  <progress
                    className="progress progress-error lg:max-w-56 lg:w-full w-56"
                    value="100"
                    max="100"
                  ></progress>
                </div>
                <p>100%</p>
              </div>
            </div>
          </div>
          <div className="flex-c w-full justify-center max-sm:justify-start">
            <Link
              href="/dashboard/service/target"
              className="text-sm font-semibold text-primary-green max-sm:text-xs"
            >
              See More
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white w-full rounded-lg p-6 max-sm:px-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <p className="font-medium max-sm:text-sm">Messages</p>
            <p className="text-[#FCFEFD] text-sm bg-[#054753] px-3 py-1 rounded-2xl">
              5
            </p>
          </div>

          <Link
            href="/messages"
            className="sm:text-sm font-semibold text-primary-green text-xs"
          >
            View all
          </Link>
        </div>
        <div className="flex flex-col mt-10 gap-4 max-lg:flex-row overflow-x-scroll max-lg:gap-8">
          {dashboardMsgProfiles.slice(0, 3).map((profile, index) => (
            <div className="flex w-full gap-3" key={index}>
              <div className="w-[40px] h-[40px] rounded-full bg-[#6B7280] flex-c justify-center relative">
                {profile.profile ? (
                  <Image
                    src={profile.profile}
                    alt="logo"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full min-w-full max-w-full max-h-full min-h-full"
                  />
                ) : (
                  <p className="font-inter text-sm uppercase text-white">
                    {profile.firstName.slice(0, 1)}
                    {profile.lastName.slice(0, 1)}
                  </p>
                )}
                <div className="w-[9px] h-[9px] bg-primary-green rounded-full absolute bottom-0 right-0"></div>
              </div>
              <div className="flex-1 flex flex-col gap-2 border-[#B8B9B8] border-b-1 pb-4">
                <div className="flex-c-b">
                  <p className="capitalize max-sm:text-sm whitespace-nowrap mr-2">
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="text-sm text-[#737774] max-sm:text-xs">10M</p>
                </div>
                <p className="text-sm max-sm:text-xs">
                  Amet minim mollit non deseru ullamco.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
