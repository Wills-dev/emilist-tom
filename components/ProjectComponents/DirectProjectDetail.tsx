"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { numberWithCommas } from "@/helpers";
import { getStatusClass } from "@/constants";
import { AuthContext } from "@/utils/AuthState";
import { useGetJobInfo } from "@/hooks/useGetJobInfo";
import { useUploadInvoiceForMilestone } from "@/hooks/useUploadInvoiceForMilestone";

import ActiveProjectInfo from "./ActiveProjectInfo";
import MilestonInputInvoice from "./MilestonInputInvoice";
import MilestoneInvoiceModal from "../modals/MilestoneInvoiceModal";

interface DirectProjectDetailProps {
  jobId: string;
}

const DirectProjectDetail = ({ jobId }: DirectProjectDetailProps) => {
  const { currentUser } = useContext(AuthContext);

  const [isOpenModal, setOpenModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [currentInvoiceDetails, setCurrentInvoiceDetails] = useState<any>({});

  const {
    loading,
    getJobInfo,
    jobInfo,
    currentMilestone,
    setCurrentMilestone,
  } = useGetJobInfo();

  const {
    uploadInvoice,
    loadInvoice,
    handleChange,
    rerenderrrr,
    invoiceDetails,
    setOpenInvoice,
    openInvoice,
  } = useUploadInvoiceForMilestone();

  const toggleUpdateStatus = () => {
    setUpdateStatus((prev) => !prev);
  };

  const hasInvoice = jobInfo?.milestones?.some((obj: any) =>
    obj.hasOwnProperty("accountDetails")
  );

  const handleOpenInvoiceDetails = (invoiceDetails: any) => {
    setCurrentInvoiceDetails(invoiceDetails);
    setOpenModal(true);
  };

  useEffect(() => {
    getJobInfo(jobId);
  }, [jobId, currentUser, rerenderrrr]);
  return (
    <section className="py-28 padding-x bg-[#F0FDF5]">
      {loading ? (
        <div className="flex w-full min-h-[70vh] item-center justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          <ActiveProjectInfo jobInfo={jobInfo} jobId={jobId} />
          {/* invoice web view */}
          {hasInvoice && (
            <div className="col-span-3 max-lg:hidden max-h-max">
              <div className=" bg-white w-full rounded-lg py-10 px-5">
                <h5 className="text-lg font-semibold max-sm:text-sm mb-2">
                  Invoice
                </h5>
                <div className=" flex flex-col  gap-4 ">
                  {jobInfo?.milestones?.map((milestone: any, index: number) => (
                    <div key={index}>
                      {milestone?.accountDetails && (
                        <button
                          className="w-full flex-c-b bg-[#054753] rounded-lg h-[48px] px-4 text-[#FCFEFD] text-sm font-medium"
                          onClick={() => handleOpenInvoiceDetails(milestone)}
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
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="col-span-9 max-lg:col-span-12 flex flex-col w-full bg-white rounded-lg py-10 ">
            <ul className="flex items-center flex-wrap gap-4   px-10 max-sm:px-5">
              {jobInfo?.milestones?.map((milestoneInfo: any, i: number) => (
                <li
                  key={i}
                  className={`${
                    milestoneInfo._id === currentMilestone?._id
                      ? "text-primary-green  border-b-primary-green border-b-2"
                      : "text-[#737774]"
                  }  font-semibold capitalize cursor-pointer max-sm:text-sm`}
                  onClick={() => setCurrentMilestone(milestoneInfo)}
                >
                  Milestone {i + 1}
                </li>
              ))}
            </ul>
            <div className="w-full px-10 max-sm:px-5 py-6">
              <div className="w-full flex-c-b">
                <h6 className=" my-5 font-semibold max-sm:font-xs">Details</h6>
                <div className="flex flex-col gap-2 ">
                  <div className="flex justify-end">
                    <p
                      className={`px-4 py-1 rounded-full w-fit text-xs ${getStatusClass(
                        currentMilestone.status
                      )} `}
                    >
                      {currentMilestone?.status}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="text-[#5E625F] text-sm font-medium max-sm:text-xs whitespace-nowrap">
                      Due date
                    </p>
                    <div className=" flex items-center justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-[20px]">
                      <p className="text-[#25C269]  text-sm font-medium max-sm:text-xs whitespace-nowrap">
                        3 days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="max-sm:text-sm">
                {currentMilestone?.achievement && currentMilestone?.achievement}
              </p>
            </div>
            <div className=" px-10 max-sm:px-5 w-full  ">
              <div className="flex  gap-10 max-sm:gap-5 border-b-1 border-[#B8B9B8] py-6">
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
                      {currentMilestone?.timeFrame?.number}{" "}
                      {currentMilestone?.timeFrame?.period}
                    </h6>
                    <p className="text-[#474C48] font-[400] max-sm:text-xs">
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
                      {currentMilestone?.amount &&
                        numberWithCommas(currentMilestone?.amount)}
                    </h6>
                    <p className="text-[#474C48]  max-sm:text-xs">Amount</p>
                  </div>
                </div>
              </div>
            </div>

            {!updateStatus && currentMilestone?.status !== "completed" ? (
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
                    onClick={toggleUpdateStatus}
                  />
                </div>
                <div className="py-8">
                  <button className="bg-[#A2A4A2] rounded-lg w-[148px] h-[52px] text-[#FCFEFD] font-bold max-sm:w-[120px] max-sm:h-[38px] max-sm:text-sm cursor-not-allowed ">
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
                    onClick={toggleUpdateStatus}
                  />
                </div>

                <div className="py-8">
                  {!currentMilestone?.accountDetails && (
                    <button
                      className="bg-primary-green rounded-lg w-[148px] h-[52px] text-[#FCFEFD] font-bold max-sm:w-[120px] max-sm:h-[38px] max-sm:text-sm"
                      onClick={() => setOpenInvoice(true)}
                    >
                      Enter Invoice
                    </button>
                  )}

                  {/* invoice input modal */}
                  <MilestonInputInvoice
                    isOpen={openInvoice}
                    onCancel={() => setOpenInvoice(false)}
                    uploadInvoice={uploadInvoice}
                    loadInvoice={loadInvoice}
                    handleChange={handleChange}
                    invoiceDetails={invoiceDetails}
                    milestoneId={currentMilestone._id}
                    milestoneAmount={currentMilestone.amount}
                    jobId={jobId}
                    currency={jobInfo?.currency}
                  />
                </div>
              </div>
            )}
          </div>

          {/* invoice mobile view */}
          {hasInvoice && (
            <div className="col-span-9 max-lg:col-span-12 lg:hidden max-h-max">
              <div className=" bg-white w-full rounded-lg py-10 px-5">
                <h5
                  className="text-lg font-semibold max-sm:t
             mb-2"
                >
                  Invoice
                </h5>
                <div className=" flex flex-col  gap-4 ">
                  {jobInfo?.milestones?.map((milestone: any, index: number) => (
                    <div key={index}>
                      {milestone?.accountDetails && (
                        <button
                          className="w-full flex-c-b bg-[#054753] rounded-lg h-[48px] px-4 text-[#FCFEFD] text-sm font-medium"
                          onClick={() => handleOpenInvoiceDetails(milestone)}
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
                  ))}
                </div>
              </div>
              <MilestoneInvoiceModal
                isOpen={isOpenModal}
                onCancel={() => setOpenModal(false)}
                invoiceDetails={currentInvoiceDetails}
                currency={jobInfo?.currency}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default DirectProjectDetail;