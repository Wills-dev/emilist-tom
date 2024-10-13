"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

import { CgMenuRight } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence } from "framer-motion";

import { CartContext } from "@/utils/CartState";

import JobDropdown from "./JobDropdown";
import ServiceDropdown from "./ServiceDropdown";
import ProfileDropdown from "./ProfileDropdown";
import DashboardSidebar from "./DashboardSidebar";
import MaterialDropdown from "./MaterialDropdown";
import NotificationDropdown from "./NotificationDropdown";
import BackgroundTransparent from "../BackgroundTransparent/BackgroundTransparent";

const DashboardNav = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { totalCartQuantity } = useContext(CartContext);

  const [openProfile, setOpenProfile] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openJobDropdown, setOpenJobDropdown] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openServiceDropdown, setOpenServiceDropdown] = useState(false);
  const [openMaterialDropdown, setOpenMaterialDropdown] = useState(false);

  const toggle = () => {
    setOpenSideBar((prev) => !prev);
    setOpenProfile(false);
    setOpenNotification(false);
    setOpenServiceDropdown(false);
    setOpenMaterialDropdown(false);
    setOpenJobDropdown(false);
  };

  const handleJobDropDown = () => {
    setOpenProfile(false);
    setOpenNotification(false);
    setOpenServiceDropdown(false);
    setOpenMaterialDropdown(false);
    setOpenJobDropdown((prev) => !prev);
  };

  const handleMaterialDropDown = () => {
    setOpenProfile(false);
    setOpenJobDropdown(false);
    setOpenNotification(false);
    setOpenServiceDropdown(false);
    setOpenMaterialDropdown((prev) => !prev);
  };

  const handleServiceDropDown = () => {
    setOpenProfile(false);
    setOpenJobDropdown(false);
    setOpenNotification(false);
    setOpenMaterialDropdown(false);
    setOpenServiceDropdown((prev) => !prev);
  };

  const handleNotificationDropdown = () => {
    setOpenProfile(false);
    setOpenJobDropdown(false);
    setOpenServiceDropdown(false);
    setOpenMaterialDropdown(false);
    setOpenNotification((prev) => !prev);
  };

  const handleProfileDropdown = () => {
    setOpenJobDropdown(false);
    setOpenServiceDropdown(false);
    setOpenProfile((prev) => !prev);
    setOpenMaterialDropdown(false);
    setOpenNotification(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
        setOpenJobDropdown(false);
        setOpenNotification(false);
        setOpenServiceDropdown(false);
        setOpenMaterialDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {openProfile && <BackgroundTransparent />}
        {openJobDropdown && <BackgroundTransparent />}
        {openNotification && <BackgroundTransparent />}
        {openServiceDropdown && <BackgroundTransparent />}
        {openMaterialDropdown && <BackgroundTransparent />}
      </AnimatePresence>

      <header
        className="padding-x  lg:py-8 fixed w-full bg-white backdrop-blur z-20 max-xl:shadow"
        ref={dropdownRef}
      >
        <div className="flex-c-b w-full max-lg:py-4">
          <Link href="/dashboard/job">
            <Image
              src="/assets/images/Logo.svg"
              alt="logo"
              width={130}
              height={30}
              className="object-contain w-auto h-auto max-sm:w-28"
              priority
            />
          </Link>
          <nav className="xl:block hidden">
            <div className="flex-c text-gray-900">
              <div className="relative">
                <button
                  className="flex-c gap-2 font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                  onClick={handleJobDropDown}
                >
                  Jobs
                  <span className="w-6 h-6 pt-1">
                    <IoIosArrowDown />
                  </span>
                </button>
                <AnimatePresence>
                  {openJobDropdown && (
                    <JobDropdown handleJobDropDown={handleJobDropDown} />
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <button
                  className="flex-c gap-2 font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                  onClick={handleServiceDropDown}
                >
                  Services
                  <span className="w-6 h-6 pt-1">
                    <IoIosArrowDown />
                  </span>
                </button>
                <AnimatePresence>
                  {openServiceDropdown && (
                    <ServiceDropdown
                      handleServiceDropDown={handleServiceDropDown}
                    />
                  )}
                </AnimatePresence>
              </div>
              <div>
                <Link
                  href="/dashboard/project/active"
                  className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                >
                  Projects
                </Link>
              </div>
              <div>
                <Link
                  href="/expert/private-expert"
                  className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                >
                  Private Experts
                </Link>
              </div>
              <div className="relative">
                <button
                  className="flex-c gap-2 font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                  onClick={handleMaterialDropDown}
                >
                  Material
                  <span className="w-6 h-6 pt-1">
                    <IoIosArrowDown />
                  </span>
                </button>
                <AnimatePresence>
                  {openMaterialDropdown && (
                    <MaterialDropdown
                      handleMaterialDropDown={handleMaterialDropDown}
                    />
                  )}
                </AnimatePresence>
              </div>
              <div>
                <Link
                  href="/dashboard/job/direct-contract"
                  className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                >
                  Direct Contract
                </Link>
              </div>
            </div>
          </nav>
          <div className="flex-c sm:gap-5 gap-4">
            <button className="xl:hidden block text-xl" onClick={toggle}>
              <CgMenuRight />
            </button>
            <div className="flex-c sm:gap-6 gap-4">
              <div className="gap-3 flex items-center ">
                <button className="p-2 hover:bg-green-100 duration-300 rounded-full max-xl:hidden">
                  <Link href="/messages">
                    <Image
                      src="/assets/icons/sms.svg"
                      alt="menu"
                      width={24}
                      height={24}
                      className="object-contain w-6 h-6"
                    />
                  </Link>
                </button>
                <div className="relative p-2 hover:bg-green-100 duration-300 rounded-full max-xl:hidden">
                  <span className="block">
                    {" "}
                    <Image
                      src="/assets/icons/notification.svg"
                      alt="menu"
                      width={24}
                      height={24}
                      className="object-contain w-6 h-6 cursor-pointer "
                      onClick={handleNotificationDropdown}
                    />
                  </span>

                  <AnimatePresence>
                    {openNotification && <NotificationDropdown />}
                  </AnimatePresence>
                </div>
                <div className="p-2 hover:bg-green-100 duration-300 rounded-full">
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
                </div>
              </div>
              <div className="relative">
                <div
                  className="flex w-8 h-8 bg-slate-600 rounded-full flex-c justify-center text-white uppercase relative cursor-pointer my-2"
                  onClick={handleProfileDropdown}
                >
                  TW
                </div>
                <AnimatePresence>
                  {openProfile && (
                    <ProfileDropdown handleOpen={handleProfileDropdown} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {openSideBar && (
              <DashboardSidebar
                toggle={toggle}
                handleJobDropDown={handleJobDropDown}
                openJobDropdown={openJobDropdown}
                handleServiceDropDown={handleServiceDropDown}
                openServiceDropdown={openServiceDropdown}
                handleMaterialDropDown={handleMaterialDropDown}
                openMaterialDropdown={openMaterialDropdown}
                dropdownRef={dropdownRef}
              />
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

export default DashboardNav;
