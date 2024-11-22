import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetUserSavedMaterials = () => {
  const { currentUser } = useContext(AuthContext);

  const [saveLoading, setLoading] = useState<boolean>(true);
  const [allUserSavedMaterials, setAllUserSavedMaterials] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllUserSavedMaterials: any = async () => {
    if (currentUser) {
      try {
        const { data } = await axiosInstance.get(
          `/material/fetch-liked-products`
        );
        setAllUserSavedMaterials(data?.data?.products);
        const totalJobs = data?.data?.totalLikedProducts;
        setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
      } catch (error: any) {
        console.log("error getting user saved jobs", error);
        promiseErrorFunction(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAllUserSavedMaterials();
  }, [currentUser]);

  return {
    saveLoading,
    allUserSavedMaterials,
    search,
    handlePageChange,
    currentPage,
    totalPages,
    getAllUserSavedMaterials,
    setSearch,
  };
};
