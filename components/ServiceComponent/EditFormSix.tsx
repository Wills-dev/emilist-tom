import Image from "next/image";

import toast from "react-hot-toast";
import { CgCloseR } from "react-icons/cg";

import { formatDateForInput, toastOptions } from "@/helpers";
import { Certificatee, Membershipp } from "@/types";

interface EditFormSixProps {
  certificate: any;
  setCertificate: any;
  membership: Membershipp[];
  setMemberShip: any;
  nextPage: () => void;
  prevPage: () => void;
}

const EditFormSix = ({
  certificate,
  setCertificate,
  membership,
  setMemberShip,
  nextPage,
  prevPage,
}: EditFormSixProps) => {
  const addCertificate = () => {
    setCertificate([
      ...certificate,
      {
        issuingOrganisation: "",
        verificationNumber: "",
        issuingDate: "",
        expiringDate: "",
        isCertificateExpire: false,
        isVerified: false,
        certificate: "",
        newCertificate: "",
      },
    ]);
  };

  const handleCertificateChange = (
    index: number,
    field: keyof Certificatee,
    value: string | boolean
  ) => {
    setCertificate((prevCertificate: any) =>
      prevCertificate.map((cert: Certificatee, i: number) =>
        i === index
          ? {
              ...cert,
              [field]: value,
              ...(field === "isCertificateExpire" && value === true
                ? { expiringDate: "" }
                : {}),
            }
          : cert
      )
    );
  };

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Allowed file types
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      const maxSizeInMB = 2 * 1024 * 1024; // 3MB

      // Check file size
      if (file.size > maxSizeInMB) {
        toast.error("File exceeds the 2MB size limit.", toastOptions);
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

      // Generate a local URL for the image
      const fileURL = URL.createObjectURL(file);

      // Update the state for the specific certificate
      setCertificate((prevCertificate: any) =>
        prevCertificate.map((cert: Certificatee, i: number) =>
          i === index
            ? {
                ...cert,
                certificate: fileURL,
                newCertificate: file,
              }
            : cert
        )
      );
    }
  };

  const updateIsVerified = (index: number) => {
    setCertificate((prevCertificate: any) => {
      const cert = prevCertificate[index];

      if (cert.isVerified) {
        toast.error("This certificate is already verified.");
        return prevCertificate; // No updates, return the original state
      } else if (!cert?.certificate) {
        toast.error("Please upload a certificate image");
        return;
      }
      setTimeout(() => {
        toast.success(
          "Your certification will be reviewed for verification!",
          toastOptions
        );
      }, 1000);
      return prevCertificate.map((cert: Certificatee, i: number) =>
        i === index
          ? {
              ...cert,
              isVerified: true,
            }
          : cert
      );
    });
  };

  const handleDeleteImg = (index: number) => {
    setCertificate((prevCertificate: any) =>
      prevCertificate.map((cert: Certificatee, i: number) =>
        i === index
          ? {
              ...cert,
              certificate: "",
              newCertificate: undefined,
            }
          : cert
      )
    );
  };

  const addMembership = () => {
    setMemberShip([
      ...membership,
      {
        organisation: "",
        positionHeld: "",
        startDate: "",
        endDate: "",
        isMembershipExpire: false,
      },
    ]);
  };

  const handleMembershipChange = (
    index: number,
    field: keyof Membershipp,
    value: string | boolean
  ) => {
    setMemberShip((prevMembership: any) => {
      return prevMembership.map((memb: Membershipp, i: number) => {
        if (i === index) {
          return {
            ...memb,
            [field]: value,
            ...(field === "isMembershipExpire" && value === true
              ? { endDate: "" }
              : {}),
          };
        }
        return memb;
      });
    });
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
              <p className=" py-2 font-medium max-sm:text-sm col-span-4">
                Edit Certificate
              </p>
              {certificate.map((certificate: Certificatee, index: number) => (
                <div
                  key={index}
                  className="col-span-4 grid grid-cols-4 gap-6 w-full"
                >
                  <div className="col-span-2 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5 w-full">
                    <div className="w-full shadow-lg flex-c flex-col justify-center  py-5 rounded-lg">
                      <div className="w-[216px] h-[210px] bg-[#ECECEC] rounded flex-c justify-center">
                        {" "}
                        {certificate?.certificate ? (
                          <div className="w-full h-full relative">
                            <Image
                              src={certificate?.certificate}
                              alt="upload"
                              width={30}
                              height={30}
                              className="object-cover w-full h-full "
                            />

                            <button className="absolute bottom-0 right-0 bg-primary-green p-2">
                              <span
                                className=""
                                onClick={() => handleDeleteImg(index)}
                              >
                                <CgCloseR />
                              </span>
                            </button>
                          </div>
                        ) : (
                          <input
                            style={{ fontSize: "16px" }}
                            type="file"
                            id="certificateImage"
                            name="certificateImage"
                            accept="image/*"
                            onChange={(e) => handleFileChange(index, e)}
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
                      <button
                        className="custom-btn"
                        onClick={() => updateIsVerified(index)}
                        disabled={certificate?.isVerified}
                      >
                        Request Verification
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2  max-lg:col-span-4  flex flex-col gap-5">
                    <>
                      <div className="w-full">
                        <p className="input-label">Issuing Organisation</p>
                        <div className="w-full">
                          <input
                            style={{ fontSize: "16px" }}
                            type="text"
                            className=" expert-reg-input"
                            name="issuingOrganisation"
                            value={certificate.issuingOrganisation}
                            onChange={(e) =>
                              handleCertificateChange(
                                index,
                                "issuingOrganisation",
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
                            style={{ fontSize: "16px" }}
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
                            style={{ fontSize: "16px" }}
                            type="date"
                            className=" expert-reg-input"
                            name="issuingDate"
                            value={
                              certificate?.issuingDate &&
                              formatDateForInput(certificate.issuingDate)
                            }
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
                          {certificate.isCertificateExpire ? (
                            <div
                              className={`expert-reg-input-div ${
                                certificate.isCertificateExpire && "opacity-45"
                              }`}
                            />
                          ) : (
                            <input
                              style={{ fontSize: "16px" }}
                              type="date"
                              className="expert-reg-input"
                              name="expiringDate"
                              value={
                                certificate?.expiringDate &&
                                formatDateForInput(certificate.expiringDate)
                              }
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
                            style={{ fontSize: "16px" }}
                            type="checkbox"
                            className="h-0 w-0 invisible"
                            checked={certificate.isCertificateExpire}
                            onChange={(e) =>
                              handleCertificateChange(
                                index,
                                "isCertificateExpire",
                                e.target.checked
                              )
                            }
                          />
                          <Image
                            src={
                              certificate.isCertificateExpire
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
                  </div>
                  <div className="flex   my-6 justify-center lg:hidden   col-span-4">
                    <button
                      className="custom-btn"
                      onClick={() => updateIsVerified(index)}
                      disabled={certificate?.isVerified}
                    >
                      Request Verification
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="w-full flex items-center justify-end col-span-4"
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

              <p className="  font-medium max-sm:text-sm col-span-5">
                Add Membership
              </p>

              {membership.map((membership, index) => (
                <div key={index} className="col-span-4 grid grid-cols-4 gap-5">
                  <div className="w-full col-span-2   max-lg:col-span-4   ">
                    <p className="input-label">Organisation</p>
                    <div className="w-full">
                      <input
                        style={{ fontSize: "16px" }}
                        type="text"
                        className=" expert-reg-input"
                        name="organisation"
                        value={membership.organisation}
                        onChange={(e) =>
                          handleMembershipChange(
                            index,
                            "organisation",
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
                          value={membership.positionHeld}
                          onChange={(e) =>
                            handleMembershipChange(
                              index,
                              "positionHeld",
                              e.target.value
                            )
                          }
                          name="positionHeld"
                          style={{ fontSize: "16px" }}
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
                        style={{ fontSize: "16px" }}
                        type="date"
                        className=" expert-reg-input"
                        name="startDate"
                        value={
                          membership?.startDate &&
                          formatDateForInput(membership.startDate)
                        }
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
                      {membership.isMembershipExpire ? (
                        <div
                          className={`expert-reg-input-div ${
                            membership.isMembershipExpire && "opacity-45"
                          }`}
                        />
                      ) : (
                        <input
                          style={{ fontSize: "16px" }}
                          type="date"
                          className=" expert-reg-input"
                          name="endDate"
                          value={membership?.endDate && membership.endDate}
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
                        style={{ fontSize: "16px" }}
                        type="checkbox"
                        className="h-0 w-0 invisible"
                        checked={membership.isMembershipExpire}
                        onChange={(e) =>
                          handleMembershipChange(
                            index,
                            "isMembershipExpire",
                            e.target.checked
                          )
                        }
                      />
                      <Image
                        src={
                          membership.isMembershipExpire
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
                </div>
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
              <div className="flex justify-end mb-28 mt-6 gap-5 col-span-5">
                <button className="custom-btn" onClick={prevPage}>
                  Back
                </button>
                <button className="custom-btn" onClick={nextPage}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditFormSix;
