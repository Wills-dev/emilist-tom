import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetUserAppliedJobs = () => {
  const { currentUser, userLoading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allAplliedJobs, setAllAplliedJobs] = useState<any>([]);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterService, setFilterService] = useState("");
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
    let url = `/jobs/fetch-applied-jobs-by-status?limit=10&page=${currentPage}`;

    if (search) {
      url += `&search=${search}`;
    } else {
      if (filterName) {
        url += `&title=${filterName}`;
      }
      if (filterLocation) {
        url += `&location=${filterLocation}`;
      }
      if (filterService) {
        url += `&service=${filterService}`;
      }
    }
    try {
      const { data } = await axiosInstance.get(url);
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
    filterService,
    setFilterService,
    filterName,
    setFilterName,
    filterLocation,
    setFilterLocation,
  };
};
