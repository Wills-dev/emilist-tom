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
import { getCurrencySign } from "@/helpers/getCurrencySign";

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
            {compareServices.length > 0 ? (
              <>
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
                            alt={expert?.businessName}
                            width={380}
                            height={276}
                            className="object-cover min-w-full h-[170px] "
                          />
                        ) : (
                          <Image
                            src="/assets/images/Logo.svg"
                            alt={expert?.businessName}
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
                            {expert?.currency &&
                              getCurrencySign(expert?.currency)}
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
                        {expert?.services?.map(
                          (service: string, index: number) => (
                            <span
                              key={index}
                              className="pl-1 whitespace-nowrap"
                            >
                              {service}
                              {index + 1 !== expert?.services?.length && ", "}
                            </span>
                          )
                        )}
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
                        {expert?.businessState &&
                          Capitalize(expert?.businessState)}
                        ,{" "}
                        {expert?.businessCountry &&
                          Capitalize(expert?.businessCountry)}
                      </p>
                      <div className="px-2 py-6  border-b-1 flex-c overflow-x-auto h-20">
                        {" "}
                        {expert?.languages?.map((language: any, i: number) => (
                          <span key={i} className="white whitespace-nowrap">
                            {language},{" "}
                          </span>
                        ))}
                      </div>
                      <div className="flex-c gap-2 justify-center py-6">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <span
                                className="text-red-500 cursor-pointer"
                                onClick={() => compare(expert._id)}
                              >
                                <RiDeleteBin6Line />
                              </span>
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
              </>
            ) : (
              <div className="flex-c text-lg">
                <p>
                  No business added to compare list.{" "}
                  <Link href="/dashboard/expert" className="text-primary-green">
                    {" "}
                    Click here
                  </Link>{" "}
                  to see all businesses.
                </p>
              </div>
            )}
          </div>
        )}
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
