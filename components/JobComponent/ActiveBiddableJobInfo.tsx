"use client";

import Image from "next/image";
import { useContext, useEffect } from "react";

import { numberWithCommas } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
import { useCloseContract } from "@/hooks/useCloseContract";
import { useConfirmPayment } from "@/hooks/useConfirmPayment";
import { useGetBiddableJobInfo } from "@/hooks/useGetBiddableJobInfo";

import ActiveJobInfoDetails from "./ActiveJobInfoDetails";
import PaymentModal from "../modals/PaymentModal";
import CloseContractModal from "../modals/CloseContractModal";

const ActiveBiddableJobInfo = ({ jobId }: any) => {
  const { currentUser } = useContext(AuthContext);
  const {
    loading,
    getJobInfo,
    jobInfo,
    currentMilestone,
    setCurrentMilestone,
  } = useGetBiddableJobInfo();
  const {
    confirmPayment,
    loadingPayment,
    paymentRerender,
    onCancelPayment,
    paymentDetails,
    handlePaymentChange,
    openPaymentModal,
    setOpenPaymentModal,
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

  useEffect(() => {
    getJobInfo(jobId);
  }, [jobId, currentUser, paymentRerender, contractRerender]);

  const allPaid = jobInfo?.milestoneDetails?.every(
    (detail: any) => detail.invoice.paymentStatus === "paid"
  );

  const totalAmountPaid = jobInfo?.milestoneDetails?.reduce(
    (accumulator: number, milestone: any) => {
      return accumulator + (milestone.invoice.amountpaid || 0);
    },
    0
  );

  return (
    <section className="py-28 padding-x bg-[#F0FDF5] min-h-screen">
      {loading ? (
        <div className="flex w-full min-h-[70vh] item-center justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          <ActiveJobInfoDetails jobInfo={jobInfo} jobId={jobId} />

          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
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
                    }   font-semibold capitalize cursor-pointer max-sm:text-sm`}
                    onClick={() => setCurrentMilestone(milestoneInfo)}
                  >
                    Milestone {i + 1}
                  </li>
                )
              )}
            </ul>
            <div className="w-full px-10 max-sm:px-5 py-6">
              <div className="w-full flex items-center justify-between">
                <h6 className=" my-5 font-semibold max-sm:text-xs">Details</h6>
              </div>
              <p className="  max-sm:text-xs">
                {currentMilestone?.milestoneDescription &&
                  currentMilestone?.milestoneDescription}
                <button className="text-[#25C269] text-sm font-medium max-sm:text-xs whitespace-nowrap">
                  see more
                </button>
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
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col  gap-1">
                    <h6 className="text-lg font-semibold max-sm:text-sm">
                      {currentMilestone?.milestoneDuration &&
                        currentMilestone?.milestoneDuration}
                    </h6>
                    <p className="text-[#474C48]  max-sm:text-xs">
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
                      {currentMilestone?.milestoneAmount &&
                        numberWithCommas(currentMilestone?.milestoneAmount)}
                    </h6>
                    <p className="text-[#474C48]  max-sm:text-xs">Amount</p>
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
                    alt="checkbox"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
                  />
                </div>
                <div className="py-8">
                  <button className="bg-[#A2A4A2] rounded-[10px] w-[148px] h-[52px] text-[#FCFEFD] font-[700] max-sm:w-[120px] max-sm:h-[38px] max-sm:text-sm ">
                    Payment
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
                    alt="tick-square"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer "
                  />
                </div>

                <>
                  {currentMilestone.invoice.paymentStatus === "paid" ? (
                    <div className=" flex gap-4 py-6 text-[#282828]">
                      <div className="flex gap-4">
                        <Image
                          src="/assets/icons/tick-circle.svg"
                          alt="tick-circle"
                          width={20}
                          height={20}
                          className="w-8 h-8"
                        />
                        <div className="">
                          <h6 className="text-2xl font-bold">Paid</h6>
                          <p className="py-3">
                            {" "}
                            ₦
                            {numberWithCommas(
                              currentMilestone?.invoice?.amountpaid
                            )}{" "}
                            ({currentMilestone?.invoice?.paymentmethod})
                          </p>
                          <p className="flex items-center">
                            {" "}
                            <Image
                              src="/assets/icons/calendar-2.svg"
                              alt="calendar"
                              width={20}
                              height={20}
                              className="w-4 h-4 mr-1"
                            />{" "}
                            {currentMilestone?.invoice?.paymentmethod}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8">
                      <button
                        className="bg-primary-green rounded-[10px] w-[148px] h-[52px] text-[#FCFEFD] font-[700] max-sm:w-[120px] max-sm:h-[38px] max-sm:text-sm"
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
                        milestoneId={currentMilestone.milestoneId}
                      />
                    </div>
                  )}
                </>
              </div>
            )}

            {allPaid && (
              <div className="flex items-center justify-center">
                {jobInfo?.contractStatus &&
                jobInfo?.contractStatus === "closed" ? (
                  <p className="text-primary-green font-bold uppercase">
                    Contract finished & closed
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
                      noOfMilestones={jobInfo?.milestoneNumber}
                      budget={Number(jobInfo?.maxPrice)}
                      totalAmount={totalAmountPaid}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ActiveBiddableJobInfo;
