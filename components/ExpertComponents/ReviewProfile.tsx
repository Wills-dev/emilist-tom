import Image from "next/image";

import { Popconfirm, PopconfirmProps } from "antd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import StarRating from "../StarRating/StarRating";

import { Capitalize } from "@/helpers";
import { getLevelValue } from "@/helpers/getLevelValue";
import { useBlacklistBusiness } from "@/hooks/useBlacklistBusiness";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

type Props = {
  serviceInfo: any;
  handleOpen: () => void;
  compare: (businessId: string) => Promise<void>;
  handleLikeBusiness: (businessId: string) => Promise<void>;
  handleUnlikeBusiness: (businessId: string) => Promise<void>;
};

const ReviewProfile = ({
  serviceInfo,
  handleOpen,
  compare,
  handleLikeBusiness,
  handleUnlikeBusiness,
}: Props) => {
  const { load, handleBlacklistBuisness } = useBlacklistBusiness();

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  return (
    <section className="">
      {<LoadingOverlay loading={load} />}
      <div className="w-full flex items-end justify-between gap-8 flex-wrap">
        <div className="flex">
          <Image
            src={
              serviceInfo?.business?.profileImage &&
              serviceInfo?.business?.profileImage
            }
            alt="Owner profile picture"
            width={30}
            height={30}
            className="object-cover w-[72px] h-[72px] max-sm:w-[42px] max-sm:h-[42px] rounded-full mr-4 max-sm:mr-1"
          />

          <div className="flex-1 w-full">
            <h6 className="sm:text-[24px] font-semibold">
              {serviceInfo?.business?.firstName &&
                Capitalize(serviceInfo?.business?.firstName)}{" "}
              {serviceInfo?.business?.lastName &&
                Capitalize(serviceInfo?.business?.lastName)}
            </h6>

            <div className="w-full flex-c-b">
              <div className="flex-c">
                <p className="text-[#5E625F] pr-2 border-r-1 border-[##5E625F] max-sm:text-xs">
                  LEVEL{" "}
                  {serviceInfo?.business?.userId.level &&
                    getLevelValue(serviceInfo?.business?.userId.level)}
                </p>
                <div className="flex-c my-1 gap-2 max-sm:gap-0 pl-2">
                  {" "}
                  <StarRating
                    rating={serviceInfo?.business?.averageRating || 0}
                  />
                  <p className="text-[13px] max-sm:text-[10px]">
                    ({serviceInfo?.business?.totalReviews || 0})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 max-sm:gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="cursor-pointer">
                  {!serviceInfo?.liked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#5E625F"
                      className="size-6"
                      onClick={() =>
                        handleLikeBusiness(serviceInfo?.business?._id)
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#054753"
                      className="size-6"
                      onClick={() =>
                        handleUnlikeBusiness(serviceInfo?.business?._id)
                      }
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {!serviceInfo?.liked ? (
                  <p>Like business</p>
                ) : (
                  <p>Unlike business</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span
                  className="cursor-pointer"
                  onClick={() => compare(serviceInfo?.business?._id)}
                >
                  {!serviceInfo?.isCompared ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#5E625F"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#3ad873"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
                        clipRule="evenodd"
                      />
                      <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                      <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                    </svg>
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compare business</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="cursor-pointer">
                  <Popconfirm
                    placement="leftTop"
                    title="Blacklist business"
                    description="Are you sure you want to mute this business?"
                    onConfirm={() =>
                      handleBlacklistBuisness(serviceInfo?.business?._id)
                    }
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Image
                      src="/assets/icons/flag.svg"
                      alt="menu"
                      width={24}
                      height={24}
                      className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                    />
                  </Popconfirm>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Blacklist business</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="cursor-pointer">
                  <Image
                    src="/assets/icons/share.svg"
                    alt="menu"
                    width={24}
                    height={24}
                    className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                    onClick={handleOpen}
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share business</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default ReviewProfile;
