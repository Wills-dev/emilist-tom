import Image from "next/image";

import StarRating from "../StarRating/StarRating";

type Props = {
  profile: boolean;
  setOpenShareModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewProfile = ({ profile, setOpenShareModal }: Props) => {
  return (
    <section className="pt-28 padding-x">
      <div className="w-full flex items-end justify-between">
        <div className="flex w-full">
          {profile && (
            <Image
              src="/assets/dummyImages/profilePic.png"
              alt="menu"
              width={30}
              height={30}
              className="object-cover w-[72px] h-[72px] max-sm:w-[42px] max-sm:h-[42px] rounded-full mr-4 max-sm:mr-1"
            />
          )}

          <div className="flex-1 w-full">
            {profile && (
              <h6 className="sm:text-[24px] font-semibold">Victor Falade</h6>
            )}
            <div
              className={`${
                profile ? "justify-between" : "justify-end"
              } flex items-center  w-full`}
            >
              {profile && (
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
              )}
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
                    src="/assets/icons/simcard.svg"
                    alt="menu"
                    width={24}
                    height={24}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                  />
                </button>
                <button>
                  <Image
                    src="/assets/icons/vuesax.svg"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewProfile;
