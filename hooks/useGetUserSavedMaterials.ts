import { useContext, useEffect, useMemo, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrl";

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
    const userId = currentUser?.unique_id;
    if (currentUser) {
      try {
        const data = await axiosInstance.get(`/saved-materials/${userId}`);
        if (data?.data?.message === "No saved materials found for the user") {
          setAllUserSavedMaterials([]);
        } else setAllUserSavedMaterials(data?.data?.saved_materials);
        const totalJobs = data?.data?.saved_materials?.length;
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

  const allUserSavedMaterialsData = useMemo(() => {
    let computedMaterials = allUserSavedMaterials;

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

    return (
      computedMaterials &&
      computedMaterials?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      )
    );
  }, [allUserSavedMaterials, currentPage, search]);

  return {
    saveLoading,
    allUserSavedMaterialsData,
    allUserSavedMaterials,
    search,
    handlePageChange,
    currentPage,
    totalPages,
    getAllUserSavedMaterials,
  };
};
