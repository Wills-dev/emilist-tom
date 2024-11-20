import { ChangeEvent, useEffect, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction } from "@/helpers";

export const useGetUserMaterials = () => {
  const [myMaterials, setMyMaterials] = useState<any>([]);
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

  const getAllMaterials = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/material/fetch-user-products`);
      setMyMaterials(data?.data?.products);
      const totalJobs = data?.data?.totalProducts;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.log("error fetching materials", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllMaterials();
  }, []);

  return {
    handleChange,
    handlePageChange,
    isLoading,
    search,
    getAllMaterials,
    totalPages,
    currentPage,
    myMaterials,
  };
};
