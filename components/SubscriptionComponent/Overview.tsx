import Link from "next/link";
import Image from "next/image";

import SubscriptionToggle from "./SubscriptionToggle";

const reviewWorkers = [1, 2, 3, 4, 5];

const Overview = () => {
  return (
    <section className="py-28 padding-x">
      <SubscriptionToggle currentLink={1} />
      <div className="flex gap-6 max-lg:flex-col mt-6">
        <div className="w-full flex-1 shadow-md rounded-[10px] p-6">
          <div className="w-full flex justify-between">
            <h5 className="text-lg font-medium  max-sm:text-lg">Basic</h5>
            <h5 className="text-3xl font-extrabold max-sm:text-2xl py-2">
              ₦24,000
              <span className="text-[#6B7280] font-medium max-sm:text-sm font-inter">
                /mo
              </span>
            </h5>
          </div>
          <div className="grid grid-cols-10 gap-5 mt-6">
            <div className="col-span-6 w-full max-md:col-span-10">
              <h6 className="font-medium text-[#737774] max-sm:text-sm mb-1">
                21/30
              </h6>
              <div className="flex items-center w-full gap-4">
                <div className="w-full max-w-full h-[8px] rounded-[10px] bg-[#D0CFCF]">
                  <div className="h-full w-[70%] bg-[#054753] rounded-[10px]"></div>
                </div>
              </div>
            </div>
            <div className="col-span-4 max-md:col-span-10 w-full flex justify-end max-md:justify-start">
              <Link
                href="/subscription/plans"
                className="bg-primary-green w-[151px] py-[12px] text-[#fcfefd] rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap text-center"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex-1 shadow-md rounded-[10px] p-6 flex items-center">
          <div className="">
            <p className="font-medium text-[#737774] max-sm:text-sm py-4">
              Next Payment
            </p>
            <h5 className="text-xl font-semibold max-sm:text-lg">
              on September 30, 2022
            </h5>
          </div>
        </div>
      </div>
      <div className="w-full mt-6">
        <h6 className="sm:text-lg font-semibold">Invoice</h6>
        <div className="flex flex-col gap-6 w-full mt-4">
          {reviewWorkers.slice(0, 5).map((star, index) => (
            <div
              className="flex-c-b shadow-md px-8 py-4 rounded-[5px] flex-wrap gap-4 max-sm:px-4"
              key={index}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/bi_file-earmark-pdf-fill.svg"
                  alt="arrow-right"
                  width={32}
                  height={32}
                  className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
                />
                <h6 className="font-semibold  max-sm:text-sm">
                  Invoice.2022/10.pdf
                </h6>
              </div>
              <div className="flex-c gap-2 sm:hidden">
                <Image
                  src="/public/assets/icons/"
                  alt="arrow-right"
                  width={24}
                  height={24}
                  className="object-contain w-5 h-5 max-sm:w-4 max-sm:h-4"
                />
                <h6 className="font-semibold text-primary-green max-sm:text-sm">
                  Download
                </h6>
              </div>
              <div className="flex items-center gap-2">
                <p className=" text-sm font-medium text-[#737774] max-sm:text-xs">
                  Date of invoice
                </p>
                <h6 className="font-semibold max-sm:text-sm">Aug 29, 2022</h6>
              </div>
              <div className="flex items-center gap-2 max-sm:hidden">
                <Image
                  src="/assets/icons/document-download.svg"
                  alt="arrow-right"
                  width={24}
                  height={24}
                  className="object-contain w-5 h-5 max-sm:w-4 max-sm:4"
                />
                <h6 className="font-semibold text-primary-green max-sm:text-sm">
                  Download
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
