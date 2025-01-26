"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import StarRating from "../StarRating/StarRating";
import ContactModal from "../modals/ContactModal";
import { useGetUser } from "@/hooks/useGetUser";
import { getLevelValue } from "@/helpers/getLevelValue";

interface AboutUserProps {
  userId: string;
}

const AboutUser = ({ userId }: AboutUserProps) => {
  const [openContactModal, setOpenContactModal] = useState(false);

  const { user, isLoading, getUserInfo } = useGetUser();

  useEffect(() => {
    getUserInfo(userId);
  }, [userId]);

  return (
    <section className="padding-x py-28 w-full">
      {isLoading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[70vh]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="bg-white w-full rounded-[10px] py-10 px-14 max-sm:px-5 mt-10">
          <h2 className="sm:text-xl font-bold text-lg ">Profile</h2>

          <div className="flex mt-6 mb-20 max-md:flex-col max-md:justify-center max-sm:items-center">
            <div className="">
              <div className="relative w-[170px] h-[170px]  max-sm:w-[120px] max-sm:h-[120px] max-md:mb-5">
                {user?.profileImage ? (
                  <Image
                    src={user?.profileImage}
                    alt="profile pic"
                    width={170}
                    height={170}
                    className="object-cover w-full h-full min-h-full min-w-full rounded-full"
                  />
                ) : (
                  <p className="w-[170px] h-[170px]  max-sm:w-[120px] max-sm:h-[120px] rounded-full bg-slate-200 mr-2 flex-c justify-center font-bold">
                    {user?.userName?.[0]?.toUpperCase()}
                  </p>
                )}
                {user?.isVerified && (
                  <Image
                    src="/assets/icons/verify.svg"
                    alt="verify icon"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 min-h-6 min-w-6 absolute right-4 top-2 max-sm:max-h-5 max-sm:min-h-5 max-sm:max-w-5 max-sm:min-w-5"
                  />
                )}
                <p className="bg-primary-green  text-center text-[#FCFEFD] sm:text-sm text-xs rounded-[5px] capitalize absolute -bottom-[0.9rem] left-12 px-4 max-md:left-7">
                  level {user?.level && getLevelValue(user?.level)}
                </p>
              </div>
            </div>
            <div className="ml-6 mt-2">
              <div className="flex gap-8">
                <p className="sm:text-xl font-semibold capitalize ">
                  {" "}
                  {user?.fullName ? user?.fullName : user?.userName}
                </p>
                <div className="flex-c gap-2">
                  <Image
                    src="/assets/icons/location.svg"
                    alt="verify icon"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 min-h-6 min-w-6 max-sm:max-h-5 max-sm:min-h-5 max-sm:max-w-5 max-sm:min-w-5"
                  />
                  <p className=" text-[#5E625F] font-medium max-sm:text-sm capitalize ">
                    {user?.location}
                  </p>
                </div>
              </div>
              {/* <div className="flex-c gap-3 py-3 max-md:justify-center">
              <p className="text-primary-green font-medium  max-sm:text-sm capitalize underline">
                Bricklayer
              </p>
              <p className="text-primary-green font-medium  max-sm:text-sm capitalize underline">
                Tyler
              </p>
              <p className="text-primary-green font-medium  max-sm:text-sm capitalize underline">
                Painter
              </p>
            </div>
            <div className="flex flex-col max-md:justify-center max-md:items-center">
              <p className="text-[#8A8D8B] max-sm:text-sm capitalize ">
                Rating
              </p>
              <div className="flex-c gap-1">
                <StarRating rating={4} />
                <p className="font-medium max-sm:text-sm capitalize ">4.0</p>
              </div>
            </div> */}
              <button
                className="bg-primary-green  text-center text-[#FCFEFD] text-sm max-sm:text-xs rounded-[10px] max-sm capitalize w-[280px] py-5 max-sm:w-full mt-5"
                onClick={() => setOpenContactModal(true)}
              >
                Contact me
              </button>
              <ContactModal
                isOpen={openContactModal}
                onCancel={() => setOpenContactModal(false)}
                user={user}
              />
            </div>
          </div>

          <h2 className="sm:text-xl font-semibold text-lg pb-8">About</h2>
          <div className="flex-c gap-16 flex-wrap">
            <div className="flex-c gap-8">
              <p className="font-semibold max-sm:text-sm capitalize ">
                Gender:
              </p>
              <p className="text-[#303632] max-sm:text-sm capitalize ">
                {user?.gender ? user?.gender : "None"}
              </p>
            </div>
            <div className="flex-c gap-8">
              <p className="font-semibold max-sm:text-sm capitalize ">Email:</p>
              <p className="text-[#303632] max-sm:text-sm capitalize ">
                {user?.email}
              </p>
            </div>
            <div className="flex-c gap-8">
              <p className="font-semibold max-sm:text-sm capitalize ">
                Language:
              </p>
              <p className="text-[#303632] max-sm:text-sm capitalize ">
                {user?.language}
              </p>
            </div>
          </div>
          <div className="my-10">
            <p className="font-semibold max-sm:text-sm capitalize my-3">Bio</p>
            <p className="text-[#303632] max-sm:text-sm capitalize ">
              {user?.bio}
            </p>
          </div>
          {/* <div className=" w-full mb-12">
          <h2 className="sm:text-lg font-semibold mt-8">Membership</h2>

          <div className="w-full">
            <div className="w-full grid grid-cols-2 gap-20 max-lg:gap-10">
              <div className="col-span-1 max-lg:col-span-2 border-b-1 border-[#CBD5E1]">
                <div className="flex justify-between my-8">
                  <h5 className="sm:text-lg text-[#304155] font-semibold">
                    Painters Association of Nigeria
                  </h5>
                </div>
                <div className="flex justify-between flex-wrap gap-3 mb-2">
                  <div className="flex-c gap-2">
                    <p className="text-[#303632] font-semibold max-sm:text-sm">
                      Position held:
                    </p>
                    <p className="text-[#303632] max-sm:text-sm">Member</p>
                  </div>
                  <div className="flex-c gap-2">
                    <p className="text-[#303632] font-semibold max-sm:text-sm">
                      Starting Date:
                    </p>
                    <p className="text-[#303632]  max-sm:text-sm">
                      25/Feb/1998
                    </p>
                  </div>
                  <div className="flex-c gap-2">
                    <p className="text-[#303632] font-semibold max-sm:text-sm">
                      End Date:
                    </p>
                    <p className="text-[#303632] max-sm:text-sm">
                      Doesnt Expire
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 max-lg:col-span-2 border-b-1 border-[#CBD5E1]">
                <div className="flex justify-between my-8">
                  <h5 className="sm:text-lg text-[#304155] font-semibold">
                    National Insueance Association(NIA)
                  </h5>
                </div>
                <div className="flex justify-between flex-wrap gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-[#303632]  font-semibold max-sm:text-sm">
                      Position held:
                    </p>
                    <p className="text-[#303632]  max-sm:text-sm">Member</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#303632]  font-semibold max-sm:text-sm">
                      Starting Date:
                    </p>
                    <p className="text-[#303632]  max-sm:text-sm">
                      25/Feb/1998
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#303632]  font-semibold max-sm:text-sm">
                      End Date:
                    </p>
                    <p className="text-[#303632]  max-sm:text-sm">
                      Doesnt Expire
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      )}
    </section>
  );
};

export default AboutUser;
