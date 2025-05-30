import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { AuthContext } from "@/utils/AuthState";

export const useFetchJobs = () => {
  const { currentUser } = useContext(AuthContext);

  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [allJobs, setAllJobs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterService, setFilterService] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllJobs = async () => {
    if (!hasMore) return;

    const userId = currentUser?._id || "";
    let url = `/jobs/fetch-all-jobs?page=${currentPage}&limit=10${
      userId ? `&userId=${userId}` : ""
    }`;

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
      const { data } = await axiosInstance.get(url);

      const { jobs: newJobs, totalPages } = data?.data;
      setAllJobs(newJobs);
      setData((prev) => [...prev, ...newJobs]);
      setTotalPages(totalPages);
      if (currentPage >= newJobs) {
        setHasMore(false);
      }
    } catch (error: any) {
      console.log("error fetching all product", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [currentPage]);

  const handleHorizontalScroll = () => {
    const container = containerRef.current;

    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // Check if scrolled to the end
      if (scrollLeft + clientWidth >= scrollWidth - 10 && hasMore) {
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

  return {
    isLoading,
    allJobs,
    search,
    handleChange,
    getAllJobs,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterName,
    filterService,
    setFilterName,
    setFilterService,
    handleHorizontalScroll,
    data,
    containerRef,
    hasMore,
    setIsLoading,
  };
};
