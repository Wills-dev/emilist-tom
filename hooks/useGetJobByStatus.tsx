import { ChangeEvent, useMemo, useState } from "react";

import toast from "react-hot-toast";

import { toastOptions } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

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

  const getAllJobsByStatus = async (status: string) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `/jobs/fetch-jobs-by-status?status=${status}`
      );
      console.log("data", data);
      setAllJobs(data?.data);
      const totalJobs = data?.data?.length || 0;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.error("Error fetching jobs by status", error);
      toast.error("Internal Server Error!", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    allJobs,
    search,
    handleChange,
    getAllJobsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
  };
};
