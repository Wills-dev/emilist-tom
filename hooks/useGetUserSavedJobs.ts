import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetUserSavedJobs = () => {
  const { currentUser } = useContext(AuthContext);

  const [saveLoading, setLoading] = useState<boolean>(true);
  const [allUserSavedJobs, setAllUserSavedJobs] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllUserSavedJobs: any = async () => {
    if (currentUser) {
      try {
        const { data } = await axiosInstance.get(
          `/jobs/fetch-liked-jobs?page=${currentPage}&limit=10`
        );
        setAllUserSavedJobs(data?.data?.jobs);
        const totalJobs = data?.data?.totalLikedJobs;
        setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
      } catch (error: any) {
        console.log("error getting user saved jobs", error);
        promiseErrorFunction(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAllUserSavedJobs();
  }, [currentUser]);

  return {
    saveLoading,
    allUserSavedJobs,
    handlePageChange,
    currentPage,
    totalPages,
    getAllUserSavedJobs,
  };
};
