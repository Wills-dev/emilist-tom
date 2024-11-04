import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";

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
      const data = await axiosInstance.get(
        `/applied-jobs/${currentUser?.unique_id}`
      );
      setAllAplliedJobs(data?.data?.applied_jobs);
      const totalJobs = data?.data?.length;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
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

  const allAppliedJobsData = useMemo(() => {
    let computedJobs = allAplliedJobs;

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
      // setTotalPages(Math.ceil(computedJobs?.length / ITEMS_PER_PAGE));
    }

    return computedJobs?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [allAplliedJobs, currentPage, search]);

  return {
    isLoading,
    allAplliedJobs,
    allAppliedJobsData,
    search,
    handleChange,
    getAllJobs,
    handlePageChange,
    totalPages,
    currentPage,
    userLoading,
  };
};
