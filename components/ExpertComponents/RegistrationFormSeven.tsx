"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CgCloseR } from "react-icons/cg";
import toast from "react-hot-toast";

import { dataURLtoFile, toastOptions } from "@/helpers";
import { Certificate, Membership } from "@/types";

const RegistrationFormSeven = () => {
  const router = useRouter();

  const [isVerified, setIsVerified] = useState(false);
  const [files, setFiles] = useState<File | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      issuingOrganization: "",
      verificationNumber: "",
      issuingDate: "",
      expiringDate: "",
      doesNotExpire: false,
    },
  ]);

  const [memberships, setMemberships] = useState<Membership[]>([
    {
      organization: "",
      position: "",
      startDate: "",
      endDate: "",
      doesNotEnd: false,
    },
  ]);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Allowed file types
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      const maxSizeInMB = 2 * 1024 * 1024; // 2MB

      // Check file size
      if (file.size > maxSizeInMB) {
        toast.error("File exceeds the 3MB size limit.", toastOptions);
        return;
      }

      // Check file type
      if (!validExtensions.includes(file.type)) {
        toast.error(
          "Unsupported file type. Only jpg, jpeg, and png are allowed.",
          toastOptions
        );
        return;
      }

      setFiles(file);
    }
  };

  const handleCertificateChange = (
    index: number,
    field: keyof Certificate,
    value: string | boolean
  ) => {
    setCertificates((prevCertificates) => {
      return prevCertificates.map((cert, i) => {
        if (i === index) {
          return {
            ...cert,
            [field]: value,
            ...(field === "doesNotExpire" && value === true
              ? { expiringDate: "" }
              : {}),
          };
        }
        return cert;
      });
    });
  };

  // Generic handleChange for memberships
  const handleMembershipChange = (
    index: number,
    field: keyof Membership,
    value: string | boolean
  ) => {
    setMemberships((prevMembership) => {
      return prevMembership.map((memb, i) => {
        if (i === index) {
          return {
            ...memb,
            [field]: value,
            ...(field === "doesNotEnd" && value === true
              ? { endDate: "" }
              : {}),
          };
        }
        return memb;
      });
    });
  };

  // Function to handle certificate verification
  const handleVerifyCertificate = () => {
    if (!files) {
      toast.error("Please upload a certificate image");
      return;
    }
    setTimeout(() => {
      toast.success(
        "Your certification will be reviewed for verification!",
        toastOptions
      );
    }, 1000);
    setIsVerified(true);
  };

  // Function to add a new certificate form
  const addCertificate = () => {
    setCertificates([
      ...certificates,
      {
        issuingOrganization: "",
        verificationNumber: "",
        issuingDate: "",
        expiringDate: "",
        doesNotExpire: false,
      },
    ]);
  };

  // Function to add a new membership form
  const addMembership = () => {
    setMemberships([
      ...memberships,
      {
        organization: "",
        position: "",
        startDate: "",
        endDate: "",
        doesNotEnd: false,
      },
    ]);
  };

  const handleDelete = () => {
    setFiles(null);
    localStorage.removeItem("EmilistExpertCertPic");
  };

  const handleCancelVerifyCertificate = () => {
    setIsVerified(false);
    setTimeout(() => {
      toast.success("Your certificate won't be verified!", toastOptions);
    }, 2000);
  };

  useEffect(() => {
    const storedFile = localStorage.getItem("EmilistExpertCertPic");
    const verifyCert = localStorage.getItem("VerifyCert");
    const membershipData = localStorage.getItem("EmilistExpertMembership");
    const certificateData = localStorage.getItem("EmilistExpertCertificates");

    if (certificateData) {
      const data = JSON.parse(certificateData);
      setCertificates(data);
    }

    if (membershipData) {
      const data = JSON.parse(membershipData);
      setMemberships(data);
    }

    if (storedFile) {
      const file = dataURLtoFile(storedFile);
      setFiles(file);
    }

    if (verifyCert) {
      const data = JSON.parse(verifyCert);
      setIsVerified(data);
    }
  }, []);

  const handleProceed = () => {
    if (files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          const fileDataUrl = event.target.result;

          localStorage.setItem("EmilistExpertCertPic", fileDataUrl);
        }
      };

      reader.readAsDataURL(files);
    }

    // reader.readAsBinaryString(files)

    const verifyCert = JSON.stringify(isVerified);
    localStorage.setItem("VerifyCert", verifyCert);

    const emilistExpertCertificate = JSON.stringify(certificates);
    localStorage.setItem("EmilistExpertCertificates", emilistExpertCertificate);

    const emilistExpertMembership = JSON.stringify(memberships);
    localStorage.setItem("EmilistExpertMembership", emilistExpertMembership);

    router.push("/expert/register/insurance");
  };

  return (
    <section className="max-md:padding-x">
      <div className="md:pl-[500px] w-full">
        <div className="pt-28 max-md:pt-24 max-md:pb-15 w-full md:px-10">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="expert-reg-title">Certificate and Membership</h1>
            <p className="py-4 max-w-[550px]">
              Upload business and professional membership certification profiles
            </p>
            <div className="grid grid-cols-4 gap-6 w-full ">
              <div className="col-span-2 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5 w-full">
                <p className=" py-2 font-medium max-sm:text-sm">
                  Add Certificate
                </p>
                <div className="w-full shadow-lg flex-c flex-col justify-center  py-5 rounded-lg">
                  <div className="w-[216px] h-[210px] bg-[#ECECEC] rounded flex-c justify-center">
                    {" "}
                    {files ? (
                      <div className="w-full h-full relative">
                        <Image
                          src={URL.createObjectURL(files)}
                          alt="upload"
                          width={30}
                          height={30}
                          className="object-cover w-full h-full "
                        />

                        <button className="absolute bottom-0 right-0 bg-primary-green p-2">
                          <span className="" onClick={handleDelete}>
                            <CgCloseR />
                          </span>
                        </button>
                      </div>
                    ) : (
                      <input
                        type="file"
                        id="certificateImage"
                        name="certificateImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="invisible h-0 w-0"
                      />
                    )}
                  </div>
                  <label
                    htmlFor="certificateImage"
                    className="custom-btn mt-6 cursor-pointer"
                  >
                    Upload
                  </label>
                </div>
                <div className="flex  mt-6 justify-center max-lg:hidden  ">
                  {isVerified ? (
                    <button
                      className="custom-btn"
                      onClick={handleCancelVerifyCertificate}
                    >
                      Cancel Verification
                    </button>
                  ) : (
                    <button
                      className="custom-btn"
                      onClick={handleVerifyCertificate}
                    >
                      Request Verification
                    </button>
                  )}
                </div>
              </div>
              <div className="col-span-2  max-lg:col-span-4  flex flex-col gap-5">
                {certificates.map((certificate, index) => (
                  <>
                    <div className="w-full">
                      <p className="input-label">Issuing Organisation</p>
                      <div className="w-full">
                        <input
                          type="text"
                          className=" expert-reg-input"
                          name="issuingOrganization"
                          value={certificate.issuingOrganization}
                          onChange={(e) =>
                            handleCertificateChange(
                              index,
                              "issuingOrganization",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="input-label">Verification Number</p>
                      <div className="w-full">
                        <input
                          type="text"
                          className=" expert-reg-input"
                          name="verificationNumber"
                          value={certificate.verificationNumber}
                          onChange={(e) =>
                            handleCertificateChange(
                              index,
                              "verificationNumber",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="input-label">Issuing Date</p>
                      <div className="w-full">
                        <input
                          type="date"
                          className=" expert-reg-input"
                          name="issuingDate"
                          value={certificate.issuingDate}
                          onChange={(e) =>
                            handleCertificateChange(
                              index,
                              "issuingDate",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="input-label">Expiring Date</p>
                      <div className="w-full">
                        {certificate.doesNotExpire ? (
                          <div
                            className={`expert-reg-input-div ${
                              certificate.doesNotExpire && "opacity-45"
                            }`}
                          />
                        ) : (
                          <input
                            type="date"
                            className="expert-reg-input"
                            name="expiringDate"
                            value={certificate.expiringDate}
                            onChange={(e) =>
                              handleCertificateChange(
                                index,
                                "expiringDate",
                                e.target.value
                              )
                            }
                          />
                        )}
                      </div>
                      <label className="flex-c w-fit py-2 gap-2">
                        <input
                          type="checkbox"
                          className="h-0 w-0 invisible"
                          checked={certificate.doesNotExpire}
                          onChange={(e) =>
                            handleCertificateChange(
                              index,
                              "doesNotExpire",
                              e.target.checked
                            )
                          }
                        />
                        <Image
                          src={
                            certificate.doesNotExpire
                              ? "/assets/icons/checkbox-filled.svg"
                              : "/assets/icons/checkbox.svg"
                          }
                          alt="arrow-left"
                          width={30}
                          height={30}
                          className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
                        />
                        <p className="input-label cursor-pointer">
                          This certificate doesn't expire
                        </p>
                      </label>
                    </div>
                  </>
                ))}
                <button
                  className="w-full flex items-center justify-end"
                  onClick={addCertificate}
                >
                  <Image
                    src="/assets/icons/add.svg"
                    alt="logo"
                    width={130}
                    height={30}
                    className="object-contain w-[24px] h-[24px] max-sm:w-[16px] max-sm:h-[16px] mr-1"
                  />{" "}
                  <p className="text-primary-green py-2 text-[16px] font-[500] max-sm:text-[14px]">
                    ADD MORE
                  </p>
                </button>
              </div>
              <div className="flex   my-6 justify-center lg:hidden   col-span-4">
                {isVerified ? (
                  <button
                    className="custom-btn"
                    onClick={handleCancelVerifyCertificate}
                  >
                    Cancel Verification
                  </button>
                ) : (
                  <button
                    className="custom-btn"
                    onClick={handleVerifyCertificate}
                  >
                    Request Verification
                  </button>
                )}
              </div>
              <p className="  font-medium max-sm:text-sm col-span-5">
                Add Membership
              </p>

              {memberships.map((membership, index) => (
                <>
                  <div className="w-full col-span-2   max-lg:col-span-4   ">
                    <p className="input-label">Organisation</p>
                    <div className="w-full">
                      <input
                        type="text"
                        className=" expert-reg-input"
                        name="organization"
                        value={membership.organization}
                        onChange={(e) =>
                          handleMembershipChange(
                            index,
                            "organization",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full col-span-2  max-lg:col-span-4  ">
                    <p className="input-label">Position held</p>
                    <div className="w-full">
                      <div className="  expert-reg-input">
                        <select
                          className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                          value={membership.position}
                          onChange={(e) =>
                            handleMembershipChange(
                              index,
                              "position",
                              e.target.value
                            )
                          }
                          name="position"
                        >
                          <option defaultValue="">Select</option>
                          <option value="Member">Member</option>
                          <option value="President">President</option>
                          <option value="Chairman">Chairman</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-full col-span-2  max-lg:col-span-4">
                    <p className="input-label">State Date</p>
                    <div className="w-full">
                      <input
                        type="date"
                        className=" expert-reg-input"
                        name="startDate"
                        value={membership.startDate}
                        onChange={(e) =>
                          handleMembershipChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full col-span-2  max-lg:col-span-4   ">
                    <p className="input-label">End Date</p>
                    <div className="w-full">
                      {membership.doesNotEnd ? (
                        <div
                          className={`expert-reg-input-div ${
                            membership.doesNotEnd && "opacity-45"
                          }`}
                        />
                      ) : (
                        <input
                          type="date"
                          className=" expert-reg-input"
                          name="endDate"
                          value={membership.endDate}
                          onChange={(e) =>
                            handleMembershipChange(
                              index,
                              "endDate",
                              e.target.value
                            )
                          }
                        />
                      )}
                    </div>
                    <label className="flex-c w-full py-2 gap-2">
                      <input
                        type="checkbox"
                        className="h-0 w-0 invisible"
                        checked={membership.doesNotEnd}
                        onChange={(e) =>
                          handleMembershipChange(
                            index,
                            "doesNotEnd",
                            e.target.checked
                          )
                        }
                      />
                      <Image
                        src={
                          membership.doesNotEnd
                            ? "/assets/icons/checkbox-filled.svg"
                            : "/assets/icons/checkbox.svg"
                        }
                        alt="arrow-left"
                        width={30}
                        height={30}
                        className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
                      />
                      <label className="input-label cursor-pointer">
                        No end date
                      </label>
                    </label>
                  </div>
                </>
              ))}
              <button
                className="w-full flex items-center justify-end col-span-4"
                onClick={addMembership}
              >
                <Image
                  src="/assets/icons/add.svg"
                  alt="logo"
                  width={130}
                  height={30}
                  className="object-contain w-[24px] h-[24px] max-sm:w-[16px] max-sm:h-[16px] mr-1"
                />{" "}
                <p className="text-primary-green py-2 text-[16px] font-[500] max-sm:text-[14px]">
                  ADD MORE
                </p>
              </button>
              <div className="flex justify-end mb-28 mt-6 max-sm:justify-center col-span-5">
                <button className="custom-btn" onClick={handleProceed}>
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationFormSeven;
