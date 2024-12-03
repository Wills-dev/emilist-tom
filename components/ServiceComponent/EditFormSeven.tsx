import { insuranceOptions } from "@/constants";
import Image from "next/image";
import React from "react";

interface InsuranceType {
  issuingOrganisation: string;
  coverage: string;
  description: string;
}

interface EditFormSevenProps {
  insurance: InsuranceType[];
  setInsurance: any;
  nextPage: () => void;
  prevPage: () => void;
}

const EditFormSeven = ({
  insurance,
  setInsurance,
  nextPage,
  prevPage,
}: EditFormSevenProps) => {
  const handleChange = (
    index: number,
    field: keyof InsuranceType,
    value: string | boolean
  ) => {
    setInsurance((insurance: any) => {
      return insurance?.map((insur: InsuranceType, i: number) => {
        if (i === index) {
          return {
            ...insur,
            [field]: value,
          };
        }
        return insur;
      });
    });
  };
  const addInsurance = () => {
    setInsurance([
      ...insurance,
      {
        issuingOrganisation: "",
        coverage: "",
        description: "",
      },
    ]);
  };
  return (
    <section className="max-md:padding-x h-screen overflow-y-auto">
      <div className="md:pl-[500px] w-full">
        <div className="pt-28 max-md:pt-24 max-md:pb-15 w-full md:px-10">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="expert-reg-title">Add Insurance</h1>
            <p className="py-4 max-w-[550px]">
              Edit insurance information here
            </p>
            {insurance.map((insurance, index) => (
              <div className="grid grid-cols-4 gap-6 w-full" key={index}>
                <div className=" col-span-2 max-lg:col-span-4 max-md:col-span-2 max-sm:col-span-4">
                  <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                    Insuring organisation
                  </p>
                  <div className="w-full">
                    <input
                      type="text"
                      className="expert-reg-input"
                      placeholder="Builders association"
                      name="issuingOrganisation"
                      value={insurance.issuingOrganisation}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "issuingOrganisation",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className=" col-span-2 max-lg:col-span-4 max-md:col-span-2 max-sm:col-span-4">
                  <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                    Type of coverage
                  </p>

                  <div className="w-full">
                    <select
                      className="expert-reg-input "
                      name="coverage"
                      value={insurance.coverage}
                      onChange={(e) =>
                        handleChange(index, "coverage", e.target.value)
                      }
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
                        rows={4}
                        name="description"
                        value={insurance.description}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-4 gap-6 w-full ">
              <div className=" col-span-4 ">
                <button
                  className="w-full flex items-center justify-end"
                  onClick={addInsurance}
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
                <div className="flex justify-end gap-5 mb-28 col-span-4  mt-5 ">
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
      </div>
    </section>
  );
};

export default EditFormSeven;
