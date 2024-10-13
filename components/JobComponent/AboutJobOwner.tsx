import React, { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "@/utils/AuthState";

interface Props {
  jobInfo: any;
}

const AboutJobOwner = ({ jobInfo }: Props) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser.unique_id !== jobInfo?.userDetails?.userId && (
        <div className=" bg-white w-full rounded-lg py-10 px-5">
          <h5 className="sm:text-lg font-semibold  mb-5">
            About the job posted
          </h5>
          <div className=" flex flex-col  gap-5 ">
            <div className="flex-c gap-3">
              <Image
                src="/assets/dummyImages/profilePic.png"
                alt="profile pic"
                width={37}
                height={37}
                className="object-cover w-[37px] h-[37px] max-sm:w-[18px] max-sm:h-[18px] rounded-full "
              />
              <h6 className="text-lg font-medium max-sm:text-sm">
                {jobInfo?.userDetails?.firstName
                  ? jobInfo?.userDetails?.firstName +
                    " " +
                    jobInfo?.userDetails?.lastName
                  : jobInfo?.userDetails?.userName}
              </h6>
            </div>
            <div className="flex-c gap-3 w-full">
              {" "}
              <h6 className="flex-1 text-sm font-semibold max-sm:text-xs whitespace-nowrap">
                Location:
              </h6>
              <p className="flex-1 text-[#303632] text-sm max-sm:text-xs">
                {jobInfo?.userDetails?.userLocation
                  ? jobInfo?.userDetails?.userLocation
                  : "none"}
              </p>
            </div>
            <div className="flex-c  gap-3 w-full">
              {" "}
              <h6 className="flex-1 text-sm font-semibold max-sm:text-xs  whitespace-nowrap">
                Total Job posted:
              </h6>
              <p className="flex-1 text-[#303632] text-sm max-sm:text-xs">
                {jobInfo?.userDetails?.totalJobPosted
                  ? jobInfo?.userDetails?.totalJobPosted
                  : 0}
              </p>
            </div>
            <div className="flex-c  gap-3 w-full">
              {" "}
              <h6 className="flex-1 text-sm font-semibold max-sm:text-xs  whitespace-nowrap">
                Total Expert Hired:
              </h6>
              <p className="flex-1 text-[#303632] text-sm max-sm:text-xs">
                {jobInfo?.userDetails?.totalExpertHired
                  ? jobInfo?.userDetails?.totalExpertHired
                  : 0}
              </p>
            </div>
            <div className="flex-c gap-3 w-full">
              {" "}
              <h6 className="flex-1 text-sm font-semibold max-sm:text-xs  whitespace-nowrap">
                Total Amount spent:
              </h6>
              <p className="flex-1 text-[#303632] text-sm max-sm:text-xs">
                ₦{" "}
                {jobInfo?.userDetails?.totalAmountSpent
                  ? jobInfo?.userDetails?.totalAmountSpent
                  : 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutJobOwner;
