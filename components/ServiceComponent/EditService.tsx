"use client";

import { useEffect } from "react";

import { useEditService } from "@/hooks/useEditService";
import { useDeleteBusinessImage } from "@/hooks/useDeleteBusinessImage";

import EditFormOne from "./EditFormOne";
import EditFormTwo from "./EditFormTwo";
import EditFormThree from "./EditFormThree";
import EditFormFour from "./EditFormFour";
import EditFormFive from "./EditFormFive";
import EditFormSix from "./EditFormSix";
import EditFormSeven from "./EditFormSeven";
import EditFormEight from "./EditFormEight";

interface EditServiceProps {
  serviceId: string;
}

const EditService = ({ serviceId }: EditServiceProps) => {
  const { handleDeleteFetchedBusinessImage, isLoading, rerender } =
    useDeleteBusinessImage();
  const {
    handleEditBusiness,
    currentPage,
    prevPage,
    isSubmitting,
    loading,
    getServiceInfo,
    nextPage,
    services,
    setServices,
    ownerProfile,
    setOwnerProfile,
    ownerLanguages,
    setOwnerLanguages,
    ownerCountry,
    setOwnerCountry,
    setProfilePicturFile,
    profilePicture,
    setProfilePicture,
    businessCountry,
    setBusinessCountry,
    businessData,
    setBusinessData,
    businessFile,
    setBusinessFile,
    currentBusinessFile,
    businessDescription,
    setBusinessDescription,
    certificate,
    setCertificate,
    membership,
    setMemberShip,
    insurance,
    setInsurance,
    coverageArea,
    setCoverageArea,
  } = useEditService();

  useEffect(() => {
    getServiceInfo(serviceId);
  }, [serviceId, rerender]);
  return (
    <>
      {loading ? (
        <div className="w-full flex item-center justify-center text-green-500 mt-6 h-[80vh]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          {currentPage === 1 && (
            <EditFormOne
              services={services}
              setServices={setServices}
              nextPage={nextPage}
            />
          )}
          {currentPage === 2 && (
            <EditFormTwo
              ownerProfile={ownerProfile}
              setOwnerProfile={setOwnerProfile}
              ownerLanguages={ownerLanguages}
              setOwnerLanguages={setOwnerLanguages}
              ownerCountry={ownerCountry}
              setOwnerCountry={setOwnerCountry}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          )}
          {currentPage === 3 && (
            <EditFormThree
              nextPage={nextPage}
              prevPage={prevPage}
              setProfilePicturFile={setProfilePicturFile}
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
            />
          )}

          {currentPage === 4 && (
            <EditFormFour
              nextPage={nextPage}
              prevPage={prevPage}
              businessCountry={businessCountry}
              setBusinessCountry={setBusinessCountry}
              businessData={businessData}
              setBusinessData={setBusinessData}
            />
          )}
          {currentPage === 5 && (
            <EditFormFive
              nextPage={nextPage}
              prevPage={prevPage}
              businessFile={businessFile}
              setBusinessFile={setBusinessFile}
              currentBusinessFile={currentBusinessFile}
              businessDescription={businessDescription}
              setBusinessDescription={setBusinessDescription}
              handleDeleteFetchedBusinessImage={
                handleDeleteFetchedBusinessImage
              }
              isLoading={isLoading}
              serviceId={serviceId}
            />
          )}

          {currentPage === 6 && (
            <EditFormSix
              nextPage={nextPage}
              prevPage={prevPage}
              setCertificate={setCertificate}
              certificate={certificate}
              membership={membership}
              setMemberShip={setMemberShip}
            />
          )}
          {currentPage === 7 && (
            <EditFormSeven
              nextPage={nextPage}
              prevPage={prevPage}
              insurance={insurance}
              setInsurance={setInsurance}
            />
          )}
          {currentPage === 8 && (
            <EditFormEight
              prevPage={prevPage}
              serviceId={serviceId}
              coverageArea={coverageArea}
              setCoverageArea={setCoverageArea}
              isSubmitting={isSubmitting}
              handleEditBusiness={handleEditBusiness}
            />
          )}
        </>
      )}
    </>
  );
};

export default EditService;
