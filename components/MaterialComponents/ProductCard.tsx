import Link from "next/link";
import Image from "next/image";

import StarRating from "../StarRating/StarRating";

import { FaRegHeart } from "react-icons/fa";
import { Capitalize, numberWithCommas } from "@/helpers";

interface ProductCardProps {
  material: any;
  addMaterialToCart: (id: string) => void;
  handleSaveMaterial: (id: string) => void;
}

const ProductCard = ({
  material,
  addMaterialToCart,
  handleSaveMaterial,
}: ProductCardProps) => {
  return (
    <div
      key={material.Id}
      className="w-[800px] min-w-[800px] max-sm:w-[400px] max-sm:min-w-[380px] grid md:grid-cols-5 grid-cols-6 gap-3 py-4 sm:px-6 px-2 hover:bg-gray-100 duration-300 shadow rounded-xl"
    >
      <Image
        src="/assets/images/privateExpertImg2.png"
        width={140}
        height={100}
        alt="service"
        className="md:col-span-1 col-span-2 object-cover w-full sm:h-36  h-28 rounded-lg "
      />
      <div className="col-span-4 flex justify-between max-md:flex-col md:gap-10 gap-2">
        <div className="flex flex-col gap-2 flex-1">
          <Link
            href={`/material/info/${material.Id}`}
            className="sm:text-2xl font-bold hover:text-primary-green duration-300"
          >
            {material?.productName && Capitalize(material?.productName)}
          </Link>
          {material?.description && material?.description.length > 200 ? (
            <>
              <p className="max-sm:text-sm max-sm:truncate">
                {material?.description.slice(0, 200)}...{" "}
                <Link
                  href={`/material/info/${material.Id}`}
                  className="underline text-primary-green text-xs max-sm:hidden"
                >
                  read more
                </Link>
              </p>
              <Link
                href={`/material/info/${material.Id}`}
                className="underline text-primary-green text-xs sm:hidden"
              >
                read more
              </Link>
            </>
          ) : (
            <p className="max-sm:text-sm">{material?.description}</p>
          )}
          <div className="flex-c-b  sm:gap-4 gap-2 flex-wrap">
            <div className="flex-c gap-1 max-sm:text-sm ">
              <StarRating rating={4} />{" "}
              <span className="sm:text-sm text-xs">(51)</span>
            </div>
          </div>
          <div className="flex-c-b sm:py-2">
            <div className="flex-c gap-2">
              <Image
                src="/assets/dummyImages/profilePic.png"
                width={50}
                height={50}
                alt="profile-pic"
                className="object-cover h-8 w-8 rounded-full"
              />
              <h6 className="sm:text-sm text-xs">
                Victor Kings
                {/* {material?.firstname &&
                            Capitalize(material?.firstname)}{" "}
                          {material?.lastname &&
                            Capitalize(material?.lastname)} */}
              </h6>
            </div>
          </div>
        </div>
        <div className="flex-c md:flex-col md:items-end justify-between">
          <div className="flex flex-col gap-1">
            <p className="sm:text-2xl font-bold text-primary-green">
              ₦ {material?.price && numberWithCommas(material?.price)}
            </p>
          </div>

          <button
            className="view-btn max-sm:text-sm"
            onClick={() => addMaterialToCart(material.Id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="col-span-1 max-md:hidden" />
      <div className="md:col-span-4 col-span-6 border-t-1 border-[#B8B9B8] flex-c justify-end sm:gap-10 gap-5 py-2">
        <div className="flex-c gap-2 cursor-pointer">
          <span
            className="block text-xl cursor-pointer"
            onClick={() => handleSaveMaterial(material.Id)}
          >
            <FaRegHeart />
          </span>

          <p className="sm:text-sm text-xs">Favourite</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
