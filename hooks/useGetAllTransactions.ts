import { axiosInstance } from "@/axiosInstance/baseUrls";
import React, { useState } from "react";

export const useGetAllTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllTransactions = async (query?: string) => {
    setLoading(true);
    let url = `/transaction/fetch-all-user-transactions?page=${currentPage}&limit=10${
      query ? `&paymentMethod=${query}` : ""
    }`;

    try {
      const { data } = await axiosInstance.get(url);
      console.log("all trnasactions data", data);
    } catch (error) {
      console.log("error fetching all user transactions", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    transactions,
    totalPages,
    handlePageChange,
    search,
    setSearch,
    getAllTransactions,
  };
};
