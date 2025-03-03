"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { getStatusClass } from "@/constants";
import { AuthContext } from "@/utils/AuthState";
import { useDeleteJob } from "@/hooks/useDeleteJob";
import { useAcceptDirectJob } from "@/hooks/useAcceptDirectJob";
import { useGetJobInfo } from "@/hooks/useGetJobInfo";
import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";

import AboutJobOwner from "./AboutJobOwner";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import ConfirmAction from "../DashboardComponents/ConfirmAction";
import ActionDropdown from "../DashboardComponents/ActionDropdown";
import AcceptDirectJobModal from "../modals/AcceptDirectJobModal";

interface DirectJobInfoProps {
  jobId: string;
}

const DirectJobInfo = ({ jobId }: DirectJobInfoProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentUser, userLoading } = useContext(AuthContext);

  const [bizModal, setBizModal] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [openConfirmActionModal, setOpenConfirmActionModal] = useState(false);

  const { handleDeleteJob, isDeleteLoading } = useDeleteJob();
  const { loading, getJobInfo, jobInfo, analytics } = useGetJobInfo();
  const { handleAcceptDirectJob, isLoad, rerender } = useAcceptDirectJob();

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

  useEffect(() => {
    getJobInfo(jobId);
  }, [jobId, currentUser, rerender]);

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
      <LoadingOverlay loading={isLoad} />
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
          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-lg pb-10 max-h-fit">
            <div className="flex justify-end pt-4 pb-10  px-10 max-sm:px-5">
              <p
                className={`px-4 py-1 rounded-full w-fit text-xs ${
                  jobInfo.status && getStatusClass(jobInfo.status)
                } `}
              >
                {jobInfo?.status}
              </p>
            </div>
            <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5">
              <div className="flex items-center justify-between gap-10">
                <h5 className="text-3xl font-semibold max-sm:text-lg">
                  {jobInfo?.title && Capitalize(jobInfo.title)}
                </h5>
                {jobInfo?.status === "pending" ? (
                  <>
                    {currentUser?._id === jobInfo?.userId?._id && (
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
                              link={`/dashboard/job/edit/direct/${jobId}`}
                            />
                          )}
                        </AnimatePresence>

                        {/* end of action dropdown */}
                      </div>
                    )}
                  </>
                ) : null}
                {jobInfo?.applications?.length > 0 &&
                  currentUser?._id === jobInfo?.applications[0]?.user?._id && (
                    <>
                      {jobInfo?.status === "pending" && (
                        <div className="flex gap-2 flex-wrap">
                          <button
                            className="text-sm bg-primary-green text-white hover:bg-green-600 whitespace-nowrap transition-all duration-300 rounded-lg px-4 py-2 text-center mb-4"
                            onClick={() => setBizModal(true)}
                          >
                            Accept job
                          </button>
                          <button
                            className="bg-red-500 text-white hover:bg-red-600 whitespace-nowrap transition-all duration-300 rounded-lg px-4 py-2 text-center mb-4 text-sm"
                            onClick={() =>
                              handleAcceptDirectJob(
                                jobInfo?.applications[0]?._id,
                                "rejected"
                              )
                            }
                          >
                            Reject job
                          </button>
                          <AcceptDirectJobModal
                            isOpen={bizModal}
                            onCancel={() => setBizModal(false)}
                            AcceptDirectJob={handleAcceptDirectJob}
                            applicationId={jobInfo?.applications[0]?._id}
                          />
                        </div>
                      )}
                    </>
                  )}
              </div>
              {currentUser?._id === jobInfo?.userId?._id && (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard/report?r=Insights"
                    className="text-primary-green  font-medium max-sm:text-sm py-2 underline"
                  >
                    Insight
                  </Link>
                </div>
              )}
            </div>
            <div className="w-full  px-10 max-sm:px-5 py-6 flex flex-col gap-3">
              <h5 className="text-primary-green text-[20px] leading-[28px] font-[500] max-sm:text-[16px]">
                {jobInfo?.category && Capitalize(jobInfo.category)}
              </h5>
              <div className="flex items-center justify-between gap-5 flex-wrap">
                <div className="flex items-center flex-wrap gap-10  max-sm:gap-5 max-lg:w-full">
                  <p className="text-[#5E625F] max-sm:text-xs">
                    Posted{" "}
                    {jobInfo?.createdAt && formatCreatedAt(jobInfo.createdAt)}
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
                      {jobInfo?.currency}{" "}
                      {jobInfo?.budget && numberWithCommas(jobInfo.budget)}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-xs">
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
                      {jobInfo?.milestones && jobInfo.milestones?.length}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-xs">Milestone</p>
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
                      {jobInfo?.expertLevel && jobInfo.expertLevel === "one"
                        ? 1
                        : jobInfo.expertLevel === "two"
                        ? 2
                        : jobInfo.expertLevel === "three"
                        ? 3
                        : jobInfo.expertLevel === "four"
                        ? 4
                        : null}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-xs">
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
                      {jobInfo?.duration?.number && jobInfo.duration?.number}{" "}
                      {jobInfo?.duration?.period && jobInfo.duration?.period}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-xs">
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
                      {jobInfo?.invite}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-xs">Assignee</p>
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
                      className="object-cover w-[61px] h-[70px] max-sm:w-[40px] max-sm:h-[40px]"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="col-span-3 max-lg:hidden max-h-max flex flex-col gap-6">
            <AboutJobOwner jobInfo={jobInfo} analytics={analytics} />
          </div>
          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
            <h4 className="px-10 max-sm:px-5 mb-2 text-[#000000] text-[20px] leading-[28px] font-semibold max-sm:text-[16px]">
              Milestone
            </h4>
            {jobInfo?.milestones &&
              jobInfo.milestones.map((milestone: any, index: number) => (
                <div
                  className=" px-10 max-sm:px-5 w-full border-t-[1px] border-[#B8B9B8] "
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
                          {jobInfo?.currency}{" "}
                          {milestone?.amount &&
                            numberWithCommas(milestone?.amount)}
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
                      {milestone?.achievement && milestone?.achievement}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="max-lg:col-span-12 lg:hidden max-h-max flex flex-col gap-6">
            <AboutJobOwner jobInfo={jobInfo} analytics={analytics} />
          </div>
        </div>
      )}
    </section>
  );
};

export default DirectJobInfo;
