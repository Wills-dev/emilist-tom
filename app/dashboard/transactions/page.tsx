"use client";

import { useEffect } from "react";

import { AnimatePresence } from "framer-motion";

import { numberWithCommas } from "@/helpers";
import { useGetAllTransactions } from "@/hooks/useGetAllTransactions";

import WalletHistory from "@/components/WalletComponent/WalletHistory";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";

const Transactions = () => {
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

  useEffect(() => {
    getAllTransactions("");
  }, []);

  return (
    <main className="relative">
      <DashboardNav />
      <section className="py-28 padding-x bg-[#F0FDF5] min-h-screen">
        {loading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[40vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="flex gap-6 flex-wrap pt-8">
              <div className=" bg-white dark:bg-secondary-dark-bg dark:border-2 shadow px-4 py-8 rounded-lg flex-1 min-w-[200px]">
                <h4 className="text-gray-400 sm:text-xl">Total transaction</h4>
                <h1 className="sm:text-2xl text-lg font-bold pt-5">
                  {totalTransactions && numberWithCommas(totalTransactions)}
                </h1>
              </div>
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
      </section>
    </main>
  );
};

export default Transactions;
