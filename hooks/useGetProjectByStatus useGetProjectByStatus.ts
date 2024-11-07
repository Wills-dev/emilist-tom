import { ChangeEvent, useMemo, useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { toastOptions } from "@/helpers";

export const useGetProjectByStatus = () => {
  const [allProjects, setAllProjects] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 10;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllProjectsByStatus = async (status: string) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `/jobs/fetch-applied-jobs-by-status?limit=10&page=${currentPage}&status=${status}`
      );

      setAllProjects(data?.data?.applications);
      const totalJobs = data?.data?.applications?.length || 0;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.error("Error fetching projects by status", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    allProjects,
    search,
    handleChange,
    getAllProjectsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
  };
};
