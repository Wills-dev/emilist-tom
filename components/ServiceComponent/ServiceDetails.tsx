"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import ActionDropdown from "../DashboardComponents/ActionDropdown";

import { useGetServiceInfo } from "@/hooks/useGetServiceInfo";
import { Capitalize, convertDateFormat, numberWithCommas } from "@/helpers";
import { useDeleteService } from "@/hooks/useDeleteService";
import ConfirmAction from "../DashboardComponents/ConfirmAction";
import PromoModal from "../modals/PromoModal";

interface ServiceDetailsProps {
  serviceId: string;
}

const ServiceDetails = ({ serviceId }: ServiceDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [openConfirmActionModal, setOpenConfirmActionModal] = useState(false);

  const { loading, getServiceInfo, serviceInfo } = useGetServiceInfo();
  const { handleDeleteService, isDeleteLoading } = useDeleteService();

  const onCancel = () => {
    setIsOpen(false);
  };

  const toggleActionButton = () => {
    setShowActionDropdown((prev) => !prev);
  };

  const toggleConfirmActionModal = () => {
    setOpenConfirmActionModal((prev) => !prev);
    setShowActionDropdown(false);
  };

  const confrimDeleteMaterial = () => {
    handleDeleteService(serviceId);
  };

  useEffect(() => {
    getServiceInfo(serviceId);
  }, [serviceId]);

  return (
    <section className="py-28 padding-x bg-[#F0FDF5] relative">
      {/* confirm if you want to delete mservice */}
      <AnimatePresence>
        {openConfirmActionModal && (
          <ConfirmAction
            closeActionModal={toggleConfirmActionModal}
            confirmAction={confrimDeleteMaterial}
            loading={isDeleteLoading}
            text="Are you sure you want to delete this service?"
          />
        )}
      </AnimatePresence>
      {loading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[70vh]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
            <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-4">
              <div className="flex items-center justify-between">
                <h5 className="sm:text-3xl font-semibold text-xl">
                  {serviceInfo?.service && Capitalize(serviceInfo?.service)}
                </h5>
                <div className="relative w-[30px] h-[30px] max-sm:w-[18px] max-sm:h-[18px]">
                  <button onClick={toggleActionButton}>
                    <Image
                      src="/assets/icons/Menu.svg"
                      height={20}
                      width={20}
                      alt="menu-dot"
                      className="object-contain h-8 w-6"
                    />
                  </button>
                  <AnimatePresence>
                    {showActionDropdown && (
                      <ActionDropdown
                        confirmDelete={toggleConfirmActionModal}
                        link={`/dashboard/service/edit/${serviceId}`}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex-c gap-12">
                <button
                  className="text-primary-green font-medium max-sm:text-sm py-2 underline"
                  onClick={() => setIsOpen(true)}
                >
                  Promote
                </button>
                <PromoModal onCancel={onCancel} isOpen={isOpen} />
                <p className="text-primary-green font-medium max-sm:text-sm py-2 ml-[10rem] max-md:ml-0">
                  {serviceInfo?.businessname}
                </p>
              </div>
            </div>
            <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 ">
              <div className="grid grid-cols-6 gap-10">
                <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                  <Image
                    src="/assets/icons/calendar.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col gap-1">
                    <h6 className="sm:text-lg font-semibold">
                      {serviceInfo?.yearfounded}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-sm">
                      Year founded
                    </p>
                  </div>
                </div>
                <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                  <Image
                    src="/assets/icons/dollar-circle.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col  gap-1">
                    <h6 className="text-lg font-semibold max-sm:text-sm">
                      ₦
                      {serviceInfo?.startingprice &&
                        numberWithCommas(serviceInfo?.startingprice)}
                    </h6>
                    <p className="text-[#474C48]  max-sm:text-xs">
                      Starting price
                    </p>
                  </div>
                </div>
                <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                  <Image
                    src="/assets/icons/calendar.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col  gap-1">
                    <h6 className=" text-lg font-semibold max-sm:text-sm">
                      {serviceInfo?.noticeperiod}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-xs">
                      Notice period
                    </p>
                  </div>
                </div>
                <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                  <Image
                    src="/assets/icons/location.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col  gap-1">
                    <h6 className=" text-lg font-semibold max-sm:text-sm">
                      {serviceInfo?.state && Capitalize(serviceInfo?.state)},{" "}
                      {serviceInfo?.country && Capitalize(serviceInfo?.country)}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-xs">Location</p>
                  </div>
                </div>
                <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                  <Image
                    src="/assets/icons/user.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                  <div className="flex flex-col  gap-1">
                    <h6 className=" text-lg font-semibold max-sm:text-sm">
                      {serviceInfo?.numberofemployee &&
                        numberWithCommas(serviceInfo?.numberofemployee)}
                    </h6>
                    <p className="text-[#474C48] max-sm:text-xs">
                      No of employee
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-10 max-sm:px-5">
              <div className="py-5">
                <h6 className=" my-5   font-semibold max-sm:text-xs">
                  About my service
                </h6>
                <p className=" my-5 text-[#303632]   max-sm:text-xs">
                  {serviceInfo?.bio}
                </p>
              </div>
              <div className=" w-full">
                <h6 className=" my-5   font-semibold max-sm:text-xs">Images</h6>
                <div className="flex gap-4 overflow-x-scroll w-full">
                  {/* {reviewWorkers.map((image, index) => (
                  <Image
                    key={index}
                    src={image.imgURL && image.imgURL}
                    alt="logo"
                    width={122}
                    height={122}
                    className={`object-contain w-[122px] h-[122px] max-sm:w-[67px] max-sm:h-[67px] rounded-[14px]`}
                  />
                ))} */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 max-lg:hidden max-h-max flex flex-col gap-6">
            <div className=" bg-white w-full rounded-[10px] py-10 px-5">
              <h5 className="text-[#000000] text-lg font-semibold max-sm:text-sm mb-5">
                Service Coverage
              </h5>
              <ul className=" flex flex-col  gap-5 list-disc pl-6 max-md:pl-4 text-[#303632]">
                {serviceInfo?.coveragearea?.map(
                  (area: string, index: number) => (
                    <li key={index} className="max-sm:text-xs ">
                      {area}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className=" bg-white w-full rounded-lg py-10 px-5">
              <h5 className="text-[#000000] text-6 leading-[28px] font-semibold max-sm: mb-5">
                Membership
              </h5>
              {serviceInfo?.organization ? (
                <div className=" flex flex-col  gap-2 ">
                  <h5 className="font-semibold">{serviceInfo?.organization}</h5>
                  <div className="flex items-center gap-3 w-full">
                    {" "}
                    <h6 className="w-[100px] text-sm font-semibold max-sm:text-xs whitespace-nowrap">
                      Position held:
                    </h6>
                    <p className=" text-[#303632] text-sm  max-sm:text-xs">
                      {serviceInfo?.positionheld}
                    </p>
                  </div>
                  <div className="flex items-center  gap-3 w-full">
                    {" "}
                    <h6 className="w-[100px]  text-sm font-semibold max-sm:text-xs whitespace-nowrap">
                      Starting Date:
                    </h6>
                    <p className=" text-[#303632] text-sm  max-sm:text-xs">
                      {serviceInfo?.startdate &&
                        convertDateFormat(serviceInfo?.startdate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    {" "}
                    <h6 className="w-[100px] text-sm font-semibold max-sm:text-xs whitespace-nowrap">
                      End Date:
                    </h6>
                    <p className=" text-[#303632] text-sm  max-sm:text-xs">
                      {serviceInfo?.enddate &&
                        convertDateFormat(serviceInfo?.enddate)}
                    </p>
                  </div>
                </div>
              ) : (
                <h5 className="font-semibold">No membership</h5>
              )}
            </div>
          </div>
          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 px-10 max-sm:px-5  ">
            <h4 className="mb-2  text-lg leading-[28px] font-semibold max-sm:text-sm">
              Insurance
            </h4>
            {serviceInfo?.insuringorganisation ? (
              <div className=" bg-white w-full rounded-[10px]">
                <div className=" flex flex-col  gap-3 ">
                  <div className="flex items-center gap-3 w-full">
                    {" "}
                    <h6 className="w-[120px]   font-semibold max-sm:text-xs whitespace-nowrap">
                      Issuing Org:
                    </h6>
                    <p className=" text-[#303632]  max-sm:text-xs">
                      {serviceInfo?.insuringorganisation}
                    </p>
                  </div>
                  <div className="flex-c gap-3 w-full">
                    {" "}
                    <h6 className="w-[120px]   font-semibold max-sm:text-xs  whitespace-nowrap">
                      Type of cover:
                    </h6>
                    <p className=" text-[#303632]  max-sm:text-xs">
                      {serviceInfo?.typeofcover}
                    </p>
                  </div>
                  <p className=" text-[#303632]   max-sm:text-xs">
                    {serviceInfo?.coverdescription}
                  </p>
                </div>
              </div>
            ) : (
              <p>No insurance</p>
            )}
            <div className="py-6">
              <h6 className=" my-5   font-semibold max-sm:text-xs">
                Certificate
              </h6>
              {serviceInfo?.certificates?.length > 0 ? (
                <div className="flex gap-10 max-md:flex-col">
                  <div className="w-[320px] max-sm:w-[280px]">
                    <Image
                      src="/assets/images/privateExpertImg1.png"
                      alt="certificate"
                      width={280}
                      height={190}
                      className="object-cover w-[full] h-[190px]  min-w-full max-w-full max-sm:h-[140px]"
                    />
                    <div className="w-full flex flex-col gap-4 py-6">
                      <div className="flex items-start  gap-3 w-full">
                        {" "}
                        <h6 className="w-[120px]   font-semibold max-sm:text-xs  whitespace-nowrap">
                          Issuing Org:
                        </h6>
                        <p className=" text-[#303632]   max-sm:text-xs">
                          {serviceInfo?.issuingorganisation}
                        </p>
                      </div>
                      <div className="flex items-center  gap-3 w-full">
                        {" "}
                        <h6 className="w-[120px]   font-semibold max-sm:text-xs  whitespace-nowrap">
                          Verification No:
                        </h6>
                        <p className=" text-[#303632]   max-sm:text-xs">
                          {serviceInfo?.verificationnumber}
                        </p>
                      </div>
                      <div className="flex items-center  gap-3 w-full">
                        {" "}
                        <h6 className="w-[120px]   font-semibold max-sm:text-xs  whitespace-nowrap">
                          Issuing Date:
                        </h6>
                        <p className=" text-[#303632]   max-sm:text-xs">
                          {serviceInfo?.issuingdate &&
                            convertDateFormat(serviceInfo?.issuingdate)}
                        </p>
                      </div>
                      <div className="flex items-center  gap-3 w-full">
                        {" "}
                        <h6 className="w-[120px]   font-semibold max-sm:text-xs  whitespace-nowrap">
                          Expiry Date:
                        </h6>
                        <p className=" text-[#303632]   max-sm:text-xs">
                          {serviceInfo?.expiringdate &&
                            convertDateFormat(serviceInfo?.expiringdate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No certificate uploaded</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceDetails;
