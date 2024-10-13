"use client";

import { useContext, useEffect } from "react";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";

import { AuthContext } from "@/utils/AuthState";
import { levels } from "@/constants";
import { useEditBiddableJob } from "@/hooks/useEditBiddableJob";

const page = ({ params }: any) => {
  const { currentUser } = useContext(AuthContext);
  const jobId = params.jobId;

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
  } = useEditBiddableJob();

  useEffect(() => {
    getJobInfo(jobId);
  }, [jobId, currentUser]);

  const milestones = editJobDetails.milestoneDetails?.map(
    (milestone, index) => {
      return (
        <div key={index} className="w-full">
          <div className="w-full">
            <h2 className="text-[20px] font-[600] leading-[32px] max-sm:text-base max-sm:leading-[20px] py-5 ">
              Milestone {index + 1}
            </h2>
            <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
              Milestone duration
            </p>
            <div className="w-full">
              <input
                type="text"
                className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-sm text-[#282828]"
                placeholder="20 days"
                name="milestoneDuration"
                value={milestone.milestoneDuration}
                onChange={(e) => handleMilestoneChange(index, e)}
              />
            </div>
          </div>
          <div className="w-full">
            <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
              Details of what's to be achieved
            </p>
            <div className="w-full">
              <textarea
                className="min-w-full w-full max-w-full rounded-[10px]  px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:text-sm text-[#282828] py-2"
                rows={8}
                name="milestoneDescription"
                value={milestone.milestoneDescription}
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
                className="min-w-full w-full max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-sm text-[#282828]"
                placeholder=""
                name="milestoneAmount"
                value={milestone.milestoneAmount}
                onChange={(e) => handleMilestoneChange(index, e)}
              />
            </div>
          </div>
        </div>
      );
    }
  );

  return (
    <main className="relative">
      <DashboardNav />
      {loading ? (
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
                    <div className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-[1px]  max-sm:h-[46px] text-[#282828]">
                      <select
                        className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                        name="category"
                        value={editJobDetails.category}
                        onChange={handleInputChange}
                      >
                        <option defaultValue="Bricklayer">
                          Select industry
                        </option>

                        <option value="Artisan">Artisan</option>
                        <option value="Construction">Construction</option>
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Event Management">
                          Event Management
                        </option>
                        <option value="Information Management">
                          Information Management
                        </option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Medical">Medical</option>
                        <option value="Minning">Minning</option>
                        <option value="Professional service">
                          Professional service
                        </option>
                        <option value="Real Estate">Real Estate</option>
                        <option value=" Food/restaurant">
                          {" "}
                          Food/restaurant
                        </option>
                        <option value="Utility">Utility</option>
                        <option value="Waste Management">
                          Waste Management
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                    Narrow down to a service
                  </p>
                  <div className="w-full">
                    <div className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-[1px]  max-sm:h-[46px] text-[#282828]">
                      <select
                        className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                        name="service"
                        value={editJobDetails.service}
                        onChange={handleInputChange}
                      >
                        <option defaultValue="Bricklayer">
                          Select service
                        </option>
                        <option value="Bricklayer">Bricklayer</option>
                        <option value="building materials">
                          building materials
                        </option>
                        <option value=" plumbing materials">
                          plumbing materials
                        </option>
                        <option value="computer">computer</option>
                        <option value="computer assesories">
                          computer assesories
                        </option>
                        <option value="Clothing">Clothing</option>
                        <option value="Others">Others</option>
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
                      className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-sm text-[#282828]"
                      placeholder=""
                      name="jobTitle"
                      value={editJobDetails.jobTitle}
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
                      className=" min-w-full w-full  max-w-full rounded-[10px]  px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:text-sm text-[#282828] py-2"
                      rows={8}
                      name="description"
                      value={editJobDetails.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                    Project duration
                  </p>
                  <div className="w-full">
                    <input
                      type="text"
                      className="min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-sm text-[#282828]"
                      placeholder="1"
                      name="projectDuration"
                      value={editJobDetails.projectDuration}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <>
                  <div className="w-full">
                    <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                      Maxinum price
                    </p>
                    <div className="w-full">
                      <input
                        type="number"
                        className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-sm text-[#282828]"
                        placeholder="₦250,000"
                        name="maxPrice"
                        value={editJobDetails.maxPrice}
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
                        className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-sm text-[#282828]"
                        placeholder="₦5,000"
                        name="bidRange"
                        value={editJobDetails.bidRange}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </>

                <div className="w-full">
                  <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                    Location
                  </p>
                  <div className="w-full">
                    <input
                      type="text"
                      className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-sm text-[#282828]"
                      placeholder="Lagos, Nigeria"
                      name="location"
                      value={editJobDetails.location}
                      onChange={handleInputChange}
                    />
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
                        editJobDetails.expertLevel === level
                          ? "active-level"
                          : ""
                      }`}
                      onClick={() =>
                        setEditJobDetails({
                          ...editJobDetails,
                          expertLevel: level,
                        })
                      }
                    >
                      <div
                        className={`circle-icon ${
                          editJobDetails.expertLevel === level ? "filled" : ""
                        }`}
                      />
                      <label
                        htmlFor={level}
                        className="ml-3 text-base text-[#303632]"
                      >
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="w-full">
                  <p className="text-[#5e625f] py-2 text-base font-[500] max-sm:text-sm">
                    Milestone
                  </p>
                  <div className="min-w-full w-full max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-[1px] max-sm:h-[46px] text-[#282828]">
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
