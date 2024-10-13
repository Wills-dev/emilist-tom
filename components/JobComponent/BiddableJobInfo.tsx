"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { AuthContext } from "@/utils/AuthState";
import { useSaveJob } from "@/hooks/useSaveJob";
import { useUnsaveJob } from "@/hooks/useUnSaveJob";
import { useDeleteJob } from "@/hooks/useDeleteJob";
import { useAcceptQuote } from "@/hooks/useAcceptQuote";
import { useRequestQuote } from "@/hooks/useRequestQuote";
import { useDeleteApplicant } from "@/hooks/useDeleteApplicant";
import { useGetUserSavedJobs } from "@/hooks/useGetUserSavedJobs";
import { useGetBiddableJobInfo } from "@/hooks/useGetBiddableJobInfo";
import { useWithdawApplication } from "@/hooks/useWithdawApplication";
import { useApplyForBiddableJob } from "@/hooks/useApplyForBiddableJob";
import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";
import { useAcceptBiddableApplicant } from "@/hooks/useAcceptBiddableApplicant";

import AddQoute from "./AddQoute";
import Applicants from "./Applicants";
import AboutJobOwner from "./AboutJobOwner";
import ChatModal from "../modals/ChatModal";
import PromoteModal from "../modals/PromoteModal";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import ConfirmAction from "../DashboardComponents/ConfirmAction";
import ApplyBiddableJobModal from "../modals/ApplyBiddableJobModal";
import ActionDropdown from "../DashboardComponents/ActionDropdown";

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

  const { handleSaveJob, rerender } = useSaveJob();
  const { handleUnsaveJob, unsaveRerenderr } = useUnsaveJob();
  const { handleDeleteJob, isDeleteLoading } = useDeleteJob();
  const { loading, getJobInfo, jobInfo } = useGetBiddableJobInfo();
  const { requestQuote, requestLoading, rerenderr } = useRequestQuote();
  const { removeApplicant, loadingRemove, removeRerender } =
    useDeleteApplicant();
  const { acceptQuote, loadingAcceptQuote, acceptQuoteRerender } =
    useAcceptQuote();
  const { saveLoading, allUserSavedJobs, getAllUserSavedJobs } =
    useGetUserSavedJobs();
  const { acceptBiddableApplicant, loadingAccept, acceptRerender } =
    useAcceptBiddableApplicant();
  const {
    rerenderWithdraw,
    isWithdrawLoading,
    handleWithdrawApplicationFofJob,
  } = useWithdawApplication();
  const {
    applyForBiddableJob,
    bidLoading,
    setAmount,
    amount,
    milestoneAmounts,
    milestonePercentage,
    inputCount,
    setInputCount,
    handleMilestonePercentageChange,
    handleCancelBidModal,
    openBidModal,
    setOpenBidModal,
    applyRerender,
    handleBlur,
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

  const showQuoteComponent = jobInfo?.applicants?.some((applicant: any) => {
    if (
      applicant.applicantId === currentUser.unique_id &&
      applicant.isRequestQuote &&
      !applicant?.Quote?.amount
    ) {
      return true;
    } else return false;
  });

  const isApplied = () =>
    jobInfo?.applicants?.some(
      (userApplied: any) => userApplied?.applicantId === currentUser?.unique_id
    );

  const onCancelPromoModal = () => {
    setIsPromoModalOpen(false);
  };

  const handleOpen = () => {
    setOpenChat((prev) => !prev);
  };

  useEffect(() => {
    getJobInfo(jobId);
    getAllUserSavedJobs();
  }, [
    jobId,
    currentUser,
    rerenderr,
    rerender,
    unsaveRerenderr,
    applyRerender,
    acceptRerender,
    rerenderWithdraw,
    removeRerender,
    acceptQuoteRerender,
  ]);

  const isSaved = () =>
    allUserSavedJobs?.some((savedJob: any) => savedJob.id === jobId);

  return (
    <section className="py-28 padding-x bg-[#F0FDF5] min-h-screen">
      <LoadingOverlay loading={requestLoading} />
      <LoadingOverlay loading={loadingAccept} />
      <LoadingOverlay loading={isWithdrawLoading} />
      <LoadingOverlay loading={loadingRemove} />
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

      {loading || saveLoading ? (
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
            <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-lg py-10  max-h-fit">
              <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5">
                <div className="flex-c-b">
                  <h5 className="text-3xl font-semibold max-sm:text-lg pb-3">
                    {jobInfo?.jobTitle && Capitalize(jobInfo.jobTitle)}
                  </h5>
                  {jobInfo?.jobStatus === "pending" ||
                  jobInfo?.jobStatus === "amended" ? (
                    <>
                      {currentUser.unique_id ===
                        jobInfo?.userDetails?.userId && (
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
                {currentUser?.unique_id === jobInfo?.userDetails?.userId && (
                  <div className="flex-c gap-3">
                    <button
                      className="text-primary-green font-medium max-sm:text-sm py-2  underline"
                      onClick={() => setIsPromoModalOpen(true)}
                    >
                      Promote
                    </button>
                    <Link
                      href="/dashboard/report/insights"
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
                      {jobInfo?.date ? formatCreatedAt(jobInfo.date) : "2 days"}
                    </p>
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
                    <p className="max-sm:text-xs">
                      <span className="text-[#1A201B] font-semibold">
                        Job ID:
                      </span>{" "}
                      {jobId && jobId}
                    </p>
                  </div>
                  {currentUser.unique_id !== jobInfo?.userDetails?.userId && (
                    <div className="flex items-center max-lg:w-full gap-2">
                      {jobInfo?.jobStatus === "pending" ||
                      jobInfo?.jobStatus === "amended" ? (
                        <>
                          {isApplied() ? (
                            <button
                              className="bg-[#FF5D7A] px-[20px] py-[12px] text-[#FCFEFD] rounded-lg cursor-pointer font-bold whitespace-nowrap flex-c justify-center max-sm:py-[8px] max-sm:text-sm"
                              onClick={() =>
                                handleWithdrawApplicationFofJob(
                                  jobId,
                                  "biddable"
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

                      {isSaved() ? (
                        <button
                          className=" px-[20px] py-[12px] border-1 border-red-500 rounded-lg cursor-pointer font-bold font-exo whitespace-nowrap flex-c justify-center max-sm:py-[8px] max-sm:text-sm text-red-500"
                          onClick={() => handleUnsaveJob(jobId)}
                        >
                          Unsave
                        </button>
                      ) : (
                        <button
                          className=" px-[20px] py-[12px] border-1 rounded-lg cursor-pointer font-bold font-exo whitespace-nowrap flex-c justify-center max-sm:py-[8px] max-sm:text-sm"
                          onClick={() => handleSaveJob(jobId)}
                        >
                          Save
                        </button>
                      )}
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
                        setAmount={setAmount}
                        amount={amount}
                        milestoneAmounts={milestoneAmounts}
                        milestonePercentage={milestonePercentage}
                        handleMilestonePercentageChange={
                          handleMilestonePercentageChange
                        }
                        handleCancelBidModal={handleCancelBidModal}
                        openBidModal={openBidModal}
                        jobInfo={jobInfo}
                        handleBlur={handleBlur}
                        inputCount={inputCount}
                        setInputCount={setInputCount}
                      />

                      {/* chat modal */}
                      {openChat && <ChatModal handleOpen={handleOpen} />}
                    </div>
                  )}
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
                        {jobInfo?.milestoneNumber && jobInfo.milestoneNumber}
                      </h6>
                      <p className="text-[#474C48] max-sm:text-xs">Milestone</p>
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
                        {jobInfo?.projectDuration && jobInfo.projectDuration}
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
                        {jobInfo?.expertLevel && jobInfo.expertLevel}
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
                        ₦{" "}
                        {jobInfo?.bidRange &&
                          numberWithCommas(jobInfo.bidRange)}
                      </h6>
                      <p className="text-[#474C48] max-sm:text-xs">Bid range</p>
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
                        ₦{" "}
                        {jobInfo?.maxPrice &&
                          numberWithCommas(jobInfo.maxPrice)}{" "}
                      </h6>
                      <p className="text-[#474C48] max-sm:text-xs">
                        Maximum price
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 max-lg:hidden max-h-max flex flex-col gap-6">
              <AboutJobOwner jobInfo={jobInfo} />
              <Applicants
                jobInfo={jobInfo}
                requestQuote={requestQuote}
                acceptBiddableApplicant={acceptBiddableApplicant}
                removeApplicant={removeApplicant}
                acceptQuote={acceptQuote}
              />
            </div>
            <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-lg py-10 ">
              <h4 className="px-10 max-sm:px-5 mb-2 text-lg font-semibold max-sm:text-[16px]">
                Milestone
              </h4>
              {jobInfo?.milestoneDetails &&
                jobInfo.milestoneDetails.map(
                  (milestone: any, index: number) => (
                    <div
                      className=" px-10 max-sm:px-5 w-full border-t-1 border-[#B8B9B8] "
                      key={index}
                    >
                      <h6 className=" my-5 font-semibold max-sm:text-xs">
                        Milestone {index + 1}
                      </h6>
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
                              {milestone?.milestoneDuration &&
                                milestone?.milestoneDuration}
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
                              ₦
                              {milestone?.milestoneAmount &&
                                numberWithCommas(milestone?.milestoneAmount)}
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
                          {milestone?.milestoneDescription &&
                            milestone?.milestoneDescription}
                        </p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default BiddableJobInfo;
