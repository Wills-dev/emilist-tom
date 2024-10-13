import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/axiosInstance/baseUrl";
import { AuthContext } from "@/utils/AuthState";
import { promiseErrorFunction } from "@/helpers";

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

  const location = () => {
    const selectedLocation = localStorage.getItem("EmilistLocation");
    if (selectedLocation) {
      return selectedLocation;
    } else return;
  };

  const lineofwork = () => {
    const lineOfWork = localStorage.getItem("EmilistLineOfWork");
    if (lineOfWork) {
      return lineOfWork;
    } else {
      return;
    }
  };

  const expertProfile: any = () => {
    const emilistExpertProfile = localStorage.getItem("EmilistExpertProfile");
    if (emilistExpertProfile) {
      const data = JSON.parse(emilistExpertProfile);
      return data;
    } else {
      return;
    }
  };

  const country = () => {
    const selectedCountryy = localStorage.getItem("EmilistSelectedCountry");
    if (selectedCountryy) {
      return selectedCountryy;
    } else {
      return;
    }
  };

  const language = () => {
    const emilistSelectedLanguages = localStorage.getItem(
      "EmilistSelectedLanguage"
    );
    if (emilistSelectedLanguages) {
      const language = JSON.parse(emilistSelectedLanguages);
      return language.join(", ");
    } else {
      return;
    }
  };

  const profilepic = () => {
    const storedFile = localStorage.getItem("EmilistExpertProfilePicture");
    if (storedFile) {
      return storedFile;
    } else {
      return;
    }
  };

  const service = () => {
    const EmilistExpertService = localStorage.getItem("EmilistExpertService");
    if (EmilistExpertService) {
      return EmilistExpertService;
    } else {
      return;
    }
  };

  const aboutBusiness: any = () => {
    const emilistExpertAboutBusiness = localStorage.getItem(
      "EmilistExpertAboutBusiness"
    );
    if (emilistExpertAboutBusiness) {
      const data = JSON.parse(emilistExpertAboutBusiness);
      return data;
    } else {
      return;
    }
  };

  const businessCountry = () => {
    const selectedCountryy = localStorage.getItem(
      "EmilistSelectedBusinessCountry"
    );
    if (selectedCountryy) {
      return selectedCountryy;
    } else {
      return;
    }
  };

  const businessDescription = () => {
    const bisDescription = localStorage.getItem(
      "EmilistExpertBusinessDescription"
    );
    if (bisDescription) {
      return bisDescription;
    } else {
      return;
    }
  };

  const businessDescriptionPic = () => {
    const storedFile = localStorage.getItem("EmilistExpertBusinessPicture");
    if (storedFile) {
      return storedFile;
    } else {
      return;
    }
  };

  const certificateMembership: any = () => {
    const formDataLocalStorage = localStorage.getItem(
      "EmilistExpertMembership"
    );
    if (formDataLocalStorage) {
      const data = JSON.parse(formDataLocalStorage);
      return data;
    } else {
      return;
    }
  };

  const doesMembershipExpire = () => {
    const dontExpire = localStorage.getItem("EmilistExpertExpire");
    if (dontExpire) {
      const data = JSON.parse(dontExpire);
      return data;
    } else {
      return;
    }
  };

  const doesMembershipEnd = () => {
    const noEndDate = localStorage.getItem("EmilistExpertNoEndDate");
    if (noEndDate) {
      const data = JSON.parse(noEndDate);
      return data;
    } else {
      return;
    }
  };

  const doYouWantToVerifyCert = () => {
    const verifyCert = localStorage.getItem("VerifyCert");
    if (verifyCert) {
      const data = JSON.parse(verifyCert);
      return data;
    } else {
      return null;
    }
  };

  const certificateFile = () => {
    const storedFile = localStorage.getItem("EmilistExpertCertPic");
    if (storedFile) {
      return storedFile;
    } else {
      return;
    }
  };

  const insurance = () => {
    const addInsurance = localStorage.getItem("EmilistExpertInsurance");
    if (addInsurance) {
      const data = JSON.parse(addInsurance);
      return data;
    } else {
      return;
    }
  };

  function base64ToBlob(base64Image: any): Blob {
    const [prefix, base64Data] = base64Image.split(",");
    const contentType =
      prefix.match(/data:(.*);base64/)?.[1] || "application/octet-stream";
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  const handleSubmit = async () => {
    if (!currentUser) {
      router.push("/login");
    }
    setLoading(true);
    try {
      const { firstName, lastName, phoneNumber, city, address, bio, state } =
        expertProfile();
      const { insuringOrganization, typeOfCover, description } = insurance();
      const {
        issuingOrganization,
        verificationNumber,
        issuingDate,
        expiringDate,
        organization,
        position,
        startDate,
        endDate,
      } = certificateMembership();

      const profileImageBlob = base64ToBlob(profilepic());
      const businessdescriptionimagesBlob = base64ToBlob(
        businessDescriptionPic()
      );
      const certificateFileBlob =
        certificateFile() && base64ToBlob(certificateFile());
      const {
        ownerName,
        businessName,
        yearFounded,
        employees,
        businessAddress,
        startPrice,
        statee,
        noticePeriod,
        contactPersonName,
        contactPersonPhone,
        contactPersonEmail,
      } = aboutBusiness();

      const expertData: any = {
        location: location(),
        lineofwork: lineofwork(),
        firstname: firstName,
        lastname: lastName,
        phonenumber: phoneNumber,
        language: language(),
        address,
        city,
        state,
        country: country(),
        bio,
        owner: ownerName,
        // profilepic: profilepic(),
        businessname: businessName,
        service: service(),
        yearfounded: yearFounded,
        numberofemployee: employees,
        businessaddress: businessAddress,
        businessstate: statee ? statee : state,
        businesscountry: businessCountry(),
        startingprice: startPrice,
        noticeperiod: `${noticePeriod} days`,
        contactpersonName: contactPersonName,
        contactpersonPhone: contactPersonPhone,
        contactpersonEmail: contactPersonEmail,
        businessdescription: businessDescription(),
        issuingorganisation: issuingOrganization,
        verificationnumber: verificationNumber,
        issuingdate: issuingDate,
        expiringdate: expiringDate,
        organization: organization,
        positionheld: position,
        startdate: startDate,
        enddate: endDate,
        insuringorganisation: insuringOrganization,
        typeofcover: typeOfCover ? typeOfCover : "none",
        userid: currentUser.unique_id,
        coverdescription: description,
        coveragearea: JSON.stringify(selectedLocations),
      };

      const formData = new FormData();
      formData.append(
        "profilepic",
        profileImageBlob,
        `image.${profileImageBlob.type.split("/")[1]}`
      );

      formData.append(
        "businessdescriptionimages",
        businessdescriptionimagesBlob,
        `image.${businessdescriptionimagesBlob.type.split("/")[1]}`
      );

      if (certificateFileBlob) {
        formData.append(
          "certificate",
          certificateFileBlob,
          `image.${certificateFileBlob.type.split("/")[1]}`
        );
      }

      for (const property in expertData) {
        formData.append(property, expertData[property]);
      }

      await axiosInstance.post(`/expert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/expert/register/congrats");
      localStorage.removeItem("EmilistLocation");
      localStorage.removeItem("EmilistLineOfWork");
      localStorage.removeItem("EmilistExpertProfile");
      localStorage.removeItem("EmilistSelectedCountry");
      localStorage.removeItem("EmilistSelectedLanguage");
      localStorage.removeItem("EmilistExpertProfilePicture");
      localStorage.removeItem("EmilistExpertService");
      localStorage.removeItem("EmilistExpertAboutBusiness");
      localStorage.removeItem("EmilistSelectedBusinessCountry");
      localStorage.removeItem("EmilistExpertBusinessDescription");
      localStorage.removeItem("EmilistExpertBusinessPicture");
      localStorage.removeItem("EmilistExpertMembership");
      localStorage.removeItem("EmilistExpertExpire");
      localStorage.removeItem("EmilistExpertNoEndDate");
      localStorage.removeItem("VerifyCert");
      localStorage.removeItem("EmilistExpertCertPic");
      localStorage.removeItem("EmilistExpertInsurance");
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
