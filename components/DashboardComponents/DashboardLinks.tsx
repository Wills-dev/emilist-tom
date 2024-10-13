import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { IoIosArrowDown } from "react-icons/io";

import { dashboardLinks } from "@/constants";
import { showLastPathOfLink } from "@/helpers";

const DashboardLinks = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {" "}
      <ul className="flex-c gap-4 max-sm:hidden">
        {dashboardLinks.map((link) => (
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
      <div
        className={`sm:hidden flex-1 max-w-[190px] rounded-lg px-2 flex-c-b relative max-sm:h-[46px] border-1 border-[#D9D9D9]`}
      >
        <div
          className="flex-c gap-3 flex-wrap flex-1 2-full "
          onClick={() => setOpen((prev) => !prev)}
        >
          <p className=" max-sm:text-sm capitalize">
            {showLastPathOfLink(pathname)}
          </p>
        </div>
        <span className="block" onClick={() => setOpen((prev) => !prev)}>
          <IoIosArrowDown />
        </span>
        {open && (
          <ul className="absolute flex flex-col top-full right-0 w-full max-sm:w-full bg-slate-50 shadow justify-center p-2 rounded-md">
            {dashboardLinks.map((link, index) => (
              <Link
                href={link.link}
                key={index}
                className="w-full hover:bg-gray-200"
              >
                <li
                  onClick={() => {
                    setOpen((prev) => !prev);
                  }}
                  className=" max-sm:text-sm  capitalize"
                >
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DashboardLinks;
