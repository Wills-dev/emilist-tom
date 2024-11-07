"use client";

import { useState } from "react";
import Image from "next/image";

import ChatModal from "../modals/ChatModal";

import { Capitalize, numberWithCommas } from "@/helpers";

interface ActiveProjectInfoProps {
  jobInfo: any;
  jobId: string;
}

const ActiveProjectInfo = ({ jobInfo, jobId }: ActiveProjectInfoProps) => {
  const [openChat, setOpenChat] = useState(false);

  const handleOpen = () => {
    setOpenChat((prev) => !prev);
  };

  const acceptedApplication = jobInfo?.applications?.find(
    (applicant: any) => applicant?._id === jobInfo?.acceptedApplicationId
  );

  return (
    <>
      {openChat && (
        <div className="absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]"></div>
      )}
      <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
        <div className="w-full  px-10 max-sm:px-5 pb-4">
          <div className="flex items-center justify-between">
            <h5 className=" text-[30px]  font-semibold max-sm:text-[20px]">
              {jobInfo?.title && Capitalize(jobInfo.title)}
            </h5>
          </div>
          <p className=" text-[16px] leading-[24px] font-[400] max-sm:text-[12px] py-2">
            <span className="text-[#1A201B] font-[600]">Job ID:</span>{" "}
            {jobId && jobId}
          </p>
        </div>
        <div className="w-full px-10 max-sm:px-5 py-6 ">
          <div className="flex justify-between items-center gap-10 flex-wrap">
            <div className="flex gap-2">
              <Image
                src="/assets/icons/clock.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
              />
              <div className="flex flex-col  gap-1">
                <h6 className=" text-[18px] leading-[24px] font-[600] max-sm:text-[14px]">
                  {jobInfo?.duration?.number && jobInfo.duration?.number}{" "}
                  {jobInfo?.duration?.period && jobInfo.duration?.period}
                </h6>
                <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                  Project duration
                </p>
              </div>
            </div>
            {jobInfo?.bidRange && (
              <div className=" flex gap-2">
                <Image
                  src="/assets/icons/empty-wallet.svg"
                  alt="menu"
                  width={20}
                  height={20}
                  className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                />
                <div className="flex flex-col gap-1">
                  <h6 className=" text-lg font-semibold max-sm:text-[14px]">
                    {jobInfo?.currency}{" "}
                    {jobInfo?.bidRange && numberWithCommas(jobInfo.bidRange)}
                  </h6>
                  <p className="text-[#474C48] max-sm:text-xs">Bid range</p>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Image
                src="/assets/icons/dollar-circle.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
              />
              <div className="flex flex-col  gap-1">
                <h6 className=" text-lg font-semibold max-sm:text-[14px]">
                  {jobInfo?.currency}{" "}
                  {jobInfo?.maximumPrice
                    ? numberWithCommas(jobInfo.maximumPrice)
                    : jobInfo?.budget && numberWithCommas(jobInfo.budget)}{" "}
                </h6>
                <p className="text-[#474C48] max-sm:text-xs">Actual Amount</p>
              </div>
            </div>

            <button
              className="bg-primary-green px-[40px] py-[12px] text-[#fcfefd] rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap flex justify-center items-center max-lg:hidden"
              onClick={handleOpen}
            >
              <Image
                src="/assets/icons/messages.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-1"
              />
              Chats
            </button>
            {/* chat modal */}
            {openChat && <ChatModal handleOpen={handleOpen} />}
          </div>
        </div>
        <div className="w-full px-10 max-sm:px-5 py-6 flex justify-between">
          {acceptedApplication ? (
            <div className="flex-c ">
              {" "}
              {acceptedApplication?.user?.profileImage ? (
                <Image
                  src={acceptedApplication?.user?.profileImage}
                  alt="menu"
                  width={44}
                  height={44}
                  className="object-cover w-[44px] h-[44px] max-sm:w-[25px] max-sm:h-[25px] rounded-full mr-2"
                />
              ) : (
                <p className="w-[44px] h-[44px] max-sm:w-[25px] max-sm:h-[25px] rounded-full bg-slate-200 mr-2 flex-c justify-center font-bold">
                  {acceptedApplication?.user?.userName?.[0]?.toUpperCase()}
                </p>
              )}
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h6 className=" text-lg font-[500] max-sm:text-[14px]">
                    {acceptedApplication?.user?.fullName
                      ? acceptedApplication?.user?.fullName
                      : acceptedApplication?.user?.userName}
                  </h6>
                </div>
              </div>
            </div>
          ) : null}

          {/* mobile chat button */}
          <button
            className="bg-primary-green px-[40px] py-[12px] text-[#fcfefd] rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap flex justify-center items-center lg:hidden max-md:px-[20px] max-md:py-[6px]"
            onClick={handleOpen}
          >
            <Image
              src="/assets/icons/messages.svg"
              alt="menu"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-1"
            />
            Chats
          </button>
          {/* chat modal */}
          {openChat && <ChatModal handleOpen={handleOpen} />}
        </div>
        <div className="w-full px-10 max-sm:px-5 py-6">
          <div className="w-full flex items-center justify-between">
            <h6 className=" my-5  text-[16px] leading-[24px] font-[600] max-sm:text-[13px]">
              Project details
            </h6>
            <div className="flex gap-1 items-center">
              <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                Due date
              </p>
              <div className=" flex items-center justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-[20px]">
                <p className="text-[#25C269]  text-[14px] font-medium max-sm:text-xs whitespace-nowrap">
                  6 days
                </p>
              </div>
            </div>
          </div>
          <p className="  text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
            {jobInfo?.description && jobInfo?.description}
            {/* <button className="text-[#25C269]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
              see more
            </button> */}
          </p>
        </div>
        {jobInfo?.jobFiles?.length > 0 && (
          <div className="px-10 max-sm:px-5 py-6 w-full">
            <h6 className="text-lg font-semibold max-sm:text-sm font-inter">
              Files
            </h6>
            <div className="flex items-center w-full gap-2 pt-4 flex-wrap">
              {jobInfo?.jobFiles?.map((file: any, index: number) => (
                <Image
                  key={index}
                  src={file?.url}
                  alt="menu"
                  width={61}
                  height={61}
                  className="object-cover w-[61px] h-[70px] max-sm:w-[40px] max-sm:h-[40px] "
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ActiveProjectInfo;
