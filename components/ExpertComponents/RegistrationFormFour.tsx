"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import { toastOptions } from "@/helpers";
import { serviceList } from "@/constants";

const RegistrationFormFour = () => {
  const router = useRouter();
  const [otherOption, setOtherOption] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    if (option !== "Others") {
      setSelectedOption(option);
      setOtherOption("");
      setIsDropdownOpen(false);
    } else {
      setSelectedOption("");
    }
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherOption(value); // Update state as user types
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const EmilistExpertService = localStorage.getItem("EmilistExpertService");
    if (EmilistExpertService) {
      setOtherOption(EmilistExpertService);
    }
  }, []);

  const handleProceed = () => {
    if (!selectedOption && !otherOption) {
      return toast.error("Please select a service", toastOptions);
    }
    const service = otherOption || selectedOption;
    localStorage.setItem("EmilistExpertService", service);
    router.push(`/expert/register/about-business`);
  };
  return (
    <section className="max-md:padding-x h-screen overflow-y-auto">
      <div className="md:pl-[500px] w-full">
        <div className="pt-28 max-md:pt-24 max-md:pb-15 w-full md:px-10">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="expert-reg-title">Pick a service to set up first</h1>
            <p className="py-4 max-w-[550px]">Setup one service at a time</p>
            <div className="grid grid-cols-5 gap-6 w-full mt-6 ">
              <div className="col-span-3 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5 w-full flex flex-col gap-3">
                <div className="relative w-full" ref={dropdownRef}>
                  <div
                    className={`min-w-full w-full max-w-full rounded-lg h-14 px-2 bg-lighter-gray focus:outline-none focus-within:border-primary-green focus-within:border-1 max-sm:h-12 flex-c-b ${
                      isDropdownOpen && "border-green-500"
                    }`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {otherOption
                      ? otherOption
                      : selectedOption || "Select an option"}
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
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border-1 border-gray-300 rounded-md shadow-lg max-h-56 overflow-y-auto">
                      {serviceList.map((option, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                          {option === "Others" && selectedOption === "" && (
                            <input
                              type="text"
                              className="mt-2 block w-full px-3 py-2 text-base border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-green-500 bg-white "
                              placeholder="Please specify..."
                              value={otherOption || ""}
                              onChange={handleOtherChange}
                              autoFocus
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end  max-sm:justify-center mb-28 mt-2 col-span-3 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5">
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

export default RegistrationFormFour;
