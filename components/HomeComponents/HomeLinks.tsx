"use client";

import { landingPageLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center justify-center w-full gap-8 pt-28 pb-4 z-10 fixed bg-white">
      {landingPageLinks.map((link) => (
        <li key={link.id}>
          <Link
            href={link.link}
            className={`${
              pathname === link.link
                ? "text-primary-green  border-b-primary-green border-b-1"
                : "text-gray-400"
            }  font-semibold hover:text-primary-green transition-all duration-300`}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HomeLinks;
