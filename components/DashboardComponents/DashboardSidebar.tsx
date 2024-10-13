import Link from "next/link";
import Image from "next/image";

import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useGetUserServices } from "@/hooks/useGetUserServices";
import ServiceDropdownLoader from "../Skeleton/ServiceDropdownLoader";

interface DashboardSidebarProps {
  toggle: () => void;
  handleJobDropDown: () => void;
  openJobDropdown: boolean;
  handleServiceDropDown: () => void;
  openServiceDropdown: boolean;
  handleMaterialDropDown: () => void;
  openMaterialDropdown: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const DashboardSidebar = ({
  toggle,
  handleJobDropDown,
  openJobDropdown,
  handleServiceDropDown,
  openServiceDropdown,
  handleMaterialDropDown,
  openMaterialDropdown,
  dropdownRef,
}: DashboardSidebarProps) => {
  const { services, serviceLoad } = useGetUserServices();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full h-screen bg-part-transparent absolute z-1
      0 top-0 bottom-0 left-0 right-0 justify-end xl:hidden flex"
    >
      <AnimatePresence>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ x: 100 }}
          transition={{ duration: 0.4 }}
          className="max-w-96 sm:w-full w-[90%] bg-white h-full py-6 padding-x"
        >
          {" "}
          <div className="flex-c-b">
            <Link href="/" className=" block">
              <Image
                src="/assets/images/Logo.svg"
                alt="logo"
                width={80}
                height={20}
                className="object-contain"
                priority
              />
            </Link>
            <button className="block float-end text-2xl" onClick={toggle}>
              <IoMdClose />
            </button>
          </div>
          <div
            className="flex flex-col text-gray-900 pt-12 gap-6"
            ref={dropdownRef}
          >
            <div>
              <button
                className="font-medium px-5 hover:text-green-600 duration-300 max-sm:text-sm flex-c gap-2"
                onClick={handleJobDropDown}
              >
                Jobs
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
                  className=" flex flex-col gap-4 pl-8"
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
            <div>
              <button
                className="font-medium px-5 hover:text-green-600 duration-300 max-sm:text-sm flex-c gap-2"
                onClick={handleServiceDropDown}
              >
                Services
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
                  className="flex flex-col gap-4 pl-8"
                >
                  {serviceLoad ? (
                    <ServiceDropdownLoader />
                  ) : (
                    <>
                      {services?.map((service: any) => (
                        <li
                          className="capitalize hover:text-primary-green duration-300"
                          key={service?.id}
                        >
                          <Link
                            href={`/dashboard/service/info/${service?.id}`}
                            onClick={handleServiceDropDown}
                          >
                            {service?.service}
                          </Link>
                        </li>
                      ))}
                    </>
                  )}
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
                className="font-medium px-5 hover:text-green-600 duration-300 max-sm:text-sm flex-c gap-2"
              >
                Projects
              </Link>
            </div>
            <div>
              <Link
                href="/expert/private-expert"
                className="font-medium px-5 hover:text-green-600 duration-300 max-sm:text-sm flex-c gap-2"
              >
                Private Experts
              </Link>
            </div>
            <div>
              <button
                className="font-medium px-5 hover:text-green-600 duration-300 max-sm:text-sm flex-c gap-2"
                onClick={handleMaterialDropDown}
              >
                Material
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
                  className=" flex flex-col gap-4 pl-8"
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
                href="/dashboard/job/direct-contract"
                className="font-medium px-5 hover:text-green-600 duration-300 max-sm:text-sm flex-c gap-2"
              >
                Direct Contract
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardSidebar;
