"use client";

import { buildingMaterials } from "@/constants";
import { useListNewMaterial } from "@/hooks/useListNewMaterial";

const ListNewMaterialForm = () => {
  const {
    handleChange,
    handleSubmit,
    materialDetails,
    loading,
    selectedImages,
    onSelectFile,
    handleImageDelete,
    setSelectedImages,
    subCategory,
    setSubCatgory,
    handleCategoryChange,
    selectedMaterial,
  } = useListNewMaterial();

  return (
    <section className="pt-28 padding-x pb-20">
      <h1 className="text-3xl font-bold  max-sm:text-xl pt-6">
        Post a product
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 w-full gap-10 mt-4  ">
          <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
            <div className="w-full">
              <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                Product name
              </p>
              <div className="w-full">
                <input
                  type="text"
                  className="expert-reg-input"
                  placeholder="Dangote Cement"
                  name="product_name"
                  value={materialDetails.product_name}
                  onChange={handleChange}
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
                    className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                    name="category"
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
                    className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                    name="subCategory"
                    value={subCategory}
                    onChange={(e) => setSubCatgory(e.target.value)}
                  >
                    <option defaultValue="">Select</option>
                    {selectedMaterial?.subCategory?.map((material, index) => (
                      <option key={index} value={material}>
                        {material}
                      </option>
                    ))}
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
                  type="text"
                  className="expert-reg-input"
                  placeholder="Dangote Cement"
                  name="brand"
                  value={materialDetails.brand}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="w-full">
              <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                Description
              </p>
              <div className="w-full">
                <textarea
                  className=" min-w-full w-full  max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1  max-sm:text-sm"
                  rows={8}
                  name="description"
                  value={materialDetails.description}
                  onChange={handleChange}
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
                  type="text"
                  className="expert-reg-input"
                  placeholder="40"
                  name="quantity_available"
                  value={materialDetails.quantity_available}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                Product image
              </p>
              <div className="w-full h-[210px] bg-[#ECECEC] rounded-md flex p-2 gap-2 flex-wrap">
                {selectedImages?.length > 0 ? (
                  selectedImages.map((image: string, index: number) => (
                    <div
                      className="h-14 min-h-14 min-w-14 w-14 max-h-14 max-w-14 relative"
                      key={index}
                    >
                      <img
                        src={image}
                        alt="product"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0  right-0 w-5 h-5  bg-white flex-c  justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-orange-700 cursor-pointer"
                          onClick={() => {
                            setSelectedImages(
                              selectedImages?.filter((e: string) => e !== image)
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
                    </div>
                  ))
                ) : (
                  <label
                    htmlFor="business-pic"
                    className="w-full h-full cursor-pointer flex-c justify-center"
                  >
                    <h6 className="text-sm ">Drop image here</h6>
                    <input
                      id="business-pic"
                      type="file"
                      accept="image/*"
                      onChange={onSelectFile}
                      name="file"
                      className="invisible h-0 w-0"
                      multiple
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="w-full">
              <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                Unit price
              </p>
              <div className="w-full">
                <input
                  type="text"
                  className=" expert-reg-input"
                  placeholder=""
                  name="price"
                  value={materialDetails.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="w-full">
              <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                Supplier/store name
              </p>
              <div className="w-full">
                <input
                  type="text"
                  className="expert-reg-input"
                  placeholder="ABC STORE"
                  name="supplier"
                  value={materialDetails.supplier}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                Location
              </p>
              <div className="w-full">
                <input
                  type="text"
                  className="expert-reg-input"
                  placeholder="Lagos, Nigeria"
                  name="location"
                  value={materialDetails.location}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex mb-28 mt-6 justify-center col-span-2 ">
            {loading ? (
              <button type="button" className="load-btn">
                {" "}
                <span className="loading loading-dots loading-lg"></span>
              </button>
            ) : (
              <button type="submit" className="custom-btn">
                Post a Product
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default ListNewMaterialForm;
