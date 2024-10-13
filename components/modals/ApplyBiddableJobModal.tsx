import React, { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import { Modal } from "antd";

interface Props {
  applyForBiddableJob: any;
  bidLoading: boolean;
  setAmount: React.Dispatch<React.SetStateAction<number | string>>;
  amount: number | string;
  milestoneAmounts: number[];
  milestonePercentage: number[];
  handleMilestonePercentageChange: any;
  handleCancelBidModal: () => void;
  openBidModal: boolean;
  jobInfo: any;
  handleBlur: () => void;
  inputCount: number;
  setInputCount: React.Dispatch<React.SetStateAction<number>>;
}

const ApplyBiddableJobModal = ({
  applyForBiddableJob,
  bidLoading,
  setAmount,
  amount,
  milestoneAmounts,
  milestonePercentage,
  handleMilestonePercentageChange,
  handleCancelBidModal,
  openBidModal,
  jobInfo,
  handleBlur,
  setInputCount,
}: Props) => {
  useEffect(() => {
    if (jobInfo?.milestoneDetails?.length > 0) {
      const count = jobInfo?.milestoneDetails?.length;
      setInputCount(count);
    }
  }, [jobInfo?.milestoneDetails?.length]);

  return (
    <Modal
      open={openBidModal}
      onCancel={handleCancelBidModal}
      centered
      width={650}
    >
      <Toaster />
      <form
        className="w-full px-6 max-sm:px-1 py-3 max-sm:py-2 max-h-[80vh] h-[80vh] overflow-y-auto"
        onSubmit={(e) => applyForBiddableJob(e, jobInfo?.Id)}
      >
        <h2 className="text-[20px] font-[700] leading-[32px] max-sm:text-[16px] max-sm:leading-[20px] pb-5 ">
          Job Application
        </h2>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <p className="text-[#5e625f] py-2 text-[16px] font-[500] max-sm:text-[14px]">
              Project duration
            </p>

            <p className=" min-w-full w-full  max-w-full rounded-lg h-12 px-4 bg-[#ececec] py-5 max-sm:text-[14px]">
              {jobInfo?.projectDuration && jobInfo?.projectDuration}{" "}
            </p>
          </div>
          <div className="w-full">
            <div className="py-2">
              <p className="text-[#5e625f]  text-[16px] font-[500] max-sm:text-[14px]">
                Price
              </p>
              <p className="text-xs text-primary-green">
                Please enter your total amount for this job
              </p>
            </div>

            <div className="w-full">
              <input
                type="number"
                className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-[14px] text-[#5e625f]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="w-full">
            <p className="text-[#5e625f] py-2 text-[16px] font-[500] max-sm:text-[14px]">
              Milestone
            </p>
            <div className="w-full">
              <p className="col-span-3 min-w-full w-full  max-w-full rounded-lg h-12 px-4 bg-[#ececec] py-5 max-sm:text-[14px]">
                {jobInfo?.milestoneNumber && jobInfo?.milestoneNumber}{" "}
              </p>
            </div>
          </div>

          {jobInfo?.milestoneDetails?.map((mileStone: any, index: number) => (
            <div key={index}>
              <div className="w-full">
                <h2 className="text-[20px] font-[600] leading-[32px] max-sm:text-[16px] max-sm:leading-[20px] py-5 ">
                  Milestone {index + 1}
                </h2>
                <p className="text-[#5e625f] py-2 text-[16px] font-[500] max-sm:text-[14px]">
                  Milestone duration
                </p>
                <p className=" min-w-full w-full  max-w-full rounded-lg h-12 px-4 bg-[#ececec] py-5 max-sm:text-[14px]">
                  {mileStone?.milestoneDuration && mileStone?.milestoneDuration}{" "}
                </p>
              </div>
              <div className="w-full">
                <p className="text-[#5e625f] py-2 text-[16px] font-[500] max-sm:text-[14px]">
                  Details of whats to be achieved
                </p>
                <p className=" min-w-full w-full  max-w-full rounded-lg h-12 px-4 bg-[#ececec] py-5 max-sm:text-[14px]">
                  {mileStone?.milestoneDescription &&
                    mileStone?.milestoneDescription}{" "}
                </p>
              </div>
              <div className="w-full">
                <div className="py-2">
                  <p className="text-[#5e625f]  text-[16px] font-[500] max-sm:text-[14px]">
                    Percent for Milestone
                  </p>
                  <p className="text-xs text-primary-green">
                    Please enter how many percentage (%) from the total amount
                    you're collecting for this milestone.` `
                  </p>
                </div>
                <div className="w-full">
                  <input
                    className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-[14px] text-[#5e625f]"
                    placeholder="20"
                    type="number"
                    id={`milestonePercentage${index + 1}`}
                    value={milestonePercentage[index]?.toString()}
                    onChange={(e) =>
                      handleMilestonePercentageChange(
                        index,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    onBlur={handleBlur}
                    required
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="text-[#5e625f] py-2 text-[16px] font-[500] max-sm:text-[14px]">
                  Amount
                </p>
                <div className="w-full">
                  <p className=" min-w-full w-full  max-w-full rounded-lg min-h-12 px-4 bg-[#ececec] py-5 max-sm:text-[14px]">
                    {milestoneAmounts[index] || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          {!bidLoading ? (
            <button type="submit" className="proceed-btn">
              Proceed
            </button>
          ) : (
            <button className=" text-primary-green">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ApplyBiddableJobModal;
