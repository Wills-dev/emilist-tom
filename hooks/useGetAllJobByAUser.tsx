import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetAllJobByAUser = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [allUserJobs, setAllUserJobs] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [filterLocation, setFilterLocation] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterService, setFilterService] = useState("");
  const [loadFilter, setLoadFilter] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllUserJobs = async () => {
    if (!currentUser) {
      return router.push("/login");
    }
    try {
      const { data } = await axiosInstance(
        `/jobs/fetch-listed-jobs?page=${currentPage}&limit=10`
      );
      setAllUserJobs(data?.data?.jobs);
      const totalJobs = data?.data?.totalJobs;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error fetching user jobs", error);
    }
  };

  const handleFilterJob = async () => {
    if (!currentUser) {
      return router.push("/login");
    }
    setLoadFilter(true);
    try {
      const { data } = await axiosInstance.get(
        `/jobs/fetch-listed-jobs?page=${currentPage}&limit=10&location=${filterLocation}&title=${filterName}&service=${filterService}&search=${search}`
      );
      setAllUserJobs(data?.data?.jobs);
      const totalJobs = data?.data?.totalJobs;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.log("error filtering user jobs", error);
    } finally {
      setLoadFilter(false);
    }
  };

  useEffect(() => {
    getAllUserJobs();
  }, [currentUser]);

  return {
    allUserJobs,
    loading,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterName,
    filterService,
    setFilterName,
    setFilterService,
    handleFilterJob,
    loadFilter,
  };
};
