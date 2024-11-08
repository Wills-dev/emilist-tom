import { getStatusClass } from "@/constants";
import { formatCreatedAt, numberWithCommas } from "@/helpers";
import { Modal } from "antd";
import React from "react";

interface QuoteDetailsProps {
  handleCancel: () => void;
  openQuoteDetailsModal: boolean;
  Quote: any;
  acceptQuote: any;
  applicantId: string;
  jobInfo: any;
}

const QuoteDetails = ({
  handleCancel,
  openQuoteDetailsModal,
  Quote,
  acceptQuote,
  applicantId,
  jobInfo,
}: QuoteDetailsProps) => {
  return (
    <Modal
      open={openQuoteDetailsModal}
      onCancel={handleCancel}
      centered
      width={500}
      footer={null}
    >
      <div className="">
        <div className="flex-c-b">
          <h2 className="text-xl font-bold mb-6">Quote details</h2>
          <p
            className={`px-4 py-1 rounded-full w-fit text-xs ${getStatusClass(
              Quote?.status
            )} `}
          >
            {Quote?.status}
          </p>
        </div>

        <div className="flex-c justify-between">
          <div className="flex gap-3 items-center">
            <h6 className="font-bold">Total amount:</h6>
            <p>
              {jobInfo?.currency}{" "}
              {Quote?.totalAmount && numberWithCommas(Quote?.totalAmount)}
            </p>
          </div>
          <h6 className="text-[#737774] text-sm  font-medium max-sm:text-xs whitespace-nowrap">
            Posted: {Quote?.postedAt && formatCreatedAt(Quote.postedAt)}
          </h6>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          {Quote?.milestones?.map((milestone: any, index: number) => (
            <div
              className={`flex flex-col  ${
                Quote?.milestones.length > 1 &&
                Quote?.milestones.length - 1 !== index &&
                "border-b-1 py-3"
              }`}
            >
              <div
                className="flex flex-col gap-3 "
                key={milestone?.milestoneId}
              >
                <h6 className="font-bold">Milestone {index + 1}</h6>
                <div className="flex flex-col">
                  <h6 className="font-semibold">Amount</h6>
                  <p>
                    {" "}
                    {jobInfo?.currency} {numberWithCommas(milestone?.amount)}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h6 className="font-semibold">
                    Details of what's to be achieved
                  </h6>
                  <p> {milestone?.achievement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            className="custom-btn mt-8"
            onClick={async () => {
              await acceptQuote(applicantId, "accepted");
              handleCancel();
            }}
          >
            Accept quote
          </button>
          <button
            className="bg-red-500 text-white hover:bg-red-600 whitespace-nowrap transition-all duration-300 rounded-lg px-6 py-3 text-center mt-8"
            onClick={async () => {
              await acceptQuote(applicantId, "rejected");
              handleCancel();
            }}
          >
            Reject quote
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default QuoteDetails;
