import Image from "next/image";

import StarRating from "../StarRating/StarRating";

import { Capitalize, convertDateFormat } from "@/helpers";
import { getLevelValue } from "@/helpers/getLevelValue";

type Props = {
  handleOpenModal: () => void;
  serviceInfo: any;
};

const AboutBusinessOwner = ({
  handleOpenModal,
  serviceInfo,
}: Props) => {
  return (
    <section className="pt-10 sm:pb-10 pb-6">
      <h5 className="sm:text-xl font-semibold">About The Seller</h5>
      <div>
        <div className="flex w-full padding-y">
          <Image
            src={serviceInfo?.profileImage && serviceInfo?.profileImage}
            alt="Owner profile picture"
            width={30}
            height={30}
            className="object-cover w-[114px] h-[114px] max-sm:w-[70px] max-sm:h-[70px] rounded-full mr-4 max-sm:mr-1"
          />

          <div className="flex-1 w-full">
            <div className="flex items-center">
              <h6 className="text-[24px] font-semibold max-sm:font-[700] mr-4">
                {serviceInfo?.firstName && Capitalize(serviceInfo?.firstName)}{" "}
                {serviceInfo?.lastName && Capitalize(serviceInfo?.lastName)}
              </h6>
              <div className="w-2 h-2 bg-primary-green rounded-full"></div>
              <p className="ml-2 text-primary-green  ">Online</p>
            </div>

            <div className="flex-c-b w-full">
              <div className="flex items-center">
                <p className="text-[#5E625F] pr-2 border-r-1 border-[##5E625F] max-sm:text-xs">
                  LEVEL{" "}
                  {serviceInfo?.userId.level &&
                    getLevelValue(serviceInfo?.userId.level)}
                </p>
                <div className="flex-c my-1 gap-2 max-sm:gap-1 pl-2">
                  {" "}
                  <StarRating rating={serviceInfo?.averageRating || 0} />
                  <p className="text-sm max-sm:text-xs">
                    ({serviceInfo?.totalReviews || 0})
                  </p>
                </div>
              </div>
            </div>

            <button
              className="border-1 boreder-[#303632] px-4 py-3 rounded-[10px] mt-4 text-[#303632]"
              onClick={handleOpenModal}
            >
              Contact Me
            </button>
          </div>
        </div>
        <div className="flex  gap-10 flex-wrap max-sm:gap-2">
          <div>
            <h4 className="text-lg font-semibold max-sm:text-xs font-inter mb-2">
              Member Since
            </h4>
            <h6 className="  text-[#303632] max-sm:text-xs">
              {serviceInfo?.createdAt &&
                convertDateFormat(serviceInfo?.createdAt)}
            </h6>
          </div>
          <div>
            <h4 className="text-lg font-semibold max-sm:text-xs font-inter mb-2">
              Location
            </h4>
            <h6 className="  text-[#303632] max-sm:text-xs">
              {serviceInfo?.state}, {serviceInfo?.country}
            </h6>
          </div>
          <div>
            <h4 className="text-lg font-semibold max-sm:text-xs font-inter mb-2">
              Language
            </h4>
            {serviceInfo?.languages?.map((language: string, index: number) => (
              <h6 key={index} className="  text-[#303632] max-sm:text-xs">
                {language}
                {index + 1 !== serviceInfo?.languages?.length &&
                  serviceInfo?.languages?.length > 2 &&
                  ","}
              </h6>
            ))}
          </div>
          <div>
            <h4 className="text-lg font-semibold max-sm:text-xs font-inter mb-2">
              Notice period
            </h4>
            <h6 className="  text-[#303632] max-sm:text-xs">
              {serviceInfo?.noticePeriod} days
            </h6>
          </div>
        </div>
        <div className="py-10 max-sm:pb-6 grid grid-cols-5">
          <p className="  text-[#303632] max-sm:text-xs col-span-3 max-sm:col-span-5">
            {serviceInfo?.bio}
          </p>
        </div>
        <div className="flex flex-col gap-4 max-sm:gap-2">
          <div className="flex items-center  gap-8 max-sm:gap-2">
            <h4 className="  text-[#303632] max-sm:text-sm w-[137px]">
              Total Jobs:
            </h4>
            <p className="font-bold max-sm:text-sm ">51</p>
          </div>
          <div className="flex items-center  gap-8 max-sm:gap-2">
            <h4 className="  text-[#303632] max-sm:text-sm w-[137px]">
              Successful jobs:
            </h4>
            <p className="font-bold max-sm:text-sm ">51</p>
          </div>
          <div className="flex items-center  gap-8 max-sm:gap-2">
            <h4 className="  text-[#303632] max-sm:text-sm w-[137px]">
              Unsuccessful jobs:
            </h4>
            <p className="font-bold max-sm:text-sm ">0</p>
          </div>
          <div className="flex items-center  gap-8 max-sm:gap-2">
            <h4 className="  text-[#303632] max-sm:text-sm w-[137px]">
              Job sucess rate:
            </h4>
            <p className="font-bold max-sm:text-sm ">100%</p>
          </div>
        </div>
        <div className="pt-20 max-sm:pt-10">
          <h3 className="pb-10 max-sm:pb-6 sm:text-xl font-semibold ">
            Insurance
          </h3>
          <div className=" pb-10 max-sm:pb-6 grid grid-cols-5">
            <div className="col-span-3 max-sm:col-span-5 flex flex-col gap-6 max-sm:gap-3">
              <div className="flex items-center">
                <h6 className="  font-semibold max-sm:text-sm w-[137px]">
                  Issuing Org:
                </h6>
                <p className="  text-[#303632] max-sm:text-sm ">
                  Leadway Assurance
                </p>
              </div>
              <div className="flex items-center ">
                <h6 className="  font-semibold max-sm:text-sm w-[137px]">
                  Type of cover:
                </h6>
                <p className="  text-[#303632] max-sm:text-sm ">
                  Property Insurance
                </p>
              </div>
              <p className="  text-[#303632] max-sm:text-xs col-span-3 max-sm:col-span-5">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="pb-6 max-sm:pb-6 text-[20px] font-semibold ">
            Certification
          </h3>
          <button className="pb-10 max-sm:pb-6 text-[20px] font-semibold text-primary-green underline">
            See certification
          </button>
        </div>
        <div className="pt-20 max-sm:pt-10 pb-10 max-sm:pb-5">
          <h3 className="pb-6 max-sm:pb-6 text-[20px] font-semibold ">
            Membership
          </h3>
          <div className="shadow-lg px-3 py-6 max-w-[315px] rounded-[10px]">
            <h6 className="text-center text-lg  font-semibold max-sm:text-sm whitespace-nowrap w-full mb-4">
              Painters association of Nigeria
            </h6>
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <h6 className="  font-semibold max-sm:text-sm w-[137px]">
                  Position held:
                </h6>
                <p className="  text-[#303632] max-sm:text-sm ">Member</p>
              </div>
              <div className="flex items-center ">
                <h6 className="  font-semibold max-sm:text-sm w-[137px]">
                  Starting Date:
                </h6>
                <p className="  text-[#303632] max-sm:text-sm ">25/Feb/1998</p>
              </div>
              <div className="flex items-center ">
                <h6 className="  font-semibold max-sm:text-sm w-[137px]">
                  End Date:
                </h6>
                <p className="  text-[#303632] max-sm:text-sm ">25/Feb/1998</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBusinessOwner;
