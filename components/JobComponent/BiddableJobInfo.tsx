"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { getStatusClass } from "@/constants";
import { AuthContext } from "@/utils/AuthState";
import { useDeleteJob } from "@/hooks/useDeleteJob";
import { useAcceptQuote } from "@/hooks/useAcceptQuote";
import { useGetJobInfo } from "@/hooks/useGetJobInfo";
import { useRequestQuote } from "@/hooks/useRequestQuote";
import { useWithdrawApplication } from "@/hooks/useWithdrawApplication";
import { useApplyForBiddableJob } from "@/hooks/useApplyForBiddableJob";
import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";
import { useUpdateApplicationStatus } from "@/hooks/useUpdateApplicationStatus";

import AddQoute from "./AddQoute";
import Applicants from "./Applicants";
import AboutJobOwner from "./AboutJobOwner";
import ChatModal from "../modals/ChatModal";
import PromoteModal from "../modals/PromoteModal";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import ConfirmAction from "../DashboardComponents/ConfirmAction";
import ApplyBiddableJobModal from "../modals/ApplyBiddableJobModal";
import ActionDropdown from "../DashboardComponents/ActionDropdown";
import { getLevelValue } from "@/helpers/getLevelValue";

interface BiddableJobInfoProps {
  jobId: string;
}

const BiddableJobInfo = ({ jobId }: BiddableJobInfoProps) => {
  const { currentUser } = useContext(AuthContext);

  const [openChat, setOpenChat] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState<boolean>(false);
  const [openConfirmActionModal, setOpenConfirmActionModal] = useState(false);

  const { handleDeleteJob, isDeleteLoading } = useDeleteJob();
  const { loading, getJobInfo, jobInfo, analytics } = useGetJobInfo();
  const { requestQuote, requestLoading, rerenderr } = useRequestQuote();
  const { acceptQuote, loadingAcceptQuote, acceptQuoteRerender } =
    useAcceptQuote();
  const { updateApplicationStatus, loadingAccept, acceptRerender } =
    useUpdateApplicationStatus();
  const {
    rerenderWithdraw,
    isWithdrawLoading,
    handleWithdrawApplicationFofJob,
  } = useWithdrawApplication();
  const {
    applyForBiddableJob,
    bidLoading,
    handleSetPercentage,
    setMaxPrice,
    maxPrice,
    milestones,
    handleCancelBidModal,
    openBidModal,
    setOpenBidModal,
    applyRerender,
    handleAchievementChange,
    setMilestones,
    setPercentage,
    percentage,
    handleChange,
  } = useApplyForBiddableJob();

  const toggleActionButton = () => {
    setShowActionDropdown((prev) => !prev);
  };

  const toggleConfirmActionModal = () => {
    setOpenConfirmActionModal((prev) => !prev);
    setShowActionDropdown(false);
  };

  const confirmDeleteJob = () => {
    handleDeleteJob(jobId);
  };

  const showQuoteComponent = jobInfo?.applications?.some((applicant: any) => {
    if (
      applicant?.user?._id === currentUser?._id &&
      jobInfo?.isRequestForQuote
    ) {
      return true;
    } else return false;
  });

  const isApplied = () =>
    jobInfo?.applications?.some(
      (userApplied: any) => userApplied?.user?._id === currentUser?._id
    );

  const currentUserApplication = jobInfo?.applications?.find(
    (applicant: any) => applicant?.user?._id === currentUser?._id
  );

  const onCancelPromoModal = () => {
    setIsPromoModalOpen(false);
  };

  const handleOpen = () => {
    setOpenChat((prev) => !prev);
  };

  useEffect(() => {
    getJobInfo(jobId);
  }, [
    jobId,
    currentUser,
    rerenderr,
    applyRerender,
    acceptRerender,
    rerenderWithdraw,
    acceptQuoteRerender,
  ]);

  return (
    <section className="py-28 bg-[#F0FDF5] min-h-screen">
      <div className=" padding-x">
        <LoadingOverlay loading={requestLoading} />
        <LoadingOverlay loading={loadingAccept} />
        <LoadingOverlay loading={isWithdrawLoading} />
        <LoadingOverlay loading={loadingAcceptQuote} />

        {/* confirm if you want to delete material */}
        <AnimatePresence>
          {openConfirmActionModal && (
            <ConfirmAction
              closeActionModal={toggleConfirmActionModal}
              confirmAction={confirmDeleteJob}
              loading={isDeleteLoading}
              text="Are you sure you want to delete this job?"
            />
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex-c w-full min-h-[70vh] justify-center text-green-500 mt-6">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            {openChat && (
              <div className="absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]"></div>
            )}
            <div className="grid grid-cols-12 py-10 gap-6">
              <AddQoute
                showQuoteComponent={showQuoteComponent}
                jobInfo={jobInfo}
                getJobInfo={getJobInfo}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
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
                <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5">
                  <div className="flex-c-b">
                    <h5 className="text-3xl font-semibold max-sm:text-lg pb-3">
                      {jobInfo?.title && Capitalize(jobInfo.title)}
                    </h5>
                    {jobInfo?.status === "pending" ? (
                      <>
                        {currentUser?._id === jobInfo?.userId?._id && (
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
                                <ActionDropdown
                                  confirmDelete={toggleConfirmActionModal}
                                  link={`/dashboard/job/edit/biddable/${jobId}`}
                                />
                              )}
                            </AnimatePresence>
                            {/* end of action dropdown */}
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  {currentUser?._id === jobInfo?.userId?._id && (
                    <div className="flex-c gap-3">
                      <button
                        className="text-primary-green font-medium max-sm:text-sm py-2  underline"
                        onClick={() => setIsPromoModalOpen(true)}
                      >
                        Promote
                      </button>
                      <Link
                        href="/dashboard/report?r=Insights"
                        className="text-primary-green font-medium max-sm:text-sm py-2  underline"
                      >
                        Insight
                      </Link>
                      <PromoteModal
                        isOpen={isPromoModalOpen}
                        onCancel={onCancelPromoModal}
                      />
                    </div>
                  )}
                </div>
                <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 flex flex-col gap-3">
                  <h5 className="text-primary-green sm:text-lg font-medium ">
                    {jobInfo?.category && Capitalize(jobInfo.category)}
                  </h5>
                  <div className="flex-c-b max-lg:flex-col flex-wrap gap-5">
                    <div className="flex-c gap-10  max-sm:gap-5 max-lg:w-full">
                      <p className="text-[#5E625F] max-sm:text-xs">
                        Posted{" "}
                        {jobInfo?.createdAt &&
                          formatCreatedAt(jobInfo.createdAt)}
                      </p>

                      <p className="max-sm:text-xs">
                        <span className="text-[#1A201B] font-semibold">
                          Job ID:
                        </span>{" "}
                        {jobId && jobId}
                      </p>
                      <p className="max-sm:text-xs">
                        <span className="text-[#1A201B] font-semibold">
                          Job Type:
                        </span>{" "}
                        {jobInfo?.type && jobInfo?.type}
                      </p>
                    </div>
                    {currentUser?._id !== jobInfo?.userId?._id && (
                      <div className="flex items-center max-lg:w-full gap-2">
                        {jobInfo?.status === "pending" ? (
                          <>
                            {isApplied() ? (
                              <button
                                className="bg-[#FF5D7A] px-[20px] py-[12px] text-[#FCFEFD] rounded-lg cursor-pointer font-bold whitespace-nowrap flex-c justify-center max-sm:py-[8px] max-sm:text-sm"
                                onClick={() =>
                                  handleWithdrawApplicationFofJob(
                                    currentUserApplication?._id
                                  )
                                }
                              >
                                withdraw Application
                              </button>
                            ) : (
                              <button
                                className="bg-primary-green px-[20px] py-[12px] text-[#fcfefd] rounded-lg cursor-pointer font-bold whitespace-nowrap flex-c justify-center max-sm:py-[8px] max-sm:text-sm"
                                onClick={() => setOpenBidModal(true)}
                              >
                                Apply
                              </button>
                            )}
                          </>
                        ) : null}

                        <button
                          className="bg-primary-green px-[20px] py-[12px] text-[#fcfefd] rounded-lg cursor-pointer font-bold font-exo whitespace-nowrap flex justify-center items-center  max-sm:py-[8px] max-sm:text-sm"
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

                        <ApplyBiddableJobModal
                          applyForBiddableJob={applyForBiddableJob}
                          bidLoading={bidLoading}
                          milestones={milestones}
                          handleSetPercentage={handleSetPercentage}
                          setMaxPrice={setMaxPrice}
                          maxPrice={maxPrice}
                          handleCancelBidModal={handleCancelBidModal}
                          openBidModal={openBidModal}
                          jobInfo={jobInfo}
                          handleAchievementChange={handleAchievementChange}
                          setMilestones={setMilestones}
                          setPercentage={setPercentage}
                          percentage={percentage}
                          handleChange={handleChange}
                        />

                        {/* chat modal */}
                        {openChat && (
                          <ChatModal
                            handleOpen={handleOpen}
                            user={jobInfo?.userId}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 ">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/assets/icons/location.svg"
                      alt="location"
                      width={20}
                      height={20}
                      className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
                    />
                    <p className="text-[#1A201B] max-sm:text-xs">
                      {jobInfo?.location && Capitalize(jobInfo?.location)}
                    </p>
                  </div>
                </div>
                <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 ">
                  <p className="text-[#303632] max-sm:text-xs">
                    {jobInfo?.description && jobInfo?.description}
                  </p>
                </div>
                <div className="w-full px-10 max-sm:px-5 py-6 ">
                  <div className="grid grid-cols-6 gap-10">
                    <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                      <Image
                        src="/assets/icons/layer.svg"
                        alt="menu"
                        width={20}
                        height={20}
                        className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
                      />
                      <div className="flex flex-col  gap-1">
                        <h6 className="text-lg  font-semibold max-sm:text-sm">
                          {jobInfo?.milestones && jobInfo.milestones?.length}
                        </h6>
                        <p className="text-[#474C48] max-sm:text-xs">
                          Milestone
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                      <Image
                        src="/assets/icons/clock.svg"
                        alt="menu"
                        width={20}
                        height={20}
                        className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                      />
                      <div className="flex flex-col  gap-1">
                        <h6 className="text-lg  font-semibold max-sm:text-sm">
                          {jobInfo?.duration?.number &&
                            jobInfo.duration?.number}{" "}
                          {jobInfo?.duration?.period &&
                            jobInfo.duration?.period}
                        </h6>
                        <p className="text-[#474C48] max-sm:text-xs">
                          Project duration
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                      <Image
                        src="/assets/icons/guru 1.svg"
                        alt="menu"
                        width={20}
                        height={20}
                        className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                      />
                      <div className="flex flex-col  gap-1">
                        <h6 className="text-lg  font-semibold max-sm:text-sm">
                          {jobInfo?.expertLevel &&
                            getLevelValue(jobInfo.expertLevel)}
                        </h6>
                        <p className="text-[#474C48] max-sm:text-xs">
                          Expert level
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                      <Image
                        src="/assets/icons/empty-wallet.svg"
                        alt="menu"
                        width={20}
                        height={20}
                        className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                      />
                      <div className="flex flex-col gap-1">
                        <h6 className="text-lg  font-semibold max-sm:text-sm">
                          {jobInfo?.currency}{" "}
                          {jobInfo?.bidRange &&
                            numberWithCommas(jobInfo.bidRange)}
                        </h6>
                        <p className="text-[#474C48] max-sm:text-xs">
                          Bid range
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                      <Image
                        src="/assets/icons/dollar-circle.svg"
                        alt="menu"
                        width={20}
                        height={20}
                        className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                      />
                      <div className="flex flex-col  gap-1">
                        <h6 className="text-lg  font-semibold max-sm:text-sm">
                          {jobInfo?.currency}{" "}
                          {jobInfo?.maximumPrice &&
                            numberWithCommas(jobInfo.maximumPrice)}{" "}
                        </h6>
                        <p className="text-[#474C48] max-sm:text-xs">
                          Maximum price
                        </p>
                      </div>
                    </div>
                  </div>
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
              <div className="col-span-3 max-lg:hidden max-h-max flex flex-col gap-6">
                <AboutJobOwner jobInfo={jobInfo} analytics={analytics} />
                <Applicants
                  jobInfo={jobInfo}
                  requestQuote={requestQuote}
                  updateApplicationStatus={updateApplicationStatus}
                  acceptQuote={acceptQuote}
                />
              </div>
              <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-lg py-10 ">
                <h4 className="px-10 max-sm:px-5 mb-2 text-lg font-semibold max-sm:text-[16px]">
                  Milestone
                </h4>
                {jobInfo?.milestones &&
                  jobInfo.milestones.map((milestone: any, index: number) => (
                    <div
                      className=" px-10 max-sm:px-5 w-full border-t-1 border-[#B8B9B8] "
                      key={index}
                    >
                      <div className="flex-c-b">
                        <h6 className=" my-5 font-semibold max-sm:text-xs">
                          Milestone {index + 1}
                        </h6>
                        <p
                          className={`px-4 py-1 rounded-full w-fit text-xs ${getStatusClass(
                            milestone.status
                          )} `}
                        >
                          {milestone?.status}
                        </p>
                      </div>

                      <div className="flex  gap-10 max-sm:gap-5">
                        <div className=" flex gap-2">
                          <Image
                            src="/assets/icons/clock.svg"
                            alt="menu"
                            width={20}
                            height={20}
                            className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                          />
                          <div className="flex flex-col  gap-1">
                            <h6 className="text-lg font-semibold max-sm:text-sm">
                              {milestone?.timeFrame?.number}{" "}
                              {milestone?.timeFrame?.period}
                            </h6>
                            <p className="text-[#474C48] max-sm:text-xs">
                              Milestone duration
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
                            <h6 className="text-lg font-semibold max-sm:text-sm">
                              {jobInfo?.currency}{" "}
                              {milestone?.amount &&
                                numberWithCommas(milestone?.amount)}
                            </h6>
                            <p className="text-[#474C48] max-sm:text-xs">
                              Amount
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-5">
                        <h6 className="my-5 font-semibold max-sm:text-xs">
                          Milestone details
                        </h6>
                        <p className=" my-5 text-[#303632] max-sm:text-xs">
                          {milestone?.achievement && milestone?.achievement}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="col-span-12 lg:hidden max-h-max flex flex-col gap-6">
                <AboutJobOwner jobInfo={jobInfo} analytics={analytics} />
                <Applicants
                  jobInfo={jobInfo}
                  requestQuote={requestQuote}
                  updateApplicationStatus={updateApplicationStatus}
                  acceptQuote={acceptQuote}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BiddableJobInfo;
