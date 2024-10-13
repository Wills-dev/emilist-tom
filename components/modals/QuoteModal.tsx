import { useEffect } from "react";

import { Modal } from "antd";

import { QuoteModalProps } from "@/types";
import { useRespondQuote } from "@/hooks/useRespondQuote";

const QuoteModal = ({
  isOpen,
  onCancel,
  jobInfo,
  getJobInfo,
}: QuoteModalProps) => {
  const {
    respondQuoteLoading,
    amount,
    setAmount,
    milestoneAmounts,
    milestonePercentage,
    handleMilestonePercentageChange,
    respondQuote,
    rerenderrr,
    handleBlur,
    setInputCount,
  } = useRespondQuote();

  useEffect(() => {
    onCancel();
    getJobInfo(jobInfo?.Id);

    if (jobInfo?.milestoneDetails?.length > 0) {
      const count = jobInfo?.milestoneDetails?.length;
      setInputCount(count);
    }
  }, [rerenderrr]);

  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={650} footer={null}>
      <form
        className="w-full px-6 max-sm:px-1 py-3 max-sm:py-2 max-h-[80vh] h-[80vh] overflow-y-auto"
        onSubmit={(e) => respondQuote(e, jobInfo?.Id)}
      >
        <h2 className="sm:text-lg font-bold pb-5 ">Quote</h2>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Project duration
            </p>

            <p className=" min-w-full w-full  max-w-full rounded-lg h-12 px-4 bg-[#ececec] py-5 max-sm:text-sm">
              {jobInfo?.projectDuration && jobInfo?.projectDuration}{" "}
            </p>
          </div>
          <div className="w-full">
            <div className="py-2">
              <p className="text-[#5e625f] font-medium max-sm:text-sm">Price</p>
              <p className="text-xs text-primary-green">
                Please enter your total amount for this job
              </p>
            </div>

            <div className="w-full">
              <input
                type="number"
                className=" expert-reg-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="w-full">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Milestone
            </p>
            <div className="w-full">
              <p className="col-span-3 min-w-full w-full  max-w-full rounded-lg h-12 px-4 bg-[#ececec] py-5 max-sm:text-sm">
                {jobInfo?.milestoneNumber && jobInfo?.milestoneNumber}{" "}
              </p>
            </div>
          </div>

          {jobInfo?.milestoneDetails?.map((mileStone: any, index: number) => (
            <div key={index}>
              <div className="w-full">
                <h2 className="sm:text-xl font-semibold py-5 ">
                  Milestone {index + 1}
                </h2>
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Milestone duration
                </p>
                <p className=" min-w-full w-full  max-w-full rounded-lg h-12 px-4 bg-[#ececec] py-5 max-sm:text-sm">
                  {mileStone?.milestoneDuration && mileStone?.milestoneDuration}{" "}
                </p>
              </div>
              <div className="w-full">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Details of whats to be achieved
                </p>
                <p className=" min-w-full w-full  max-w-full rounded-lg h-12 px-4 bg-[#ececec] py-5 max-sm:text-sm">
                  {mileStone?.milestoneDescription &&
                    mileStone?.milestoneDescription}{" "}
                </p>
              </div>
              <div className="w-full">
                <div className="py-2">
                  <p className="text-[#5e625f]  font-medium max-sm:text-sm">
                    Percent for Milestone
                  </p>
                  <p className="text-xs text-primary-green">
                    Please enter how many percentage (%) from the total amount
                    you're collecting for this milestone.` `
                  </p>
                </div>
                <div className="w-full">
                  <input
                    className="expert-reg-input"
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
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Amount
                </p>
                <div className="w-full">
                  <p className=" min-w-full w-full  max-w-full rounded-lg min-h-12 px-4 bg-[#ececec] py-5 max-sm:text-sm">
                    {milestoneAmounts[index] || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          {!respondQuoteLoading ? (
            <button type="submit" className="custom-btn">
              Proceed
            </button>
          ) : (
            <button className="load-btn">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default QuoteModal;
