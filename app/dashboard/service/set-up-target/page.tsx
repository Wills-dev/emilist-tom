"use client";

import Image from "next/image";

import { useSetUpTarget } from "@/hooks/useSetUpTarget";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";

const page = () => {
  const {
    duration,
    setDuration,
    target,
    handleChnage,
    loading,
    handleSubmitTarget,
  } = useSetUpTarget();

  return (
    <main className="relative">
      <DashboardNav />
      <section className="py-28 padding-x">
        {" "}
        <div className="  w-full ">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="sm:text-3xl font-bold text-xl">
              Set up your monthly/ yearly targets
            </h1>

            <div className="grid grid-cols-4 gap-10 w-full py-6 mt-6">
              <div className="col-span-2  max-sm:col-span-4 flex flex-col gap-2">
                <p className="sm:text-xl font-semibold">
                  Set up target for monthly or yearly
                </p>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setDuration("monthly")}
                >
                  <Image
                    src={
                      duration === "monthly"
                        ? "/assets/icons/circle-color.svg"
                        : "/assets/icons/circle.svg"
                    }
                    alt="menu"
                    width={25}
                    height={25}
                    className="object-contain w-6 h-6"
                  />{" "}
                  <p className="ml-3">Monthly</p>
                </div>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setDuration("yearly")}
                >
                  <Image
                    src={
                      duration === "yearly"
                        ? "/assets/icons/circle-color.svg"
                        : "/assets/icons/circle.svg"
                    }
                    alt="menu"
                    width={25}
                    height={25}
                    className="object-contain w-6 h-6"
                  />{" "}
                  <p className="ml-3">Yearly</p>
                </div>
              </div>
              <div className="col-span-2  max-sm:col-span-4">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Number of times you want to be referred
                </p>
                <div className="w-full">
                  <input
                    type="number"
                    name="referrals"
                    value={target?.referrals}
                    onChange={handleChnage}
                    className="expert-reg-input"
                  />
                </div>
              </div>
              <div className="col-span-2 max-sm:col-span-4">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Job
                </p>
                <div className="w-full">
                  <input
                    type="number"
                    name="job"
                    value={target?.job}
                    onChange={handleChnage}
                    className="expert-reg-input"
                  />
                </div>
              </div>
              <div className="col-span-2  max-sm:col-span-4">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Number of friends you want to invite
                </p>
                <div className="w-full">
                  <input
                    type="number"
                    name="invites"
                    value={target?.invites}
                    onChange={handleChnage}
                    className="expert-reg-input"
                  />
                </div>
              </div>

              <div className="col-span-2  max-sm:col-span-4">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Amount
                </p>
                <div className="w-full flex-c expert-reg-input">
                  <input
                    type="number"
                    name="amount"
                    value={target?.amount}
                    onChange={handleChnage}
                    className="flex-1 outline-none bg-[#ececec]"
                  />
                  <select
                    name="currency"
                    value={target?.currency}
                    onChange={handleChnage}
                    className="bg-[#ececec] outline-none border-l-1 border-primary-green pl-2"
                  >
                    <option defaultValue="">Select currency</option>

                    <option value="NGN" className="capitalize">
                      NGN
                    </option>
                    <option value="USD" className="capitalize">
                      USD
                    </option>
                    <option value="GBP" className="capitalize">
                      GBP
                    </option>
                    <option value="EUR" className="capitalize">
                      EUR
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex  my-10 justify-center col-span-4">
                {loading ? (
                  <button type="button" className="load-btn">
                    {" "}
                    <span className="loading loading-dots loading-lg"></span>
                  </button>
                ) : (
                  <button className="custom-btn" onClick={handleSubmitTarget}>
                    Set Target
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
