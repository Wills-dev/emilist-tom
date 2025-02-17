"use client";

import { useEffect, useRef } from "react";

import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

import { buildingMaterials } from "@/constants";
import { useEditMaterialInfo } from "@/hooks/useEditMaterialInfo";
import Image from "next/image";
import { useDeleteProductImage } from "@/hooks/useDeleteProductImage";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

interface EditMaterialInfoFormProps {
  materialId: string;
}

const EditMaterialInfoForm = ({ materialId }: EditMaterialInfoFormProps) => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { handleDeleteFetchedProductImage, isLoading, rerender } =
    useDeleteProductImage();
  const {
    getMaterialInfo,
    handleSubmit,
    handleInputChange,
    setSubCatgory,
    subCategory,
    category,
    load,
    loading,
    selectedMaterial,
    handleCategoryChange,
    editMaterialInfo,
    setLocation,
    location,
    fetchedImages,
    onSelectFile,
    selectedImages,
    setSelectedImages,
    handleImageDelete,
  } = useEditMaterialInfo();

  const handlePlacesChanged = () => {
    // Access the Autocomplete instance using refs
    const autocomplete = autocompleteRef.current;

    if (autocomplete) {
      const places = autocomplete.getPlaces();
      if (places && places.length > 0) {
        const selectedPlace = places[0];
        setLocation(selectedPlace.formatted_address || "");
      }
    }
  };

  const autocompleteRef: any = useRef(null);

  if (!googleMapsApiKey) {
    throw new Error("Google Maps API key is not defined.");
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"],
  });

  useEffect(() => {
    getMaterialInfo(materialId);
  }, [materialId, rerender]);

  return (
    <section className="pt-28 padding-x pb-20">
      <LoadingOverlay loading={isLoading} />
      <h1 className="text-3xl font-bold  max-sm:text-xl pt-6">Edit product</h1>

      {loading || !isLoaded ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[70vh]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e, materialId)}>
            <div className="grid grid-cols-2 w-full gap-10 mt-4  ">
              <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
                <div className="w-full">
                  <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                    Product name
                  </p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      className="expert-reg-input"
                      name="name"
                      value={editMaterialInfo.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                    Category
                  </p>
                  <div className="w-full">
                    <div className="expert-reg-input-div">
                      <select
                        style={{ fontSize: "16px" }}
                        className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                        name="category"
                        value={category}
                        onChange={handleCategoryChange}
                      >
                        <option defaultValue="">Select</option>
                        {buildingMaterials?.map((material) => (
                          <option key={material?.id} value={material?.name}>
                            {material?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                    Sub-Category
                  </p>
                  <div className="w-full">
                    <div className=" expert-reg-input-div">
                      <select
                        style={{ fontSize: "16px" }}
                        className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                        name="subCategory"
                        value={subCategory}
                        onChange={(e) => setSubCatgory(e.target.value)}
                      >
                        <option defaultValue="">Select</option>
                        {selectedMaterial?.subCategory?.map(
                          (material, index) => (
                            <option key={index} value={material}>
                              {material}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                    Brand
                  </p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      className="expert-reg-input"
                      name="brand"
                      value={editMaterialInfo.brand}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                    Description
                  </p>
                  <div className="w-full">
                    <textarea
                      style={{ fontSize: "16px" }}
                      className=" min-w-full w-full  max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1  max-sm:text-sm"
                      rows={8}
                      name="description"
                      value={editMaterialInfo.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 ml-4 max-md:ml-0">
                <div className="w-full">
                  <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                    Quantity Available
                  </p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      className="expert-reg-input"
                      name="availableQuantity"
                      value={editMaterialInfo.availableQuantity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    className=" flex-c gap-1 text-primary-green py-2 font-medium max-sm:text-sm cursor-pointer max-w-fit"
                    htmlFor="attach-file"
                  >
                    <Image
                      src="/assets/icons/add.svg"
                      alt="logo"
                      width={130}
                      height={30}
                      className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
                    />
                    Add product image
                  </label>
                  <input
                    style={{ fontSize: "16px" }}
                    type="file"
                    id="attach-file"
                    className="h-0 w-0 invisible"
                    name="files"
                    accept="image/*"
                    onChange={onSelectFile}
                  />
                  <div className="flex-c gap-2 w-full flex-wrap">
                    {selectedImages &&
                      selectedImages.map((image, index) => {
                        return (
                          <div className="relative w-20 h-20" key={index}>
                            <img
                              src={image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 absolute bottom-0 right-0 text-red-600 font-bold bg-white border-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedImages(
                                  selectedImages?.filter((e) => e !== image)
                                );
                                handleImageDelete(index);
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        );
                      })}
                    {fetchedImages?.length > 0 &&
                      fetchedImages.map((image: any, index: number) => {
                        return (
                          <div className="relative w-20 h-20" key={index}>
                            <img
                              src={image?.imageUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 absolute bottom-0 right-0 text-red-600 font-bold bg-white border-gray-100 cursor-pointer"
                              onClick={() => {
                                handleDeleteFetchedProductImage(
                                  materialId,
                                  image?._id
                                );
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                    Price
                  </p>
                  <div className="w-full grid grid-cols-3 gap-4">
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      className="col-span-2 expert-reg-input"
                      name="price"
                      value={editMaterialInfo.price}
                      onChange={handleInputChange}
                    />
                    <div className="col-span-1 expert-reg-input-div">
                      <select
                        style={{ fontSize: "16px" }}
                        className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm"
                        name="currency"
                        value={editMaterialInfo.currency}
                        onChange={handleInputChange}
                      >
                        <option defaultValue="">Select currency</option>

                        <option value="NGN" className="capitalize">
                          NGN
                        </option>
                        <option value="USD" className="capitalize">
                          USD
                        </option>
                        <option value="GBP" className="capitalize">
                          GBP
                        </option>
                        <option value="EUR" className="capitalize">
                          EUR
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                    Supplier/store name
                  </p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      className="expert-reg-input"
                      name="storeName"
                      value={editMaterialInfo.storeName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                    Location
                  </p>
                  <div className="w-full">
                    <StandaloneSearchBox
                      onLoad={(ref) => (autocompleteRef.current = ref)}
                      onPlacesChanged={handlePlacesChanged}
                    >
                      <input
                        style={{ fontSize: "16px" }}
                        type="text"
                        className="expert-reg-input"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </StandaloneSearchBox>
                  </div>
                </div>
              </div>
              <div className="flex mb-28 mt-6 justify-center col-span-2 ">
                {load ? (
                  <button type="button" className="load-btn">
                    {" "}
                    <span className="loading loading-dots loading-lg"></span>
                  </button>
                ) : (
                  <button type="submit" className="custom-btn">
                    Update
                  </button>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default EditMaterialInfoForm;
