"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CgCloseR } from "react-icons/cg";
import toast from "react-hot-toast";

import { dataURLtoFile, toastOptions } from "@/helpers";

const RegistrationFormSeven = () => {
  const router = useRouter();

  const [verify, setVerify] = useState(false);
  const [files, setFiles] = useState<File | null>(null);
  const [isEndChecked, setIsEndChecked] = useState<boolean>(false);
  const [isExpireChecked, setIsExpireChecked] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    issuingOrganization: "",
    verificationNumber: "",
    issuingDate: "",
    expiringDate: "",
    organization: "",
    position: "",
    startDate: "",
    endDate: "",
  });

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Allowed file types
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      const maxSizeInMB = 3 * 1024 * 1024; // 3MB

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    setFiles(null);
    localStorage.removeItem("EmilistExpertCertPic");
  };

  const handleVerify = () => {
    setVerify(true);
    setTimeout(() => {
      toast.success(
        "Your certification will be reviewed for verification!",
        toastOptions
      );
    }, 2000);
  };

  const handleCancelVerify = () => {
    setVerify(false);
    setTimeout(() => {
      toast.success("Your certificate won't be verified!", toastOptions);
    }, 2000);
  };

  useEffect(() => {
    const storedFile = localStorage.getItem("EmilistExpertCertPic");
    const noEndDate = localStorage.getItem("EmilistExpertNoEndDate");
    const dontExpire = localStorage.getItem("EmilistExpertExpire");
    const verifyCert = localStorage.getItem("VerifyCert");
    const formDataLocalStorage = localStorage.getItem(
      "EmilistExpertMembership"
    );

    if (formDataLocalStorage) {
      const data = JSON.parse(formDataLocalStorage);
      setFormData(data);
    }

    if (storedFile) {
      const file = dataURLtoFile(storedFile);
      setFiles(file);
    }

    if (noEndDate) {
      const data = JSON.parse(noEndDate);
      setIsEndChecked(data);
    }

    if (dontExpire) {
      const data = JSON.parse(dontExpire);
      setIsExpireChecked(data);
    }

    if (verifyCert) {
      const data = JSON.parse(verifyCert);
      setVerify(data);
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

    const verifyCert = JSON.stringify(verify);
    localStorage.setItem("VerifyCert", verifyCert);

    const emilistExpertMembership = JSON.stringify(formData);
    localStorage.setItem("EmilistExpertMembership", emilistExpertMembership);

    const emilistExpertExpire = JSON.stringify(isExpireChecked);
    localStorage.setItem("EmilistExpertExpire", emilistExpertExpire);

    const emilistExpertEnd = JSON.stringify(isEndChecked);
    localStorage.setItem("EmilistExpertNoEndDate", emilistExpertEnd);

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
                  {verify ? (
                    <button className="custom-btn" onClick={handleCancelVerify}>
                      Cancel Verification
                    </button>
                  ) : (
                    <button className="custom-btn" onClick={handleVerify}>
                      Request Verification
                    </button>
                  )}
                </div>
              </div>
              <div className="col-span-2  max-lg:col-span-4  flex flex-col gap-5">
                <div className="w-full">
                  <p className="input-label">Issuing Organisation</p>
                  <div className="w-full">
                    <input
                      type="text"
                      className=" expert-reg-input"
                      name="issuingOrganization"
                      value={formData.issuingOrganization}
                      onChange={handleChange}
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
                      value={formData.verificationNumber}
                      onChange={handleChange}
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
                      value={formData.issuingDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Expiring Date</p>
                  <div className="w-full">
                    <input
                      type="date"
                      className=" expert-reg-input"
                      placeholder="12345678990"
                      name="expiringDate"
                      value={formData.expiringDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className="flex-c w-fit py-2 gap-2"
                    onClick={() => setIsExpireChecked((prev) => !prev)}
                  >
                    <Image
                      src={
                        isExpireChecked
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
                  </div>
                </div>
              </div>
              <div className="flex   my-6 justify-center lg:hidden   col-span-4">
                {verify ? (
                  <button className="custom-btn" onClick={handleCancelVerify}>
                    Cancel Verification
                  </button>
                ) : (
                  <button className="custom-btn" onClick={handleVerify}>
                    Request Verification
                  </button>
                )}
              </div>
              <p className="  font-medium max-sm:text-sm col-span-5">
                Add Membership
              </p>
              <div className="w-full col-span-2   max-lg:col-span-4   ">
                <p className="input-label">Organisation</p>
                <div className="w-full">
                  <input
                    type="text"
                    className=" expert-reg-input"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full col-span-2  max-lg:col-span-4  ">
                <p className="input-label">Position held</p>
                <div className="w-full">
                  <div className="  expert-reg-input">
                    <select
                      className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                      value={formData.position}
                      onChange={handleChange}
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
                    placeholder="12345678990"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full col-span-2  max-lg:col-span-4   ">
                <p className="input-label">End Date</p>
                <div className="w-full">
                  <input
                    type="date"
                    className=" expert-reg-input"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className="flex-c w-full py-2 gap-2"
                  onClick={() => setIsEndChecked((prev) => !prev)}
                >
                  <Image
                    src={
                      isEndChecked
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
                </div>
                {/* <button className="w-full flex items-center justify-end">
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
              </button> */}
              </div>
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
