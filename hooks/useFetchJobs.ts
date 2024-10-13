import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useFetchJobs = () => {
  const [allJobs, setAllJobs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 10;
  const [filterLocation, setFilterLocation] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterService, setFilterService] = useState("");
  const [loadFilter, setLoadFilter] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllJobs = async () => {
    try {
      const data = await axiosInstance.get(`/getjobs`);
      setAllJobs(data?.data);
      const totalJobs = data?.data?.length;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.log("error fetching all product", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterJob = async () => {
    setLoadFilter(true);
    try {
      const { data } = await axiosInstance.get(
        `/searchJobs?jobtitle=${filterName}&location=${filterLocation}&industry=${filterService}`
      );
      setAllJobs(data?.jobs);
      const totalJobs = data?.jobs?.length;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.log("error fetching search jobs", error);
    } finally {
      setLoadFilter(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const allJobsData = useMemo(() => {
    let computedJobs = allJobs;

    if (search) {
      computedJobs = computedJobs?.filter(
        (job: any) =>
          job?.category?.toLowerCase().includes(search.toLowerCase()) ||
          job?.expertLevel?.toLowerCase().includes(search.toLowerCase()) ||
          job?.location?.toLowerCase().includes(search.toLowerCase()) ||
          job?.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
          job?.service?.toLowerCase().includes(search.toLowerCase()) ||
          job?.jobType?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return computedJobs?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [allJobs, currentPage, search]);

  return {
    isLoading,
    allJobs,
    allJobsData,
    search,
    handleChange,
    getAllJobs,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterName,
    filterService,
    setFilterName,
    setFilterService,
    handleFilterJob,
    loadFilter,
  };
};
