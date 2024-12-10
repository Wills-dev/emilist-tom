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
    const userId = currentUser?._id || "";
    let url = `/jobs/fetch-all-jobs?page=${currentPage}&limit=10${
      userId ? `&userId=${userId}` : ""
    }`;

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
      setAllJobs(data?.data?.jobs);
      const totalJobs = data?.data?.totalJobs;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
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
