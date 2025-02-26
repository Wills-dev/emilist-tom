import Image from "next/image";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import ChatModal from "../modals/ChatModal";
import QuoteDetails from "./QuoteDetails";

import { getStatusClass } from "@/constants";
import { Capitalize, formatDueDate, numberWithCommas } from "@/helpers";

const ActiveJobInfoDetails = ({
  jobInfo,
  jobId,
  updateApplicationStatus,
  requestQuote,
  acceptQuote,
}: any) => {
  const [openChat, setOpenChat] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [openQuoteDetailsModal, setOpenQuoteDetailsModal] = useState(false);

  const handleOpen = () => {
    setOpenChat((prev) => !prev);
  };

  const handleCancel = () => setOpenQuoteDetailsModal(false);

  const toggleActionButton = () => {
    setShowActionDropdown((prev) => !prev);
  };

  const acceptedApplication = jobInfo?.applications?.find(
    (applicant: any) => applicant?._id === jobInfo?.acceptedApplicationId
  );

  const canViewQuote =
    acceptedApplication?.quote && acceptedApplication?.quote?.totalAmount;

  return (
    <>
      {openChat && (
        <div className="absolute w-full h-full min-h-screen top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]"></div>
      )}
      <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-lg pb-10 max-h-fit">
        <div className="flex justify-end pt-4 pb-10  px-10 max-sm:px-5">
          <p
            className={`px-4 py-1 rounded-full w-fit text-xs ${getStatusClass(
              jobInfo.status
            )} `}
          >
            {jobInfo?.status}
          </p>
        </div>
        <div className="w-full  px-10 max-sm:px-5 pb-4">
          <div className="flex-c-b">
            <h5 className=" text-3xl font-semibold max-sm:text-lg">
              {jobInfo?.title && Capitalize(jobInfo.title)}
            </h5>
            <div className="block relative">
              <button onClick={toggleActionButton}>
                <Image
                  src="/assets/icons/Menu.svg"
                  height={20}
                  width={20}
                  alt="menu-dot"
                  className="object-contain h-8 w-6"
                />
              </button>

              {/* the action dropdown */}
              <AnimatePresence>
                {showActionDropdown && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 min-w-fit absolute right-0 top-full z-10 bg-white rounded-lg shadow flex flex-col gap-3 items-start"
                  >
                    {jobInfo?.status === "paused" ? (
                      <button
                        className="max-sm:text-sm whitespace-nowrap"
                        onClick={async () => {
                          await updateApplicationStatus(
                            jobInfo?.acceptedApplicationId,
                            "unpause"
                          );
                          toggleActionButton();
                        }}
                      >
                        Resume Job
                      </button>
                    ) : (
                      <button
                        className="max-sm:text-sm whitespace-nowrap"
                        onClick={async () => {
                          await updateApplicationStatus(
                            jobInfo?.acceptedApplicationId,
                            "pause"
                          );
                          toggleActionButton();
                        }}
                      >
                        Pause Job
                      </button>
                    )}
                    {jobInfo?.isRequestForQuote === false && (
                      <button
                        className="whitespace-nowrap text-[16px] max-sm:text-[13px] hover:text-primary-green transition-all"
                        onClick={() => requestQuote(jobId)}
                      >
                        Request for Quote
                      </button>
                    )}
                    {canViewQuote && (
                      <>
                        <button
                          className="whitespace-nowrap max-sm:text-sm hover:text-primary-green transition-all"
                          onClick={() => setOpenQuoteDetailsModal(true)}
                        >
                          View Quote
                        </button>
                        <QuoteDetails
                          openQuoteDetailsModal={openQuoteDetailsModal}
                          handleCancel={handleCancel}
                          Quote={acceptedApplication?.quote}
                          acceptQuote={acceptQuote}
                          applicantId={acceptedApplication?._id}
                          jobInfo={jobInfo}
                        />
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              {/* end of action dropdown */}
            </div>
          </div>
          <p className=" max-sm:text-xs py-2">
            <span className="text-[#1A201B] font-semibold">Job ID:</span>{" "}
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
                <h6 className=" text-lg font-semibold max-sm:text-[14px]">
                  {jobInfo?.duration?.number && jobInfo.duration?.number}{" "}
                  {jobInfo?.duration?.period && jobInfo.duration?.period}
                </h6>
                <p className="text-[#474C48] max-sm:text-xs">
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
            {openChat && (
              <ChatModal
                handleOpen={handleOpen}
                user={acceptedApplication?.user}
              />
            )}
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
          {openChat && (
            <ChatModal
              handleOpen={handleOpen}
              user={acceptedApplication?.user}
            />
          )}
        </div>
        <div className="w-full px-10 max-sm:px-5 py-6">
          <div className="w-full flex items-center justify-between">
            <h6 className=" my-5  text-[16px] font-semibold max-sm:text-[13px]">
              Project details
            </h6>
            <div className="flex gap-1 items-center">
              <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-xs whitespace-nowrap">
                Due date
              </p>
              <div className=" flex-c justify-center bg-[#F0FDF5] px-4 py-1 rounded-full">
                <p className="text-[#25C269] font-[500]  max-sm:text-xs whitespace-nowrap">
                  {jobInfo?.dueDate && formatDueDate(jobInfo?.dueDate)}
                </p>
              </div>
            </div>
          </div>
          <p className="  max-sm:text-xs">
            {jobInfo?.description && jobInfo?.description}
            {/* <button className="text-[#25C269]  text-[14px] font-[500] leading-[16px] max-sm:text-xs whitespace-nowrap">
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

export default ActiveJobInfoDetails;
