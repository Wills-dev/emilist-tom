import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { Modal } from "antd";
import { AuthContext } from "@/utils/AuthState";
import Link from "next/link";
import Image from "next/image";
import { numberWithCommas } from "@/helpers";

interface Milestone {
  milestoneId: string;
  achievement: string;
  amount: number;
}

interface Props {
  applyForBiddableJob: any;
  bidLoading: boolean;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | string>>;
  maxPrice: number | string;
  milestones: Milestone[];
  handleCancelBidModal: () => void;
  openBidModal: boolean;
  jobInfo: any;
  handleSetPercentage: (index: number, value: number) => void;
  handleAchievementChange: (index: number, newAchievement: string) => void;
  setMilestones: React.Dispatch<React.SetStateAction<Milestone[]>>;
  setPercentage: React.Dispatch<React.SetStateAction<number[]>>;
  percentage: number[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ApplyBiddableJobModal = ({
  applyForBiddableJob,
  bidLoading,
  setMaxPrice,
  maxPrice,
  handleSetPercentage,
  handleAchievementChange,
  setMilestones,
  setPercentage,
  percentage,
  milestones,
  handleCancelBidModal,
  openBidModal,
  jobInfo,
  handleChange,
}: Props) => {
  const { currentUser } = useContext(AuthContext);
  const [service, setService] = useState("");

  useEffect(() => {
    if (jobInfo?.milestones?.length > 0) {
      setMilestones(
        jobInfo?.milestones?.map((milestone: any) => ({
          milestoneId: milestone._id,
          achievement: milestone.achievement,
          amount: milestone.amount,
        }))
      );
    }

    if (jobInfo?.maximumPrice) {
      setMaxPrice(jobInfo?.maximumPrice);
    }
    if (
      jobInfo?.milestones?.length > 0 &&
      jobInfo?.maximumPrice &&
      openBidModal
    ) {
      const calculatedPercentage = jobInfo?.milestones.map(
        (milestone: any) =>
          (milestone.amount / Number(jobInfo?.maximumPrice)) * 100
      );
      setPercentage(calculatedPercentage);
    }
  }, [jobInfo?.milestones?.length]);

  return (
    <Modal
      open={openBidModal}
      onCancel={handleCancelBidModal}
      centered
      width={650}
      footer={null}
    >
      <Toaster />
      <form
        className="w-full px-6 max-sm:px-1 py-3 max-sm:py-2 max-h-[80vh] h-[80vh] overflow-y-auto"
        onSubmit={(e) => applyForBiddableJob(e, jobInfo?._id, service)}
      >
        <h2 className="text-lg font-bold pb-5">Job Application</h2>
        <div className="flex flex-col gap-4">
          <div className="w-full pb-4">
            <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
              Select business you want to apply with
            </p>
            <div className="w-full">
              <div className="expert-reg-input-div">
                <select
                  className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  {currentUser?.businesses?.length > 0 ? (
                    <option defaultValue="">Select business</option>
                  ) : (
                    <option defaultValue="">No business registered</option>
                  )}
                  {currentUser?.businesses?.map(
                    (business: any, index: number) => (
                      <option key={index} value={business?._id}>
                        {business?.businessName}
                      </option>
                    )
                  )}
                </select>
                <Link href="/expert/register" className="flex-c gap-1 pt-1">
                  <Image
                    src="/assets/icons/add.svg"
                    alt="logo"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
                  />{" "}
                  <p className="text-primary-green  max-sm:text-sm">
                    Add New Business
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <>
            <div className="w-full ">
              <p className="text-[#5e625f] py-2  font-[500] max-sm:text-sm">
                Project duration
              </p>

              <p className="expert-reg-input-div flex-c opacity-45">
                {jobInfo?.duration.number && jobInfo?.duration.number}{" "}
                {jobInfo?.duration.period && jobInfo?.duration.period}
              </p>
            </div>
            <div className="w-full">
              <div className="py-2">
                <p className="text-[#5e625f]  font-[500] max-sm:text-sm">
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
                  value={maxPrice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-[#5e625f] py-2 font-[500] max-sm:text-sm">
                Milestone
              </p>
              <div className="w-full">
                <p className="expert-reg-input-div flex-c opacity-45">
                  {jobInfo?.milestones?.length && jobInfo?.milestones?.length}{" "}
                </p>
              </div>
            </div>

            {jobInfo?.milestones?.map((mileStone: any, index: number) => (
              <div key={index}>
                <div className="w-full">
                  <h2 className="Sm:text-lg font-[600] py-5 ">
                    Milestone {index + 1}
                  </h2>
                  <p className="text-[#5e625f] py-2 font-[500] max-sm:text-sm opacity-50">
                    Milestone duration
                  </p>
                  <p className="expert-reg-input-div flex-c opacity-50">
                    {mileStone?.timeFrame?.number &&
                      mileStone?.timeFrame?.number}{" "}
                    {mileStone?.timeFrame?.period &&
                      mileStone?.timeFrame?.period}
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] pt-4 font-[500] max-sm:text-sm">
                    Details of what is to be achieved
                  </p>
                  <p className="text-xs text-primary-green pb-3">
                    Please type in what you intend to achieve on each milestone.
                  </p>
                  <textarea
                    className=" min-w-full w-full max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1  max-sm:text-sm"
                    rows={3}
                    name="description"
                    value={milestones[index]?.achievement}
                    onChange={(e) =>
                      handleAchievementChange(index, e.target.value)
                    }
                  ></textarea>
                </div>
                <div className="w-full">
                  <div className="py-2">
                    <p className="text-[#5e625f]  font-[500] max-sm:text-sm">
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
                <div className="w-full opacity-50">
                  <p className="text-[#5e625f] py-2 font-[500] max-sm:text-sm">
                    Amount ({jobInfo?.currency})
                  </p>
                  <div className="w-full">
                    <p className="expert-reg-input-div flex-c">
                      {milestones[index]?.amount
                        ? numberWithCommas(milestones[index]?.amount)
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-2 justify-center mt-5">
              {!bidLoading ? (
                <button type="submit" className="custom-btn">
                  Submit application
                </button>
              ) : (
                <button className=" load-btn">
                  <span className="loading loading-dots loading-lg"></span>
                </button>
              )}
            </div>
          </>
        </div>
      </form>
    </Modal>
  );
};

export default ApplyBiddableJobModal;
