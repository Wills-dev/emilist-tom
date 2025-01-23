"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";

import { CgMenuRight } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

import { CartContext } from "@/utils/CartState";
import { AuthContext } from "@/utils/AuthState";

import ExploreEmilist from "../modals/ExploreEmilist";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = dynamic(() => import("../Sidebar/Sidebar"));
const MenuItem = dynamic(() => import("../MenuItem/MenuItem"));

const Nav = () => {
  const { currentUser } = useContext(AuthContext);
  const { totalCartQuantity } = useContext(CartContext);

  const [menu, setMenu] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openExploreEmilistModal, setOpenExploreEmilistModal] = useState(false);

  const toggle = () => {
    setOpenSideBar((prev) => !prev);
    setMenu(false);
  };

  const toggleMenu = () => {
    setMenu((prev) => !prev);
    setOpenSideBar(false);
  };

  const onCancel = () => {
    setOpenExploreEmilistModal(false);
  };

  return (
    <header className="padding-x  lg:py-8 fixed w-full bg-white backdrop-blur z-20 ">
      {/* Explore emilist modal */}
      <ExploreEmilist isOpen={openExploreEmilistModal} onCancel={onCancel} />
      <div className="flex-c-b w-full max-lg:py-4">
        <Link href="/">
          <Image
            src="/assets/images/Logo.svg"
            alt="logo"
            width={130}
            height={30}
            className="object-contain w-auto h-auto max-sm:w-28"
            priority
          />
        </Link>
        <nav className="lg:block hidden">
          <ul className="flex-c text-gray-900">
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
            <li>
              <button
                className="flex-c gap-2 font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                onClick={() => setOpenExploreEmilistModal(true)}
              >
                Explore Emilist{" "}
                <span className="w-6 h-6 pt-1">
                  <IoIosArrowDown />
                </span>
              </button>
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
                <div className="p-2 hover:bg-green-100 duration-300 rounded-full">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href="/dashboard/cart" className="relative">
                          <Image
                            src="/assets/icons/shopping-cart.svg"
                            alt="menu"
                            width={24}
                            height={24}
                            className="object-contain w-6 h-6"
                          />
                          {totalCartQuantity > 0 && (
                            <span className="absolute -top-3 -right-2 px-2 py-1 bg-green-300 rounded-full text-xs">
                              {totalCartQuantity}
                            </span>
                          )}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cart items</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
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
        </nav>
        <div className="flex-c gap-4 lg:hidden ">
          {currentUser && (
            <div className="p-2 hover:bg-green-100 duration-300 rounded-full">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/dashboard/cart" className="relative">
                      <Image
                        src="/assets/icons/shopping-cart.svg"
                        alt="menu"
                        width={24}
                        height={24}
                        className="object-contain w-6 h-6"
                      />
                      {totalCartQuantity > 0 && (
                        <span className="absolute -top-3 -right-2 px-2 py-1 bg-green-300 rounded-full text-xs">
                          {totalCartQuantity}
                        </span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cart items</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          <button className="block text-xl" onClick={toggle}>
            <CgMenuRight />
          </button>
        </div>
        <AnimatePresence>
          {openSideBar && <Sidebar toggle={toggle} />}
        </AnimatePresence>
      </div>
      <div className="relative border-t-1 w-full py-2 lg:hidden flex-c gap-2">
        <button className=" flex-c gap-1" onClick={toggleMenu}>
          <AnimatePresence>
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: menu ? 90 : 0 }}
              exit={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg"
            >
              <MdKeyboardArrowRight />
            </motion.span>
          </AnimatePresence>
          Menu
        </button>
        <AnimatePresence>{menu && <MenuItem />}</AnimatePresence>
      </div>
    </header>
  );
};

export default Nav;
