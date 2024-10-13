import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useFetchExperts = () => {
  const [allExperts, setAllExperts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  const getAllExperts = async () => {
    try {
      const data = await axiosInstance.get(`/fetchexperts`);
      setAllExperts(data?.data);
      const totalJobs = data?.data?.length;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.log("error fetching all experts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllExperts();
  }, []);

  const allExpertsData = useMemo(() => {
    let computedExperts = allExperts;

    if (search) {
      computedExperts = computedExperts?.filter(
        (expert: any) =>
          expert?.businessname?.toLowerCase().includes(search.toLowerCase()) ||
          expert?.country?.toLowerCase().includes(search.toLowerCase()) ||
          expert?.firstname?.toLowerCase().includes(search.toLowerCase()) ||
          expert?.service?.toLowerCase().includes(search.toLowerCase()) ||
          expert?.contactpersonName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          expert?.city?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return computedExperts?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [allExperts, currentPage, search]);

  return {
    loading,
    allExperts,
    allExpertsData,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
  };
};
