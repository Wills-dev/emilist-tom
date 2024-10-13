"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { CgCloseR } from "react-icons/cg";

import { jobOptions } from "@/constants";
import { toastOptions } from "@/helpers";

const RegistrationFormOne = () => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [customOption, setCustomOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredSelectedOptions = selectedOptions?.filter((options) => {
    return options !== "Others";
  });

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleAddCustomOption = () => {
    if (customOption.trim() !== "") {
      setSelectedOptions([...selectedOptions, customOption]);
      setCustomOption("");
      setOpen(false);
    }
  };

  useEffect(() => {
    const selectedLocation = localStorage.getItem("EmilistLocation");
    const lineOfWork = localStorage.getItem("EmilistLineOfWork");
    if (lineOfWork) {
      const selectedLineOfWork = JSON.parse(lineOfWork);
      setSelectedOptions(selectedLineOfWork);
    }
    setLocation(selectedLocation || "");

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProceed = () => {
    if (selectedOptions?.length < 1) {
      return toast.error("Please select a line of work", toastOptions);
    } else if (!location) {
      return toast.error("Please enter your location", toastOptions);
    }
    const lineOfWork = JSON.stringify(filteredSelectedOptions);
    localStorage.setItem("EmilistLineOfWork", lineOfWork);
    localStorage.setItem("EmilistLocation", location);
    router.push("/expert/register/personal-details");
  };

  return (
    <section className="h-screen" id="new-expert">
      <div className="pt-28 max-md:pt-10 max-md:pb-15 md:pl-[500px]">
        <div className="max-w-[550px] mx-10 mt-20 max-md:mt-10 max-sm:mx-4">
          <h1 className="expert-reg-title">Create Expert Service Account</h1>
          <p className=" py-4">
            EmiList employers and customers want to hire your services. Tell the
            world what you do and where they can find you by filling out the
            form and providing the necessary information and documents.
          </p>
          <div className="flex flex-col sm:gap-8 gap-5">
            <div>
              <p className="text-[#5e625f] font-medium py-2 max-sm:text-sm">
                Whats your line of work?
              </p>

              <div className="relative w-full" ref={dropdownRef}>
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  type="button"
                  className="min-w-full w-full max-w-full rounded-lg h-14 px-2 bg-lighter-gray focus:outline-none focus-within:border-primary-green focus-within:border-1 max-sm:h-12 flex-c-b"
                >
                  <div className="flex gap-3 items-center">
                    {filteredSelectedOptions.length > 0 ? (
                      filteredSelectedOptions.map((option) => (
                        <p key={option} className="flex-c gap-1 max-sm:text-sm">
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
                      <p>Select a line of work</p>
                    )}
                  </div>
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

                {open && (
                  <div className="absolute right-0 w-full mt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="max-h-44 overflow-y-auto py-1">
                      <ul role="list" className=" w-full">
                        {jobOptions.map((option: any) => (
                          <li key={option.id} className="w-full">
                            <button
                              onClick={() => {
                                toggleOption(option.label);
                                if (option.label !== "Others") {
                                  setOpen(false);
                                } else {
                                  setOpen(true);
                                }
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            >
                              {option.label}
                            </button>
                          </li>
                        ))}
                      </ul>

                      {/* Show input when "Others" is selected */}
                      {selectedOptions.includes("Others") && (
                        <div className="flex-c gap-2 px-2">
                          <input
                            type="text"
                            value={customOption}
                            onChange={(e) => setCustomOption(e.target.value)}
                            placeholder="Specify your work"
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-primary-green bg-white"
                          />
                          <button
                            onClick={handleAddCustomOption}
                            className="bg-primary-green text-white px-3 py-1 rounded"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <p className="text-[#5e625f] font-medium max-sm:text-sm py-2">
                Location
              </p>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="expert-reg-input"
                placeholder="Lagos, Nigeria"
              />
            </div>
            <div className="flex justify-end  max-sm:justify-center">
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

export default RegistrationFormOne;
