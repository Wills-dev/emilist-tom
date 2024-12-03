import { useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useEditService = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [ownerCountry, setOwnerCountry] = useState("");
  const [ownerLanguages, setOwnerLanguages] = useState<string[]>([]);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [businessCountry, setBusinessCountry] = useState<string>("");
  const [businessDescription, setBusinessDescription] = useState<string>("");
  const [profilePicturFile, setProfilePicturFile] = useState<File | null>(null);
  const [businessFile, setBusinessFile] = useState<any>([]);
  const [currentBusinessFile, setCurrentBusinessFile] = useState<any>([]);
  const [coverageArea, setCoverageArea] = useState<string[]>([]);
  const [insurance, setInsurance] = useState([
    {
      issuingOrganisation: "",
      coverage: "",
      description: "",
    },
  ]);
  const [certificate, setCertificate] = useState([
    {
      certificate: "",
      newCertificate: undefined,
      issuingOrganisation: "",
      verificationNumber: "",
      issuingDate: "",
      expiringDate: "",
      isCertificateExpire: false,
      isVerified: false,
    },
  ]);
  const [membership, setMemberShip] = useState<any>([
    {
      organisation: "",
      positionHeld: "",
      startDate: "",
      endDate: "",
      isMembershipExpire: false,
    },
  ]);
  const [ownerProfile, setOwnerProfile] = useState<any>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: "",
    city: "",
    bio: "",
    address: "",
  });
  const [businessData, setBusinessData] = useState<any>({
    businessName: "",
    yearFounded: "",
    numberOfEmployee: 0,
    businessAddress: "",
    businessCity: "",
    businessState: "",
    startingPrice: 0,
    noticePeriod: "",
    currency: "NGN",
  });

  const getServiceInfo = async (serviceId: string) => {
    try {
      const { data } = await axiosInstance.get(
        `/business/fetch-single-business/${serviceId}`
      );
      setBusinessData(data?.data);
      setServices(data?.data?.services);
      setOwnerCountry(data?.data?.country);
      setOwnerLanguages(data?.data?.languages);
      setProfilePicture(data?.data?.profileImage);
      setBusinessCountry(data?.data?.businessCountry);
      setBusinessDescription(data?.data?.businessDescription);
      setCurrentBusinessFile(data?.data?.businessImages);
      setMemberShip(data?.data?.membership);
      setCertificate(data?.data?.certification);
      setInsurance(data?.data?.insurance);
      setCoverageArea(data?.data?.coverageArea);
      setOwnerProfile({
        firstName: data?.data?.firstName,
        lastName: data?.data?.lastName,
        phoneNumber: data?.data?.phoneNumber,
        state: data?.data?.state,
        city: data?.data?.city,
        bio: data?.data?.bio,
        address: data?.data?.address,
      });
      setBusinessData({
        businessName: data?.data?.businessName,
        yearFounded: data?.data?.yearFounded,
        numberOfEmployee: data?.data?.numberOfEmployee,
        businessAddress: data?.data?.businessAddress,
        businessCity: data?.data?.businessCity,
        businessState: data?.data?.businessState,
        startingPrice: data?.data?.startingPrice,
        noticePeriod: data?.data?.noticePeriod,
        currency: data?.data?.currency,
      });
    } catch (error: any) {
      console.log("error getting service info", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (currentPage < 9) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEditBusiness = async (businessId: string) => {
    const { firstName, lastName, phoneNumber, bio, state, city, address } =
      ownerProfile;
    const {
      businessName,
      yearFounded,
      numberOfEmployee,
      businessAddress,
      businessCity,
      businessState,
      startingPrice,
      noticePeriod,
      currency,
    } = businessData;
    setIsSubmitting(true);
    try {
      const businessPayload = {
        services,
        firstName,
        lastName,
        phoneNumber,
        bio,
        state,
        city,
        address,
        country: ownerCountry,
        languages: ownerLanguages,
        profileImage: profilePicturFile,
        businessCountry,
        businessName,
        yearFounded,
        numberOfEmployee,
        businessAddress,
        businessCity,
        businessState,
        startingPrice,
        noticePeriod,
        currency,
        businessDescription,
        certification: certificate,
        membership,
        insurance,
        coverageArea,
      };

      const formData = new FormData();
      businessPayload?.services.forEach((service: string, index: number) => {
        formData.append(`services[${index}]`, service);
      });
      businessPayload?.languages?.forEach((language: string, index: number) => {
        formData.append(`languages[${index}]`, language);
      });
      formData.append("firstName", businessPayload.firstName);
      formData.append("lastName", businessPayload.lastName);
      formData.append("phoneNumber", businessPayload.phoneNumber);
      formData.append("address", businessPayload.address);
      formData.append("city", businessPayload.city);
      formData.append("state", businessPayload.state);
      formData.append("country", businessPayload.country || "");
      formData.append("bio", businessPayload.bio);
      formData.append(
        "businessDescription",
        businessPayload.businessDescription || ""
      );
      if (businessPayload?.profileImage) {
        formData.append("profileImage", businessPayload?.profileImage);
      }
      for (let i = 0; i < businessFile.length; i++) {
        formData.append("businessImages", businessFile[i]);
      }
      businessPayload?.certification?.forEach((cert: any, index: number) => {
        if (cert.issuingOrganization) {
          formData.append(
            `certification[${index}][issuingOrganisation]`,
            cert.issuingOrganisation
          );
        }

        if (cert.verificationNumber) {
          formData.append(
            `certification[${index}][verificationNumber]`,
            cert.verificationNumber
          );
        }
        if (cert.issuingDate) {
          formData.append(
            `certification[${index}][issuingDate]`,
            cert.issuingDate
          );
        }
        if (cert.expiringDate) {
          formData.append(
            `certification[${index}][expiringDate]`,
            cert.expiringDate
          );
        }
        if (
          cert.isCertificateExpire.toString() === true ||
          cert.isCertificateExpire.toString() === "true"
        ) {
          formData.append(
            `certification[${index}][isCertificateExpire]`,
            cert.isCertificateExpire.toString()
          );
        }
        if (cert.newCertificate) {
          formData.append(`certificate`, cert.newCertificate);
        }
      });

      businessPayload?.membership?.forEach((member: any, index: number) => {
        if (member.organization) {
          formData.append(
            `membership[${index}][organisation]`,
            member.organisation
          );
        }
        if (member.positionHeld) {
          formData.append(
            `membership[${index}][positionHeld]`,
            member.positionHeld
          );
        }
        if (member.startDate) {
          formData.append(`membership[${index}][startDate]`, member.startDate);
        }
        if (member.endDate) {
          formData.append(`membership[${index}][endDate]`, member.endDate);
        }
        if (
          member.isMembershipExpire.toString() === true ||
          member.isMembershipExpire.toString() === "true"
        ) {
          formData.append(
            `membership[${index}][isMembershipExpire]`,
            member.isMembershipExpire.toString()
          );
        }
      });

      businessPayload?.insurance?.forEach((insurance: any, index: number) => {
        if (insurance.issuingOrganisation) {
          formData.append(
            `insurance[${index}][issuingOrganisation]`,
            insurance.issuingOrganisation
          );
        }
        if (insurance.coverage) {
          formData.append(`insurance[${index}][coverage]`, insurance.coverage);
        }
        if (insurance.description) {
          formData.append(
            `insurance[${index}][description]`,
            insurance.description
          );
        }
      });

      businessPayload?.coverageArea?.forEach((area: string, index: number) => {
        formData.append(`coverageArea[${index}]`, area);
      });

      const { data } = await axiosInstance.patch(
        `/business/update-business/${businessId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("data", data);
      toast.success("Edit successful", toastOptions);
      router.push(`/dashboard/service/info/${businessId}`);
    } catch (error) {
      console.log("error editing business", error);
      promiseErrorFunction(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
    profilePicturFile,
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
  };
};
