"use client";

import { useState } from "react";
import Image from "next/image";

import ChatModal from "../modals/ChatModal";
import StarRating from "../StarRating/StarRating";

import { Capitalize, numberWithCommas } from "@/helpers";

interface ActiveProjectInfoProps {
  jobInfo: any;
  jobId: string;
  applicantId: string;
  pauseJob: (jobId: string, applicantId: string) => void;
  loadPause: boolean;
  resumeJob: (jobId: string, applicantId: string) => void;
}

const ActiveProjectInfo = ({
  jobInfo,
  jobId,
  applicantId,
  resumeJob,
  pauseJob,
  loadPause,
}: ActiveProjectInfoProps) => {
  const [openChat, setOpenChat] = useState(false);
  const [openActionDropdown, setOpenActionDropdown] = useState(false);

  const handleOpen = () => {
    setOpenChat((prev) => !prev);
  };

  return (
    <>
      {loadPause ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-60 bg-white z-50"></div>
      ) : null}
      {openChat && (
        <div className="absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]"></div>
      )}
      <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
        <div className="w-full  px-10 max-sm:px-5 pb-4">
          <div className="flex items-center justify-between">
            <h5 className="text-[#000000] text-[30px] leading-[36px] font-[600] max-sm:text-[20px]">
              {jobInfo?.jobTitle && Capitalize(jobInfo.jobTitle)}
            </h5>
            <div className="block relative">
              <Image
                src="/assets/icons/Menu.svg"
                alt="menu"
                width={30}
                height={30}
                className="object-contain w-[30px] h-[30px] max-sm:w-[18px] max-sm:h-[18px] max-sm:hidden cursor-pointer"
                onClick={() => setOpenActionDropdown((prev) => !prev)}
              />
              {/* the action dropdown */}
              {openActionDropdown && (
                <div className="absolute shadow-md rounded-[10px] bg-white flex flex-col gap-3 px-6 max-sm:px-3 py-6 items-start right-0 text-[#282828] text-[16px] max-sm:text-[13px] ">
                  {jobInfo?.jobStatus === "active" ? (
                    <button
                      className=" whitespace-nowrap hover:text-primary-green transition-all w-full"
                      onClick={() => {
                        pauseJob(jobId, applicantId);
                      }}
                    >
                      Pause job
                    </button>
                  ) : null}
                  {jobInfo?.jobStatus === "paused" ? (
                    <button
                      className=" text-left whitespace-nowrap  hover:text-primary-green transition-all w-full"
                      onClick={() => {
                        resumeJob(jobId, applicantId);
                      }}
                    >
                      Resume job
                    </button>
                  ) : null}
                </div>
              )}
              {/* end of action dropdown */}
            </div>
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
                  {jobInfo?.projectDuration && jobInfo.projectDuration}
                </h6>
                <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                  Project duration
                </p>
              </div>
            </div>
            <div className=" flex gap-2">
              <Image
                src="/assets/icons/empty-wallet.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
              />
              <div className="flex flex-col gap-1">
                <h6 className=" text-[18px] leading-[24px] font-[600] max-sm:text-[14px]">
                  ₦{" "}
                  {jobInfo?.bidRange
                    ? numberWithCommas(jobInfo.bidRange)
                    : numberWithCommas(jobInfo.Amount)}
                </h6>
                <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                  Price
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/dollar-circle.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
              />
              <div className="flex flex-col  gap-1">
                <h6 className=" text-[18px] leading-[24px] font-[600] max-sm:text-[14px]">
                  ₦{" "}
                  {jobInfo?.bidRange
                    ? numberWithCommas(jobInfo.bidRange)
                    : numberWithCommas(jobInfo.Amount)}
                </h6>
                <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                  Actual Amount
                </p>
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
          <div className="flex ">
            <Image
              src="/assets/dummyImages/profilePic.png"
              alt="menu"
              width={44}
              height={44}
              className="object-cover w-[44px] h-[44px] max-sm:w-[25px] max-sm:h-[25px] rounded-full mr-2"
            />
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex-c-b">
                <h6 className=" text-[18px] leading-[24px] font-[500] max-sm:text-[14px]">
                  Victor Falade
                </h6>
              </div>

              <p className="flex items-center text-[#5E625F] text-[14px] leading-[24px] font-[400] max-sm:text-[12px] gap-1">
                Level 4 | <StarRating rating={4} />
              </p>
            </div>
          </div>

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
                <p className="text-[#25C269]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                  6 days
                </p>
              </div>
            </div>
          </div>
          <p className="  text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
            {jobInfo?.Description ? jobInfo?.Description : jobInfo?.description}
            <button className="text-[#25C269]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
              see more
            </button>
          </p>
        </div>
        <div className="px-10 max-sm:px-5 py-6 w-full">
          <h6 className=" text-[18px] leading-[24px] font-[600] max-sm:text-[14px] font-inter">
            Files
          </h6>
          <div className="flex items-center w-full gap-10 pt-4">
            <Image
              src="/assets/icons/pdf.jpg"
              alt="menu"
              width={61}
              height={61}
              className="object-contain w-[61px] h-[61px] max-sm:w-[40px] max-sm:h-[40px] "
            />
            <Image
              src="/assets/icons/mword.jpg"
              alt="menu"
              width={61}
              height={61}
              className="object-contain w-[61px] h-[61px] max-sm:w-[40px] max-sm:h-[40px] "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveProjectInfo;
