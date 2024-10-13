import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="padding-x">
      <div className="flex-c-b gap-12 w-full flex-wrap sm:py-10 py-6 border-y-1 border-gray-300">
        <div className="sm:max-w-80 w-full flex flex-col gap-6">
          <Link href="/">
            <Image
              src="/assets/images/Logo.svg"
              alt="logo"
              width={130}
              height={30}
              className="object-contain w-auto h-auto"
            />
          </Link>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniamsit aliqua dolor do amet sint.
          </p>
        </div>
        {footerLinks?.map((title, index) => (
          <div className="flex flex-col " key={index}>
            <h6 className="sm:text-lg font-bold text-gray-900  mb-8">
              {title?.title}
            </h6>
            <ul className="flex flex-col sm:gap-6 gap-3">
              {title?.links?.map((link, index) => (
                <li key={index}>
                  <Link
                    href="/"
                    className="font-medium hover:text-primary-green transition-all duration-300 capitalize max-sm:text-sm"
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex-c-b flex-wrap gap-6 sm:py-8 py-4">
        <p className="max-sm:text-sm whitespace-nowrap flex-wrap gap-6">
          © 2022 EMILIST Inc. All rights reserved
        </p>
        <div className="flex-c gap-6">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/icons/facebook-icon.svg"
              alt="logo"
              width={20}
              height={20}
              className="w-auto h-auto object-contain"
            />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/icons/twitter-icon.svg"
              alt="logo"
              width={20}
              height={20}
              className="w-auto h-auto object-contain"
            />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/icons/linkedin-icon.svg"
              alt="logo"
              width={20}
              height={20}
              className="w-auto h-auto object-contain"
            />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/icons/instagram-icon.svg"
              alt="logo"
              width={20}
              height={20}
              className="w-auto h-auto object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
