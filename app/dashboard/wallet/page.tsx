"use client";

import { AnimatePresence } from "framer-motion";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import WalletHistory from "@/components/WalletComponent/WalletHistory";
import { useContext, useState } from "react";
import { AuthContext } from "@/utils/AuthState";
import AddNewWallet from "@/components/modals/AddNewWallet";

const Wallet = () => {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const onCancel = () => {
    setIsOpen(false);
  };

  return (
    <main className="relative">
      <DashboardNav />
      <section className="py-28 padding-x bg-[#F0FDF5] min-h-screen">
        <div className="flex gap-6 flex-wrap pt-8">
          {currentUser?.wallet?.map((wallet: any, index: number) => (
            <div
              key={index}
              className=" bg-white dark:bg-secondary-dark-bg dark:border-2 shadow px-4 py-8 rounded-lg flex-1 min-w-[200px]"
            >
              <h4 className="text-gray-400 sm:text-xl">Wallet Amount</h4>
              <h1 className="sm:text-2xl text-lg font-bold pt-5">
                {wallet?.currency} {wallet?.balance}
              </h1>
            </div>
          ))}
          <div className=" bg-white dark:bg-secondary-dark-bg dark:border-2 shadow px-4 py-8 rounded-lg flex-1 min-w-[200px]">
            <h4 className="text-gray-400 sm:text-xl">Total transaction</h4>
            <h1 className="sm:text-2xl text-lg font-bold pt-5">13</h1>
          </div>
        </div>
        <div className="flex-c-b">
          <button className="text-primary-green pt-2">Fund wallet</button>{" "}
          <button
            className="text-primary-green pt-2"
            onClick={() => setIsOpen(true)}
          >
            Add more wallet
          </button>
          <AddNewWallet isOpen={isOpen} onCancel={onCancel} />
        </div>

        <AnimatePresence>
          <WalletHistory />
        </AnimatePresence>
      </section>
    </main>
  );
};

export default Wallet;
