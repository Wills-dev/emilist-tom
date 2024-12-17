import Link from "next/link";
import Image from "next/image";

import HeroSectionSearch from "../HomeComponents/HeroSectionSearch";

import { landingPageLinks } from "@/constants";

type Props = {
  currentLink: number;
};

const HeroSection = ({ currentLink }: Props) => {
  return (
    <main className=" padding-x pt-28 relative w-full grid grid-cols-7 xl:items-center  md:gap-14 gap-10">
      <div className="col-span-4 flex flex-col flex-1 max-xl:mt-10 w-full max-xl:px-20 max-md:px-0 max-xl:col-span-7 ">
        <h1 className=" font-extrabold text-5xl text-gray-900 mr-16 max-xl:text-center max-xl:mr-0 max-sm:text-3xl leading-normal">
          Discover Your Project Dream Team Here.
        </h1>
        <p className="mr-14 mb-1 mt-2  max-xl:text-center max-xl:mr-0">
          This platform connects homeowners, contractors, businesses, and
          customers with skilled artisans, handymen, and project experts for
          renovations, custom-builds, and repairs.
        </p>

        <div className="max-xl:hidden">
          <ul className="flex items-center w-full gap-8 my-5">
            {landingPageLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.link}
                  className={`${
                    currentLink === link.id
                      ? "text-primary-green  border-b-primary-green border-b-1"
                      : "text-gray-400"
                  }  font-semibold hover:text-primary-green transition-all duration-300`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {currentLink === 0 && <HeroSectionSearch />}
          {currentLink === 1 && <HeroSectionSearch />}
          {currentLink === 2 && (
            <div className="mb-10 ">
              <p className="">
                Meet new customers, Sign up to start growing your business
              </p>
              <button className="custom-btn mt-5">
                <Link href="/register/expert">Get Started</Link>
              </button>
            </div>
          )}
          {currentLink === 3 && <HeroSectionSearch />}
        </div>
      </div>
      <div className=" pt-10 max-xl:pt-0 max-xl:px-20 max-md:px-0 col-span-3 max-xl:col-span-7 w-full">
        {currentLink === 3 ? (
          <Image
            src="/assets/images/heroImg2.png"
            alt="menu"
            width={773}
            height={67}
            className="object-contain w-full h-full"
            priority
          />
        ) : (
          <Image
            src="/assets/images/heroImg.png"
            alt="menu"
            width={773}
            height={67}
            className="object-contain w-full h-full"
            priority
          />
        )}
      </div>
      <div className="xl:hidden max-xl:col-span-7">
        <ul className="flex items-center justify-start w-full gap-8 my-5 max-sm:gap-4">
          {landingPageLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.link}
                className={`${
                  currentLink === link.id
                    ? "text-primary-green  border-b-primary-green border-b-1"
                    : "text-gray-400"
                }  font-semibold max-sm:text-sm hover:text-primary-green transition-all duration-300`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {currentLink === 0 && <HeroSectionSearch />}
        {currentLink === 1 && <HeroSectionSearch />}
        {currentLink === 2 && (
          <div className="mb-10 max-xl:flex flex-col items-center justify-center  ">
            <p className="  max-sm:text-sm">
              Meet new customers, Sign up to start growing your business
            </p>
            <button className="custom-btn mt-5 ">
              <Link href="/">Get Started</Link>
            </button>
          </div>
        )}
        {currentLink === 3 && <HeroSectionSearch />}
      </div>
    </main>
  );
};

export default HeroSection;
