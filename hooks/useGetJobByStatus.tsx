import { ChangeEvent, useMemo, useState } from "react";

import toast from "react-hot-toast";

import { toastOptions } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useGetJobByStatus = () => {
  const ITEMS_PER_PAGE = 10;

  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [allJobs, setAllJobs] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllJobsByStatus = async (userId: string, status: string) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `/user-jobs/${userId}/status?status=${status}`
      );
      setAllJobs(data);
      const totalJobs = data?.data?.length || 0;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.error("Error fetching jobs by status", error);
      toast.error("Internal Server Error!", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  const allJobsData = useMemo(() => {
    let computedJobs = allJobs;

    if (search) {
      computedJobs = computedJobs?.filter(
        (job: any) =>
          job.category.toLowerCase().includes(search.toLowerCase()) ||
          job.expertlevel.toLowerCase().includes(search.toLowerCase()) ||
          job.location.toLowerCase().includes(search.toLowerCase()) ||
          job.projecttitle.toLowerCase().includes(search.toLowerCase()) ||
          job.projecttype.toLowerCase().includes(search.toLowerCase()) ||
          job.service.toLowerCase().includes(search.toLowerCase()) ||
          job.type.toLowerCase().includes(search.toLowerCase())
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
    getAllJobsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
  };
};
