import Link from "next/link";
import Image from "next/image";
import { useContext, useRef, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

import { AuthContext } from "@/utils/AuthState";

const ReportSidebar = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useContext(AuthContext);

  const [openJobDropdown, setOpenJobDropdown] = useState(false);
  const [openServiceDropdown, setOpenServiceDropdown] = useState(false);
  const [openMaterialDropdown, setOpenMaterialDropdown] = useState(false);

  const handleJobDropDown = () => {
    setOpenServiceDropdown(false);
    setOpenMaterialDropdown(false);
    setOpenJobDropdown((prev) => !prev);
  };

  const handleMaterialDropDown = () => {
    setOpenJobDropdown(false);
    setOpenServiceDropdown(false);
    setOpenMaterialDropdown((prev) => !prev);
  };

  const handleServiceDropDown = () => {
    setOpenJobDropdown(false);
    setOpenMaterialDropdown(false);
    setOpenServiceDropdown((prev) => !prev);
  };

  return (
    <aside className="max-h-[95vh] h-[95vh] fixed bg-white w-72 max-xl:hidden z-10">
      <div className="pt-28 pb-10 w-full h-full">
        <div className="w-full flex flex-col justify-between h-full gap-10">
          {" "}
          <div
            className="flex flex-col text-gray-700 pt-12  w-full flex-1  h-full overflow-y-auto"
            ref={dropdownRef}
          >
            <Link
              href="/dashboard/job"
              className="font-medium px-10 py-3 hover:bg-green-50 hover:text-primary-green transition-all duration-300 max-sm:text-sm flex-c-b gap-2"
            >
              <span className="flex-c gap-2">
                <Image
                  src="/assets/icons/home.svg"
                  width={14}
                  height={14}
                  alt="home-icon"
                  className="w-5 h-5 object-contain"
                />
                Dashboard
              </span>
            </Link>
            <div className="w-full">
              <button
                className="font-medium px-10 py-3 hover:bg-green-50 hover:text-primary-green transition-all duration-300 max-sm:text-sm flex-c-b gap-2 w-full"
                onClick={handleJobDropDown}
              >
                <span className="flex-c gap-2">
                  <Image
                    src="/assets/icons/bag-tick-2.svg"
                    width={14}
                    height={14}
                    alt="home-icon"
                    className="w-5 h-5 object-contain"
                  />
                  Jobs
                </span>

                <span className="w-6 h-6 pt-1">
                  <IoIosArrowDown />
                </span>
              </button>
            </div>
            <AnimatePresence>
              {openJobDropdown && (
                <motion.ul
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: 20 }}
                  transition={{ duration: 0.3 }}
                  className=" flex flex-col gap-4 pl-14"
                >
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/job/new">my jobs</Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/job/list-new-job">
                      List new jobs
                    </Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/job">All listed jobs</Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/job/my-listed-jobs">
                      my listed jobs
                    </Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/job/application">applications</Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/job/saved">Saved jobs</Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
            <div className="w-full">
              <button
                className="font-medium px-10 py-3 hover:bg-green-50 hover:text-primary-green transition-all duration-300 max-sm:text-sm flex-c-b gap-2 w-full"
                onClick={handleServiceDropDown}
              >
                <span className="flex-c gap-2">
                  <Image
                    src="/assets/icons/driver.svg"
                    width={14}
                    height={14}
                    alt="home-icon"
                    className="w-5 h-5 object-contain"
                  />
                  Services
                </span>

                <span className="w-6 h-6 pt-1">
                  <IoIosArrowDown />
                </span>
              </button>
            </div>
            <AnimatePresence>
              {openServiceDropdown && (
                <motion.ul
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4 pl-14"
                >
                  {currentUser?.businesses?.map((service: any) => (
                    <li
                      className="capitalize hover:text-primary-green duration-300"
                      key={service?.id}
                    >
                      <Link
                        href={`/dashboard/service/info/${service?._id}`}
                        onClick={handleServiceDropDown}
                      >
                        {service?.businessName}
                      </Link>
                    </li>
                  ))}

                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/expert/register" className="flex-c gap-1">
                      <Image
                        src="/assets/icons/add.svg"
                        alt="logo"
                        width={20}
                        height={20}
                        className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
                      />{" "}
                      <p className="text-primary-green  max-sm:text-sm">
                        Add New
                      </p>
                    </Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/service/set-up-target">
                      Set target
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
            <div>
              <Link
                href="/dashboard/project/active"
                className="font-medium px-10 py-3 hover:bg-green-50 hover:text-primary-green transition-all duration-300 max-sm:text-sm flex-c-b gap-2 w-full"
              >
                <span className="flex-c gap-2">
                  <Image
                    src="/assets/icons/layer 2.svg"
                    width={14}
                    height={14}
                    alt="home-icon"
                    className="w-5 h-5 object-contain"
                  />
                  Projects
                </span>
              </Link>
            </div>
            <div>
              <Link
                href="/expert/private-expert"
                className="font-medium px-10 py-3 hover:bg-green-50 hover:text-primary-green transition-all duration-300 max-sm:text-sm flex-c-b gap-2 w-full"
              >
                <span className="flex-c gap-2">
                  <Image
                    src="/assets/icons/user-octagon.svg"
                    width={14}
                    height={14}
                    alt="home-icon"
                    className="w-5 h-5 object-contain"
                  />
                  Private Experts
                </span>
              </Link>
            </div>
            <div>
              <button
                className="font-medium px-10 py-3 hover:bg-green-50 hover:text-primary-green transition-all duration-300 max-sm:text-sm flex-c-b gap-2 w-full"
                onClick={handleMaterialDropDown}
              >
                <span className="flex-c gap-2">
                  <Image
                    src="/assets/icons/broom.svg"
                    width={14}
                    height={14}
                    alt="home-icon"
                    className="w-5 h-5 object-contain"
                  />
                  Material
                </span>

                <span className="w-6 h-6 pt-1">
                  <IoIosArrowDown />
                </span>
              </button>
            </div>
            <AnimatePresence>
              {openMaterialDropdown && (
                <motion.ul
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: 20 }}
                  transition={{ duration: 0.3 }}
                  className=" flex flex-col gap-4 pl-14"
                >
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/material">All listed materials</Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/material/my-listed-materials">
                      My listed materials
                    </Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/material/list-new-material">
                      List new materials
                    </Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 ">
                    <Link href="/dashboard/material/saved">
                      Saved materials
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
            <div>
              <Link
                href="/dashboard/report"
                className="font-medium px-10 py-3 bg-green-50 text-primary-green transition-all duration-300 max-sm:text-sm flex-c-b gap-2 w-full"
              >
                <span className="flex-c gap-2">
                  <Image
                    src="/assets/icons/document-text.svg"
                    width={14}
                    height={14}
                    alt="home-icon"
                    className="w-5 h-5 object-contain"
                  />
                  Report
                </span>
              </Link>
            </div>
          </div>
          <div className="flex-c gap-2 px-10">
            <div className="flex w-8 h-8 min-w-8 min-h-8 bg-slate-600 rounded-full flex-c justify-center text-white uppercase relative cursor-pointer my-2">
              {currentUser?.fullName
                ? currentUser?.fullName[0].toUpperCase()
                : currentUser?.userName[0].toUpperCase()}
            </div>
            <div className="text-xs">
              <p>
                {" "}
                {currentUser?.fullName
                  ? currentUser?.fullName
                  : currentUser?.userName}
              </p>
              <p> {currentUser?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ReportSidebar;
