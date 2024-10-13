import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";

import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

import { AuthContext } from "@/utils/AuthState";
import { CiLogout } from "react-icons/ci";
import { useLogout } from "@/hooks/useLogout";

interface SidebarProps {
  toggle: () => void;
}

const Sidebar = ({ toggle }: SidebarProps) => {
  const { logout } = useLogout();
  const { currentUser } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full h-screen bg-part-transparent absolute z-10 top-0 bottom-0 left-0 right-0 flex justify-end"
    >
      <AnimatePresence>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ x: 100 }}
          transition={{ duration: 0.4 }}
          className="max-w-96 sm:w-full w-[90%] bg-white h-full py-6 padding-x"
        >
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

          <ul className="flex flex-col text-gray-900 pt-12 gap-8">
            <li>
              <Link
                href="/expert/register"
                className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
              >
                Join as an Expert
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/job/list-new-job"
                className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
              >
                List New Job
              </Link>
            </li>
            {currentUser ? (
              <>
                <li>
                  <Link
                    href="/dashboard/job"
                    className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                  >
                    Dashboard
                  </Link>
                </li>
                <button
                  className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm flex-c gap-2 text-red-500 "
                  onClick={logout}
                >
                  <CiLogout />
                  Logout
                </button>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;
