import { numberWithCommas } from "@/helpers";
import { Modal } from "antd";
import React from "react";

interface QuoteDetailsProps {
  handleCancel: () => void;
  openQuoteDetailsModal: boolean;
  Quote: any;
  acceptQuote: any;
  applicantId: string;
  jobId: string;
}

const QuoteDetails = ({
  handleCancel,
  openQuoteDetailsModal,
  Quote,
  acceptQuote,
  applicantId,
  jobId,
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
        <h2 className="text-xl font-bold mb-6">Quote details</h2>
        <div className="flex-c gap-3">
          <h6 className="font-bold">Price:</h6>
          <p> ₦{numberWithCommas(Quote?.amount)}</p>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          {Quote?.milestoneAmounts?.map((milestone: any, index: number) => (
            <div className="flex-c gap-3" key={milestone?.milestoneId}>
              <h6 className="font-bold">Milestone {index + 1}:</h6>
              <p> ₦{numberWithCommas(milestone?.amount)}</p>
            </div>
          ))}
        </div>
        <button
          className="custom-btn mt-8"
          onClick={async () => {
            await acceptQuote(applicantId, jobId);
            handleCancel();
          }}
        >
          Accept quote
        </button>
      </div>
    </Modal>
  );
};

export default QuoteDetails;
