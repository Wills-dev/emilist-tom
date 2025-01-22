"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";

import { RiDeleteBin6Line } from "react-icons/ri";

import MainLayout from "@/components/MainLayout/MainLayout";
import ContactModal from "@/components/modals/ContactModal";

import { useCompare } from "@/hooks/useCompare";
import { CompareContext } from "@/utils/CompareState";
import { Capitalize, numberWithCommas } from "@/helpers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ComparePage = () => {
  const { compare } = useCompare();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>({});
  const { compareLoading, compareServices } = useContext(CompareContext);

  return (
    <MainLayout>
      <div className="padding-x pt-28">
        <h2 className="text-3xl leading-9 font-bold text-gray-900 max-md:text-xl">
          Compare
        </h2>
        {compareLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div className="relative flex my-10">
            <div className="absolute left-0 sm:w-52 w-28 bg-white flex flex-col font-semibold max-sm:text-sm">
              <div className="w-full h-[330px] border-b-1 py-6" />
              <p className="py-6">Level</p>
              <p className="py-6 h-[200px]">About</p>
              <p className="py-6">Ratings</p>
              <p className="py-6">Reviews</p>
              <p className="py-6 h-20">Service</p>
              <p className="py-6">Job completed</p>
              <p className="py-6">Notice period</p>
              <p className="py-6">Location</p>
              <p className="py-6 h-20">Language</p>
            </div>
            <div className="sm:w-52 w-28" />
            <div className="flex-1 w-full flex overflow-x-auto ">
              {compareServices?.map((expert: any, index: number) => (
                <div
                  className="flex flex-col max-sm:text-sm max-w-[250px] w-[250px] min-w-[250px]"
                  key={index}
                >
                  <div className="w-full h-[330px] border-b-1 px-2 py-6">
                    <h5 className="sm:text-lg font-bold mb-2 truncate">
                      {expert?.firstName && Capitalize(expert?.firstName)}{" "}
                      {expert?.lastName && Capitalize(expert?.lastName)}
                    </h5>
                    {Array.isArray(expert?.businessImages) &&
                    expert?.businessImages[0]?.imageUrl ? (
                      <Image
                        src={expert?.businessImages[0]?.imageUrl}
                        alt={expert?.services[0]}
                        width={380}
                        height={276}
                        className="object-cover min-w-full h-[170px] "
                      />
                    ) : (
                      <Image
                        src="/assets/images/Logo.svg"
                        alt={expert?.services[0]}
                        width={130}
                        height={30}
                        className="object-contain min-w-full  h-[170px] border-1 "
                      />
                    )}

                    <div>
                      <div className="flex justify-between gap-1">
                        <p className="whitespace-nowrap py-2 text-base leading-6 max-sm:text-xs">
                          Starting price
                        </p>
                        <button
                          className="px-3 border-1 border-gray-700  font-semibold  max-sm:text-sm rounded-[10px] mt-2 h-[36px] max-sm:h-[28px]"
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedBusiness(expert?.userId);
                          }}
                        >
                          Contact
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-primary-green ">
                        {expert?.currency}{" "}
                        {expert?.startingPrice
                          ? numberWithCommas(expert?.startingPrice)
                          : 0}
                      </h3>
                    </div>
                  </div>
                  <p className="px-2 py-6 border-b-1"> Level 5</p>
                  <p className="px-2 py-6 h-[200px] overflow-y-auto border-b-1">
                    {" "}
                    {expert?.bio}
                  </p>
                  <p className="px-2 py-6  border-b-1">
                    {expert?.averageRating
                      ? numberWithCommas(expert?.averageRating)
                      : 0}
                  </p>
                  <p className="px-2 py-6  border-b-1">
                    {" "}
                    {expert?.totalReviews
                      ? numberWithCommas(expert?.totalReviews)
                      : 0}
                  </p>
                  <div className="px-2 py-6  border-b-1 flex-c overflow-x-auto h-20">
                    {" "}
                    {expert?.services?.map((service: string, index: number) => (
                      <span key={index} className="pl-1 whitespace-nowrap">
                        {service}
                        {index + 1 !== expert?.services?.length && ", "}
                      </span>
                    ))}
                  </div>
                  <p className="px-2 py-6  border-b-1">
                    {" "}
                    {expert?.completedJobs
                      ? numberWithCommas(expert?.completedJobs)
                      : 0}
                  </p>
                  <p className="px-2 py-6  border-b-1">
                    {" "}
                    {expert?.noticePeriod &&
                      numberWithCommas(expert?.noticePeriod)}{" "}
                    days
                  </p>
                  <p className="px-2 py-6  border-b-1">
                    {" "}
                    {expert?.businessState && Capitalize(expert?.businessState)}
                    ,{" "}
                    {expert?.businessCountry &&
                      Capitalize(expert?.businessCountry)}
                  </p>
                  <div className="px-2 py-6  border-b-1 flex-c overflow-x-auto h-20">
                    {" "}
                    {expert?.languages?.map((language: any, i: number) => (
                      <span key={i}>{language}, </span>
                    ))}
                  </div>
                  <div className="flex-c gap-2 justify-center py-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {" "}
                          <button
                            className="text-red-500"
                            onClick={() => compare(expert._id)}
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove business</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Link
                      href={`/expert/info/${expert?._id}`}
                      className=" text-center border-1 border-[#303632] text-sm max-sm:text-xs py-3 rounded-[10px] w-36"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* <div className="w-full overflow-auto my-10  max-h-[90vh]">
          {compareLoading ? (
            <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            <table className=" rounded-xl border-collapse w-full relative overflow-auto ">
              <thead className=" ">
                <tr className="max-sm:text-sm  ">
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap z-10 left-0  text-black text-base leading-6 font-semibold sticky top-0 bg-white  ">
                    Profile
                  </th>
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10 ">
                    About
                  </th>
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10 ">
                    Level
                  </th>
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                    Ratings
                  </th>
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                    Reviews
                  </th>
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                    Service
                  </th>
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                    Job Completed
                  </th>
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                    Notice Period
                  </th>
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                    Location
                  </th>
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                    Language
                  </th>
                  <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10  ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {compareServices?.map((expert: any, index: number) => (
                  <tr
                    className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200  text-s cursor-pointer border-b"
                    tabIndex={0}
                    key={index}
                  >
                    <td className=" px-4 py-4 whitespace-nowrap text-gray-500 flex items-start">
                      <div className="">
                        <h5 className="text-xl leading-7 font-bold text-black max-md:text-base max-md:leading-6 mb-2">
                          {expert?.firstName && Capitalize(expert?.firstName)}{" "}
                          {expert?.lastName && Capitalize(expert?.lastName)}
                        </h5>
                        {Array.isArray(expert?.businessImages) &&
                        expert?.businessImages[0]?.imageUrl ? (
                          <Image
                            src={expert?.businessImages[0]?.imageUrl}
                            alt={expert?.services[0]}
                            width={380}
                            height={276}
                            className="object-cover min-w-[200px] h-[150px] "
                          />
                        ) : (
                          <Image
                            src="/assets/images/Logo.svg"
                            alt={expert?.services[0]}
                            width={130}
                            height={30}
                            className="object-cover min-w-[200px]  h-[150px] "
                          />
                        )}

                        <div className="flex justify-between gap-1">
                          <div>
                            <p className="whitespace-nowrap py-2 text-base leading-6 max-sm:text-xs">
                              Starting price
                            </p>
                            <h3 className="text-2xl leading-8 font-bold text-primary-green max-sm:text-base">
                              {expert?.currency}{" "}
                              {expert?.startingPrice
                                ? numberWithCommas(expert?.startingPrice)
                                : 0}
                            </h3>
                          </div>

                          <button
                            className="px-3 border-[1px] border-gray-700 text-base leading-6 font-semibold text-gray-700 max-sm:text-sm rounded-[10px] mt-2 h-[36px] max-sm:h-[28px]"
                            onClick={() => {
                              setOpenModal(true);
                              setSelectedBusiness(expert?.userId);
                            }}
                          >
                            Contact
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="border-b px-4 py-4 text-left">
                      <p className="max-w-[240px] w-[240px] text-base leading-6 text-gray-700 max-md:text-sm">
                        {expert?.bio}
                      </p>
                    </td>
                    <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                      Level 5
                    </td>
                    <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                      4.6
                    </td>
                    <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                      56
                    </td>
                    <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 ">
                      <div className="flex flex-col gap-1">
                        {expert?.services?.map(
                          (service: string, index: number) => (
                            <span key={index} className="pl-1">
                              {service}
                              {index + 1 !== expert?.services?.length && ","}
                            </span>
                          )
                        )}
                      </div>
                    </td>
                    <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                      10
                    </td>
                    <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                      {expert?.noticePeriod} days
                    </td>

                    <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                      {expert?.businessState &&
                        Capitalize(expert?.businessState)}
                      ,{" "}
                      {expert?.businessCountry &&
                        Capitalize(expert?.businessCountry)}
                    </td>
                    <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                      <div className="flex flex-col">
                        {expert?.languages?.map((language: any, i: number) => (
                          <p key={i}>{language},</p>
                        ))}
                      </div>
                    </td>
                    <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-left ">
                      <Link
                        href={`/expert/info/${expert?._id}`}
                        className=" py-2 "
                      >
                        <button className="px-4 border-[1px] border-[#303632] text-[14px] max-sm:text-[12px] py-3 rounded-[10px] whitespace-nowrap">
                          View Profile
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div> */}
      </div>

      <ContactModal
        isOpen={openModal}
        onCancel={() => setOpenModal(false)}
        user={selectedBusiness}
      />
    </MainLayout>
  );
};

export default ComparePage;
