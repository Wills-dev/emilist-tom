"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";

import MainLayout from "@/components/MainLayout/MainLayout";
import ContactModal from "@/components/modals/ContactModal";

import { Capitalize, numberWithCommas } from "@/helpers";
import { CompareContext } from "@/utils/CompareState";

const ComparePage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { compareLoading, compareServices } = useContext(CompareContext);

  return (
    <MainLayout>
      <div className="padding-x pt-28">
        <h2 className="text-3xl leading-9 font-bold text-gray-900 max-md:text-xl">
          Compare
        </h2>

        <div className="w-full overflow-auto my-10  max-h-[90vh]">
          <table className=" rounded-xl border-collapse w-full relative overflow-auto ">
            <thead className=" ">
              <tr className="max-sm:text-sm  ">
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap z-10 left-0  text-black text-base leading-6 font-semibold sticky top-0 bg-white  ">
                  Profile
                </th>
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10 ">
                  About
                </th>
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10 ">
                  Level
                </th>
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                  Ratings
                </th>
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                  Reviews
                </th>
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                  Service
                </th>
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                  Job Completed
                </th>
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                  Notice Period
                </th>
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                  Location
                </th>
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10">
                  Language
                </th>
                <th className=" border-b  text-left px-4 py-4 whitespace-nowrap  text-black text-base leading-6 font-semibold sticky top-0 left-0 bg-white z-10  ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {compareServices?.map((expert: any, index: number) => (
                <tr
                  className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200  text-s cursor-pointer border-b"
                  tabIndex={0}
                  key={index}
                >
                  <td className=" px-4 py-4 whitespace-nowrap text-gray-500 flex items-start">
                    <div className="">
                      <h5 className="text-xl leading-7 font-bold text-black max-md:text-base max-md:leading-6 mb-2">
                        {expert?.firstName && Capitalize(expert?.firstName)}{" "}
                        {expert?.lastName && Capitalize(expert?.lastName)}
                      </h5>
                      {Array.isArray(expert?.businessImages) &&
                      expert?.businessImages[0]?.imageUrl ? (
                        <Image
                          src={expert?.businessImages[0]?.imageUrl}
                          alt={expert?.services[0]}
                          width={380}
                          height={276}
                          className="object-cover min-w-[200px] h-[150px] "
                        />
                      ) : (
                        <Image
                          src="/assets/images/Logo.svg"
                          alt={expert?.services[0]}
                          width={130}
                          height={30}
                          className="object-cover min-w-[200px]  h-[150px] "
                        />
                      )}

                      <div className="flex justify-between gap-1">
                        <div>
                          <p className="whitespace-nowrap py-2 text-base leading-6 max-sm:text-xs">
                            Starting price
                          </p>
                          <h3 className="text-2xl leading-8 font-bold text-primary-green max-sm:text-base">
                            {expert?.currency}{" "}
                            {expert?.startingPrice
                              ? numberWithCommas(expert?.startingPrice)
                              : 0}
                          </h3>
                        </div>

                        <button
                          className="px-3 border-[1px] border-gray-700 text-base leading-6 font-semibold text-gray-700 max-sm:text-sm rounded-[10px] mt-2 h-[36px] max-sm:h-[28px]"
                          onClick={() => setOpenModal(true)}
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="border-b px-4 py-4 text-left">
                    <p className="max-w-[240px] w-[240px] text-base leading-6 text-gray-700 max-md:text-sm">
                      {expert?.bio}
                    </p>
                  </td>
                  <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                    Level 5
                  </td>
                  <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                    4.6
                  </td>
                  <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                    56
                  </td>
                  <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 ">
                    <div className="flex flex-col gap-1">
                      {expert?.services?.map(
                        (service: string, index: number) => (
                          <span key={index} className="pl-1">
                            {service}
                            {index + 1 !== expert?.services?.length && ","}
                          </span>
                        )
                      )}
                    </div>
                  </td>
                  <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                    10
                  </td>
                  <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                    {expert?.noticePeriod} days
                  </td>

                  <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                    {expert?.businessState && Capitalize(expert?.businessState)}
                    ,{" "}
                    {expert?.businessCountry &&
                      Capitalize(expert?.businessCountry)}
                  </td>
                  <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-center">
                    <div className="flex flex-col">
                      {expert?.languages?.map((language: any, i: number) => (
                        <p key={i}>{language},</p>
                      ))}
                    </div>
                  </td>
                  <td className="border-b px-4 py-4 whitespace-nowrap text-gray-700 text-left ">
                    <Link
                      href={`/expert/info/${expert?._id}`}
                      className=" py-2 "
                    >
                      <button className="px-4 border-[1px] border-[#303632] text-[14px] max-sm:text-[12px] py-3 rounded-[10px] whitespace-nowrap">
                        View Profile
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ContactModal isOpen={openModal} onCancel={() => setOpenModal(false)} />
    </MainLayout>
  );
};

export default ComparePage;
