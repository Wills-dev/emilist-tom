"use client";

import Image from "next/image";
import { useState } from "react";

import { profileLinks } from "@/constants";

import PersonalProfile from "./PersonalProfile";
import ProfileSecurity from "./ProfileSecurity";
import ProfileNotification from "./ProfileNotification";

const ProfileContent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentLink, setCurrentLink] = useState<number>(1);

  const handleClick = (id: number) => () => {
    setCurrentLink(id);
    setOpen((prev) => !prev);
  };
  return (
    <section className="padding-x py-28 bg-[#F0FDF5] w-full  relative min-h-screen">
      <div className="bg-white w-full rounded-lg py-10 px-14 max-sm:px-0 mt-10">
        <div className="w-full">
          <h2 className="text-2xl font-bold  max-sm:text-lg">Profile</h2>
          <ul className="flex items-center gap-4  mt-[1rem] max-sm:hidden">
            {profileLinks.map((profile, index) => (
              <li
                key={index}
                onClick={() => setCurrentLink(profile.id)}
                className={`${
                  currentLink === profile.id
                    ? "text-primary-green  border-b-primary-green border-b-2"
                    : "text-[#737774]"
                }  font-semibold capitalize cursor-pointer`}
              >
                {profile.name}
              </li>
            ))}
          </ul>
          <div
            className={`sm:hidden flex-1 max-w-[220px]  rounded-lg  px-4  flex-c-b relative max-sm:h-[46px] border-[1px] border-[#D9D9D9] mt-[1rem] shadow-sm`}
          >
            <div
              className="flex gap-3 items-center flex-wrap w-[80%] "
              onClick={() => setOpen((prev) => !prev)}
            >
              <p className="flex gap-1 items-center text-[#737774] max-sm:text-[14px] capitalize">
                {profileLinks[currentLink - 1].name}
              </p>
            </div>
            <div className="">
              <Image
                src="/assets/icons/arrow-down.svg"
                alt="arrow-down"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
                onClick={() => setOpen((prev) => !prev)}
              />
            </div>
            {open && (
              <ul className="absolute flex flex-col -bottom-20  right-0 w-full max-sm:w-full bg-slate-50 shadow-md justify-center p-2 rounded-md z-10">
                {profileLinks.map((link, index) => (
                  <li
                    key={index}
                    onClick={handleClick(link.id)}
                    className=" max-sm:text-[14px] text-[#737774] capitalize"
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mt-6">{currentLink === 1 && <PersonalProfile />}</div>
        <div className="mt-6">{currentLink === 2 && <ProfileSecurity />}</div>
        <div className="mt-6">
          {currentLink === 3 && <ProfileNotification />}
        </div>
      </div>
    </section>
  );
};

export default ProfileContent;
