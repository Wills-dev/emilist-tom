"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { InsuranceFormProps } from "@/types";
import { insuranceOptions } from "@/constants";

const RegistrationFormEight = () => {
  const [formData, setFormData] = useState<InsuranceFormProps>({
    insuringOrganization: "",
    typeOfCover: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const insurance = localStorage.getItem("EmilistExpertInsurance");

    if (insurance) {
      const data = JSON.parse(insurance);
      setFormData(data);
    }
  }, []);

  const handleProceed = () => {
    const emilistExpertInsurance = JSON.stringify(formData);
    localStorage.setItem("EmilistExpertInsurance", emilistExpertInsurance);

    router.push("/expert/register/coverage");
  };

  return (
    <section className="max-md:padding-x h-screen overflow-y-auto">
      <div className="md:pl-[500px] w-full">
        <div className="pt-28 max-md:pt-24 max-md:pb-15 w-full md:px-10">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="expert-reg-title">Add Insurance</h1>
            <p className="py-4 max-w-[550px]">
              Enter insurance information here
            </p>
            <div className="grid grid-cols-4 gap-6 w-full ">
              <div className=" col-span-2 max-lg:col-span-4 max-md:col-span-2 max-sm:col-span-4">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Insuring organisation
                </p>
                <div className="w-full">
                  <input
                    type="text"
                    className="expert-reg-input"
                    placeholder="Builders association"
                    name="insuringOrganization"
                    value={formData.insuringOrganization}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" col-span-2 max-lg:col-span-4 max-md:col-span-2 max-sm:col-span-4">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Type of cover
                </p>

                <div className="w-full">
                  <select
                    className="expert-reg-input "
                    name="typeofCover"
                    value={formData.typeOfCover}
                    onChange={handleChange}
                  >
                    <option value="select">select insurance</option>
                    {insuranceOptions?.map((insurance, index) => (
                      <option key={index} value={insurance}>
                        {insurance}
                      </option>
                    ))}
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div className=" col-span-4 ">
                <div className="w-full">
                  <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                    Short description of what is covered
                  </p>
                  <div className="w-full">
                    <textarea
                      className="min-w-full w-full max-w-full rounded-lg p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1 max-sm:text-sm"
                      rows={10}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
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
              </div>

              <div className="flex justify-end mb-28 max-sm:justify-center col-span-4  ">
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

export default RegistrationFormEight;
