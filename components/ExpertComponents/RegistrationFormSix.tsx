"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { dataURLtoFile, toastOptions } from "@/helpers";
import { CgCloseR } from "react-icons/cg";

const RegistrationFormSix = () => {
  const router = useRouter();

  const [businessDescription, setBusinessDescription] = useState<string>("");
  const [files, setFiles] = useState<File | null>(null);

  useEffect(() => {
    const storedFile = localStorage.getItem("EmilistExpertBusinessPicture");
    const bisDescription = localStorage.getItem(
      "EmilistExpertBusinessDescription"
    );
    if (storedFile) {
      const file = dataURLtoFile(storedFile);
      setFiles(file);
    }

    if (bisDescription) {
      setBusinessDescription(bisDescription);
    }
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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

  const handleDelete = () => {
    setFiles(null);
  };

  const handleProceed = async () => {
    if (!files) {
      return toast.error("Please select a business image", toastOptions);
    } else if (!businessDescription) {
      return toast.error("Please enter a business description", toastOptions);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        const fileDataUrl = event.target.result;

        localStorage.setItem("EmilistExpertBusinessPicture", fileDataUrl);
      }
    };
    reader.readAsDataURL(files);
    localStorage.setItem(
      "EmilistExpertBusinessDescription",
      businessDescription
    );
    // Proceed to the next page
    router.push(`/expert/register/certificate`);
  };

  return (
    <section className="max-md:padding-x  h-screen overflow-y-auto">
      <div className="md:pl-[500px] w-full">
        <div className="pt-28 max-md:pt-24 max-md:pb-15 px-10 w-full max-md:px-5 max-sm:px-3">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="expert-reg-title">
              Write a brief business description
            </h1>
            <p className="py-4 max-w-[550px]">
              Supply a brief, vivid description of your service offering here.
            </p>
            <div className="grid grid-cols-5 gap-6 w-full ">
              <div className="col-span-3 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5 w-full">
                {" "}
                <div className="w-full">
                  <div className="w-full">
                    <textarea
                      className=" min-w-full w-full  max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1  max-sm:text-sm "
                      rows={10}
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="col-span-2   max-md:col-span-2 max-sm:col-span-5 max-lg:hidden  max-md:flex   max-sm:hidden ">
                <div className="w-full shadow-lg flex flex-col  justify-center  py-5 rounded-[10px] border-l-8 border-primary-green px-4">
                  <h3 className="sm:text-lg font-medium">You can mention</h3>
                  <ul className="py-3 px-4 list-disc flex flex-col gap-2">
                    <li className="max-sm:text-sm">Years in business</li>
                    <li className="max-sm:text-sm">
                      What you are passionate about
                    </li>
                    <li className="max-sm:text-sm">
                      Special skill or equipment
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-span-5 ">
                <p className="py-2 max-sm:text-sm font-medium">Add images</p>
                <div className="w-[216px] h-[210px] bg-[#ECECEC] rounded-md flex-c justify-center">
                  {files ? (
                    <div className="w-full h-full rounded relative">
                      <Image
                        src={URL.createObjectURL(files)}
                        alt={`business-picture`}
                        width={30}
                        height={30}
                        className="object-cover w-full h-full"
                      />
                      <button className="absolute bottom-0 right-0 bg-primary-green p-2">
                        <span className="" onClick={handleDelete}>
                          <CgCloseR />
                        </span>
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="business-pic"
                      className="w-full h-full rounded cursor-pointer border-dashed border-1 border-gray-400"
                    >
                      <input
                        id="business-pic"
                        type="file"
                        onChange={handleChange}
                        name="businessImages"
                        multiple
                        className="invisible h-0 w-0"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex justify-end mb-28 mt-6 max-sm:justify-center col-span-3 max-lg:col-span-5">
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

export default RegistrationFormSix;
