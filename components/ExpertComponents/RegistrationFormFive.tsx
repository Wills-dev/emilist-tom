"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import { countries } from "@/constants";
import { toastOptions } from "@/helpers";
import { AboutBusinessProps } from "@/types";

interface Option {
  label: string;
  value: string;
}

const RegistrationFormFive = () => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [formData, setFormData] = useState<AboutBusinessProps>({
    ownerName: "",
    businessName: "",
    yearFounded: "",
    employees: "",
    businessAddress: "",
    statee: "",
    startPrice: "",
    noticePeriod: "",
    contactPersonName: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCountryClick = (option: string) => {
    setSelectedCountry(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const emilistExpertAboutBusiness = localStorage.getItem(
      "EmilistExpertAboutBusiness"
    );

    const selectedCountryy = localStorage.getItem(
      "EmilistSelectedBusinessCountry"
    );

    if (emilistExpertAboutBusiness) {
      const data = JSON.parse(emilistExpertAboutBusiness);
      setFormData(data);
    }

    setSelectedCountry(selectedCountryy || "");
  }, []);

  const handleProceed = () => {
    if (
      !formData.ownerName ||
      !formData.businessName ||
      !formData.yearFounded ||
      !selectedCountry ||
      !formData.employees ||
      !formData.businessName ||
      !formData.statee ||
      !formData.businessAddress ||
      !formData.startPrice ||
      !formData.noticePeriod ||
      !formData.contactPersonEmail ||
      !formData.contactPersonName ||
      !formData.contactPersonPhone
    ) {
      return toast.error("Please fill all fields", toastOptions);
    }
    const emilistExpertAboutBusiness = JSON.stringify(formData);
    localStorage.setItem(
      "EmilistExpertAboutBusiness",
      emilistExpertAboutBusiness
    );
    localStorage.setItem("EmilistSelectedBusinessCountry", selectedCountry);
    router.push("/expert/register/about-business-description");
  };

  return (
    <section className="max-md:padding-x h-screen overflow-y-auto">
      <div className="md:pl-[500px] w-full">
        <div className="pt-28 max-md:pt-24 max-md:pb-15 px-10 w-full max-md:px-5 max-sm:px-3">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="expert-reg-title">
              Tell us more about your business
            </h1>
            <p className="py-4 max-w-[550px]">
              Additional business and service profile information below
            </p>
            <div className="grid grid-cols-5 gap-6 w-full ">
              <div className="flex flex-col gap-6 col-span-3 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5">
                <div className="input__container">
                  <p className="input-label">Owner Name</p>
                  <div className="w-full">
                    <input
                      type="text"
                      className="expert-reg-input"
                      value={formData.ownerName}
                      onChange={handleChange}
                      name="ownerName"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Business Name</p>
                  <div className="w-full">
                    <input
                      type="text"
                      className="expert-reg-input"
                      value={formData.businessName}
                      onChange={handleChange}
                      name="businessName"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Year Founded</p>
                  <div className="w-full">
                    <input
                      type="number"
                      className="expert-reg-input"
                      name="yearFounded"
                      value={formData.yearFounded}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Number of employees</p>
                  <div className="w-full">
                    <input
                      type="number"
                      className="expert-reg-input"
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Business Address</p>
                  <div className="w-full">
                    <input
                      type="text"
                      className="expert-reg-input"
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <p className="input-label">State</p>
                  <div className="w-full">
                    <input
                      type="text"
                      className="expert-reg-input"
                      value={formData.statee}
                      onChange={handleChange}
                      name="statee"
                    />
                  </div>
                </div>
                {/* dropdown */}
                <div className="input__container ">
                  <p className="input-label">Country</p>
                  <div className="relative w-full" ref={dropdownRef}>
                    <button
                      onClick={toggleDropdown}
                      type="button"
                      className="min-w-full w-full max-w-full rounded-lg h-14 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1 max-sm:h-12 flex-c-b"
                    >
                      <p>
                        {selectedCountry ? selectedCountry : "Select an option"}
                      </p>
                      {/* Heroicon name: chevron-down */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 w-full mt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                        <div className="p-2">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search country..."
                            className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-green bg-white"
                          />
                        </div>
                        <div className="max-h-36 overflow-y-auto">
                          <ul role="list" className="py-1 w-full">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((option: Option) => (
                                <li key={option.value} className="w-full">
                                  <button
                                    onClick={() =>
                                      handleCountryClick(option.value)
                                    }
                                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  >
                                    {option.label}
                                  </button>
                                </li>
                              ))
                            ) : (
                              <li className="px-4 py-2 text-sm text-gray-500">
                                No results found
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Your Start Price</p>
                  <div className="w-full">
                    <input
                      type="text"
                      className="expert-reg-input"
                      name="startPrice"
                      value={formData.startPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Notice Period</p>
                  <div className="w-full">
                    <div className=" min-w-full w-full  max-w-full rounded-lg h-14 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1  max-sm:h-12 flex-c-b">
                      <input
                        type="number"
                        name="noticePeriod"
                        className="h-full flex-1 outline-none bg-[#ececec] max-sm:text-[14px]"
                        value={formData.noticePeriod}
                        onChange={handleChange}
                      />
                      <p className="border-l-1 border-primary-green px-3">
                        days
                      </p>
                    </div>
                  </div>
                  <div className="w-full mt-3">
                    <p className="input-label">Contact Person Name</p>
                    <div className="w-full">
                      <input
                        type="text"
                        className="expert-reg-input"
                        name="contactPersonName"
                        value={formData.contactPersonName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full mt-3">
                    <p className="input-label">Contact Person Phone</p>
                    <div className="w-full">
                      <input
                        type="number"
                        className="expert-reg-input"
                        placeholder="+234xxxxxx45"
                        name="contactPersonPhone"
                        value={formData.contactPersonPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full mt-3">
                    <p className="input-label">Contact Person Email</p>
                    <div className="w-full">
                      <input
                        type="email"
                        className="expert-reg-input"
                        name="contactPersonEmail"
                        value={formData.contactPersonEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 max-lg:hidden  max-md:flex max-sm:hidden col-span-2  max-md:col-span-2 max-sm:col-span-5">
                <div className="w-full shadow-lg flex flex-col justify-center py-5 rounded-lg border-l-8 border-primary-green px-4">
                  <h3 className="sm:text-lg font-medium">
                    Dont have a business name?
                  </h3>

                  <p className="py-3 max-sm:text-sm">
                    No worries - just use your own name
                  </p>
                </div>
              </div>

              <div className="flex justify-end mb-28 max-sm:justify-center col-span-3 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5">
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

export default RegistrationFormFive;
