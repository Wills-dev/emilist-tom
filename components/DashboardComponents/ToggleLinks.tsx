"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ToggleLinkType } from "@/types";

interface ToggleLinksProps {
  links: ToggleLinkType[];
}

const ToggleLinks = ({ links }: ToggleLinksProps) => {
  const pathname = usePathname();
  return (
    <div className="w-full mt-10">
      {" "}
      <ul className="flex-c gap-4 overflow-x-auto mt-6 pb-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.link}
            className={`${
              pathname === link.link
                ? "text-primary-green  border-b-primary-green border-b-2"
                : "text-[#737774]"
            }   font-semibold max-sm:text-sm capitalize whitespace-nowrap`}
          >
            <li>{link.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ToggleLinks;
