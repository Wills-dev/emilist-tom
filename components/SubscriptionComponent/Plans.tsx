"use client";

import Image from "next/image";
import { useState } from "react";

import SubscriptionToggle from "./SubscriptionToggle";
import { useGetSubscriptionPlans } from "@/hooks/useGetSubscriptionPlans";
import { Capitalize, numberWithCommas } from "@/helpers";

const Plans = () => {
  const [planType, setPlanType] = useState(false);
  const { plans, isLoading } = useGetSubscriptionPlans();

  return (
    <section className="py-28 padding-x">
      <SubscriptionToggle currentLink={2} />
      {isLoading ? (
        <div className="flex-c w-full min-h-[70vh] justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className=" text-3xl font-[700] leading-[40px] max-sm:text-[22px] max-sm:text-center max-sm:mt-5">
              Subscription Plans
            </h2>
            <h2 className="text-[#303632]  text-[16px] leading-[24px] max-sm:text-xs max-sm:leading-[18px] py-3 text-center">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </h2>
            <div className="flex items-center bg-[#F3F4F6] border-[2px] border-[#F3F4F6] w-[320px] max-w-[320px] h-[42px] max-h-[42px] rounded-[8px] p-[1px] my-3 max-sm:max-w-[280px] max-sm:w-[280px]">
              <button
                className={`${
                  !planType && "bg-white"
                } flex-1 w-full h-full text-[#374151]  text-sm font-[500] leading-[24px] max-sm:text-[12px]`}
                onClick={() => setPlanType(false)}
              >
                Monthly
              </button>
              <button
                className={`${
                  planType && "bg-white"
                } flex-1 w-full h-full text-[#374151]  text-sm font-[500] leading-[24px] max-sm:text-[12px]`}
                onClick={() => setPlanType(true)}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="w-full flex gap-5 overflow-x-scroll mt-2">
            {plans?.map((plan: any, index) => (
              <div
                key={index}
                className="min-h-[620px] w-[286px] max-w-[286px] min-w-[286px] border-[1px] border-[#E5E7EB] rounded-[8px]"
              >
                <div className="w-full border-b-1 border-[#E5E7EB] p-5">
                  <h5 className=" text-xl font-medium  max-sm:text-lg">
                    {plan?.name && Capitalize(plan?.name)}
                  </h5>
                  <p className="text-[#303632]  text-sm max-sm:text-xs py-4">
                    All the basics for starting a new business
                  </p>
                  {plan?.price === 0 ? (
                    <h5 className=" text-3xl font-extrabold  max-sm:text-2xl">
                      Free
                    </h5>
                  ) : (
                    <h5 className=" text-3xl font-extrabold  max-sm:text-2xl py-2">
                      {plan?.price && ` ₦${numberWithCommas(plan?.price)}`}
                      <span className="text-[#6B7280]  text-[16px] font-[500] leading-[24px] max-sm:text-sm max-sm:leading-[18px] font-inter">
                        /{planType ? "yr" : "mo"}
                      </span>
                    </h5>
                  )}

                  {plan?.price !== 0 && (
                    <button className="w-full bg-primary-green h-[38px] max-h-[38px] text-[#F6FDF9] text-sm font-[500] font-inter mt-4 rounded-[6px] ">
                      Buy Startup
                    </button>
                  )}
                </div>
                <div className="w-full p-5">
                  <h5 className="  text-sm font-semibold max-sm:text-xs uppercase">
                    What’s included
                  </h5>
                  <div className="flex flex-col gap-4 mt-6">
                    {plan?.offers?.map((offer: any, index: number) => (
                      <div className="flex items-start" key={index}>
                        <Image
                          src="/assets/icons/Icon.svg"
                          alt="good"
                          width={14}
                          height={10}
                          className="object-contain w-[14px] h-[10px] mr-3 mt-1"
                        />
                        <p className="text-[#6B7280]  text-sm max-sm:text-xs  font-inter">
                          {offer?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Plans;
