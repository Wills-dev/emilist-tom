import { ChangeEvent, useContext, useEffect, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { AuthContext } from "@/utils/AuthState";

export const useFetchMaterials = () => {
  const { currentUser } = useContext(AuthContext);

  const [allMaterials, setAllMaterials] = useState<any>([]);
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

  const getAllMaterials = async () => {
    const userId = currentUser?._id || "";
    const url = `/material/fetch-all-products${
      userId ? `?userId=${userId}` : ""
    }`;
    try {
      const { data } = await axiosInstance.get(url);
      setAllMaterials(data?.data?.products);
      const totalProducts = data?.data?.totalProducts;
      setTotalPages(Math.ceil(totalProducts / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.log("error fetching all materials", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMaterials();
  }, []);

  return {
    loading,
    allMaterials,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    getAllMaterials,
  };
};
