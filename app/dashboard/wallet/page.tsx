"use client";

import { useContext, useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { numberWithCommas } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
import { useGetAllTransactions } from "@/hooks/useGetAllTransactions";

import FundWallet from "@/components/modals/FundWallet";
import AddNewWallet from "@/components/modals/AddNewWallet";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import WalletHistory from "@/components/WalletComponent/WalletHistory";

const Wallet = () => {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    loading,
    transactions,
    totalPages,
    handlePageChange,
    search,
    setSearch,
    setLimit,
    getAllTransactions,
    totalTransactions,
  } = useGetAllTransactions();

  const onCancel = () => {
    setIsOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllTransactions("Wallet");
  }, []);

  return (
    <main className="relative">
      <DashboardNav />
      <section className="py-28  bg-[#F0FDF5] min-h-screen">
        <div className="padding-x">
          {loading ? (
            <div className="flex item-center justify-center text-green-500 mt-6 h-[40vh]">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            <>
              <div className="flex gap-6 flex-wrap pt-8">
                {currentUser?.wallets?.map((wallet: any, index: number) => (
                  <div
                    key={index}
                    className=" bg-white dark:bg-secondary-dark-bg dark:border-2 shadow px-4 py-8 rounded-lg flex-1 min-w-[200px]"
                  >
                    <h4 className="text-gray-400 sm:text-xl">Wallet Amount</h4>
                    <h1 className="sm:text-2xl text-lg font-bold pt-5">
                      {wallet?.currency}{" "}
                      {wallet?.balance && numberWithCommas(wallet?.balance)}
                    </h1>
                  </div>
                ))}
                <div className=" bg-white dark:bg-secondary-dark-bg dark:border-2 shadow px-4 py-8 rounded-lg flex-1 min-w-[200px]">
                  <h4 className="text-gray-400 sm:text-xl">
                    Total transaction
                  </h4>
                  <h1 className="sm:text-2xl text-lg font-bold pt-5">
                    {totalTransactions && numberWithCommas(totalTransactions)}
                  </h1>
                </div>
              </div>
              <div className="flex-c-b">
                <button
                  className="text-primary-green pt-2"
                  onClick={() => setOpen(true)}
                >
                  Fund wallet
                </button>{" "}
                <FundWallet isOpen={open} onCancel={onClose} />
                <button
                  className="text-primary-green pt-2"
                  onClick={() => setIsOpen(true)}
                >
                  Add more wallet
                </button>
                <AddNewWallet isOpen={isOpen} onCancel={onCancel} />
              </div>

              <AnimatePresence>
                <WalletHistory
                  loading={loading}
                  transactions={transactions}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  setLimit={setLimit}
                />
              </AnimatePresence>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Wallet;
