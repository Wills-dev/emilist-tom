"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useDeleteMaterial } from "@/hooks/useDeleteMaterial";
import { useGetMaterialInfo } from "@/hooks/useGetMaterialInfo";
import { useAddDiscountToMaterial } from "@/hooks/useAddDiscountToMaterial";

import StarRating from "../StarRating/StarRating";
import ReviewSlider from "../ReviewSlider/ReviewSlider";
import ActionDropdown from "../DashboardComponents/ActionDropdown";
import ConfirmAction from "../DashboardComponents/ConfirmAction";
import { useGetMaterialReview } from "@/hooks/useGetMaterialReview";
import ReviewSliderLoader from "../ReviewSlider/ReviewSliderLoader";
import { getCurrencySign } from "@/helpers/getCurrencySign";

interface UserMaterialInfoProps {
  materialId: string;
}

const UserMaterialInfo = ({ materialId }: UserMaterialInfoProps) => {
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [openConfirmActionModal, setOpenConfirmActionModal] = useState(false);

  const { data, isLoadin, getReviews } = useGetMaterialReview();
  const { handleDeleteMaterial, isDeleteLoading } = useDeleteMaterial();
  const { loading, getMaterialInfo, materialInfo } = useGetMaterialInfo();
  const {
    isOpen,
    setIsOpen,
    isLoading,
    discountPrice,
    setDiscountPrice,
    addDiscountPrice,
  } = useAddDiscountToMaterial();

  const toggleActionButton = () => {
    setShowActionDropdown((prev) => !prev);
  };

  const toggleConfirmActionModal = () => {
    setOpenConfirmActionModal((prev) => !prev);
    setShowActionDropdown(false);
  };

  const confrimDeleteMaterial = () => {
    handleDeleteMaterial(materialId);
  };

  useEffect(() => {
    getMaterialInfo(materialId);
  }, [materialId]);
  return (
    <>
      {/* confirm if you want to delete material */}
      <AnimatePresence>
        {openConfirmActionModal && (
          <ConfirmAction
            closeActionModal={toggleConfirmActionModal}
            confirmAction={confrimDeleteMaterial}
            loading={isDeleteLoading}
            text="Are you sure you want to delete this material?"
          />
        )}
      </AnimatePresence>
      <section className="sm:pt-28 pt-20 bg-[#F0FDF5] w-full padding-x min-h-screen pb-10">
        <div className="w-full h-ful flex gap-4 max-lg:flex-col py-10 max-sm:pt-4">
          <div className="lg:w-3/4 w-full bg-white h-full">
            {loading ? (
              <div className="flex item-center justify-center text-green-500 mt-6 h-[70vh]">
                <span className="loading loading-bars loading-lg"></span>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-6 p-6">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold  max-sm:text-xl">
                      {materialInfo?.product?.name &&
                        Capitalize(materialInfo?.product?.name)}
                    </h1>
                    <Link
                      href="/dashboard/report?r=Insights"
                      className="max-sm:text-sm font-semibold text-primary-green p"
                    >
                      View Insights
                    </Link>
                    <div className="">
                      <button
                        className="text-start text-[#ff9933] font-semibold hover:text-[#e99847] transition-all duration-300"
                        onClick={() => setIsOpen((prev) => !prev)}
                      >
                        {" "}
                        Add discount
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              className="flex-c gap-2 pt-2 pb-1"
                            >
                              <input
                                type="number"
                                name="discount"
                                id="discount"
                                value={discountPrice}
                                className="bg-[#f6ffec] outline-none focus:border-primary-green border-1 rounded-md px-2 py-1"
                                placeholder="Enter discounted price"
                                onChange={(e) =>
                                  setDiscountPrice(e.target.value)
                                }
                                style={{ fontSize: "16px" }}
                              />
                              {isLoading ? (
                                <button
                                  className="px-2 h-8 text-white bg-[#054753] rounded-md w-14 opacity-45 cursor-not-allowed"
                                  type="button"
                                >
                                  <span className="loading loading-dots loading-sm"></span>
                                </button>
                              ) : (
                                <button
                                  className="w-14 h-8 text-white bg-[#054753] rounded-md"
                                  type="button"
                                  onClick={() => addDiscountPrice(materialId)}
                                >
                                  Save
                                </button>
                              )}
                            </motion.div>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.8 }}
                              className="text-xs text-primary-green"
                            >
                              Discount price shouldn't exceed original price
                            </motion.p>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="relative">
                    <button onClick={toggleActionButton}>
                      <Image
                        src="/assets/icons/Menu.svg"
                        height={20}
                        width={20}
                        alt="menu-dot"
                        className="object-contain h-8 w-6"
                      />
                    </button>
                    <AnimatePresence>
                      {showActionDropdown && (
                        <ActionDropdown
                          confirmDelete={toggleConfirmActionModal}
                          link={`/dashboard/material/edit/${materialId}`}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="p-6 border-y-1 border-gray-300">
                  <div className="flex justify-between gap-4 flex-wrap">
                    <div className="flex flex-col gap-4">
                      <div className="flex-c gap-2">
                        <p className="max-sm:text-sm font-semibold text-gray-900">
                          Product ID:
                        </p>
                        <p className="max-sm:text-sm">12345</p>
                      </div>
                      <div className="flex-c gap-2">
                        <p className="max-sm:text-sm font-semibold text-gray-900">
                          Quantity:
                        </p>
                        <p className="max-sm:text-sm">
                          {materialInfo?.product?.availableQuantity &&
                            numberWithCommas(
                              materialInfo?.product?.availableQuantity
                            )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      {materialInfo?.product?.isDiscounted ? (
                        <div className="flex-c gap-2">
                          <p className="max-sm:text-sm font-semibold text-gray-900">
                            Discount Price:
                          </p>
                          <p className="max-sm:text-sm">
                            {materialInfo?.product?.currency &&
                              getCurrencySign(materialInfo?.product?.currency)}
                            {materialInfo?.product?.discountedPrice &&
                              numberWithCommas(
                                materialInfo?.product?.discountedPrice
                              )}
                          </p>
                        </div>
                      ) : (
                        <div className="flex-c gap-2">
                          <p className="max-sm:text-sm font-semibold text-gray-900">
                            Brand:
                          </p>
                          <p className="max-sm:text-sm ">
                            {materialInfo?.product?.brand &&
                              Capitalize(materialInfo?.product?.brand)}
                          </p>
                        </div>
                      )}
                      <div className="flex-c gap-2">
                        <p className="max-sm:text-sm font-semibold text-gray-900">
                          Price:
                        </p>
                        <p className="max-sm:text-sm">
                          {materialInfo?.product?.currency &&
                            getCurrencySign(materialInfo?.product?.currency)}
                          {materialInfo?.product?.price &&
                            numberWithCommas(materialInfo?.product?.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex-c gap-2">
                        <p className="max-sm:text-sm font-semibold text-gray-900">
                          Category:
                        </p>
                        <p className="max-sm:text-sm">
                          {materialInfo?.product?.category}
                        </p>
                      </div>
                      <div className="flex-c gap-2">
                        <p className="max-sm:text-sm font-semibold text-gray-900">
                          Sub-Category:
                        </p>
                        <p className="max-sm:text-sm">
                          {materialInfo?.product?.subCategory}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="max-sm:text-sm pt-8 pb-2">
                    {materialInfo?.product?.description}
                  </p>
                </div>
                <div className="p-6">
                  <h6 className="sm:text-lg font-medium">Images</h6>
                  <div className="pt-3 flex gap-4 flex-wrap">
                    {materialInfo?.product?.images ? (
                      materialInfo?.product?.images?.map(
                        (image: any, index: number) => (
                          <Image
                            src={image?.imageUrl}
                            key={index}
                            width={200}
                            height={200}
                            alt="product-image"
                            className="w-28 h-28 rounded-lg object-cover"
                          />
                        )
                      )
                    ) : (
                      <p className="text-gray-500 text-xs">No images</p>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex-c gap-6">
                    <h6 className="sm:text-lg font-medium">Rating:</h6>
                    <div className="flex c gap-1">
                      <StarRating rating={materialInfo?.averageRating | 0} />
                      <span className="block text-sm text-gray-400">
                        {" "}
                        {materialInfo?.averageRating || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="p-6">
              <div className="flex-c-b gap-6 max-w-[676px] w-full">
                <h6 className="sm:text-2xl text-lg font-semibold">Reviews</h6>
                {data?.length > 0 && (
                  <Link
                    href={`/material/info/all-reviews/${2}`}
                    className="text-primary-green sm:text-sm text-xs hover:text-green-600 duration-300 transition-all"
                  >
                    See all reviews
                  </Link>
                )}
              </div>
              <div className="py-6">
                {isLoadin ? (
                  <ReviewSliderLoader />
                ) : (
                  <>
                    {data?.length > 0 ? (
                      <ReviewSlider reviews={data} />
                    ) : (
                      <p>No review for this material</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserMaterialInfo;
