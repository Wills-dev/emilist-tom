import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction } from "@/helpers";

export const useGetUserMaterials = () => {
  const { currentUser } = useContext(AuthContext);

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
    const userId = currentUser.unique_id;
    try {
      const data = await axiosInstance.get(`/fetchMaterialsUser/${userId}`);
      setMyMaterials(data?.data?.user_materials);
      const totalJobs = data?.data?.user_materials?.length;
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

  const allMaterialData = useMemo(() => {
    let computedMaterials = myMaterials;

    if (search) {
      computedMaterials = computedMaterials?.filter(
        (material: any) =>
          material?.ProductName?.toLowerCase().includes(search.toLowerCase()) ||
          material?.category?.toLowerCase().includes(search.toLowerCase()) ||
          material?.subCategory?.toLowerCase().includes(search.toLowerCase()) ||
          material?.brand?.toLowerCase().includes(search.toLowerCase()) ||
          material?.supplier?.toLowerCase().includes(search.toLowerCase()) ||
          material?.location?.toLowerCase().includes(search.toLowerCase()) ||
          material?.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return computedMaterials?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [myMaterials, currentPage, search]);

  return {
    allMaterialData,
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
