import React from "react";

import { Modal } from "antd";
import { formatCreatedAt, numberWithCommas } from "@/helpers";

interface BiddableApplicationDetailsProps {
  handleCancelApplicationModal: () => void;
  openApplicationDetailsModal: boolean;
  updateApplicationStatus: (
    applicationId: string,
    status: string
  ) => Promise<void>;
  application: any;
  isAnyAccepted: boolean;
  jobInfo: any;
}

const BiddableApplicationDetails = ({
  handleCancelApplicationModal,
  openApplicationDetailsModal,
  updateApplicationStatus,
  application,
  isAnyAccepted,
  jobInfo,
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
        <div className="flex-c justify-between">
          <div className="flex gap-3 items-center">
            <h6 className="font-bold">Total amount:</h6>
            <p>
              {jobInfo?.currency}{" "}
              {numberWithCommas(application?.biddableDetails?.maximumPrice)}
            </p>
          </div>
          <h6 className="text-[#737774] text-sm  font-medium max-sm:text-xs whitespace-nowrap">
            Posted:{" "}
            {application?.createdAt && formatCreatedAt(application.createdAt)}
          </h6>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          {application?.biddableDetails?.milestones?.map(
            (milestone: any, index: number) => (
              <div
                className={`flex flex-col  ${
                  application?.biddableDetails?.milestones > 1 &&
                  application?.biddableDetails?.milestones.length !== index &&
                  "border-1 py-3"
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
            )
          )}
        </div>
        {!isAnyAccepted && (
          <button
            className="custom-btn mt-8"
            onClick={async () => {
              await updateApplicationStatus(application?._id, "accepted");
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
