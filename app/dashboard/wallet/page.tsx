"use client";

import { AnimatePresence } from "framer-motion";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import WalletHistory from "@/components/WalletComponent/WalletHistory";
import { useContext } from "react";
import { AuthContext } from "@/utils/AuthState";

const Wallet = () => {
  const { currentUser } = useContext(AuthContext);

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
          <button className="text-primary-green pt-2">Add more wallet</button>
        </div>

        <AnimatePresence>
          <WalletHistory />
        </AnimatePresence>
      </section>
    </main>
  );
};

export default Wallet;
