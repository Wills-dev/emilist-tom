"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { AuthContext } from "@/utils/AuthState";
import { useDeleteJob } from "@/hooks/useDeleteJob";
import { useApplyForJob } from "@/hooks/useApplyForJob";
import { useAcceptQuote } from "@/hooks/useAcceptQuote";
import { useRequestQuote } from "@/hooks/useRequestQuote";
import { useDeleteApplicant } from "@/hooks/useDeleteApplicant";
import { useGetRegularJobInfo } from "@/hooks/useGetRegularJobInfo";
import { useWithdrawApplication } from "@/hooks/useWithdrawApplication";
import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";
import { useAcceptRegularApplicant } from "@/hooks/useAcceptRegularApplicant";

import AboutJobOwner from "./AboutJobOwner";
import QuoteModal from "../modals/QuoteModal";
import PromoteModal from "../modals/PromoteModal";
import RegularApplicants from "./RegularApplicants";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import ConfirmAction from "../DashboardComponents/ConfirmAction";
import ActionDropdown from "../DashboardComponents/ActionDropdown";

interface RegularJobInfoProps {
  jobId: string;
}

const RegularJobInfo = ({ jobId }: RegularJobInfoProps) => {
  const { currentUser, userLoading } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState<boolean>(false);
  const [openConfirmActionModal, setOpenConfirmActionModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { loading, getJobInfo, jobInfo } = useGetRegularJobInfo();
  const { handleApplyFofJob, isLoading, rerender } = useApplyForJob();
  const { requestQuote, requestLoading, rerenderr } = useRequestQuote();
  const { acceptQuote, loadingAcceptQuote, acceptQuoteRerender } =
    useAcceptQuote();
  const {
    rerenderWithdraw,
    isWithdrawLoading,
    handleWithdrawApplicationFofJob,
  } = useWithdrawApplication();

  const { acceptRegularApplicant, loadingAccept, acceptRerender } =
    useAcceptRegularApplicant();
  const { handleDeleteJob, isDeleteLoading } = useDeleteJob();
  const { removeApplicant, loadingRemove, removeRerender } =
    useDeleteApplicant();

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

  const showQuoteComponent = jobInfo?.Applicants?.some((applicant: any) => {
    if (
      applicant.applicantId === currentUser.unique_id &&
      applicant.isRequestQuote &&
      !applicant?.Quote?.amount
    ) {
      return true;
    } else return false;
  });

  const isApplied = () =>
    jobInfo?.Applicants?.some(
      (userApplied: any) => userApplied?.applicantId === currentUser?.unique_id
    );

  const onCancelPromoModal = () => {
    setIsPromoModalOpen(false);
  };

  useEffect(() => {
    getJobInfo(jobId);
  }, [
    jobId,
    currentUser,
    rerender,
    rerenderr,
    rerenderWithdraw,
    acceptRerender,
    removeRerender,
    acceptQuoteRerender,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowActionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="py-28 padding-x bg-[#F0FDF5] w-full min-h-screen">
      <LoadingOverlay loading={isLoading} />
      <LoadingOverlay loading={isWithdrawLoading} />
      <LoadingOverlay loading={loadingAccept} />
      <LoadingOverlay loading={loadingRemove} />
      <LoadingOverlay loading={requestLoading} />
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

      {loading || userLoading ? (
        <div className="flex w-full min-h-[70vh] item-center justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          {showQuoteComponent && (
            <div className="col-span-12 ">
              <div className="flex justify-between items-center bg-[#DDFBE9] border-primary-green border-1 px-[3rem] py-2 rounded-lg max-sm:flex-col max-md:px-[1rem] max-sm:px-[0.5rem]  gap-2 text-center w-full">
                {" "}
                <p className="max-sm:text-xs">
                  The Job Posted requested for a quote
                </p>{" "}
                <button
                  className="bg-primary-green px-[18px] py-[5px] text-[#f6fdf9] rounded cursor-pointer whitespace-nowrap max-sm:text-xs"
                  onClick={() => setOpenModal(true)}
                >
                  Add Quote
                </button>
                {/* quote modal */}
                <QuoteModal
                  isOpen={openModal}
                  onCancel={() => setOpenModal(false)}
                  jobInfo={jobInfo}
                  getJobInfo={getJobInfo}
                />
              </div>
            </div>
          )}
          <div className="col-span-9 max-lg:col-span-12 flex flex-col w-full bg-white rounded-lg py-10 ">
            <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5">
              <div className="flex-c-b">
                <h5 className="text-3xl font-semibold max-sm:text-lg">
                  {jobInfo?.jobTitle && Capitalize(jobInfo.jobTitle)}
                </h5>
                {jobInfo?.jobStatus === "pending" ||
                jobInfo?.jobStatus === "amended" ? (
                  <>
                    {currentUser?.unique_id ===
                      jobInfo?.userDetails?.userId && (
                      <div className="block relative" ref={dropdownRef}>
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
                              link={`/dashboard/job/edit/regular/${jobId}`}
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
                <div className="flex items-center gap-3">
                  <button
                    className="text-primary-green  font-medium max-sm:text-sm py-2 underline"
                    onClick={() => setIsPromoModalOpen(true)}
                  >
                    Promote
                  </button>
                  <Link
                    href="/reports/insights"
                    className="text-primary-green  font-medium max-sm:text-sm py-2 underline"
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
              <h5 className="text-primary-green sm:text-lg font-medium ]">
                {jobInfo?.Category && Capitalize(jobInfo.Category)}
              </h5>
              <div className="flex items-center justify-between gap-5 flex-wrap">
                <div className="flex items-center flex-wrap gap-10  max-sm:gap-5 max-lg:w-full">
                  <p className="text-[#5E625F] max-sm:text-xs">
                    Posted{" "}
                    {jobInfo?.Date ? formatCreatedAt(jobInfo.Date) : "2 days"}
                  </p>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/assets/icons/location.svg"
                      alt="menu"
                      width={20}
                      height={20}
                      className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                    />
                    <p className="text-[#1A201B]   max-sm:text-xs">
                      {jobInfo?.Location && Capitalize(jobInfo?.Location)}
                    </p>
                  </div>
                  <p className="  max-sm:text-xs">
                    <span className="text-[#1A201B] font-semibold">
                      Job ID:
                    </span>{" "}
                    {jobId && jobId}
                  </p>
                </div>
                {currentUser?.unique_id !== jobInfo?.userDetails?.userId && (
                  <>
                    {jobInfo?.jobStatus === "pending" ||
                    jobInfo?.jobStatus === "amended" ? (
                      <>
                        {isApplied() ? (
                          <div className="flex items-center  max-lg:w-full gap-2">
                            <button
                              className="bg-[#FF5D7A] px-[20px] py-[12px] text-[#FCFEFD] rounded-lg cursor-pointer font-bold whitespace-nowrap flex-c justify-center  max-sm:py-[8px] max-sm:text-sm"
                              onClick={() =>
                                handleWithdrawApplicationFofJob(
                                  jobId,
                                  "regular"
                                )
                              }
                            >
                              withdraw Application
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center max-lg:w-full gap-2">
                            <button
                              className="bg-primary-green px-[20px] py-[12px] text-[#fcfefd] rounded-lg cursor-pointer font-bold whitespace-nowrap flex-c justify-center max-sm:py-[8px] max-sm:text-sm"
                              onClick={() => handleApplyFofJob(jobId)}
                            >
                              Apply
                            </button>
                          </div>
                        )}
                      </>
                    ) : null}
                  </>
                )}
              </div>
            </div>
            <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 ">
              <p className="text-[#303632]   max-sm:text-xs">
                {jobInfo?.Description && jobInfo?.Description}
              </p>
            </div>
            <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 ">
              <div className="grid grid-cols-6 gap-10">
                <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                  <Image
                    src="/assets/icons/empty-wallet.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col gap-1">
                    <h6 className="text-lg font-semibold max-sm:text-sm">
                      ₦{jobInfo?.Amount && numberWithCommas(jobInfo.Amount)}
                    </h6>
                    <p className="text-[#474C48]   max-sm:text-xs">
                      {jobInfo?.service && Capitalize(jobInfo?.service)}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                  <Image
                    src="/assets/icons/layer.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col  gap-1">
                    <h6 className="text-lg font-semibold max-sm:text-sm">
                      {jobInfo?.milestoneNumber && jobInfo.milestoneNumber}
                    </h6>
                    <p className="text-[#474C48]   max-sm:text-xs">Milestone</p>
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
                    <h6 className="text-lg font-semibold max-sm:text-sm">
                      {jobInfo?.expertLevel && jobInfo.expertLevel}
                    </h6>
                    <p className="text-[#474C48]   max-sm:text-xs">
                      Expert level
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
                    <h6 className="text-lg font-semibold max-sm:text-sm">
                      {jobInfo?.projectDuration && jobInfo.projectDuration}
                    </h6>
                    <p className="text-[#474C48]   max-sm:text-xs">
                      Project duration
                    </p>
                  </div>
                </div>
                <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                  <Image
                    src="/assets/icons/user.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col  gap-1">
                    <h6 className="text-lg font-semibold max-sm:text-sm">
                      {jobInfo?.Applicants ? jobInfo.Applicants?.length : 0}
                    </h6>
                    <p className="text-[#474C48]   max-sm:text-xs">
                      Applicants
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-10 max-sm:px-5 py-6 w-full">
              <h6 className="text-lg font-semibold max-sm:text-sm font-inter">
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
          <div className="col-span-3 max-lg:hidden max-h-max flex flex-col gap-6">
            <AboutJobOwner jobInfo={jobInfo} />
            <RegularApplicants
              jobInfo={jobInfo}
              requestQuote={requestQuote}
              acceptRegularApplicant={acceptRegularApplicant}
              removeApplicant={removeApplicant}
              acceptQuote={acceptQuote}
            />
          </div>
          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
            <h4 className="px-10 max-sm:px-5 mb-2 text-[#000000] text-[20px] font-semibold max-sm:text-[16px]">
              Milestone
            </h4>
            {jobInfo?.milestoneDetails &&
              jobInfo.milestoneDetails.map((milestone: any, index: number) => (
                <div
                  className=" px-10 max-sm:px-5 w-full border-t-[1px] border-[#B8B9B8] "
                  key={index}
                >
                  <h6 className=" my-5  font-semibold max-sm:text-[13px]">
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
                        <p className="text-[#474C48]   max-sm:text-xs">
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
                        <p className="text-[#474C48]   max-sm:text-xs">
                          Amount
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-5">
                    <h6 className=" my-5  font-semibold max-sm:text-[13px]">
                      Milestone details
                    </h6>
                    <p className=" my-5 text-[#303632]   max-sm:text-xs">
                      {milestone?.milestoneDescription &&
                        milestone?.milestoneDescription}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default RegularJobInfo;
