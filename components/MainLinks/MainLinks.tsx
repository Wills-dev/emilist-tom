"use client";

import Link from "next/link";

import { CiSearch } from "react-icons/ci";

import { landingPageLinks } from "@/constants";
import { useActivePath } from "@/helpers/useActivePath";
import { ChangeEvent } from "react";

interface MainLinksProps {
  search: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const MainLinks = ({
  search,
  handleChange,
  handleSubmit,
  title,
}: MainLinksProps) => {
  return (
    <section className="pt-28 w-full">
      <div className="padding-ctn  w-full">
        <ul className="flex items-center w-full sm:gap-6 gap-3 my-5">
          {landingPageLinks.map((link) => {
            const isActive = useActivePath(link?.link);
            return (
              <li key={link.id}>
                <Link
                  href={link.link}
                  className={`${
                    isActive
                      ? "text-primary-green  border-b-primary-green border-b-1 "
                      : "text-gray-400"
                  }  font-semibold hover:text-primary-green transition-all duration-300 max-sm:text-sm`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex md:items-end gap-10 max-md:flex-col">
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="sm:text-4xl font-bold text-lg capitalize">
              {title}
            </h2>
            <p className="max-sm:text-sm">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enimt.
            </p>
          </div>
          <div className="flex-1 w-full flex justify-end">
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex-c gap-2 px-2 py-3 rounded-lg border-[#737774] border-1 focus-within:border-primary-green  max-sm:py-1 shadow-lg max-w-[500px]"
            >
              <button type="submit" className="text-xl">
                {" "}
                <CiSearch />
              </button>
              <input
                style={{ fontSize: "16px" }}
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleChange}
                className="focus:outline-none max-md:text-14 w-full bg-white"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainLinks;
