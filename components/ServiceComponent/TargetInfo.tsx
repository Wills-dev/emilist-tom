"use client";

import Link from "next/link";
import Image from "next/image";

import { RadialChart } from "../Charts/RadialChart";
import { useGetTarget } from "@/hooks/useGetTarget";
import { numberWithCommas } from "@/helpers";
import { getCurrencySign } from "@/helpers/getCurrencySign";

const TargetInfo = () => {
  const { loading, target } = useGetTarget();

  return (
    <section className="mt-6">
      {loading ? (
        <div className="flex-c w-full min-h-[70vh] justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          <h1 className="sm:text-3xl font-bold text-xl py-4">
            Your {target?.duration} target
          </h1>
          {/* <div className="flex justify-end">
            <Link
              href="/dashboard/service/target/edit"
              className="flex items-center"
            >
              <Image
                src="/assets/icons/edit.svg"
                alt="logo"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-2"
              />
              <p className="text-primary-green max-sm:text-sm">Edit</p>
            </Link>{" "}
          </div> */}
          <div className="flex items-center overflow-x-scroll w-full py-4 gap-6">
            <div className=" w-[294px] min-w-[254px] bg-white p-4 flex flex-col gap-3 rounded-lg shadow-md">
              <h6 className="text-lg font-medium max-sm:text-sm">Jobs</h6>
              <p className="text-[16px] text-[#303632]  max-sm:text-sm">
                Amet minim mollit non deserunt ullamco est sit .{" "}
              </p>
              <div className="flex flex-col items-end gap-1">
                <p className="text-xl text-[#737774] font-semibold max-sm:text-sm">
                  {target?.jobs?.current &&
                    numberWithCommas(target?.jobs?.current)}
                  /
                  {target?.jobs?.target &&
                    numberWithCommas(target?.jobs?.target)}
                </p>
                <progress
                  className="progress w-full "
                  value={target?.jobs?.percentage || 0}
                  max="100"
                ></progress>
              </div>
            </div>
            <div className=" w-[294px] min-w-[254px] bg-white p-4 flex flex-col gap-3 rounded-lg shadow-md">
              <h6 className="text-lg font-medium max-sm:text-sm">Amount</h6>
              <p className="text-[16px] text-[#303632]  max-sm:text-sm">
                Amet minim mollit non deserunt ullamco est sit .{" "}
              </p>
              <div className="flex flex-col items-end gap-1">
                <p className="text-xl text-[#737774] font-semibold max-sm:text-sm">
                  {target?.currency && getCurrencySign(target?.currency)}
                  {target?.amount?.current &&
                    numberWithCommas(target?.amount?.current)}
                  /{target?.currency && getCurrencySign(target?.currency)}
                  {target?.amount?.target &&
                    numberWithCommas(target?.amount?.target)}
                </p>
                <progress
                  className="progress progress-success w-full"
                  value={target?.amount?.percentage || 0}
                  max="100"
                ></progress>
              </div>
            </div>
            <div className=" w-[294px] min-w-[254px] bg-white p-4 flex flex-col gap-3 rounded-lg shadow-md">
              <h6 className="text-lg font-medium max-sm:text-sm">
                Customer Referral
              </h6>
              <p className="text-[16px] text-[#303632]  max-sm:text-sm">
                Amet minim mollit non deserunt ullamco est sit .{" "}
              </p>
              <div className="flex flex-col items-end gap-1">
                <p className="text-xl text-[#737774] font-semibold max-sm:text-sm">
                  {target?.referrals?.current &&
                    numberWithCommas(target?.referrals?.current)}
                  /
                  {target?.referrals?.target &&
                    numberWithCommas(target?.referrals?.target)}
                </p>
                <progress
                  className="progress progress-warning w-full "
                  value={target?.referrals?.percentage || 0}
                  max="100"
                ></progress>
              </div>
            </div>
            <div className=" w-[294px] min-w-[254px] bg-white p-4 flex flex-col gap-3 rounded-lg shadow-md">
              <h6 className="text-lg font-medium max-sm:text-sm">
                Friends Invited
              </h6>
              <p className="text-[16px] text-[#303632]  max-sm:text-sm">
                Amet minim mollit non deserunt ullamco est sit .{" "}
              </p>
              <div className="flex flex-col items-end gap-1">
                <p className="text-xl text-[#737774] font-semibold max-sm:text-sm">
                  {target?.invites?.current &&
                    numberWithCommas(target?.invites?.current)}
                  /
                  {target?.invites?.target &&
                    numberWithCommas(target?.invites?.target)}
                </p>
                <progress
                  className="progress progress-error w-full"
                  value={target?.invites?.percentage || 0}
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
          <div className="w-full flex-c justify-center py-10 flex-col">
            <RadialChart percentage={target?.totalTargetPercentage} />
          </div>
        </>
      )}
    </section>
  );
};

export default TargetInfo;
