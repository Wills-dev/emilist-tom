"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { numberWithCommas } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
import { usePauseJob } from "@/hooks/usePauseJob";
import { useResumeJob } from "@/hooks/useResumeJob";
import { useGetRegularJobInfo } from "@/hooks/useGetRegularJobInfo";
import { useUpdateMilestoneStatus } from "@/hooks/useUpdateMilestoneStatus";
import { useUploadInvoiceForMilestone } from "@/hooks/useUploadInvoiceForMilestone";

import ActiveProjectInfo from "./ActiveProjectInfo";
import MilestonInputInvoice from "./MilestonInputInvoice";
import MilestoneInvoiceModal from "../modals/MilestoneInvoiceModal";

interface ProjectProjectDetailProps {
  jobId: string;
}

const RegularProjectDetail = ({ jobId }: ProjectProjectDetailProps) => {
  const { currentUser } = useContext(AuthContext);

  const { updateStatus, loadStatus, rerenderrr } = useUpdateMilestoneStatus();
  const { resumeJob, loadResume, rerenderr } = useResumeJob();
  const { pauseJob, loadPause, rerender } = usePauseJob();
  const {
    loading,
    getJobInfo,
    jobInfo,
    currentMilestone,
    setCurrentMilestone,
  } = useGetRegularJobInfo();
  const {
    uploadInvoice,
    loadInvoice,
    handleChange,
    rerenderrrr,
    invoiceDetails,
    setOpenInvoice,
    openInvoice,
  } = useUploadInvoiceForMilestone();

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [currentInvoiceDetails, setCurrentInvoiceDetails] = useState<any>({});

  useEffect(() => {
    getJobInfo(jobId);
  }, [jobId, currentUser, rerenderrr, rerenderrrr, rerender, rerenderr]);

  const hasInvoice = jobInfo?.milestoneDetails?.some((obj: any) =>
    obj.hasOwnProperty("invoice")
  );

  const handleOpenInvoiceDetails = (invoiceDetails: any) => {
    setCurrentInvoiceDetails(invoiceDetails);
    setOpenModal(true);
  };

  return (
    <section className="py-28 padding-x bg-[#F0FDF5]">
      {loadResume ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-60 bg-white z-50"></div>
      ) : null}
      {loadStatus ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-60 bg-white z-50"></div>
      ) : null}
      {loading ? (
        <div className="flex w-full min-h-[70vh] item-center justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          <ActiveProjectInfo
            jobInfo={jobInfo}
            jobId={jobId}
            applicantId={currentUser.unique_id}
            resumeJob={resumeJob}
            pauseJob={pauseJob}
            loadPause={loadPause}
          />
          {/* invoice web view */}
          {hasInvoice && (
            <div className="col-span-3 max-lg:hidden max-h-max">
              <div className=" bg-white w-full rounded-lg py-10 px-5">
                <h5 className="text-lg font-semibold max-sm:text-sm mb-2">
                  Invoice
                </h5>
                <div className=" flex flex-col  gap-4 ">
                  {jobInfo?.milestoneDetails.map(
                    (milestone: any, index: number) => (
                      <div key={index}>
                        {milestone?.invoice?.accountNumber && (
                          <button
                            className="w-full flex items-center justify-between bg-[#054753] rounded-lg h-[48px] px-4 text-[#FCFEFD] text-sm font-medium"
                            onClick={() =>
                              handleOpenInvoiceDetails(milestone.invoice)
                            }
                          >
                            Milestone {index + 1} invoice
                            <Image
                              src="/assets/icons/arrow-right-2.svg"
                              alt="menu"
                              width={20}
                              height={20}
                              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                            />
                          </button>
                        )}
                      </div>
                    )
                  )}

                  <MilestoneInvoiceModal
                    isOpen={isOpenModal}
                    onCancel={() => setOpenModal(false)}
                    invoiceDetails={currentInvoiceDetails}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-lg py-10 ">
            <ul className="flex items-center flex-wrap gap-4   px-10 max-sm:px-5">
              {jobInfo?.milestoneDetails?.map(
                (milestoneInfo: any, i: number) => (
                  <li
                    key={i}
                    className={`${
                      milestoneInfo.milestoneId ===
                      currentMilestone?.milestoneId
                        ? "text-primary-green  border-b-primary-green border-b-2"
                        : "text-[#737774]"
                    }  font-exo text-base font-semibold capitalize cursor-pointer max-sm:text-sm`}
                    onClick={() => setCurrentMilestone(milestoneInfo)}
                  >
                    Milestone {i + 1}
                  </li>
                )
              )}
            </ul>
            <div className="w-full px-10 max-sm:px-5 py-6">
              <div className="w-full flex items-center justify-between">
                <h6 className=" my-5  font-semibold max-sm:text-xs">Details</h6>
                <div className="flex gap-1 items-center">
                  <p className="text-[#5E625F]  text-sm font-medium max-sm:text-xs whitespace-nowrap">
                    Due date
                  </p>
                  <div className=" flex items-center justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-[20px]">
                    <p className="text-[#25C269]  text-sm font-medium max-sm:text-xs whitespace-nowrap">
                      3 days
                    </p>
                  </div>
                </div>
              </div>
              <p className="  font-[400] max-sm:text-xs">
                {currentMilestone?.milestoneDescription &&
                  currentMilestone?.milestoneDescription}
                <button className="text-[#25C269]  text-sm font-medium max-sm:text-xs whitespace-nowrap">
                  see more
                </button>
              </p>
            </div>
            <div className=" px-10 max-sm:px-5 w-full  ">
              <div className="flex  gap-10 max-sm:gap-5 border-b-[1px] border-[#B8B9B8] py-6">
                <div className=" flex gap-2">
                  <Image
                    src="/assets/icons/clock.jpg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col  gap-1">
                    <h6 className=" text-lg font-semibold max-sm:text-sm">
                      {currentMilestone?.milestoneDuration &&
                        currentMilestone?.milestoneDuration}
                    </h6>
                    <p className="text-[#474C48] font-[400] max-sm:text-xs">
                      Milestone duration
                    </p>
                  </div>
                </div>
                <div className=" flex gap-2">
                  <Image
                    src="/assets/icons/empty-wallet.jpg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col gap-1">
                    <h6 className=" text-lg font-semibold max-sm:text-sm">
                      ₦
                      {currentMilestone?.milestoneAmount &&
                        numberWithCommas(currentMilestone?.milestoneAmount)}
                    </h6>
                    <p className="text-[#474C48] font-[400] max-sm:text-xs">
                      Amount
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {currentMilestone.milestoneStatus === "ongoing" ? (
              <div className="flex flex-col  px-10 max-sm:px-5 w-full py-6">
                <div className="flex items-center gap-2">
                  <p className=" text-[#303632] font-medium max-sm:text-xs">
                    Milestone completed
                  </p>
                  <Image
                    src="/assets/icons/checkbox.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
                    onClick={() =>
                      updateStatus(jobId, currentMilestone?.milestoneId)
                    }
                  />
                </div>
                <div className="py-8">
                  <button className="bg-[#A2A4A2] rounded-lg w-[148px] h-[52px] text-[#FCFEFD] font-bold max-sm:w-[120px] max-sm:h-[38px] max-sm:text-sm ">
                    Enter Invoice
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col  px-10 max-sm:px-5 w-full py-6">
                <div className="flex items-center gap-2">
                  <p className=" text-[#303632] font-medium max-sm:text-xs">
                    Milestone completed
                  </p>
                  <Image
                    src="/assets/icons/tick-square.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer "
                  />
                </div>

                <div className="py-8">
                  <button
                    className="bg-primary-green rounded-lg w-[148px] h-[52px] text-[#FCFEFD] font-bold max-sm:w-[120px] max-sm:h-[38px] max-sm:text-sm"
                    onClick={() => setOpenInvoice(true)}
                  >
                    Enter Invoice
                  </button>

                  {/* invoice input modal */}
                  <MilestonInputInvoice
                    isOpen={openInvoice}
                    onCancel={() => setOpenInvoice(false)}
                    uploadInvoice={uploadInvoice}
                    loadInvoice={loadInvoice}
                    handleChange={handleChange}
                    invoiceDetails={invoiceDetails}
                    milestoneId={currentMilestone.milestoneId}
                    milestoneAmount={currentMilestone.milestoneAmount}
                    jobId={jobId}
                  />
                </div>
              </div>
            )}
          </div>
          {/* invoice mobile view */}
          {hasInvoice && (
            <div className="col-span-3 max-lg:col-span-5 max-md:col-span-8 max-sm:col-span-12 lg:hidden max-h-max">
              <div className=" bg-white w-full rounded-lg py-10 px-5">
                <h5 className="text-lg font-semibold max-sm:text-sm mb-2">
                  Invoice
                </h5>
                <div className=" flex flex-col  gap-4 ">
                  {jobInfo?.milestoneDetails.map(
                    (milestone: any, index: number) => (
                      <div key={index}>
                        {milestone?.invoice?.accountNumber && (
                          <button
                            className="w-full flex-c-b bg-[#054753] rounded-lg h-[48px] px-4 text-[#FCFEFD] text-sm font-medium"
                            onClick={() =>
                              handleOpenInvoiceDetails(milestone.invoice)
                            }
                          >
                            Milestone {index + 1} invoice
                            <Image
                              src="/assets/icons/arrow-right-2.svg"
                              alt="menu"
                              width={20}
                              height={20}
                              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                            />
                          </button>
                        )}
                      </div>
                    )
                  )}

                  <MilestoneInvoiceModal
                    isOpen={isOpenModal}
                    onCancel={() => setOpenModal(false)}
                    invoiceDetails={currentInvoiceDetails}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default RegularProjectDetail;
