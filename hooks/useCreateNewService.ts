import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/utils/AuthState";
import { dataURLtoFile, promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { clearCookie, readCookie } from "@/helpers/cookieHelper";

export const useCreateNewService = () => {
  const { currentUser } = useContext(AuthContext);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCountryClick = (option: any) => {
    setSelectedCountry(option);
    setIsOpen(false);
  };

  const handleStateClick = (state: string) => {
    if (selectedLocations.includes(state)) {
      setSelectedLocations(
        selectedLocations.filter((selectedState) => selectedState !== state)
      );
    } else {
      setSelectedLocations([...selectedLocations, state]);
    }
  };

  const isStateSelected = (state: string) => {
    return selectedLocations.includes(state);
  };

  const expertServices: string[] = readCookie("expertServices");
  const expertProfile = readCookie("EmilistExpertProfile");
  const language = readCookie("EmilistSelectedLanguage");
  const country = readCookie("EmilistSelectedCountry");

  const profilePicFile = localStorage.getItem("EmilistExpertProfilePicture");
  const aboutBusiness = localStorage.getItem("EmilistExpertAboutBusiness");
  const businessCountry = localStorage.getItem(
    "EmilistSelectedBusinessCountry"
  );
  const bizFiles = localStorage.getItem("EmilistExpertBusinessPictures");
  const bisDescription = localStorage.getItem(
    "EmilistExpertBusinessDescription"
  );
  const certificateFile = localStorage.getItem("EmilistExpertCertPic");
  const verifyCert = localStorage.getItem("VerifyCert");
  const membershipData = localStorage.getItem("EmilistExpertMembership");
  const certificateData = localStorage.getItem("EmilistExpertCertificates");
  const insurance = localStorage.getItem("EmilistExpertInsurance");

  const profilePicture = () => {
    if (profilePicFile) {
      const file = dataURLtoFile(profilePicFile);
      return file;
    } else return "";
  };

  const businessProfile = () => {
    if (aboutBusiness) {
      const data = JSON.parse(aboutBusiness);
      return data;
    } else return "";
  };

  const bizCountry = () => {
    if (businessCountry) {
      return businessCountry;
    } else return "";
  };

  const businessPicture = () => {
    if (bizFiles) {
      const storedFiles = JSON.parse(bizFiles);
      if (storedFiles.length > 0) {
        const fileArray = storedFiles.map((dataURL: string) =>
          dataURLtoFile(dataURL)
        );
        return fileArray;
      }
    } else return [];
  };

  const certficateDetails = () => {
    if (certificateData) {
      const data = JSON.parse(certificateData);
      return data;
    }
  };

  const membershipDetails = () => {
    if (membershipData) {
      const data = JSON.parse(membershipData);
      return data;
    }
  };

  const Cerficate = () => {
    if (certificateFile) {
      const file = dataURLtoFile(certificateFile);
      return file;
    }
  };

  const isWantVerification = () => {
    if (verifyCert) {
      const data = JSON.parse(verifyCert);
      return data;
    }
  };

  const InsuranceData = () => {
    if (insurance) {
      const data = JSON.parse(insurance);
      return data;
    }
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      router.push("/login");
    }
    const { firstName, lastName, phoneNumber, city, address, bio, state } =
      expertProfile;
    const {
      businessAddress,
      businessName,
      employees,
      noticePeriod,
      startPrice,
      currency,
      statee,
      yearFounded,
    } = businessProfile();
    const businessCountry = bizCountry();
    const certificateArray = certficateDetails();
    const membershipArray = membershipDetails();
    const insuranceArray = InsuranceData();

    const certificateFilee = Cerficate();
    const businessPictures = businessPicture();
    const profilePics = profilePicture();

    setLoading(true);
    try {
      const expertData: any = {
        services: expertServices ? expertServices : [],
        firstName,
        lastName,
        phoneNumber,
        language,
        address,
        city,
        state,
        country: country ? country : "",
        bio,
        businessName,
        yearFounded,
        numberOfEmployee: employees,
        businessAddress,
        businessCity: "woo",
        businessState: statee,
        businessCountry,
        startingPrice: startPrice,
        currency,
        noticePeriod,
        businessDescription: bisDescription ? bisDescription : "",
        certification: certificateArray,
        membership: membershipArray,
        insurance: insuranceArray,
        coverageArea: selectedLocations,
      };

      const formData = new FormData();

      formData.append("firstName", expertData.firstName);
      formData.append("lastName", expertData.lastName);
      formData.append("phoneNumber", expertData.phoneNumber);
      formData.append("address", expertData.address);
      formData.append("city", expertData.city);
      formData.append("state", expertData.state);
      formData.append("country", expertData.country || "");
      formData.append("bio", expertData.bio);
      formData.append("businessName", expertData.businessName);
      formData.append("yearFounded", expertData.yearFounded.toString());
      formData.append(
        "numberOfEmployee",
        expertData.numberOfEmployee.toString()
      );
      formData.append("businessAddress", expertData.businessAddress);
      formData.append("businessCity", expertData.businessCity || "");
      formData.append("businessState", expertData.businessState);
      formData.append("businessCountry", expertData.businessCountry);
      formData.append("currency", expertData.currency);
      formData.append("startingPrice", expertData.startingPrice.toString());
      formData.append("noticePeriod", expertData.noticePeriod);
      formData.append(
        "businessDescription",
        expertData.businessDescription || ""
      );

      expertData.services.forEach((service: string, index: number) => {
        formData.append(`services[${index}]`, service);
      });

      expertData?.languages?.forEach((language: string, index: number) => {
        formData.append(`languages[${index}]`, language);
      });

      expertData?.coverageArea?.forEach((area: string, index: number) => {
        formData.append(`coverageArea[${index}]`, area);
      });

      expertData?.certification?.forEach((cert: any, index: number) => {
        if (cert.issuingOrganization) {
          formData.append(
            `certification[${index}][issuingOrganisation]`,
            cert.issuingOrganization
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
        if (cert.doesNotExpire.toString()) {
          formData.append(
            `certification[${index}][isCertificateExpire]`,
            cert.doesNotExpire.toString()
          );
        }
      });

      expertData?.renderedServices?.forEach((service: any, index: number) => {
        formData.append(`renderedServices[${index}][name]`, service.name);
        formData.append(`renderedServices[${index}][status]`, service.status);
      });

      expertData?.membership?.forEach((member: any, index: number) => {
        if (member.organization) {
          formData.append(
            `membership[${index}][organisation]`,
            member.organization
          );
        }
        if (member.position) {
          formData.append(
            `membership[${index}][positionHeld]`,
            member.position
          );
        }
        if (member.startDate) {
          formData.append(`membership[${index}][startDate]`, member.startDate);
        }
        if (member.endDate) {
          formData.append(`membership[${index}][endDate]`, member.endDate);
        }
        if (member.doesNotEnd.toString()) {
          formData.append(
            `membership[${index}][isMembershipExpire]`,
            member.doesNotEnd.toString()
          );
        }
      });

      expertData?.insurance?.forEach((insurance: any, index: number) => {
        if (insurance.insuringOrganization) {
          formData.append(
            `insurance[${index}][issuingOrganisation]`,
            insurance.insuringOrganization
          );
        }
        if (insurance.typeOfCover) {
          formData.append(
            `insurance[${index}][coverage]`,
            insurance.typeOfCover
          );
        }
        if (insurance.description) {
          formData.append(
            `insurance[${index}][description]`,
            insurance.description
          );
        }
      });

      for (let i = 0; i < businessPictures.length; i++) {
        formData.append("businessImages", businessPictures[i]);
      }
      formData.append("profileImage", profilePics);
      if (certificateFilee) {
        formData.append("certificate", certificateFilee);
      }

      await axiosInstance.post(`/business/register-business`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/expert/register/congrats");
      clearCookie("expertServices");
      clearCookie("EmilistExpertProfile");
      clearCookie("EmilistSelectedCountry");
      clearCookie("EmilistSelectedLanguage");
      localStorage.removeItem("EmilistExpertProfilePicture");
      localStorage.removeItem("EmilistExpertService");
      localStorage.removeItem("EmilistExpertAboutBusiness");
      localStorage.removeItem("EmilistSelectedBusinessCountry");
      localStorage.removeItem("EmilistExpertBusinessDescription");
      localStorage.removeItem("EmilistExpertBusinessPictures");
      localStorage.removeItem("EmilistExpertMembership");
      localStorage.removeItem("EmilistExpertExpire");
      localStorage.removeItem("EmilistExpertNoEndDate");
      localStorage.removeItem("VerifyCert");
      localStorage.removeItem("EmilistExpertCertPic");
      localStorage.removeItem("EmilistExpertInsurance");
      localStorage.removeItem("EmilistExpertCertificates");
    } catch (error: any) {
      console.error("error creating new service:", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    handleSubmit,
    loading,
    isStateSelected,
    selectedCountry,
    selectedLocations,
    setSelectedLocations,
    isOpen,
    handleCountryClick,
    handleStateClick,
    toggleDropdown,
  };
};
