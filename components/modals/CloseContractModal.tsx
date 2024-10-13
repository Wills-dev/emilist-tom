import { Modal } from "antd";

import { ContractType } from "@/types";
import { numberWithCommas } from "@/helpers";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  jobId: string;
  noOfMilestones: number;
  budget: number;
  totalAmount: number;
  setRateServiceRendered: React.Dispatch<React.SetStateAction<number>>;
  setRateServiceProvider: React.Dispatch<React.SetStateAction<number>>;
  rateServiceProvider: number;
  rateServiceRendered: number;
  contractDetails: ContractType;
  handleContractChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLTextAreaElement
  >;
  closeContract: (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    noOfMilestones: number | string,
    budget: number,
    sumOfAmountPaidForAllMilestone: number
  ) => void;
  loadingContract: boolean;
};

const CloseContractModal = ({
  isOpen,
  onCancel,
  rateServiceRendered,
  rateServiceProvider,
  setRateServiceProvider,
  setRateServiceRendered,
  contractDetails,
  handleContractChange,
  closeContract,
  jobId,
  noOfMilestones,
  budget,
  totalAmount,
  loadingContract,
}: Props) => {
  const handleRating = (index: number) => {
    setRateServiceRendered(index + 1);
  };

  const handleServiceProvideredRating = (index: number) => {
    setRateServiceProvider(index + 1);
  };

  const FilledStar = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF9933">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );

  // OutlinedStar.jsx
  const OutlinedStar = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF9933"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 22 12 18.27 5.82 22 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={620}>
      <form
        onSubmit={(e) =>
          closeContract(e, jobId, noOfMilestones, budget, totalAmount)
        }
        className="flex-c justify-center flex-col gap-4 px-6 max-sm:px-3 py-4"
      >
        <div className="w-full   ">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Job ID
          </p>
          <div className="w-full">
            <p className=" min-w-full w-full  max-w-full rounded-lg h-[62px] px-4 bg-[#ececec]   max-sm:h-[46px] max-sm:text-sm  flex items-center">
              {jobId && jobId}
            </p>
          </div>
        </div>
        <div className="w-full   ">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Milestones
          </p>
          <div className="w-full">
            <p className=" min-w-full w-full  max-w-full rounded-lg h-[62px] px-4 bg-[#ececec]   max-sm:h-[46px] max-sm:text-sm  flex items-center">
              {noOfMilestones && noOfMilestones}
            </p>
          </div>
        </div>
        <div className="w-full   ">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Budget
          </p>
          <div className="w-full">
            <p className=" min-w-full w-full  max-w-full rounded-lg h-[62px] px-4 bg-[#ececec]   max-sm:h-[46px] max-sm:text-sm  flex items-center">
              ₦ {budget && numberWithCommas(budget)}
            </p>
          </div>
        </div>
        <div className="w-full   ">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Actual Amount
          </p>
          <div className="w-full">
            <p className=" min-w-full w-full  max-w-full rounded-lg h-[62px] px-4 bg-[#ececec]   max-sm:h-[46px] max-sm:text-sm  flex items-center">
              ₦ {totalAmount && numberWithCommas(totalAmount)}
            </p>
          </div>
        </div>
        <div className="w-full  ">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Will you recommend this vendor
          </p>
          <div className="w-full">
            <div className=" min-w-full w-full  max-w-full rounded-lg h-[62px] px-4 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-[1px]  max-sm:h-[46px] ">
              <select
                className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                name="recommendVendor"
                value={contractDetails.recommendVendor}
                onChange={handleContractChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>Maybe</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Rate service provider communication
          </p>
          <div className="w-full flex items-center gap-2">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => handleServiceProvideredRating(index)}
              >
                {index < rateServiceProvider ? (
                  <FilledStar />
                ) : (
                  <OutlinedStar />
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full ">
          <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
            Rate service rendered
          </p>
          <div className="w-full flex items-center gap-2">
            {[...Array(5)].map((_, index) => (
              <span key={index} onClick={() => handleRating(index)}>
                {index < rateServiceRendered ? (
                  <FilledStar />
                ) : (
                  <OutlinedStar />
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full ">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Leave a Review
          </p>
          <div className="w-full">
            <textarea
              name="review"
              value={contractDetails.review}
              onChange={handleContractChange}
              className=" min-w-full w-full  max-w-full rounded-lg p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:text-sm "
              rows={6}
            ></textarea>
          </div>
        </div>
        {loadingContract ? (
          <button className="load-btn">
            {" "}
            <span className="loading loading-dots loading-lg"></span>
          </button>
        ) : (
          <button type="submit" className="custom-btn ">
            Proceed
          </button>
        )}
      </form>
    </Modal>
  );
};

export default CloseContractModal;
