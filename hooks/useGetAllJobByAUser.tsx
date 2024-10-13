import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";

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
      const userId = currentUser.unique_id;
      const data = await axiosInstance(`/user-jobs/${userId}`);
      setAllUserJobs(data?.data);
      const totalJobs = data?.data?.length;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error fetching user jobs", error);
    }
  };

  const handleFilterJob = async () => {
    const userId = currentUser.unique_id;
    if (!currentUser) {
      return router.push("/login");
    }
    setLoadFilter(true);
    try {
      const { data } = await axiosInstance.get(
        `/searchJobsByUser?userId=${userId}&jobtitle=${filterName}&location=${filterLocation}&industry=${filterService}`
      );
      setAllUserJobs(data?.jobs);
      const totalJobs = data?.jobs?.length;
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

  const allUserJobsData = useMemo(() => {
    let computedProducts = allUserJobs;

    if (search) {
      computedProducts = computedProducts?.filter(
        (job: any) =>
          job?.category?.toLowerCase().includes(search.toLowerCase()) ||
          job?.expertLevel?.toLowerCase().includes(search.toLowerCase()) ||
          job?.location?.toLowerCase().includes(search.toLowerCase()) ||
          job?.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
          job?.jobType?.toLowerCase().includes(search.toLowerCase()) ||
          job?.service?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return computedProducts?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [allUserJobs, currentPage, search]);

  return {
    allUserJobs,
    loading,
    allUserJobsData,
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
