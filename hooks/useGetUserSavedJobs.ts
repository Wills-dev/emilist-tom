import { useContext, useEffect, useMemo, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useGetUserSavedJobs = () => {
  const { currentUser } = useContext(AuthContext);

  const [saveLoading, setLoading] = useState<boolean>(true);
  const [allUserSavedJobs, setAllUserSavedJobs] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllUserSavedJobs: any = async () => {
    const userId = currentUser?.unique_id;
    if (currentUser) {
      try {
        const data = await axiosInstance.get(`/saved-jobs/${userId}`);
        if (data?.data?.message === "No saved jobs found for the user") {
          setAllUserSavedJobs([]);
        } else {
          setAllUserSavedJobs(data?.data?.saved_jobs);
          const totalJobs = data?.data?.saved_jobs?.length;
          setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
        }
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

  const allUserSavedJobsData = useMemo(() => {
    let computedJobs = allUserSavedJobs;

    if (search) {
      computedJobs =
        computedJobs &&
        computedJobs?.filter(
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

    return (
      computedJobs &&
      computedJobs?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      )
    );
  }, [allUserSavedJobs, currentPage, search]);

  return {
    saveLoading,
    allUserSavedJobsData,
    allUserSavedJobs,
    search,
    handlePageChange,
    currentPage,
    totalPages,
    getAllUserSavedJobs,
  };
};
