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

    let url = `/jobs/fetch-listed-jobs?page=${currentPage}&limit=10`;

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
      const { data } = await axiosInstance(url);
      setAllUserJobs(data?.data?.jobs);
      const totalJobs = data?.data?.totalJobs;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error fetching user jobs", error);
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
    getAllUserJobs,
  };
};
