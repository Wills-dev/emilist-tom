"use client";

import Image from "next/image";
import { useContext, useEffect, useRef } from "react";

import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

import { AuthContext } from "@/utils/AuthState";
import { category, levels, serviceList } from "@/constants";
import { useDeleteJobImage } from "@/hooks/useDeleteJobImage";
import { useEditBiddableJob } from "@/hooks/useEditBiddableJob";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

const page = ({ params }: any) => {
  const { currentUser } = useContext(AuthContext);
  const jobId = params.jobId;

  const { handleDeleteFetchedJobImage, isLoading, rerender } =
    useDeleteJobImage();

  const {
    editJobDetails,
    loading,
    load,
    getJobInfo,
    handleInputChange,
    handleMilestoneChange,
    handleMilestoneNumberChange,
    handleSubmit,
    setEditJobDetails,
    handleMilestoneInputChange,
    fetchedImages,
    onSelectFile,
    selectedImages,
    setSelectedImages,
    handleImageDelete,
  } = useEditBiddableJob();
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const autocompleteRef: any = useRef(null);

  if (!googleMapsApiKey) {
    throw new Error("Google Maps API key is not defined.");
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"],
  });

  const handlePlacesChanged = () => {
    // Access the Autocomplete instance using refs
    const autocomplete = autocompleteRef.current;

    if (autocomplete) {
      const places = autocomplete.getPlaces();
      if (places && places.length > 0) {
        const selectedPlace = places[0];
        setEditJobDetails((prevJob) => ({
          ...prevJob,
          location: selectedPlace.formatted_address || "",
        }));
      }
    }
  };

  useEffect(() => {
    getJobInfo(jobId);
  }, [jobId, currentUser, rerender]);

  const milestones = editJobDetails.milestones?.map((milestone, index) => {
    return (
      <div key={index} className="w-full">
        <div className="w-full">
          <h2 className="text-[20px] font-[600] leading-[32px] max-sm:text-base max-sm:leading-[20px] py-5 ">
            Milestone {index + 1}
          </h2>
          <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
            Milestone duration
          </p>
          <div className="w-full grid grid-cols-3 gap-4">
            <input
              type="number"
              className="col-span-2 expert-reg-input"
              placeholder="1"
              name="number"
              value={milestone?.timeFrame?.number}
              onChange={(e) =>
                handleMilestoneInputChange(
                  index,
                  "timeFrame",
                  "number",
                  e.target.value
                )
              }
            />
            <div className="col-span-1 expert-reg-input-div">
              <select
                className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                name="period"
                value={milestone?.timeFrame?.period}
                onChange={(e) =>
                  handleMilestoneInputChange(
                    index,
                    "timeFrame",
                    "period",
                    e.target.value
                  )
                }
              >
                <option value="days">Day</option>
                <option value="weeks">Week</option>
                <option value="months">Month</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
            Details of what's to be achieved
          </p>
          <div className="w-full">
            <textarea
              className="min-w-full w-full max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1 max-sm:text-sm"
              rows={4}
              name="achievement"
              value={milestone.achievement}
              onChange={(e) => handleMilestoneChange(index, e)}
            ></textarea>
          </div>
        </div>
        <div className="w-full">
          <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
            Amount
          </p>
          <div className="w-full">
            <input
              type="number"
              className="expert-reg-input"
              placeholder=""
              name="amount"
              value={milestone.amount}
              onChange={(e) => handleMilestoneChange(index, e)}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <main className="relative">
      <LoadingOverlay loading={isLoading} />
      <DashboardNav />
      {loading || !isLoaded ? (
        <div className="flex w-full min-h-[80vh] item-center justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <section className="pt-28 padding-x pb-20">
          <h1 className=" text-[30px] font-[700] leading-[36px] max-sm:text-[24px] max-sm:leading-[30px]">
            Edit Job
          </h1>
          <form onSubmit={(e) => handleSubmit(e, jobId)}>
            <div className="grid grid-cols-2 w-full gap-10 mt-4  ">
              <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
                <div className="w-full">
                  <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                    Select work industry
                  </p>
                  <div className="w-full">
                    <div className="expert-reg-input-div">
                      <select
                        className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                        name="category"
                        value={editJobDetails.category}
                        onChange={handleInputChange}
                      >
                        <option defaultValue="">Select industry</option>

                        {category?.map((category, index) => (
                          <option
                            key={index}
                            value={category}
                            className="capitalize"
                          >
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                    Narrow down to a service
                  </p>
                  <div className="w-full">
                    <div className="expert-reg-input-div">
                      <select
                        className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                        name="service"
                        value={editJobDetails.service}
                        onChange={handleInputChange}
                      >
                        <option defaultValue="">Select service</option>
                        {serviceList?.map((service, index) => (
                          <option
                            key={index}
                            value={service}
                            className="capitalize"
                          >
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                    Enter a title for your project
                  </p>
                  <div className="w-full">
                    <input
                      type="text"
                      className=" expert-reg-input"
                      placeholder=""
                      name="jobTitle"
                      value={editJobDetails.title}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                    Describe your project as detailed as you can
                  </p>
                  <div className="w-full">
                    <textarea
                      className=" min-w-full w-full max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1  max-sm:text-sm"
                      rows={4}
                      name="description"
                      value={editJobDetails.description}
                      onChange={handleInputChange}
                    ></textarea>
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
                    Attach a file
                  </label>
                  <input
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
                              src={image?.url}
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
                                handleDeleteFetchedJobImage(image?.id);
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
                  <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                    Project duration
                  </p>
                  <div className="w-full grid grid-cols-3 gap-4">
                    <input
                      type="number"
                      className="col-span-2 expert-reg-input"
                      name="duration"
                      value={editJobDetails?.duration?.number}
                      onChange={handleInputChange}
                    />
                    <div className="col-span-1 expert-reg-input-div">
                      <select
                        className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                        name="period"
                        value={editJobDetails?.duration?.period}
                        onChange={handleInputChange}
                      >
                        <option value="days">Day</option>
                        <option value="weeks">Week</option>
                        <option value="months">Month</option>
                      </select>
                    </div>
                  </div>
                </div>

                <>
                  <div className="w-full">
                    <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
                      Currency
                    </p>
                    <div className="w-full">
                      <div className="expert-reg-input-div">
                        <select
                          className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                          name="currency"
                          value={editJobDetails.currency}
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
                    <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                      Maxinum price
                    </p>
                    <div className="w-full">
                      <input
                        type="number"
                        className="expert-reg-input"
                        name="maximumPrice"
                        value={editJobDetails.maximumPrice}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                      Bid Range
                    </p>
                    <div className="w-full">
                      <input
                        type="text"
                        className="expert-reg-input"
                        name="bidRange"
                        value={editJobDetails.bidRange}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </>

                <div className="w-full">
                  <p className="text-[#5e625f] pt-2 font-medium max-sm:text-sm">
                    Location
                  </p>
                  <p className="text-xs text-primary-green pb-2">
                    Please enter a valid address from the suggestions.
                  </p>
                  <div className="w-full">
                    <StandaloneSearchBox
                      onLoad={(ref) => (autocompleteRef.current = ref)}
                      onPlacesChanged={handlePlacesChanged}
                    >
                      <input
                        type="text"
                        className="expert-reg-input"
                        name="location"
                        value={editJobDetails.location}
                        onChange={handleInputChange}
                      />
                    </StandaloneSearchBox>
                  </div>
                </div>
              </div>
              <div className="w-full my-3 col-span-1 max-md:col-span-2">
                <h2 className="text-[20px] font-[600] leading-[32px] max-sm:text-base max-sm:leading-[20px] py-5">
                  Expert Level
                </h2>
                <div className="w-full flex flex-col gap-3">
                  {levels.map((level, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        editJobDetails.expertLevel === level.number
                          ? "active-level"
                          : ""
                      }`}
                      onClick={() =>
                        setEditJobDetails({
                          ...editJobDetails,
                          expertLevel: level.number,
                        })
                      }
                    >
                      <Image
                        src={
                          editJobDetails.expertLevel === level.number
                            ? "/assets/icons/circle-color.svg"
                            : "/assets/icons/circle.svg"
                        }
                        alt="menu"
                        width={25}
                        height={25}
                        className="object-contain w-6 h-6"
                      />
                      <label
                        htmlFor={level.level}
                        className="ml-3 text-base text-[#303632]"
                      >
                        {level.level}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                    Milestone
                  </p>
                  <div className="expert-reg-input-div">
                    <select
                      className="bg-[#ececec] outline-none min-w-full w-full h-full max-w-full max-sm:text-sm"
                      name="milestoneNumber"
                      value={editJobDetails.milestoneNumber}
                      onChange={handleMilestoneNumberChange}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                </div>
                {/* </div> */}
                {/* <> {milestones}</> */}
                <div className="flex flex-col  max-h-[63rem] overflow-y-auto mt-8">
                  {milestones}
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
                    Proceed
                  </button>
                )}
              </div>
            </div>
          </form>
        </section>
      )}
    </main>
  );
};

export default page;
