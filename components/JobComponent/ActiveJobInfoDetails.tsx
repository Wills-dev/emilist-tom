import Image from "next/image";
import { useEffect, useState } from "react";

import { Capitalize, numberWithCommas } from "@/helpers";

import ChatModal from "../modals/ChatModal";
import StarRating from "../StarRating/StarRating";

const ActiveJobInfoDetails = ({ jobInfo, jobId }: any) => {
  const [openChat, setOpenChat] = useState(false);
  const [acceptedApplicant, setAcceptedApplicant] = useState<any>(null);

  const handleOpen = () => {
    setOpenChat((prev) => !prev);
  };

  useEffect(() => {
    const foundApplicant = jobInfo?.applicants?.find(
      (applicant: any) => applicant.isAccepted
    );

    if (foundApplicant) {
      setAcceptedApplicant(foundApplicant);
    }
  }, [jobInfo?.applicants]);

  return (
    <>
      {openChat && (
        <div className="absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]"></div>
      )}
      <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
        <div className="w-full  px-10 max-sm:px-5 pb-4">
          <div className="flex items-center justify-between">
            <h5 className=" text-3xl font-semibold max-sm:text-lg">
              {jobInfo?.jobTitle && Capitalize(jobInfo.jobTitle)}
            </h5>
          </div>
          <p className=" max-sm:text-xs py-2">
            <span className="text-[#1A201B] font-semibold">Job ID:</span>{" "}
            {jobId && jobId}
          </p>
        </div>
        <div className="w-full px-10 max-sm:px-5 py-6 ">
          <div className="flex justify-between items-center gap-10 flex-wrap">
            <div className="flex gap-2">
              <Image
                src="/assets/icons/clock.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
              />
              <div className="flex flex-col  gap-1">
                <h6 className=" text-lg font-semibold max-sm:text-[14px]">
                  {jobInfo?.projectDuration && jobInfo.projectDuration}
                </h6>
                <p className="text-[#474C48] max-sm:text-xs">
                  Project duration
                </p>
              </div>
            </div>
            <div className=" flex gap-2">
              <Image
                src="/assets/icons/empty-wallet.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
              />
              <div className="flex flex-col gap-1">
                <h6 className=" text-lg font-semibold max-sm:text-[14px]">
                  ₦{" "}
                  {jobInfo?.bidRange
                    ? numberWithCommas(jobInfo.bidRange)
                    : numberWithCommas(jobInfo.Amount)}
                </h6>
                <p className="text-[#474C48] max-sm:text-xs">Price</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/dollar-circle.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
              />
              <div className="flex flex-col  gap-1">
                <h6 className=" text-lg font-semibold max-sm:text-[14px]">
                  ₦{" "}
                  {jobInfo?.bidRange
                    ? numberWithCommas(jobInfo.bidRange)
                    : numberWithCommas(jobInfo.Amount)}
                </h6>
                <p className="text-[#474C48] max-sm:text-xs">Actual Amount</p>
              </div>
            </div>

            <button
              className="bg-primary-green px-[40px] py-[12px] text-[#fcfefd] rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap flex justify-center items-center max-lg:hidden"
              onClick={handleOpen}
            >
              <Image
                src="/assets/icons/messages.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-1"
              />
              Chats
            </button>
            {/* chat modal */}
            {openChat && <ChatModal handleOpen={handleOpen} />}
          </div>
        </div>
        <div className="w-full px-10 max-sm:px-5 py-6 flex justify-between">
          {acceptedApplicant ? (
            <div className="flex ">
              <Image
                src="/assets/dummyImages/profilePic.png"
                alt="menu"
                width={44}
                height={44}
                className="object-cover w-[44px] h-[44px] max-sm:w-[25px] max-sm:h-[25px] rounded-full mr-2"
              />
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h6 className=" text-lg font-[500] max-sm:text-[14px]">
                    {acceptedApplicant?.firstName
                      ? acceptedApplicant?.firstName +
                        " " +
                        acceptedApplicant?.lastName
                      : acceptedApplicant?.userName
                      ? acceptedApplicant?.userName
                      : "No name"}
                  </h6>
                </div>

                {acceptedApplicant?.Level === "Level 4" ? (
                  <div className="flex-c text-[#5E625F] text-sm max-sm:text-xs ">
                    Level 4 | <StarRating rating={4} />
                  </div>
                ) : acceptedApplicant?.Level === "Level 3" ? (
                  <div className="flex-c text-[#5E625F] text-sm max-sm:text-xs ">
                    Level 3 | <StarRating rating={3} />
                  </div>
                ) : acceptedApplicant?.Level === "Level 2" ? (
                  <div className="flex-c text-[#5E625F] text-sm max-sm:text-xs ">
                    Level 2 | <StarRating rating={2} />
                  </div>
                ) : acceptedApplicant?.Level === "Level 1" ? (
                  <div className="flex-c text-[#5E625F] text-sm max-sm:text-xs ">
                    Level 1 | <StarRating rating={1} />
                  </div>
                ) : (
                  <div className="flex-c text-[#5E625F] text-sm max-sm:text-xs ">
                    Level 5 | <StarRating rating={5} />
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* mobile chat button */}
          <button
            className="bg-primary-green px-[40px] py-[12px] text-[#fcfefd] rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap flex justify-center items-center lg:hidden max-md:px-[20px] max-md:py-[6px]"
            onClick={handleOpen}
          >
            <Image
              src="/assets/icons/messages.svg"
              alt="menu"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-1"
            />
            Chats
          </button>
          {/* chat modal */}
          {openChat && <ChatModal handleOpen={handleOpen} />}
        </div>
        <div className="w-full px-10 max-sm:px-5 py-6">
          <div className="w-full flex items-center justify-between">
            <h6 className=" my-5  text-[16px] font-semibold max-sm:text-[13px]">
              Project details
            </h6>
            <div className="flex gap-1 items-center">
              <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-xs whitespace-nowrap">
                Due date
              </p>
              <div className=" flex items-center justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-[20px]">
                <p className="text-[#25C269]  text-[14px] font-[500] leading-[16px] max-sm:text-xs whitespace-nowrap">
                  6 days
                </p>
              </div>
            </div>
          </div>
          <p className="  max-sm:text-xs">
            {jobInfo?.Description ? jobInfo?.Description : jobInfo?.description}
            <button className="text-[#25C269]  text-[14px] font-[500] leading-[16px] max-sm:text-xs whitespace-nowrap">
              see more
            </button>
          </p>
        </div>
        <div className="px-10 max-sm:px-5 py-6 w-full">
          <h6 className=" text-lg font-semibold max-sm:text-[14px] font-inter">
            Files
          </h6>
          <div className="flex items-center w-full gap-10 pt-4">
            <Image
              src="/assets/icons/pdf.jpg"
              alt="menu"
              width={61}
              height={61}
              className="object-contain w-[61px] h-[61px] max-sm:w-[40px] max-sm:h-[40px] "
            />
            <Image
              src="/assets/icons/mword.jpg"
              alt="menu"
              width={61}
              height={61}
              className="object-contain w-[61px] h-[61px] max-sm:w-[40px] max-sm:h-[40px] "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveJobInfoDetails;
