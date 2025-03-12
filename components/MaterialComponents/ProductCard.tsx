import Link from "next/link";
import Image from "next/image";

import StarRating from "../StarRating/StarRating";

import { FaRegHeart } from "react-icons/fa";
import { Capitalize, numberWithCommas } from "@/helpers";
import ReadMore from "../ReadMore/ReadMore";
import { getCurrencySign } from "@/helpers/getCurrencySign";

interface ProductCardProps {
  material: any;
  addMaterialToCart: (id: string) => void;
  handleSaveMaterial: (id: string) => void;
  handleUnsaveMaterial: (id: string) => void;
}

const ProductCard = ({
  material,
  addMaterialToCart,
  handleSaveMaterial,
  handleUnsaveMaterial,
}: ProductCardProps) => {
  return (
    <div className="w-[800px] min-w-[800px] max-sm:w-[400px] max-sm:min-w-[380px] grid md:grid-cols-5 grid-cols-6 gap-3 py-4 sm:px-6 px-2 hover:bg-gray-100 duration-300 shadow rounded-xl">
      <Image
        src={material?.images?.[0]?.imageUrl || "/assets/dummyImages/emi.jpg"}
        width={140}
        height={100}
        alt="service"
        className="md:col-span-1 col-span-2 object-cover w-full sm:h-36  h-28 rounded-lg "
      />
      <div className="col-span-4 flex justify-between max-md:flex-col md:gap-10 gap-2">
        <div className="flex flex-col gap-2 flex-1">
          <Link
            href={`/material/info/${material._id}`}
            className="sm:text-2xl font-bold hover:text-primary-green duration-300"
          >
            {material?.name && Capitalize(material?.name)}
          </Link>
          <ReadMore
            text={material?.description || ""}
            maxLength={200}
            style="max-sm:text-sm"
          />
          <div className="flex-c-b  sm:gap-4 gap-2 flex-wrap">
            <div className="flex-c gap-1 max-sm:text-sm ">
              <StarRating rating={material?.averageRating || 0} />{" "}
              <span className="sm:text-sm text-xs">
                {" "}
                ({material?.numberOfRatings || 0})
              </span>
            </div>
          </div>
          <div className="flex-c-b sm:py-2">
            <Link
              href={`/profile/about/${material?.userId?._id}`}
              className="flex-c gap-2 group"
            >
              {material?.userId?.profileImage ? (
                <Image
                  src={material?.userId?.profileImage}
                  width={50}
                  height={50}
                  alt="profile-pic"
                  className="object-cover h-8 w-8 rounded-full"
                />
              ) : (
                <p className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                  {material?.userId?.fullName
                    ? material?.userId?.fullName[0].toUpperCase()
                    : material?.userId?.userName
                    ? material?.userId?.userName[0].toUpperCase()
                    : "E"}
                </p>
              )}
              <h6 className="sm:text-sm text-xs group-hover:text-primary-green duration-300 transition-all">
                {material?.userId?.fullName || material?.userId?.userName}
              </h6>
            </Link>
          </div>
        </div>
        <div className="flex-c md:flex-col md:items-end justify-between">
          <div className="flex flex-col gap-1">
            <p className="sm:text-2xl font-bold text-primary-green">
              {material?.currency && getCurrencySign(material?.currency)}
              {material?.discountedPrice
                ? numberWithCommas(material?.discountedPrice)
                : material?.price
                ? numberWithCommas(material?.price)
                : 0}
            </p>
          </div>

          <button
            className="view-btn max-sm:text-sm"
            onClick={() => addMaterialToCart(material._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="col-span-1 max-md:hidden" />
      <div className="md:col-span-4 col-span-6 border-t-1 border-[#B8B9B8] flex-c justify-end sm:gap-10 gap-5 py-2">
        <div className="flex-c gap-2 cursor-pointer">
          {material?.liked ? (
            <span
              className="block cursor-pointer"
              onClick={() => handleUnsaveMaterial(material._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#054753"
                className="size-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </span>
          ) : (
            <span
              className="block cursor-pointer"
              onClick={() => handleSaveMaterial(material._id)}
            >
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
          )}

          <p className="sm:text-sm text-xs">Favourite</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
