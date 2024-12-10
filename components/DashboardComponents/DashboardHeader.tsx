"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import InviteModal from "../modals/InviteModal";

const DashboardHeader = () => {
  const { currentUser } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  const onCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 0 && currentTime < 12) {
      setGreeting("Good Morning");
    } else if (currentTime >= 12 && currentTime < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [currentUser]);

  return (
    <div className="w-full bg-white p-6 rounded-lg h-60 max-sm:px-3">
      <h1 className="capitalize text-5xl font-extrabold max-sm:text-3xl leading-normal">
        {greeting}, <br />
        {currentUser?.userName}
      </h1>
      <div className="flex-c-b mt-4">
        <p className="whitespace-nowrap  max-sm:text-sm">
          <span className="mr-2 font-bold">Emilist ID:</span>
          {currentUser?.uniqueId}
        </p>
        <button
          className="w-full flex-c justify-end gap-1"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src="/assets/icons/add.svg"
            alt="add-icon"
            width={130}
            height={30}
            className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
          />{" "}
          <span className="text-primary-green font-medium max-sm:text-sm">
            Invite Friends
          </span>
        </button>
        <InviteModal isOpen={isOpen} onCancel={onCancel} />
      </div>
    </div>
  );
};

export default DashboardHeader;
