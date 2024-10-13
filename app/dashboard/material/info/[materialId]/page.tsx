"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import StarRating from "@/components/StarRating/StarRating";
import ReviewSlider from "@/components/ReviewSlider/ReviewSlider";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import ConfirmAction from "@/components/DashboardComponents/ConfirmAction";
import ActionDropdown from "@/components/DashboardComponents/ActionDropdown";

import { Capitalize, numberWithCommas } from "@/helpers";
import { useDeleteMaterial } from "@/hooks/useDeleteMaterial";
import { useGetMaterialInfo } from "@/hooks/useGetMaterialInfo";

const MaterialInfo = ({ params }: any) => {
  const materialId = params.materialId;

  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [openConfirmActionModal, setOpenConfirmActionModal] = useState(false);
  const { handleDeleteMaterial, isDeleteLoading } = useDeleteMaterial();
  const { loading, getMaterialInfo, materialInfo } = useGetMaterialInfo();

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
    <main className="relative">
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
      <DashboardNav />
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
                      {materialInfo?.productName &&
                        Capitalize(materialInfo?.productName)}
                    </h1>
                    <Link
                      href={`/dashboard/report/insights`}
                      className="max-sm:text-sm font-semibold text-primary-green p"
                    >
                      View Insights
                    </Link>
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
                          {materialInfo?.quantityAvailable &&
                            numberWithCommas(materialInfo?.quantityAvailable)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex-c gap-2">
                        <p className="max-sm:text-sm font-semibold text-gray-900">
                          Brand:
                        </p>
                        <p className="max-sm:text-sm">
                          {materialInfo?.brand &&
                            Capitalize(materialInfo?.brand)}
                        </p>
                      </div>
                      <div className="flex-c gap-2">
                        <p className="max-sm:text-sm font-semibold text-gray-900">
                          Price:
                        </p>
                        <p className="max-sm:text-sm">
                          ₦{" "}
                          {materialInfo?.price &&
                            numberWithCommas(materialInfo?.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex-c gap-2">
                        <p className="max-sm:text-sm font-semibold text-gray-900">
                          Category:
                        </p>
                        <p className="max-sm:text-sm">
                          {materialInfo?.category}
                        </p>
                      </div>
                      <div className="flex-c gap-2">
                        <p className="max-sm:text-sm font-semibold text-gray-900">
                          Sub-Category:
                        </p>
                        <p className="max-sm:text-sm">
                          {materialInfo?.subCategory}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="max-sm:text-sm pt-8 pb-2">
                    {materialInfo?.description}
                  </p>
                </div>
                <div className="p-6">
                  <h6 className="sm:text-lg font-medium">Images</h6>
                  <div className="pt-3 flex gap-4 flex-wrap">
                    {materialInfo?.Images ? (
                      materialInfo?.Images?.map(
                        (materialImage: string, index: number) => (
                          <Image
                            src={materialImage}
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
              </>
            )}
            <div className="p-6">
              <div className="flex-c gap-6">
                <h6 className="sm:text-lg font-medium">Rating:</h6>
                <div className="flex c gap-1">
                  <StarRating rating={4} />
                  <span className="block text-sm text-gray-400">4.0</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex-c-b gap-6 max-w-[676px] w-full">
                <h6 className="sm:text-2xl text-lg font-semibold">Reviews</h6>
                <Link
                  href={`/material/info/all-reviews/${2}`}
                  className="text-primary-green sm:text-sm text-xs hover:text-green-600 duration-300 transition-all"
                >
                  See all reviews
                </Link>
              </div>
              <div className="py-6">
                <ReviewSlider />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MaterialInfo;
