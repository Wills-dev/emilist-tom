"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CgCloseR } from "react-icons/cg";
import toast from "react-hot-toast";

import { toastOptions } from "@/helpers";
import { countries, languages } from "@/constants";

interface Option {
  label: string;
  value: string;
}

const RegistrationFormTwo = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    address: "",
    bio: "",
    state: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setOpenLang(false);
  };

  const handleCountryClick = (option: string) => {
    setSelectedCountry(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  const toggleLangDropdown = () => {
    setOpenLang(!openLang);
    setIsOpen(false);
  };

  const toggleOption = (option: string) => {
    if (selectedLanguage.includes(option)) {
      setSelectedLanguage(selectedLanguage.filter((item) => item !== option));
    } else {
      setSelectedLanguage([...selectedLanguage, option]);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const emilistExpertProfile = localStorage.getItem("EmilistExpertProfile");
    const emilistSelectedLanguages = localStorage.getItem(
      "EmilistSelectedLanguage"
    );
    const selectedCountryy = localStorage.getItem("EmilistSelectedCountry");

    if (emilistExpertProfile) {
      const data = JSON.parse(emilistExpertProfile);
      setFormData(data);
    }
    if (emilistSelectedLanguages) {
      const language = JSON.parse(emilistSelectedLanguages);
      setSelectedLanguage(language);
    }

    setSelectedCountry(selectedCountryy || "");
  }, []);

  const handleProceed = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !selectedLanguage ||
      !selectedCountry ||
      !formData.phoneNumber ||
      !formData.city ||
      !formData.state ||
      !formData.address ||
      !formData.bio
    ) {
      return toast.error("Please fill all fields", toastOptions);
    }
    const emilistExpertProfile = JSON.stringify(formData);
    const emilistSelectedLanguages = JSON.stringify(selectedLanguage);
    localStorage.setItem("EmilistExpertProfile", emilistExpertProfile);
    localStorage.setItem("EmilistSelectedCountry", selectedCountry);
    localStorage.setItem("EmilistSelectedLanguage", emilistSelectedLanguages);
    router.push("/expert/register/upload-profile-picture");
  };

  return (
    <section className="max-md:padding-x h-screen overflow-y-auto">
      <div className="md:pl-[500px] w-full">
        <div className="pt-28 max-md:pt-24 max-md:pb-15 w-full md:px-10">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="expert-reg-title">Lets get to know you</h1>
            <p className="py-4 max-w-[550px]">
              Fill out the business or service profile information below
            </p>
            <div className="grid grid-cols-4 gap-6 w-full ">
              <div className="input__container ">
                <label htmlFor="firstName" className="input-label">
                  First Name
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    className="expert-reg-input"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input__container ">
                <label htmlFor="lastName" className="input-label">
                  Last Name
                </label>
                <div className="w-full">
                  <input
                    id="lastName"
                    type="text"
                    className="expert-reg-input"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input__container ">
                <p className="input-label">Phone Number</p>
                <div className="w-full">
                  <input
                    type="number"
                    className=" expert-reg-input"
                    placeholder="+234785676555 "
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input__container ">
                <p className="input-label">Language</p>
                <div className="relative w-full" ref={dropdownRef}>
                  <button
                    onClick={toggleLangDropdown}
                    type="button"
                    className="min-w-full w-full max-w-full rounded-lg h-14 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1 max-sm:h-12 flex-c-b"
                  >
                    <div className="flex-c gap-2">
                      {" "}
                      {selectedLanguage.length > 0 ? (
                        selectedLanguage.map((option) => (
                          <p
                            key={option}
                            className="flex-c gap-1 max-sm:text-sm"
                          >
                            {option}{" "}
                            <span
                              className=""
                              onClick={() => toggleOption(option)}
                            >
                              <CgCloseR />
                            </span>
                          </p>
                        ))
                      ) : (
                        <p>Select a language</p>
                      )}
                    </div>

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

                  {openLang && (
                    <div className="absolute right-0 w-full mt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <div className="max-h-36 overflow-y-auto">
                        <ul role="list" className="py-1 w-full">
                          {languages.map((language: Option) => (
                            <li key={language.value} className="w-full">
                              <button
                                onClick={() => {
                                  toggleOption(language.label);
                                  setOpenLang((prev) => !prev);
                                }}
                                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                              >
                                {language.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
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

              <div className="input__container ">
                <p className="input-label">State</p>
                <input
                  type="text"
                  className="expert-reg-input"
                  placeholder="Port Harcourt"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6 w-full my-6">
              <div className="input__container ">
                <p className="input-label">City</p>
                <div className="w-full">
                  <input
                    type="text"
                    className="expert-reg-input"
                    placeholder="Lekki "
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input__container ">
                <p className="input-label">Address</p>
                <div className="w-full">
                  <input
                    type="text"
                    className="expert-reg-input"
                    placeholder="7  fund  street "
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-4">
              <p className="input-label">Bio</p>
              <div className="w-full">
                <textarea
                  className=" min-w-full w-full max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1  max-sm:text-sm"
                  rows={6}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end max-sm:justify-center col-span-4 pb-24 pt-4">
              <button className="custom-btn" onClick={handleProceed}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationFormTwo;
