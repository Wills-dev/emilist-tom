"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
import { useDeleteJob } from "@/hooks/useDeleteJob";
import { useGetDirectJobInfo } from "@/hooks/useGetDirectJobInfo";

import AboutJobOwner from "./AboutJobOwner";
import ConfirmAction from "../DashboardComponents/ConfirmAction";
import ActionDropdown from "../DashboardComponents/ActionDropdown";

interface DirectJobInfoProps {
  jobId: string;
}

const DirectJobInfo = ({ jobId }: DirectJobInfoProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentUser, userLoading } = useContext(AuthContext);

  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [openConfirmActionModal, setOpenConfirmActionModal] = useState(false);

  const { handleDeleteJob, isDeleteLoading } = useDeleteJob();
  const { loading, getJobInfo, jobInfo } = useGetDirectJobInfo();

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
  }, [jobId, currentUser]);

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
          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
            <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5">
              <div className="flex items-center justify-between">
                <h5 className="text-[#000000] text-[30px] leading-[36px] font-semibold max-sm:text-[20px]">
                  {jobInfo?.projectTitle && Capitalize(jobInfo.projectTitle)}
                </h5>
                {jobInfo?.status === "pending" ||
                jobInfo?.status === "amended" ? (
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
                              link={`/dashboard/job/edit/direct/${jobId}`}
                            />
                          )}
                        </AnimatePresence>

                        {/* end of action dropdown */}
                      </div>
                    )}
                  </>
                ) : null}
              </div>
              {currentUser?.unique_id === jobInfo?.userId && (
                <div className="flex items-center gap-3">
                  <Link
                    href="/reports/insights"
                    className="text-primary-green font-[500] max-sm:text-sm py-2  underline"
                  >
                    Insight
                  </Link>
                </div>
              )}
            </div>
            <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 flex flex-col gap-3">
              <h5 className="text-primary-green text-[20px] leading-[28px] font-[500] max-sm:text-[16px]">
                {jobInfo?.category && Capitalize(jobInfo.category)}
              </h5>
              <div className="flex items-center justify-between gap-5 flex-wrap">
                <div className="flex items-center flex-wrap gap-10  max-sm:gap-5 max-lg:w-full">
                  <p className="text-[#5E625F] max-sm:text-xs">
                    Posted{" "}
                    {jobInfo?.createdAt
                      ? formatCreatedAt(jobInfo.createdAt)
                      : "2 days"}
                  </p>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/assets/icons/location.svg"
                      alt="menu"
                      width={20}
                      height={20}
                      className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
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
                      ₦{jobInfo?.budget && numberWithCommas(jobInfo.budget)}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-xs">
                      {jobInfo?.narrow && Capitalize(jobInfo?.narrow)}
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
                      {jobInfo?.milestonesNumber && jobInfo.milestonesNumber}
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
                      {jobInfo?.expertLevel && jobInfo.expertLevel}
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
                      {jobInfo?.projectDuration && jobInfo.projectDuration}{" "}
                      {jobInfo?.DurationType && jobInfo.DurationType}
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
                    <p className="text-[#474C48] max-sm:text-xs">Assignee Id</p>
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
          </div>
          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
            <h4 className="px-10 max-sm:px-5 mb-2 text-[#000000] text-[20px] leading-[28px] font-semibold max-sm:text-[16px]">
              Milestone
            </h4>
            {jobInfo?.milestoneDetails &&
              jobInfo.milestoneDetails.map((milestone: any, index: number) => (
                <div
                  className=" px-10 max-sm:px-5 w-full border-t-[1px] border-[#B8B9B8] "
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
                        <p className="text-[#474C48] max-sm:text-xs">Amount</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-5">
                    <h6 className=" my-5 font-semibold max-sm:text-xs">
                      Milestone details
                    </h6>
                    <p className=" my-5 text-[#303632] max-sm:text-xs">
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

export default DirectJobInfo;
