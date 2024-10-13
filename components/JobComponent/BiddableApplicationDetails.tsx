import React from "react";

import { Modal } from "antd";
import { numberWithCommas } from "@/helpers";

interface BiddableApplicationDetailsProps {
  handleCancelApplicationModal: () => void;
  openApplicationDetailsModal: boolean;
  acceptBiddableApplicant: any;
  applicant: any;
  jobInfo: any;
  isAnyAccepted: boolean;
}

const BiddableApplicationDetails = ({
  handleCancelApplicationModal,
  openApplicationDetailsModal,
  acceptBiddableApplicant,
  applicant,
  jobInfo,
  isAnyAccepted,
}: BiddableApplicationDetailsProps) => {
  return (
    <Modal
      open={openApplicationDetailsModal}
      onCancel={handleCancelApplicationModal}
      centered
      width={500}
      footer={null}
    >
      <div className="">
        <h2 className="text-xl font-bold mb-6">Application details</h2>
        <div className="flex gap-3 items-center">
          <h6 className="font-bold">Price:</h6>
          <p> ₦{numberWithCommas(applicant?.bidAmount)}</p>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          {applicant?.milestoneAmounts?.map((milestone: any, index: number) => (
            <div
              className="flex gap-3 items-center"
              key={milestone?.milestoneId}
            >
              <h6 className="font-bold">Milestone {index + 1}:</h6>
              <p> ₦{numberWithCommas(milestone?.amount)}</p>
            </div>
          ))}
        </div>
        {!isAnyAccepted && (
          <button
            className="custom-btn mt-8"
            onClick={async () => {
              await acceptBiddableApplicant(
                applicant?.applicantId,
                jobInfo?.Id
              );
              handleCancelApplicationModal();
            }}
          >
            Accept Application
          </button>
        )}
      </div>
    </Modal>
  );
};

export default BiddableApplicationDetails;
