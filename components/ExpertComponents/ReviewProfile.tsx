import Image from "next/image";

import StarRating from "../StarRating/StarRating";

import { Capitalize } from "@/helpers";

type Props = {
  serviceInfo: any;
  setOpenShareModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewProfile = ({ serviceInfo, setOpenShareModal }: Props) => {
  return (
    <section className="">
      <div className="w-full flex items-end justify-between gap-8 flex-wrap">
        <div className="flex">
          <Image
            src={serviceInfo?.profileImage && serviceInfo?.profileImage}
            alt="Owner profile picture"
            width={30}
            height={30}
            className="object-cover w-[72px] h-[72px] max-sm:w-[42px] max-sm:h-[42px] rounded-full mr-4 max-sm:mr-1"
          />

          <div className="flex-1 w-full">
            <h6 className="sm:text-[24px] font-semibold">
              {serviceInfo?.firstName && Capitalize(serviceInfo?.firstName)}{" "}
              {serviceInfo?.lastName && Capitalize(serviceInfo?.lastName)}
            </h6>

            <div className="w-full flex-c-b">
              <div className="flex-c">
                <p className="text-[#5E625F] pr-2 border-r-1 border-[##5E625F] max-sm:text-xs">
                  LEVEL 4
                </p>
                <div className="flex-c my-1 gap-2 max-sm:gap-0 pl-2">
                  {" "}
                  <StarRating rating={4} />
                  <p className="text-[13px] max-sm:text-[10px]">(51)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 max-sm:gap-4">
          <button>
            <Image
              src="/assets/icons/heart.svg"
              alt="menu"
              width={24}
              height={24}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
            />
          </button>
          <button>
            <Image
              src="/assets/icons/sim.svg"
              alt="menu"
              width={24}
              height={24}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
            />
          </button>
          <button>
            <Image
              src="/assets/icons/flag.svg"
              alt="menu"
              width={24}
              height={24}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
            />
          </button>
          <button>
            <Image
              src="/assets/icons/share.svg"
              alt="menu"
              width={24}
              height={24}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
              onClick={() => setOpenShareModal(true)}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewProfile;
