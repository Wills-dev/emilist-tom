import Link from "next/link";
import Image from "next/image";
import { useContext, useMemo, useState } from "react";

import { LevelType } from "@/types";
import { numberWithCommas } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
import { getStatusClass, levelCount } from "@/constants";

import StarRating from "../StarRating/StarRating";
import BiddableJobApplicantActionDropdown from "./BiddableJobApplicantActionDropdown";

interface Props {
  jobInfo: any;
  requestQuote: any;
  updateApplicationStatus: (
    applicationId: string,
    status: string
  ) => Promise<void>;
  acceptQuote: any;
}

const Applicants = ({
  jobInfo,
  requestQuote,
  updateApplicationStatus,
  acceptQuote,
}: Props) => {
  const { currentUser } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [openApplicationDetailsModal, setOpenApplicationDetailsModal] =
    useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState<{
    isOpen: boolean;
    applicantIndex: number | null;
  }>({ isOpen: false, applicantIndex: null });
  const [openQuoteDetailsModal, setOpenQuoteDetailsModal] = useState(false);

  const handleCancelApplicationModal = () => {
    setOpenApplicationDetailsModal(false);
  };

  const onCancel = () => setIsOpen(false);
  const handleCancel = () => setOpenQuoteDetailsModal(false);

  const toggleUserDropdown = (index: number) => {
    setOpenUserDropdown((prev) => ({
      isOpen: !prev.isOpen,
      applicantIndex: prev.isOpen ? null : index,
    }));
  };

  const { isAnyAccepted, acceptedApplicantId } = useMemo(() => {
    const acceptedApplicant = jobInfo?.applications?.find(
      (applicant: any) => applicant.status === "accepted"
    );
    return {
      isAnyAccepted: Boolean(acceptedApplicant),
      acceptedApplicantId: acceptedApplicant?.user?._id || null,
    };
  }, [jobInfo?.applications]);

  return (
    <>
      {jobInfo?.applications?.length > 0 && (
        <div className=" bg-white w-full rounded-lg py-10">
          <h5 className="sm:text-lg font-semibold mb-5 px-5">Applicants</h5>
          <div className="flex lg:flex-col flex-row overflow-x-scroll gap-2">
            {jobInfo?.applications?.map((applicant: any, index: number) => {
              const applicationLength = jobInfo?.applications?.length;
              const { level, rating } = levelCount[
                applicant?.user?.level as LevelType
              ] || {
                level: "Level 5",
                rating: 5,
              };
              return (
                <div
                  className="lg:w-full max-lg:min-w-[300px] w-[300px] flex max-lg:shadow-md px-5 max-lg:px-3 py-6 hover:bg-gray-50 transition-all duration-300 group"
                  key={index}
                >
                  <Link
                    href={`/dashboard/service/info/${applicant?.businessId}`}
                    className={`flex-1 flex w-full ${
                      isAnyAccepted &&
                      acceptedApplicantId !== applicant?.user?._id
                        ? "opacity-30"
                        : ""
                    }`}
                  >
                    {applicant?.user?.profileImage ? (
                      <Image
                        src={applicant?.user?.profileImage}
                        alt="menu"
                        width={44}
                        height={44}
                        className="object-cover w-[44px] h-[44px] max-sm:w-[18px] max-sm:h-[18px] rounded-full mr-2"
                      />
                    ) : (
                      <p className="w-[44px] h-[44px] max-sm:w-[18px] max-sm:h-[18px] rounded-full bg-slate-200 mr-2 flex-c justify-center font-bold">
                        {applicant?.user?.userName?.[0]?.toUpperCase()}
                      </p>
                    )}
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h6 className="text-lg font-medium max-sm:text-sm truncate group-hover:text-primary-green duration-300 transition-all">
                          {applicant?.user?.fullName
                            ? applicant.user.fullName
                            : applicant?.user?.userName}
                        </h6>
                      </div>
                      <div className="flex items-center text-[#5E625F] text-sm whitespace-nowrap">
                        {level} | <StarRating rating={rating} />
                      </div>
                      <div className="flex-c gap-2">
                        <h6 className="text-sm font-medium max-sm:text-xs">
                          Bid price:
                        </h6>
                        <h6 className="text-sm font-medium max-sm:text-xs">
                          {jobInfo?.currency}{" "}
                          {applicant?.biddableDetails?.maximumPrice &&
                            numberWithCommas(
                              applicant?.biddableDetails?.maximumPrice
                            )}
                        </h6>
                      </div>
                      {currentUser?._id === applicant?.user?._id ? (
                        <p
                          className={`px-4 py-1 rounded-full w-fit text-xs ${getStatusClass(
                            applicant.status
                          )}`}
                        >
                          {applicant?.status}
                        </p>
                      ) : currentUser?._id === jobInfo?.userId?._id ? (
                        <p
                          className={`px-4 py-1 rounded-full w-fit text-xs ${getStatusClass(
                            applicant.status
                          )}`}
                        >
                          {applicant?.status}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                  {currentUser?._id === jobInfo?.userId?._id && (
                    <div className="relative h-fit">
                      <Image
                        src="/assets/icons/Menu.svg"
                        alt="menu"
                        width={20}
                        height={20}
                        className=" object-contain w-5 h-5 cursor-pointer"
                        onClick={() => toggleUserDropdown(index)}
                      />
                      {/* the user action dropdown */}
                      <BiddableJobApplicantActionDropdown
                        openUserDropdown={openUserDropdown.isOpen}
                        index={index}
                        applicantIndex={openUserDropdown.applicantIndex}
                        isAnyAccepted={isAnyAccepted}
                        updateApplicationStatus={updateApplicationStatus}
                        jobId={jobInfo?._id}
                        applicant={applicant}
                        requestQuote={requestQuote}
                        setOpenQuoteDetailsModal={setOpenQuoteDetailsModal}
                        openQuoteDetailsModal={openQuoteDetailsModal}
                        handleCancel={handleCancel}
                        acceptQuote={acceptQuote}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        onCancel={onCancel}
                        applicationLength={applicationLength}
                        setOpenApplicationDetailsModal={
                          setOpenApplicationDetailsModal
                        }
                        handleCancelApplicationModal={
                          handleCancelApplicationModal
                        }
                        openApplicationDetailsModal={
                          openApplicationDetailsModal
                        }
                        jobInfo={jobInfo}
                      />
                      {/* end user of action dropdown */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Applicants;
