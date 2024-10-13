"use client";

import { category, levels, serviceList } from "@/constants";
import { handleKeyDown, handleWheel } from "@/helpers";
import { useCreateDirectContract } from "@/hooks/useCreateDirectContract";
import Image from "next/image";

const DirectContractForm = () => {
  const {
    onSelectFile,
    handleImageDelete,
    handleChange,
    milestonesData,
    createDirectContractJob,
    setCreateDirectContractJob,
    handleSubmitPostJob,
    loading,
    selectedImages,
    setSelectedImages,
    updateMilestonesData,
  } = useCreateDirectContract();

  const milestones = milestonesData?.map((milestone, index) => {
    return (
      <div key={index} className="w-full">
        <div className="w-full">
          <h2 className="sm:text-lg font-semibold py-5 ">
            Milestone {index + 1}
          </h2>
          <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
            Milestone duration
          </p>
          <div className="w-full grid grid-cols-3 gap-4">
            <input
              type="number"
              onKeyDown={handleKeyDown}
              onWheel={handleWheel}
              className="col-span-2 expert-reg-input"
              placeholder="1"
              value={milestone.duration}
              onChange={(e) =>
                updateMilestonesData(e.target.value, index, "duration")
              }
            />
            <div className="col-span-1 expert-reg-input-div">
              <select
                className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm"
                value={milestone.durationType}
                onChange={(e) =>
                  updateMilestonesData(e.target.value, index, "durationType")
                }
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="text-[#5e625f] py-2 text-base font-medium max-sm:text-sm">
            Details of what's to be achieved
          </p>
          <div className="w-full">
            <textarea
              className="min-w-full w-full max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1 max-sm:text-sm"
              rows={8}
              value={milestone.details}
              onChange={(e) =>
                updateMilestonesData(e.target.value, index, "details")
              }
            ></textarea>
          </div>
        </div>
        <div className="w-full">
          <div className="py-2">
            <p className="text-[#5e625f] font-medium max-sm:text-sm">
              Percentage for Milestone
            </p>
            <p className="text-xs text-primary-green">
              Please enter how many percentage from the total amount you're
              collecting for this milestone.` `
            </p>
          </div>
          <div className="w-full">
            <input
              type="number"
              onKeyDown={handleKeyDown}
              onWheel={handleWheel}
              className="expert-reg-input"
              placeholder=""
              value={milestone.percentage}
              onChange={(e) =>
                updateMilestonesData(e.target.value, index, "percentage")
              }
            />
          </div>
        </div>
        <div className="w-full">
          <p className="text-[#5e625f] py-2 text-base font-medium max-sm:text-sm">
            Amount
          </p>
          <div className="w-full">
            <p className="min-w-full w-full  max-w-full rounded-lg min-h-12 px-4 bg-[#ececec] py-5 max-sm:text-sm">
              {milestone.amount || 0}
            </p>
          </div>
        </div>
        {/* <div className="w-full">
          <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
            Amount
          </p>
          <div className="w-full">
            <input
              type="number"
              onKeyDown={handleKeyDown}
                onWheel={handleWheel}
              className="min-w-full w-full max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-sm text-[#282828]"
              placeholder=""
              value={milestone.amount}
              onChange={(e) => handleInputChange(e, index, "amount")}
            />
          </div>
        </div> */}
      </div>
    );
  });

  return (
    <section className="pt-28 padding-x pb-20">
      <h1 className=" text-3xl font-bold  max-sm:text-xl pt-6">
        Direct Contract
      </h1>{" "}
      <form onSubmit={handleSubmitPostJob}>
        <div className="grid grid-cols-2 w-full gap-10 mt-4  ">
          <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
            <div className="w-full">
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Invite Expert
              </p>
              <div className="w-full">
                <input
                  type="text"
                  className=" expert-reg-input"
                  placeholder="Expert Unique ID or Email or User ID"
                  name="invite"
                  value={createDirectContractJob.invite}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Select work industry
              </p>
              <div className="w-full">
                <div className="expert-reg-input-div">
                  <select
                    className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                    name="category"
                    value={createDirectContractJob.category}
                    onChange={(e) =>
                      setCreateDirectContractJob({
                        ...createDirectContractJob,
                        category: e.target.value,
                      })
                    }
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
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Narrow down to a service
              </p>
              <div className="w-full">
                <div className="expert-reg-input-div">
                  <select
                    className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                    name="narrow"
                    value={createDirectContractJob.narrow}
                    onChange={(e) =>
                      setCreateDirectContractJob({
                        ...createDirectContractJob,
                        narrow: e.target.value,
                      })
                    }
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
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Enter a title for your project
              </p>
              <div className="w-full">
                <input
                  type="text"
                  className="expert-reg-input"
                  placeholder=""
                  name="projectTitle"
                  value={createDirectContractJob.projectTitle}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Describe your project as detailed as you can
              </p>
              <div className="w-full">
                <textarea
                  className=" min-w-full w-full  max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1 max-sm:text-sm"
                  rows={8}
                  name="description"
                  value={createDirectContractJob.description}
                  onChange={(e) =>
                    setCreateDirectContractJob({
                      ...createDirectContractJob,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>
            <div className="w-full">
              <label
                className=" flex items-center text-primary-green py-2 text-base font-[500] max-sm:text-sm cursor-pointer max-w-fit"
                htmlFor="attach-file"
              >
                <Image
                  src="/assets/icons/add.svg"
                  alt="logo"
                  width={130}
                  height={30}
                  className="object-contain w-[24px] h-[24px] max-sm:w-[16px] max-sm:h-[16px] mr-1"
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
              <div className="flex items-center gap-2 w-full flex-wrap">
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
              </div>
            </div>
            <div className="w-full">
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Project duration
              </p>
              <div className="w-full grid grid-cols-3 gap-4">
                <input
                  type="number"
                  onKeyDown={handleKeyDown}
                  onWheel={handleWheel}
                  className="col-span-2 expert-reg-input"
                  placeholder="3"
                  name="projectDuration"
                  value={createDirectContractJob.projectDuration}
                  onChange={handleChange}
                />
                <div className="col-span-1  expert-reg-input-div">
                  <select
                    className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                    name="projectDurationType"
                    value={createDirectContractJob.projectDurationType}
                    onChange={(e) =>
                      setCreateDirectContractJob({
                        ...createDirectContractJob,
                        projectDurationType: e.target.value,
                      })
                    }
                  >
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full">
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Budget
              </p>
              <div className="w-full">
                <input
                  type="number"
                  className="expert-reg-input"
                  placeholder="₦1,000"
                  name="budget"
                  value={createDirectContractJob.budget}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Location
              </p>
              <div className="w-full">
                <input
                  type="text"
                  className="expert-reg-input"
                  placeholder="Lagos, Nigeria"
                  name="location"
                  value={createDirectContractJob.location}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full my-3">
              <h2 className="sm:text-lg font-semibold py-5">Expert Level</h2>
              <div className="w-full flex flex-col gap-3">
                {levels.map((level, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      createDirectContractJob.expertLevel === level
                        ? "active-level"
                        : ""
                    }`}
                    onClick={() =>
                      setCreateDirectContractJob({
                        ...createDirectContractJob,
                        expertLevel: level,
                      })
                    }
                  >
                    <Image
                      src={
                        createDirectContractJob.expertLevel === level
                          ? "/assets/icons/circle-color.svg"
                          : "/assets/icons/circle.svg"
                      }
                      alt="menu"
                      width={25}
                      height={25}
                      className="object-contain w-6 h-6"
                    />
                    <label htmlFor={level} className="ml-3">
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
            <div className="w-full">
              <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                Milestone
              </p>
              <div className="expert-reg-input-div">
                <select
                  className="bg-[#ececec] outline-none min-w-full w-full h-full max-w-full max-sm:text-sm"
                  name="milestonesnumber"
                  value={createDirectContractJob.milestonesnumber}
                  onChange={handleChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col max-h-[70rem] overflow-y-auto mt-8">
              {milestones}
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
                Proceed
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default DirectContractForm;
