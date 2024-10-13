import Image from "next/image";
import Link from "next/link";

const RegistrationNav = () => {
  return (
    <header className="padding-x  lg:py-8 fixed w-full bg-white backdrop-blur z-20 max-md:shadow">
      <div className="flex-c-b w-full max-lg:py-4">
        <Link href="/">
          <Image
            src="/assets/images/Logo.svg"
            alt="logo"
            width={130}
            height={30}
            className="object-contain w-auto h-auto max-sm:w-28"
            priority
          />
        </Link>
        <div className="flex w-8 h-8 bg-slate-600 rounded-full flex-c justify-center text-white uppercase">
          TW
        </div>
      </div>
    </header>
  );
};

export default RegistrationNav;
