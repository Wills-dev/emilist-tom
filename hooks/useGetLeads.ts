import { ChangeEvent, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction } from "@/helpers";

export const useGetLeads = () => {
  const [leads, setLeads] = useState<any>([]);
  const [errMsg, setErrMsg] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterService, setFilterService] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getLeads = async () => {
    let url = `/jobs/leads?page=${currentPage}&limit=10
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

      const { jobs: newJobs, totalPages } = data?.data;
      setLeads(newJobs);

      setTotalPages(totalPages);
    } catch (error: any) {
      if (
        error?.response?.data?.message ===
        "Basic subscription does not include the ability to fetch leads."
      ) {
        setErrMsg(true);
        return;
      }
      promiseErrorFunction(error);
      console.log("error fetching all leads", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    leads,
    search,
    handleChange,
    getLeads,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterName,
    filterService,
    setFilterName,
    setFilterService,
    errMsg,
  };
};
