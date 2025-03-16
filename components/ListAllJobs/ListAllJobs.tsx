"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";

import { Popconfirm, PopconfirmProps } from "antd";
import { HiUser } from "react-icons/hi2";
import { TbShare3 } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";
import Pagination from "react-responsive-pagination";

import { serviceList } from "@/constants";
import { useSaveJob } from "@/hooks/useSaveJob";
import { AuthContext } from "@/utils/AuthState";
import { useAddClicks } from "@/hooks/useAddClicks";
import { useUnsaveJob } from "@/hooks/useUnSaveJob";
import { useBlackListJob } from "@/hooks/useBlackListJob";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";

import ReadMore from "../ReadMore/ReadMore";
import ShareLink from "../modals/ShareLink";
import MainLinks from "../MainLinks/MainLinks";
import ListedHomeJobs from "../Skeleton/ListedHomeJobs";

const ListAllJobs = () => {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const [jobId, setJobId] = useState("");
  const [jobType, setJobType] = useState("");
  const [openShareModal, setOpenShareModal] = useState(false);
  const [allJobs, setAllJobs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterService, setFilterService] = useState("");

  const { addClicks } = useAddClicks();
  const { handleSaveJob, rerender } = useSaveJob();
  const { handleUnsaveJob, unsaveRerenderr } = useUnsaveJob();
  const { handleBlackListJob, rerenderrr } = useBlackListJob();

  const notFound = search || q || filterService || filterLocation || "";

  const handleOpen = (id: string, type: string) => {
    setOpenShareModal(true);
    setJobId(id);
    setJobType(type);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const getAllJobs = async (q?: string) => {
    const userId = currentUser?._id || "";
    let url = `/jobs/fetch-all-jobs?page=${currentPage}&limit=10${
      userId ? `&userId=${userId}` : ""
    }`;

    if (search || q) {
      url += `&search=${search || q}`;
    } else {
      if (filterLocation) {
        url += `&location=${filterLocation}`;
      }
      if (filterService) {
        url += `&service=${filterService}`;
      }
    }
    try {
      const { data } = await axiosInstance.get(url);

      const { jobs: newJobs, totalPages } = data?.data;
      setAllJobs(newJobs);
      setTotalPages(totalPages);
    } catch (error: any) {
      console.log("error fetching all product", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs(q);
  }, [q, rerender, unsaveRerenderr, rerenderrr]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getAllJobs();
  };

  return (
    <>
      <MainLinks
        title={q || "Explore Job Opportunities"}
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <section className="pt-10 pb-16 padding-ctn">
        <div className="grid grid-cols-10 pt-10 gap-6">
          <div className="col-span-3 border-r-1 max-lg:hidden ">
            <h4 className="sm:text-2xl font-semibold pb-1 border-b-1 w-full">
              Filter
            </h4>
            <div className="flex lg:flex-col gap-4 pr-4 py-6">
              <div className="w-full max-lg:hidden space-y-3  border-b-1 py-3">
                <label htmlFor="reviews" className="font-semibold pt-6 pb-4">
                  Category
                </label>
                <select
                  style={{ fontSize: "16px" }}
                  name=""
                  id="filter"
                  className="border-1 border-[#b8b9b8] outline-none rounded-lg w-full max-md:text-sm p-2 bg-white"
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                >
                  <option defaultValue=""> Select</option>
                  {serviceList?.map((service, index) => (
                    <option key={index} value={service} className="capitalize">
                      {service}
                    </option>
                  ))}
                </select>
                <div className="flex-c justify-center">
                  {" "}
                  <button
                    type="button"
                    className="text-primary-green text-center max-sm:text-sm font-semibold "
                    onClick={() => getAllJobs()}
                  >
                    APPLY
                  </button>
                </div>
              </div>
              <div className="w-full border-b-1 pb-4 max-lg:hidden space-y-3 py-3">
                <label
                  htmlFor="location"
                  className="sm:text-lg font-semibold pt-6 pb-1"
                >
                  Location
                </label>
                <input
                  style={{ fontSize: "16px" }}
                  type="text"
                  id="location"
                  className="border-1 border-[#b8b9b8] outline-none rounded-lg w-full max-sm:text-sm p-2 bg-white"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                />
                <div className="flex-c justify-center">
                  {" "}
                  <button
                    type="button"
                    className="text-primary-green text-center max-sm:text-sm font-semibold "
                    onClick={() => getAllJobs()}
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
            <div className="py-10 max-lg:hidden">
              <p className="">
                Meet new customers, Sign up to start growing your business
              </p>
              <div className="flex-c justify-center">
                <button className="custom-btn mt-5">
                  <Link href="/login">Get Started</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-7 max-lg:col-span-10 w-full">
            {isLoading ? (
              <ListedHomeJobs />
            ) : (
              <>
                {allJobs?.length > 0 ? (
                  <>
                    <div className="w-full flex flex-col gap-5">
                      {allJobs?.map((job: any) => (
                        <div
                          key={job._id}
                          className="w-full p-4 shadow rounded-2xl hover:bg-gray-100 transition-all duration-300"
                        >
                          <div
                            onClick={() =>
                              addClicks("job", job._id, userId || null)
                            }
                          >
                            <div className="flex-c-b w-full ">
                              <Link
                                href={
                                  job?.type === "biddable"
                                    ? `/dashboard/job/info/biddable/${job._id}`
                                    : `/dashboard/job/info/regular/${job._id}`
                                }
                                className="sm:text-lg font-semibold hover:text-primary-green"
                              >
                                {job?.title && Capitalize(job?.title)}
                              </Link>
                              <div className="flex-c justify-end gap-3 max-sm:gap-2 ">
                                <h6 className="text-sm font-msdium max-sm:text-xs">
                                  {job?.createdAt &&
                                    formatCreatedAt(job.createdAt)}
                                </h6>
                              </div>
                            </div>

                            <div className="flex-c-b pt-5 text-[#737774]">
                              <h6 className=" text-sm font-medium max-sm:text-xs">
                                {job?.type === "biddable"
                                  ? "Max price"
                                  : "Budget"}
                                : {job?.currency}{" "}
                                {job?.budget && numberWithCommas(job?.budget)}
                                {job?.maximumPrice &&
                                  numberWithCommas(job?.maximumPrice)}
                              </h6>
                              <h6 className="text-sm font-medium max-sm:text-xs">
                                Duration: {job?.duration?.number}{" "}
                                {job?.duration?.period}
                              </h6>
                            </div>
                            <ReadMore
                              text={job?.description}
                              maxLength={300}
                              style="font-medium text-sm py-2"
                            />
                            <p className="flex-c gap-1 whitespace-nowrap text-sm">
                              {" "}
                              <span className="text-lg">
                                <MdLocationOn />
                              </span>
                              {job?.location}
                            </p>
                          </div>
                          <div className="flex-c-b text-[#737774] font-medium text-sm pt-4">
                            <div className="flex-c gap-4 flex-wrap">
                              <div className="flex-c justify-end gap-1  ">
                                <span className="text-lg">
                                  <HiUser />
                                </span>
                                <p className=" whitespace-nowrap ">
                                  {job?.applications?.length &&
                                    numberWithCommas(
                                      job?.applications?.length
                                    )}{" "}
                                  {job?.applications > 1
                                    ? "Applicants"
                                    : "Applicant"}
                                </p>
                              </div>
                              <button
                                className="flex-c gap-1  whitespace-nowrap cursor-pointer hover:text-primary-green transition-all duration-300"
                                onClick={() => handleOpen(job._id, job?.type)}
                              >
                                <span className="text-xl">
                                  <TbShare3 />
                                </span>
                                Share
                              </button>
                            </div>
                            <div className="flex-c justify-end gap-10 max-sm:gap-4 ">
                              {job?.liked ? (
                                <span
                                  className="block text-xl text-[#054753] cursor-pointer"
                                  onClick={() => handleUnsaveJob(job._id)}
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
                                  className="block text-xl cursor-pointer"
                                  onClick={() => handleSaveJob(job._id)}
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
                              <Popconfirm
                                placement="leftTop"
                                title="Block job"
                                description="Are you sure you want to block this job?"
                                onConfirm={() => handleBlackListJob(job?._id)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                <Image
                                  src="/assets/icons/flag.svg"
                                  alt="menu"
                                  width={20}
                                  height={20}
                                  className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
                                />
                              </Popconfirm>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <Pagination
                        current={currentPage}
                        total={totalPages}
                        onPageChange={handlePageChange}
                        extraClassName="justify-content-start"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {notFound ? (
                      <p>No job matched criteria. Try something else</p>
                    ) : (
                      <p>No job listed</p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <ShareLink
            handleCancel={() => setOpenShareModal(false)}
            isModalOpen={openShareModal}
            link={`https://emilist.com/dashboard/job/info/${jobType}/${jobId}`}
            title="Share job"
            textToCopy="Check out this job on Emilist"
          />
        </div>
      </section>
    </>
  );
};

export default ListAllJobs;
