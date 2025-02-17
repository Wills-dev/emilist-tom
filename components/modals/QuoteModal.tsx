import { useEffect } from "react";

import { Modal } from "antd";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    milestones,
    respondQuote,
    rerenderrr,
    handleAchievementChange,
    setMilestones,
    setPercentage,
    percentage,
    handleSetPercentage,
  } = useRespondQuote();

  useEffect(() => {
    onCancel();
    getJobInfo(jobInfo?._id);
    if (jobInfo?.milestones?.length > 0) {
      setMilestones(
        jobInfo.milestones.map((milestone: any) => ({
          milestoneId: milestone._id,
          achievement: milestone.achievement,
          amount: milestone.amount,
        }))
      );

      const baseAmount = jobInfo.maximumPrice || jobInfo.budget;

      setAmount(baseAmount);
      if (baseAmount && isOpen) {
        const calculatedPercentage = jobInfo.milestones.map(
          (milestone: any) => (milestone.amount / Number(baseAmount)) * 100
        );
        setPercentage(calculatedPercentage);
      }
    }
  }, [rerenderrr]);

  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={650} footer={null}>
      <ScrollArea className="max-h-[80vh] h-[80vh] overflow-y-auto">
        <form
          className="w-full px-6 max-sm:px-1 py-3 max-sm:py-2 "
          onSubmit={(e) => respondQuote(e, jobInfo?._id)}
        >
          <h2 className="text-lg font-bold pb-5">Quote</h2>
          <div className="flex flex-col gap-2">
            <div className="w-full opacity-45">
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Project duration
              </p>

              <p className="expert-reg-input-div flex-c">
                {jobInfo?.duration.number && jobInfo?.duration.number}{" "}
                {jobInfo?.duration.period && jobInfo?.duration.period}
              </p>
            </div>
            <div className="w-full">
              <div className="py-2">
                <p className="text-[#5e625f]  font-medium max-sm:text-sm">
                  Total amount ({jobInfo?.currency})
                </p>
                <p className="text-xs text-primary-green">
                  Please enter your total amount for this job
                </p>
              </div>

              <div className="w-full">
                <input
                  style={{ fontSize: "16px" }}
                  type="text"
                  className="expert-reg-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="w-full opacity-45">
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Milestone
              </p>
              <div className="w-full">
                <p className="expert-reg-input-div flex-c">
                  {jobInfo?.milestones?.length && jobInfo?.milestones?.length}{" "}
                </p>
              </div>
            </div>

            {jobInfo?.milestones?.map((mileStone: any, index: number) => (
              <div key={index}>
                <div className="w-full">
                  <h2 className="sm:text-lg font-[600] py-5 ">
                    Milestone {index + 1}
                  </h2>
                  <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm opacity-45">
                    Milestone duration
                  </p>
                  <p className="expert-reg-input-div flex-c opacity-45">
                    {mileStone?.timeFrame?.number &&
                      mileStone?.timeFrame?.number}{" "}
                    {mileStone?.timeFrame?.period &&
                      mileStone?.timeFrame?.period}
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] pt-4 font-medium max-sm:text-sm">
                    Details of what is to be achieved
                  </p>
                  <p className="text-xs text-primary-green pb-3">
                    Please type in what you intend to achieve on each milestone.
                  </p>
                  <textarea
                    className=" min-w-full w-full max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1  max-sm:text-sm"
                    rows={4}
                    name="description"
                    value={milestones[index]?.achievement}
                    onChange={(e) =>
                      handleAchievementChange(index, e.target.value)
                    }
                  ></textarea>
                </div>
                <div className="w-full">
                  <div className="py-2">
                    <p className="text-[#5e625f]  font-medium max-sm:text-sm">
                      Percent for Milestone
                    </p>
                    <p className="text-xs text-primary-green">
                      Please enter how many percentage (%) from the total amount
                      you're collecting for this milestone.
                    </p>
                  </div>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      className="expert-reg-input"
                      type="text"
                      value={percentage[index]}
                      onChange={(e) =>
                        handleSetPercentage(index, Number(e.target.value))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="w-full opacity-45">
                  <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                    Amount ({jobInfo?.currency})
                  </p>
                  <div className="w-full">
                    <p className="expert-reg-input-div  flex-c">
                      {milestones[index]?.amount || 0}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            {!respondQuoteLoading ? (
              <button type="submit" className="custom-btn">
                Submit quote
              </button>
            ) : (
              <button className=" load-btn">
                <span className="loading loading-dots loading-lg"></span>
              </button>
            )}
          </div>
        </form>
      </ScrollArea>
    </Modal>
  );
};

export default QuoteModal;
