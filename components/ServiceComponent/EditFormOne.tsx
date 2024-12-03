"use client";

import { useRef, useState } from "react";

import toast from "react-hot-toast";
import { CgCloseR } from "react-icons/cg";

import { serviceList } from "@/constants";
import { toastOptions } from "@/helpers";

interface EditFormOneProps {
  services: string[];
  setServices: (value: string[]) => void;
  nextPage: () => void;
}
const EditFormOne = ({ services, setServices, nextPage }: EditFormOneProps) => {
  const [open, setOpen] = useState(false);
  const [customOption, setCustomOption] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredSelectedOptions = services?.filter((options) => {
    return options !== "Others";
  });

  const toggleOption = (option: string) => {
    if (services.includes(option)) {
      setServices(services.filter((item) => item !== option));
    } else {
      setServices([...services, option]);
    }
  };

  const handleAddCustomOption = () => {
    if (customOption.trim() !== "") {
      setServices([...services, customOption]);
      setCustomOption("");
      setOpen(false);
    }
  };

  const handleNext = () => {
    if (services?.length < 1) {
      toast.error("Please select at least one service", toastOptions);
      return;
    }
    nextPage();
  };

  return (
    <section className="max-md:padding-x h-screen overflow-y-auto">
      <div className="md:pl-[500px] w-full">
        <div className="max-w-[550px] pt-28 max-md:pt-24 max-md:pb-15 w-full md:px-10">
          <h1 className="expert-reg-title">Edit Expert Service Account</h1>
          <p className=" py-4">
            EmiList employers and customers want to hire your services. Tell the
            world what you do and where they can find you by filling out the
            form and providing the necessary information and documents.
          </p>
          <div className="flex flex-col sm:gap-8 gap-5">
            <div>
              <p className="text-[#5e625f] font-medium py-2 max-sm:text-sm">
                Select your services
              </p>
              <p className="text-xs text-primary-green">
                You can select more than one service
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
                        {serviceList.map((option: string, index: number) => (
                          <li key={index} className="w-full">
                            <button
                              onClick={() => {
                                toggleOption(option);
                                if (option !== "Others") {
                                  setOpen(false);
                                } else {
                                  setOpen(true);
                                }
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            >
                              {option}
                            </button>
                          </li>
                        ))}
                      </ul>

                      {services.includes("Others") && (
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
            <div className="flex justify-end  max-sm:justify-center">
              <button className="custom-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditFormOne;
