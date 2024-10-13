import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import StarRating from "../StarRating/StarRating";
import { numberWithCommas } from "@/helpers";
import BiddableApplicationDetails from "./BiddableApplicationDetails";
import QuoteDetails from "./QuoteDetails";
import ConfirmRemoveModal from "../modals/ConfirmRemovalModal";

interface Props {
  jobInfo: any;
  requestQuote: any;
  acceptBiddableApplicant: any;
  removeApplicant: any;
  acceptQuote: any;
}

const Applicants = ({
  jobInfo,
  requestQuote,
  acceptBiddableApplicant,
  removeApplicant,
  acceptQuote,
}: Props) => {
  const { currentUser } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [isAnyAccepted, setIsAnyAccepted] = useState<boolean>(false);
  const [openQuoteDetailsModal, setOpenQuoteDetailsModal] = useState(false);
  const [applicantIndex, setAppllicantIndex] = useState<number | null>(null);
  const [openApplicationDetailsModal, setOpenApplicationDetailsModal] =
    useState(false);
  const [acceptedApplicantId, setAcceptedApplicantId] = useState<string | null>(
    null
  );

  const handleCancel = () => {
    setOpenQuoteDetailsModal(false);
  };

  const handleCancelApplicationModal = () => {
    setOpenApplicationDetailsModal(false);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const checkIsAccepted = jobInfo?.applicants?.some(
      (applicant: any) => applicant?.isAccepted
    );
    const foundApplicant = jobInfo?.applicants?.find(
      (applicant: any) => applicant?.isAccepted
    );
    if (foundApplicant) {
      setAcceptedApplicantId(foundApplicant?.applicantId);
    }
    setIsAnyAccepted(checkIsAccepted);
  }, [jobInfo?.applicants]);

  return (
    <>
      {jobInfo?.applicants?.length > 0 && (
        <div className=" bg-white w-full rounded-lg py-10">
          <h5 className="sm:text-lg font-semibold mb-5 px-5">Applicants</h5>
          <div className=" flex flex-col gap-2 ">
            {jobInfo?.applicants?.map((applicant: any, index: number) => (
              <div
                className="w-full flex hover:bg-gray-50 transition-all duration-300 py-4 px-5"
                key={index}
              >
                <Link
                  href={`/experts/details/${applicant?.applicantId}`}
                  className={`flex-1 flex w-full  ${
                    acceptedApplicantId === applicant?.applicantId &&
                    isAnyAccepted
                      ? ""
                      : acceptedApplicantId !== applicant?.applicantId &&
                        isAnyAccepted
                      ? "opacity-30"
                      : ""
                  }`}
                >
                  {" "}
                  <Image
                    src="/assets/dummyImages/profilePic.png"
                    alt="menu"
                    width={44}
                    height={44}
                    className="object-cover w-[44px] h-[44px] max-sm:w-[18px] max-sm:h-[18px] rounded-full mr-2"
                  />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h6 className="text-[18px] leading-[24px] font-[500] max-sm:text-[14px]">
                        {applicant?.firstName
                          ? applicant?.firstName + " " + applicant?.lastName
                          : applicant?.userName
                          ? applicant?.userName
                          : "No name"}
                      </h6>
                    </div>

                    {applicant?.Level === "Level 4" ? (
                      <div className="flex-c text-[#5E625F] text-sm max-sm:text-xs">
                        Level 4 | <StarRating rating={4} />
                      </div>
                    ) : applicant?.Level === "Level 3" ? (
                      <div className="flex-c text-[#5E625F] text-sm max-sm:text-xs">
                        Level 3 | <StarRating rating={3} />
                      </div>
                    ) : applicant?.Level === "Level 2" ? (
                      <div className="flex-c text-[#5E625F] text-sm max-sm:text-xs">
                        Level 2 | <StarRating rating={2} />
                      </div>
                    ) : applicant?.Level === "Level 1" ? (
                      <div className="flex-c text-[#5E625F] text-sm max-sm:text-xs">
                        Level 1 | <StarRating rating={1} />
                      </div>
                    ) : (
                      <div className="flex-c text-[#5E625F] text-sm max-sm:text-xs">
                        Level 5 | <StarRating rating={5} />
                      </div>
                    )}
                    <div className="flex-c gap-2">
                      <h6 className="text-sm font-medium max-sm:text-xs">
                        Bid price:
                      </h6>
                      <h6 className="text-sm font-medium max-sm:text-xs">
                        ₦
                        {applicant?.bidAmount &&
                          numberWithCommas(applicant.bidAmount)}
                      </h6>
                    </div>
                  </div>
                </Link>
                {currentUser.unique_id === jobInfo?.userDetails?.userId && (
                  <div className="relative ">
                    <Image
                      src="/assets/icons/Menu.svg"
                      height={20}
                      width={20}
                      alt="menu-dot"
                      className="object-contain h-5 w-5 cursor-pointer"
                      onClick={() => {
                        setOpenUserDropdown((prev) => !prev);
                        setAppllicantIndex(index);
                      }}
                    />
                    {/* the user action dropdown */}
                    {openUserDropdown && applicantIndex === index && (
                      <div className="absolute top-8 -right-3/4 shadow-md rounded-md bg-white flex flex-col gap-3 px-6 max-sm:px-3 py-6 items-start z-10 text-[#282828]">
                        <>
                          <button
                            className=" whitespace-nowrap max-sm:text-xs hover:text-primary-green transition-all"
                            onClick={() => setOpenApplicationDetailsModal(true)}
                          >
                            View application
                          </button>
                          <BiddableApplicationDetails
                            handleCancelApplicationModal={
                              handleCancelApplicationModal
                            }
                            openApplicationDetailsModal={
                              openApplicationDetailsModal
                            }
                            acceptBiddableApplicant={acceptBiddableApplicant}
                            applicant={applicant}
                            jobInfo={jobInfo}
                            isAnyAccepted={isAnyAccepted}
                          />
                        </>
                        {applicant?.isRequestQuote === false ? (
                          <button
                            className="whitespace-nowrap max-sm:text-xs hover:text-primary-green transition-all duration-300"
                            onClick={() =>
                              requestQuote(applicant?.applicantId, jobInfo?.Id)
                            }
                          >
                            Request for Quote
                          </button>
                        ) : applicant?.isRequestQuote === true &&
                          applicant?.Quote?.amount ? (
                          <>
                            <button
                              className="whitespace-nowrap max-sm:text-xs hover:text-primary-green transition-all duration-300"
                              onClick={() => setOpenQuoteDetailsModal(true)}
                            >
                              View Quote
                            </button>
                            <QuoteDetails
                              openQuoteDetailsModal={openQuoteDetailsModal}
                              handleCancel={handleCancel}
                              Quote={applicant?.Quote}
                              acceptQuote={acceptQuote}
                              applicantId={applicant?.applicantId}
                              jobId={jobInfo.Id}
                            />
                          </>
                        ) : null}

                        {acceptedApplicantId !== applicant?.applicantId && (
                          <button
                            className="whitespace-nowrap max-sm:text-xs hover:text-primary-green transition-all"
                            onClick={() => setIsOpen(true)}
                          >
                            Remove
                          </button>
                        )}
                        <ConfirmRemoveModal
                          question={`Are you sure you want to remove ${
                            applicant?.firstName
                              ? applicant?.firstName + " " + applicant?.lastName
                              : applicant?.userName
                              ? applicant?.userName
                              : "this applicant"
                          } from this Job?`}
                          isOpen={isOpen}
                          onCancel={onCancel}
                          removeApplicant={removeApplicant}
                          applicantId={applicant?.applicantId}
                          jobId={jobInfo?.Id}
                        />
                      </div>
                    )}
                    {/* end user of action dropdown */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Applicants;
