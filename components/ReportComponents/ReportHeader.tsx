"use client";

import Link from "next/link";

import { reportLinks } from "@/constants";
import { usePathname } from "next/navigation";

const ReportHeader = () => {
  const pathname = usePathname();

  return (
    <div>
      <h2 className="text-2xl font-bold max-sm:text-lg pt-6">Report</h2>
      <div className="my-4">
        <h6 className="text-[#5E625F] font-medium max-sm:text-sm">
          Select the report you want to see
        </h6>
        <div className="flex-c gap-4 my-5 flex-wrap">
          <ul className="flex-c gap-4 overflow-x-auto hide-scrollbar">
            {reportLinks?.map((link) => (
              <Link
                href={link.link}
                key={link.id}
                className={`${
                  pathname === link.link
                    ? "text-primary-green  border-b-primary-green border-b-1"
                    : "text-[#737774]"
                }  font-semibold capitalize`}
              >
                <li>{link.name}</li>
              </Link>
            ))}
          </ul>
          {/* <div
            className={` flex-1 min-w-[280px]  max-w-[280px] rounded-lg  px-4 flex-c-b relative max-sm:h-[46px] h-[50px] bg-white `}
          >
            <div
              className="flex-c gap-3 flex-wrap flex-1 h-full cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            >
              <p className="flex-c gap-1 text-[#737774] max-sm:text-sm capitalize">
                {reportLinks[currentLink - 1].name}
              </p>
            </div>
            <div className="cursor-pointer">
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
              <ul className="absolute flex flex-col top-full left-0  max-sm:w-full bg-white shadow-md justify-center p-4 rounded-md w-full gap-4">
                {reportLinks.map((link, index) => (
                  <Link
                    href={link.link}
                    key={index}
                    className="w-full max-sm:text-sm hover:text-primary-green"
                  >
                    <li
                      onClick={() => {
                        setOpen((prev) => !prev);
                      }}
                      className="  capitalize"
                    >
                      {link.name}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
