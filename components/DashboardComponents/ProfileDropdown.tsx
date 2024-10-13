import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import { useLogout } from "@/hooks/useLogout";

import StarRating from "../StarRating/StarRating";

type Props = {
  handleOpen: () => void;
};

const ProfileDropdown = ({ handleOpen }: Props) => {
  const { logout } = useLogout();

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      exit={{ y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute max-w-[280px] w-[280px] min-w-[260px] bg-white -right-10 h-[420px] max-h-[420px] top-full max-sm:right-6 shadow border-1"
    >
      <div className="relative">
        <Image
          src="/assets/images/profileBanner.png"
          width={300}
          height={86}
          alt="banner"
          className="w-full max-h-[86px] h-[86px] min-h-[80px]"
        />
        <div className="absolute w-full flex justify-center flex-col items-center top-12">
          <div className="relative w-[109px] h-[109px]  max-sm:w-[90px] max-sm:h-[90px]">
            <Image
              src="/assets/dummyImages/profilePic.png"
              alt="profile picuter"
              width={109}
              height={109}
              className="object-cover w-full h-full min-h-full min-w-full rounded-full"
            />
            {/* <Image
              src="/assets/icons/verify.svg"
              alt="verify icon"
              width={20}
              height={20}
              className="object-contain w-[20px] h-[20px] min-h-[20px] min-w-[20px] absolute right-0 top-2 max-sm:max-h-[14px] max-sm:min-h-[14px] max-sm:max-w-[14px] max-sm:min-w-[14px]"
            /> */}
            <p className="bg-primary-green  text-center text-[#FCFEFD] text-sm max-sm:text-xs rounded-md capitalize absolute bottom-0 py-1 left-4 px-4 max-sm:left-2">
              level 3
            </p>
          </div>
          <div className="flex items-center gap-1 my-8">
            <StarRating rating={4} />
          </div>
          <ul className="flex flex-col gap-4 justify-center items-center text-[#303632]">
            <Link href="/dashboard/profile" onClick={handleOpen}>
              <li className=" font-medium max-sm:text-sm hover:text-primary-green">
                Profile
              </li>
            </Link>
            <Link href="/dashboard/subscription/overview" onClick={handleOpen}>
              <li className="hover:text-primary-green font-medium max-sm:text-sm">
                Subscriptions
              </li>
            </Link>
            <Link href="/dashboard/report/earnings" onClick={handleOpen}>
              <li className="hover:text-primary-green font-medium max-sm:text-sm">
                Reports
              </li>
            </Link>

            <li
              className="text-[#FF5D7A] font-medium  max-sm:text-sm cursor-pointer"
              onClick={logout}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileDropdown;
