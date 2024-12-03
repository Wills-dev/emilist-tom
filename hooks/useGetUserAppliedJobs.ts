import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetUserAppliedJobs = () => {
  const { currentUser, userLoading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allAplliedJobs, setAllAplliedJobs] = useState<any>([]);
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

  const getAllJobs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/jobs/fetch-applied-jobs-by-status`
      );
      setAllAplliedJobs(data?.data?.applications);
      const totalJobs = data?.data?.total || 0;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      setIsLoading(false);
      console.log("error getting user applied jobs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getAllJobs();
    }
  }, [currentUser]);

  return {
    isLoading,
    allAplliedJobs,
    search,
    handleChange,
    getAllJobs,
    handlePageChange,
    totalPages,
    currentPage,
    userLoading,
  };
};
