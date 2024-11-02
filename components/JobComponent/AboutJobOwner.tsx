import { useContext } from "react";
import Image from "next/image";

import { AuthContext } from "@/utils/AuthState";
import { numberWithCommas } from "@/helpers";

interface Props {
  jobInfo: any;
  analytics: any;
}

const AboutJobOwner = ({ jobInfo, analytics }: Props) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser?._id !== jobInfo?.userId?._id && (
        <div className=" bg-white w-full rounded-lg py-10 px-5">
          <h5 className="sm:text-lg font-semibold  mb-5">
            About the job posted
          </h5>
          <div className=" flex flex-col  gap-5 ">
            <div className="flex-c gap-3">
              {jobInfo?.userId?.profileImage ? (
                <Image
                  src={jobInfo?.userId?.profileImage}
                  alt="profile pic"
                  width={37}
                  height={37}
                  className="object-cover w-[37px] h-[37px] max-sm:w-[18px] max-sm:h-[18px] rounded-full "
                />
              ) : (
                <p className="w-[37px] h-[37px] max-sm:w-[18px] max-sm:h-[18px] rounded-full bg-slate-200 mr-2 flex-c justify-center font-bold">
                  {jobInfo?.userId?.userName?.[0]?.toUpperCase()}
                </p>
              )}
              <h6 className="text-lg font-medium max-sm:text-sm">
                {jobInfo?.userId?.fullName
                  ? jobInfo?.userId?.fullName
                  : jobInfo?.userId?.userName}
              </h6>
            </div>
            {/* <div className="flex-c gap-3 w-full">
              {" "}
              <h6 className="flex-1 text-sm font-semibold max-sm:text-xs whitespace-nowrap">
                Location:
              </h6>
              <p className="flex-1 text-[#303632] text-sm max-sm:text-xs">
                {jobInfo?.userDetails?.userLocation
                  ? jobInfo?.userDetails?.userLocation
                  : "none"}
              </p>
            </div> */}
            <div className="flex-c  gap-3 w-full">
              {" "}
              <h6 className="flex-1 text-sm font-semibold max-sm:text-xs  whitespace-nowrap">
                Total Job posted:
              </h6>
              <p className="flex-1 text-[#303632] text-sm max-sm:text-xs">
                {analytics?.totalJobsPosted
                  ? numberWithCommas(analytics?.totalJobsPosted)
                  : 0}
              </p>
            </div>
            <div className="flex-c  gap-3 w-full">
              {" "}
              <h6 className="flex-1 text-sm font-semibold max-sm:text-xs  whitespace-nowrap">
                Total Expert Hired:
              </h6>
              <p className="flex-1 text-[#303632] text-sm max-sm:text-xs">
                {analytics?.totalArtisansHired
                  ? numberWithCommas(analytics?.totalArtisansHired)
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
