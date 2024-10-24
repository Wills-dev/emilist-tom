import { ChangeEvent, useContext, useEffect, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { AuthContext } from "@/utils/AuthState";

export const useFetchJobs = () => {
  const { currentUser } = useContext(AuthContext);

  const [allJobs, setAllJobs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 10;
  const [filterLocation, setFilterLocation] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterService, setFilterService] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllJobs = async () => {
    try {
      if (currentUser) {
        const userId = currentUser?._id;
        const { data } = await axiosInstance.get(
          `/jobs/fetch-all-jobs?page=${currentPage}&limit=10&userId=${userId}`
        );
        setAllJobs(data?.data?.jobs);
        const totalJobs = data?.data?.totalJobs;
        setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
      } else {
        const { data } = await axiosInstance.get(
          `/jobs/fetch-all-jobs?page=${currentPage}&limit=10`
        );
        setAllJobs(data?.data?.jobs);
        const totalJobs = data?.data?.totalJobs;
        setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
      }
    } catch (error: any) {
      console.log("error fetching all product", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [currentPage]);

  return {
    isLoading,
    allJobs,
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
  };
};
