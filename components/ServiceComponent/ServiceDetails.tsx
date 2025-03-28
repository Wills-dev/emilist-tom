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
import { getCurrencySign } from "@/helpers/getCurrencySign";
import { usePromote } from "@/hooks/usePromote";

interface ServiceDetailsProps {
  serviceId: string;
}

const ServiceDetails = ({ serviceId }: ServiceDetailsProps) => {
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [openConfirmActionModal, setOpenConfirmActionModal] = useState(false);
  const {
    expectedClicks,
    setExpectedClicks,
    target,
    setTarget,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoad,
    handlePromote,
    isOpen,
    setIsOpen,
  } = usePromote();

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
                  {serviceInfo?.business?.businessName
                    ? Capitalize(serviceInfo?.business?.businessName)
                    : serviceInfo?.business?.services[0] &&
                      Capitalize(serviceInfo?.business?.services[0])}
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
                <PromoModal
                  onCancel={onCancel}
                  isOpen={isOpen}
                  expectedClicks={expectedClicks}
                  setExpectedClicks={setExpectedClicks}
                  target={target}
                  setTarget={setTarget}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  isLoad={isLoad}
                  handlePromote={handlePromote}
                  type="service"
                  id={serviceId}
                />
              </div>
            </div>
            <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 ">
              <p className="text-primary-green font-medium max-sm:text-sm py-2 flex-wrap">
                {serviceInfo?.business?.services?.map(
                  (service: string, index: number) => (
                    <span key={index} className="pl-1">
                      {service}
                      {index + 1 !== serviceInfo?.business?.services?.length &&
                        ","}
                    </span>
                  )
                )}
              </p>
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
                      {serviceInfo?.business?.yearFounded}
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
                      {serviceInfo?.business?.currency &&
                        getCurrencySign(serviceInfo?.business?.currency)}
                      {serviceInfo?.business?.startingPrice &&
                        numberWithCommas(serviceInfo?.business?.startingPrice)}
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
                      {serviceInfo?.business?.noticePeriod} days
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
                      {serviceInfo?.business?.businessState &&
                        Capitalize(serviceInfo?.business?.businessState)}
                      ,{" "}
                      {serviceInfo?.business?.businessCountry &&
                        Capitalize(serviceInfo?.business?.businessCountry)}
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
                      {serviceInfo?.business?.numberOfEmployee &&
                        numberWithCommas(
                          serviceInfo?.business?.numberOfEmployee
                        )}
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
                  {serviceInfo?.business?.bio}
                </p>
              </div>
              <div className=" w-full">
                <h6 className=" my-5   font-semibold max-sm:text-xs">Images</h6>
                <div className="flex gap-4 overflow-x-scroll w-full">
                  {serviceInfo?.business?.businessImages?.map(
                    (image: any, index: number) => (
                      <Image
                        key={index}
                        src={image?.imageUrl}
                        alt="logo"
                        width={122}
                        height={122}
                        className={`object-cover w-[122px] h-[122px] max-sm:w-[67px] max-sm:h-[67px] rounded-[14px]`}
                      />
                    )
                  )}
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
                {serviceInfo?.business?.coverageArea?.map(
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
              <div className="flex flex-col gap-6">
                {serviceInfo?.business?.membership?.length > 0 ? (
                  <>
                    {" "}
                    {serviceInfo?.business?.membership?.map(
                      (membership: any, index: number) => (
                        <div className=" flex flex-col  gap-2 " key={index}>
                          <h5 className="font-semibold">
                            {membership?.organisation}
                          </h5>
                          <div className="flex items-center gap-3 w-full">
                            {" "}
                            <h6 className="w-[100px] text-sm font-semibold max-sm:text-xs whitespace-nowrap">
                              Position held:
                            </h6>
                            <p className=" text-[#303632] text-sm  max-sm:text-xs">
                              {membership?.positionHeld}
                            </p>
                          </div>
                          <div className="flex items-center  gap-3 w-full">
                            {" "}
                            <h6 className="w-[100px]  text-sm font-semibold max-sm:text-xs whitespace-nowrap">
                              Starting Date:
                            </h6>
                            <p className=" text-[#303632] text-sm  max-sm:text-xs">
                              {membership?.startDate &&
                                convertDateFormat(membership?.startDate)}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 w-full">
                            {" "}
                            <h6 className="w-[100px] text-sm font-semibold max-sm:text-xs whitespace-nowrap">
                              End Date:
                            </h6>
                            <p className=" text-[#303632] text-sm  max-sm:text-xs">
                              {membership?.isMembershipExpire
                                ? "No end date"
                                : membership?.endDate &&
                                  convertDateFormat(membership?.endDate)}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <h5 className="font-semibold">No membership</h5>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 px-10 max-sm:px-5  ">
            <h4 className="mb-2  text-lg leading-[28px] font-semibold max-sm:text-sm">
              Insurance
            </h4>

            <div className="flex flex-col gap-6">
              {serviceInfo?.business?.insurance?.length > 0 ? (
                <>
                  {" "}
                  {serviceInfo?.business?.insurance?.map(
                    (insurance: any, index: number) => (
                      <div
                        className=" bg-white w-full rounded-[10px]"
                        key={index}
                      >
                        <div className=" flex flex-col  gap-3 ">
                          <div className="flex items-center gap-3 w-full">
                            {" "}
                            <h6 className="w-[120px]   font-semibold max-sm:text-xs whitespace-nowrap">
                              Issuing Org:
                            </h6>
                            <p className=" text-[#303632]  max-sm:text-xs">
                              {insurance?.issuingOrganisation}
                            </p>
                          </div>
                          <div className="flex-c gap-3 w-full">
                            {" "}
                            <h6 className="w-[120px]   font-semibold max-sm:text-xs  whitespace-nowrap">
                              Type of cover:
                            </h6>
                            <p className=" text-[#303632]  max-sm:text-xs">
                              {insurance?.coverage}
                            </p>
                          </div>
                          <p className=" text-[#303632]   max-sm:text-xs">
                            {insurance?.description}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </>
              ) : (
                <p className="font-semibold">No insurance</p>
              )}
            </div>
            <div className="py-6">
              <h6 className=" my-5 font-semibold max-sm:text-xs">
                Certificate
              </h6>
              {serviceInfo?.business?.certification?.length > 0 ? (
                <div className="flex gap-6 flex-wrap">
                  {serviceInfo?.business?.certification?.map(
                    (certificate: any, index: number) => (
                      <div className="flex gap-10 max-md:flex-col" key={index}>
                        <div className="w-[320px] max-sm:w-[280px]">
                          {certificate?.certificate && (
                            <Image
                              src={
                                certificate?.certificate &&
                                certificate?.certificate
                              }
                              alt="certificate"
                              width={280}
                              height={190}
                              className="object-cover w-[full] h-[190px]  min-w-full max-w-full max-sm:h-[140px]"
                            />
                          )}
                          <div className="w-full flex flex-col gap-4 py-6">
                            <div className="flex items-start  gap-3 w-full">
                              {" "}
                              <h6 className="w-[120px]   font-semibold max-sm:text-xs  whitespace-nowrap">
                                Issuing Org:
                              </h6>
                              <p className=" text-[#303632]   max-sm:text-xs">
                                {certificate?.issuingOrganisation}
                              </p>
                            </div>
                            <div className="flex items-center  gap-3 w-full">
                              {" "}
                              <h6 className="w-[120px]   font-semibold max-sm:text-xs  whitespace-nowrap">
                                Verification No:
                              </h6>
                              <p className=" text-[#303632]   max-sm:text-xs">
                                {certificate?.verificationNumber}
                              </p>
                            </div>
                            <div className="flex items-center  gap-3 w-full">
                              {" "}
                              <h6 className="w-[120px]   font-semibold max-sm:text-xs  whitespace-nowrap">
                                Issuing Date:
                              </h6>
                              <p className=" text-[#303632]   max-sm:text-xs">
                                {certificate?.issuingDate &&
                                  convertDateFormat(certificate?.issuingDate)}
                              </p>
                            </div>
                            <div className="flex items-center  gap-3 w-full">
                              {" "}
                              <h6 className="w-[120px]   font-semibold max-sm:text-xs  whitespace-nowrap">
                                Expiry Date:
                              </h6>
                              <p className=" text-[#303632]   max-sm:text-xs">
                                {certificate?.isCertificateExpire
                                  ? "No expiring date"
                                  : certificate?.expiringDate &&
                                    convertDateFormat(
                                      certificate?.expiringDate
                                    )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
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
