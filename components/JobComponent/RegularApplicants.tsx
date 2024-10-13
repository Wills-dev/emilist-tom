import Link from "next/link";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/utils/AuthState";
import StarRating from "../StarRating/StarRating";
import QuoteDetails from "./QuoteDetails";
import ConfirmRemoveModal from "../modals/ConfirmRemovalModal";

interface Props {
  jobInfo: any;
  requestQuote: any;
  acceptRegularApplicant: any;
  removeApplicant: any;
  acceptQuote: any;
}

const RegularApplicants = ({
  jobInfo,
  requestQuote,
  acceptRegularApplicant,
  removeApplicant,
  acceptQuote,
}: Props) => {
  const { currentUser } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [applicantIndex, setAppllicantIndex] = useState<number | null>(null);
  const [openQuoteDetailsModal, setOpenQuoteDetailsModal] = useState(false);
  const [acceptedApplicantId, setAcceptedApplicantId] = useState<string | null>(
    null
  );
  const [isAnyAccepted, setIsAnyAccepted] = useState<boolean>(false);

  const onCancel = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setOpenQuoteDetailsModal(false);
  };

  useEffect(() => {
    const checkIsAccepted = jobInfo?.Applicants?.some(
      (applicant: any) => applicant?.isAccepted
    );
    const foundApplicant = jobInfo?.Applicants?.find(
      (applicant: any) => applicant?.isAccepted
    );
    if (foundApplicant) {
      setAcceptedApplicantId(foundApplicant?.applicantId);
    }
    setIsAnyAccepted(checkIsAccepted);
  }, [jobInfo?.Applicants]);

  return (
    <>
      {jobInfo?.Applicants?.length > 0 && (
        <div className=" bg-white w-full rounded-lg py-6">
          <h5 className="sm:text-lg font-semibold mb-5 px-5">Applicants</h5>
          <div className=" flex flex-col gap-2 py-4 px-5 hover:bg-gray-50 transition-all duration-300">
            {jobInfo?.Applicants?.map((applicant: any, index: number) => (
              <div className="w-full flex" key={index}>
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
                    <div className="flex-c-b">
                      <h6 className="text-lg font-medium max-sm:text-sm">
                        {applicant?.firstName
                          ? applicant?.firstName + " " + applicant?.lastName
                          : applicant?.userName
                          ? applicant?.userName
                          : "No name"}
                      </h6>
                    </div>

                    {applicant?.Level === "Level 4" ? (
                      <div className="flex items-center text-[#5E625F] text-sm max-sm:text-xs">
                        Level 4 | <StarRating rating={4} />
                      </div>
                    ) : applicant?.Level === "Level 3" ? (
                      <div className="flex items-center text-[#5E625F] text-sm max-sm:text-xs">
                        Level 3 | <StarRating rating={3} />
                      </div>
                    ) : applicant?.Level === "Level 2" ? (
                      <div className="flex items-center text-[#5E625F] text-sm max-sm:text-xs">
                        Level 2 | <StarRating rating={2} />
                      </div>
                    ) : applicant?.Level === "Level 1" ? (
                      <div className="flex items-center text-[#5E625F] text-sm max-sm:text-xs">
                        Level 1 | <StarRating rating={1} />
                      </div>
                    ) : (
                      <div className="flex items-center text-[#5E625F] text-sm max-sm:text-xs">
                        Level 5 | <StarRating rating={5} />
                      </div>
                    )}
                  </div>
                </Link>
                {currentUser.unique_id === jobInfo?.userDetails?.userId && (
                  <div className="relative h-fit">
                    <Image
                      src="/assets/icons/Menu.svg"
                      alt="menu"
                      width={20}
                      height={20}
                      className=" object-contain w-5 h-5 cursor-pointer"
                      onClick={() => {
                        setOpenUserDropdown((prev) => !prev);
                        setAppllicantIndex(index);
                      }}
                    />
                    {/* the user action dropdown */}
                    {openUserDropdown && applicantIndex === index && (
                      <div className="absolute top-full -right-3/4 shadow-md rounded-md bg-white flex flex-col gap-3 px-6 max-sm:px-3 py-6 items-start z-10 text-[#282828]">
                        {!isAnyAccepted && (
                          <button
                            className=" whitespace-nowrap max-sm:text-xs hover:text-primary-green transition-all"
                            onClick={() =>
                              acceptRegularApplicant(
                                applicant?.applicantId,
                                jobInfo?.Id
                              )
                            }
                          >
                            Accept
                          </button>
                        )}
                        {applicant?.isRequestQuote === false ? (
                          <button
                            className=" whitespace-nowrap text-[16px] max-sm:text-[13px] hover:text-primary-green transition-all"
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
                              className=" whitespace-nowrap text-[16px] max-sm:text-[13px] hover:text-primary-green transition-all"
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
                            className=" whitespace-nowrap text-[16px] max-sm:text-[13px] hover:text-primary-green transition-all"
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
export default RegularApplicants;
