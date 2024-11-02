import React from "react";
import BiddableApplicationDetails from "./BiddableApplicationDetails";
import QuoteDetails from "./QuoteDetails";
import ConfirmRemoveModal from "../modals/ConfirmRemovalModal";

interface BiddableJobApplicantActionDropdownProps {
  openUserDropdown: boolean;
  index: number;
  applicantIndex: number | null;
  isAnyAccepted: boolean;
  updateApplicationStatus: (
    applicationId: string,
    status: string
  ) => Promise<void>;
  jobId: string;
  applicant: any;
  requestQuote: any;
  setOpenQuoteDetailsModal: (value: boolean) => void;
  openQuoteDetailsModal: boolean;
  handleCancel: () => void;
  acceptQuote: any;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  onCancel: () => void;
  applicationLength: number;
  handleCancelApplicationModal: () => void;
  setOpenApplicationDetailsModal: (value: boolean) => void;
  openApplicationDetailsModal: boolean;
  jobInfo: any;
}

const BiddableJobApplicantActionDropdown = ({
  openUserDropdown,
  index,
  applicantIndex,
  isAnyAccepted,
  updateApplicationStatus,
  jobId,
  applicant,
  requestQuote,
  setOpenQuoteDetailsModal,
  openQuoteDetailsModal,
  handleCancel,
  acceptQuote,
  setIsOpen,
  isOpen,
  onCancel,
  applicationLength,
  handleCancelApplicationModal,
  setOpenApplicationDetailsModal,
  openApplicationDetailsModal,
  jobInfo,
}: BiddableJobApplicantActionDropdownProps) => {
  const isNotAccepted = !isAnyAccepted;
  const isNotRejected = applicant?.status !== "rejected";
  const shouldShowRejectButton = isNotAccepted && isNotRejected;

  const canRequestQuote = applicant?.isRequestQuote === false;
  const canViewQuote =
    applicant?.isRequestQuote === true && applicant?.Quote?.amount;

  return (
    <>
      {" "}
      {openUserDropdown && applicantIndex === index && (
        <div
          className={`absolute lg:-right-3/4 max-lg:-top-3 max-lg:right-5 shadow-md rounded-md bg-white flex flex-col gap-3 px-6 max-sm:px-2 py-2 items-start z-50 text-[#282828] ${
            applicationLength > 1 && applicationLength - 1 === index
              ? "lg:bottom-full"
              : "lg:top-full"
          }`}
        >
          <>
            <button
              className=" whitespace-nowrap max-sm:text-xs hover:text-primary-green transition-all"
              onClick={() => setOpenApplicationDetailsModal(true)}
            >
              View application
            </button>
            <BiddableApplicationDetails
              handleCancelApplicationModal={handleCancelApplicationModal}
              openApplicationDetailsModal={openApplicationDetailsModal}
              updateApplicationStatus={updateApplicationStatus}
              application={applicant}
              isAnyAccepted={isAnyAccepted}
              jobInfo={jobInfo}
            />
          </>
          {canRequestQuote && (
            <button
              className="whitespace-nowrap text-[16px] max-sm:text-[13px] hover:text-primary-green transition-all"
              onClick={() => requestQuote(applicant?.applicantId, jobId)}
            >
              Request for Quote
            </button>
          )}

          {canViewQuote && (
            <>
              <button
                className="whitespace-nowrap max-sm:text-sm hover:text-primary-green transition-all"
                onClick={() => setOpenQuoteDetailsModal(true)}
              >
                View Quote
              </button>
              <QuoteDetails
                openQuoteDetailsModal={openQuoteDetailsModal}
                handleCancel={handleCancel}
                Quote={applicant?.Quote}
                acceptQuote={acceptQuote}
                applicantId={applicant?._id}
                jobId={jobId}
              />
            </>
          )}

          {shouldShowRejectButton && (
            <button
              className="whitespace-nowrap text-red-500 max-sm:text-sm hover:text-red-600 transition-all"
              onClick={() => setIsOpen(true)}
            >
              Reject
            </button>
          )}
          <ConfirmRemoveModal
            question={`Are you sure you want to reject ${
              applicant?.user?.firstName && applicant?.user?.lastName
                ? `${applicant.user.firstName} ${applicant.user.lastName}`
                : applicant?.user?.userName
            }?`}
            isOpen={isOpen}
            onCancel={onCancel}
            updateApplicationStatus={updateApplicationStatus}
            applicationId={applicant?.applicantId}
          />
        </div>
      )}
    </>
  );
};

export default BiddableJobApplicantActionDropdown;
