"use client";

import Image from "next/image";
import React, { useContext, useEffect } from "react";

import { getStatusClass } from "@/constants";
import { AuthContext } from "@/utils/AuthState";
import { useGetJobInfo } from "@/hooks/useGetJobInfo";
import { useRequestQuote } from "@/hooks/useRequestQuote";
import { useAcceptQuote } from "@/hooks/useAcceptQuote";
import { useCloseContract } from "@/hooks/useCloseContract";
import { useConfirmPayment } from "@/hooks/useConfirmPayment";
import { convertDateFormat, hasInvoice, numberWithCommas } from "@/helpers";
import { useUpdateApplicationStatus } from "@/hooks/useUpdateApplicationStatus";

import PaymentModal from "../modals/PaymentModal";
import ActiveJobInfoDetails from "./ActiveJobInfoDetails";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import CloseContractModal from "../modals/CloseContractModal";
import MilestoneInvoice from "./MilestoneInvoice";

const ActiveJobInfo = ({ jobId }: any) => {
  const { currentUser } = useContext(AuthContext);

  const { requestQuote, requestLoading, rerenderr } = useRequestQuote();

  const { acceptQuote, loadingAcceptQuote, acceptQuoteRerender } =
    useAcceptQuote();

  const { updateApplicationStatus, loadingAccept, acceptRerender } =
    useUpdateApplicationStatus();

  const {
    confirmPayment,
    loadingPayment,
    paymentRerender,
    onCancelPayment,
    paymentDetails,
    handlePaymentChange,
    openPaymentModal,
    setOpenPaymentModal,
    currency,
    setCurrency,
    isAdditionalAmount,
    setIsAdditionalAmount,
  } = useConfirmPayment();

  const {
    closeContract,
    loadingContract,
    contractRerender,
    onCancel,
    contractDetails,
    handleContractChange,
    openContractModal,
    setOpenContractModal,
    setRateServiceRendered,
    setRateServiceProvider,
    rateServiceProvider,
    rateServiceRendered,
  } = useCloseContract();

  const {
    loading,
    getJobInfo,
    jobInfo,
    currentMilestone,
    setCurrentMilestone,
  } = useGetJobInfo();

  const isAllMilestoneCompleted = jobInfo?.milestones?.every(
    (milestone: any) => milestone.status === "completed"
  );

  const isAllMilestonePaid = jobInfo?.milestones?.every(
    (milestone: any) => milestone.paymentStatus === "paid"
  );

  useEffect(() => {
    getJobInfo(jobId);
  }, [
    jobId,
    currentUser,
    paymentRerender,
    acceptRerender,
    rerenderr,
    acceptQuoteRerender,
    contractRerender,
  ]);

  return (
    <section className="py-28 padding-x bg-[#F0FDF5]">
      <LoadingOverlay loading={loadingAccept} />
      <LoadingOverlay loading={requestLoading} />
      <LoadingOverlay loading={loadingAcceptQuote} />
      {loading ? (
        <div className="flex w-full min-h-[70vh] item-center justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          <ActiveJobInfoDetails
            jobInfo={jobInfo}
            jobId={jobId}
            updateApplicationStatus={updateApplicationStatus}
            requestQuote={requestQuote}
            acceptQuote={acceptQuote}
          />
          {hasInvoice(jobInfo?.milestones) && (
            <div className="col-span-3 max-lg:hidden max-h-max">
              <MilestoneInvoice jobInfo={jobInfo} />
            </div>
          )}
          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
            <ul className="flex items-center flex-wrap gap-4   px-10 max-sm:px-5">
              {jobInfo?.milestones?.map((milestoneInfo: any, i: number) => (
                <li
                  key={i}
                  className={`${
                    milestoneInfo._id === currentMilestone?._id
                      ? "text-primary-green  border-b-primary-green border-b-2"
                      : "text-[#737774]"
                  }   font-semibold capitalize cursor-pointer max-sm:text-[14px]`}
                  onClick={() => setCurrentMilestone(milestoneInfo)}
                >
                  Milestone {i + 1}
                </li>
              ))}
            </ul>
            <div className="w-full px-10 max-sm:px-5 py-6">
              <div className="w-full flex items-center justify-between">
                <h6 className=" my-5 font-semibold max-sm:text-sm">Details</h6>
                <div className="flex justify-end">
                  <p
                    className={`px-4 py-1 rounded-full w-fit text-xs ${getStatusClass(
                      currentMilestone.status
                    )} `}
                  >
                    {currentMilestone?.status}
                  </p>
                </div>
              </div>

              <p className="max-sm:text-sm">
                {currentMilestone?.achievement && currentMilestone?.achievement}
              </p>
            </div>
            <div className=" px-10 max-sm:px-5 w-full border-b-1 border-gray-300 ">
              <div className="flex  gap-10 max-sm:gap-5  py-6">
                <div className=" flex gap-2">
                  <Image
                    src="/assets/icons/clock.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                  />
                  <div className="flex flex-col  gap-1">
                    <h6 className="text-lg font-[600] max-sm:text-sm">
                      {currentMilestone?.timeFrame?.number}{" "}
                      {currentMilestone?.timeFrame?.period}
                    </h6>
                    <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
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
                    className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                  />
                  <div className="flex flex-col gap-1">
                    <h6 className="sm:text-lg font-semibold">
                      {jobInfo?.currency}{" "}
                      {currentMilestone?.amount &&
                        numberWithCommas(currentMilestone?.amount)}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-sm">Amount</p>
                  </div>
                </div>
              </div>
            </div>
            {currentMilestone.status !== "completed" ? (
              <div className="flex flex-col  px-10 max-sm:px-5 w-full py-6">
                <div className="flex items-center gap-2">
                  <p className="font-medium max-sm:text-sm">
                    Milestone completed
                  </p>
                  <Image
                    src="/assets/icons/checkbox.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] cursor-pointer"
                  />
                </div>
                <div className="py-8">
                  <button className="bg-[#A2A4A2] rounded-lg w-[148px] h-[52px] text-[#FCFEFD] font-bold max-sm:w-[120px] max-sm:h-[38px] max-sm:text-sm">
                    Payment
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col  px-10 max-sm:px-5 w-full py-6">
                <div className="flex items-center gap-2">
                  <p className="font-medium max-sm:text-sm">
                    Milestone completed
                  </p>
                  <Image
                    src="/assets/icons/tick-square.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] cursor-pointer "
                  />
                </div>

                <>
                  {currentMilestone?.paymentStatus === "paid" ||
                  currentMilestone?.paymentStatus === "processing" ? (
                    <div className=" flex gap-4 py-6 text-[#282828]">
                      <div className="flex gap-4">
                        <img
                          src="/assets/icons/tick-circle.svg"
                          alt=""
                          className="w-8 h-8"
                        />
                        <div className="">
                          <h6 className="text-2xl font-bold">Paid</h6>
                          <p className="py-3">
                            {jobInfo?.currency}{" "}
                            {numberWithCommas(
                              currentMilestone?.paymentInfo?.amountPaid
                            )}{" "}
                            ({currentMilestone?.paymentInfo?.paymentMethod})
                          </p>
                          <p className="flex items-center">
                            {" "}
                            <img
                              src="/assets/icons/calendar-2.svg"
                              alt="calendar"
                              className="w-5 h-5 mr-1"
                            />{" "}
                            {currentMilestone?.paymentInfo?.date &&
                              convertDateFormat(
                                currentMilestone?.paymentInfo?.date
                              )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8">
                      <button
                        className="bg-primary-green rounded-[10px] w-[148px] h-[52px] text-[#FCFEFD] font-[700] max-sm:w-[120px] max-sm:h-[38px] max-sm:text-[14px]"
                        onClick={() => setOpenPaymentModal(true)}
                      >
                        Payment
                      </button>

                      {/* payment input modal */}
                      <PaymentModal
                        isOpen={openPaymentModal}
                        onCancel={onCancelPayment}
                        confirmPayment={confirmPayment}
                        loadingPayment={loadingPayment}
                        paymentDetails={paymentDetails}
                        handlePaymentChange={handlePaymentChange}
                        milestoneId={currentMilestone?._id}
                        currency={currency}
                        setCurrency={setCurrency}
                        jobId={jobId}
                        amount={currentMilestone?.amount}
                        jobCurrency={jobInfo?.currency}
                        additionalAmount={
                          currentMilestone?.invoice?.additionalAmount
                        }
                        note={currentMilestone?.invoice?.note}
                        isAdditionalAmount={isAdditionalAmount}
                        setIsAdditionalAmount={setIsAdditionalAmount}
                      />
                    </div>
                  )}
                </>
              </div>
            )}

            {isAllMilestoneCompleted && isAllMilestonePaid && (
              <div className="flex items-center justify-center">
                {jobInfo?.isClosed ? (
                  <p className="text-primary-green font-bold uppercase">
                    Congratulations, Contract finished & closed
                  </p>
                ) : (
                  <>
                    <button
                      className="custom-btn"
                      onClick={() => setOpenContractModal(true)}
                    >
                      Close Contract
                    </button>
                    <CloseContractModal
                      isOpen={openContractModal}
                      onCancel={onCancel}
                      setRateServiceRendered={setRateServiceRendered}
                      setRateServiceProvider={setRateServiceProvider}
                      rateServiceProvider={rateServiceProvider}
                      contractDetails={contractDetails}
                      handleContractChange={handleContractChange}
                      closeContract={closeContract}
                      loadingContract={loadingContract}
                      rateServiceRendered={rateServiceRendered}
                      jobId={jobId}
                    />
                  </>
                )}
              </div>
            )}
          </div>
          {/* invoice mobile view */}
          {hasInvoice(jobInfo?.milestones) && (
            <div className="col-span-9 max-lg:col-span-12 lg:hidden max-h-max">
              <MilestoneInvoice jobInfo={jobInfo} />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ActiveJobInfo;
