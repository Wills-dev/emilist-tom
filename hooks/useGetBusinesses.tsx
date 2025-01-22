import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  useContext,
} from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetBusinesses = () => {
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [businesses, setBusinesses] = useState([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchBusinesses = useCallback(async () => {
    if (!hasMore) return;

    const userId = currentUser?._id || "";
    let url = `/business/fetch-all-business?page=${currentPage}&limit=10${
      userId ? `&userId=${userId}` : ""
    }`;

    try {
      const { data } = await axiosInstance.get(url);

      const { business: newBusinesses, totalPages } = data?.data;

      setData((prev) => [...prev, ...newBusinesses]);
      setBusinesses(newBusinesses);
      setTotalPages(totalPages);
      if (currentPage >= newBusinesses) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, totalPages]);

  useEffect(() => {
    fetchBusinesses();
  }, [currentPage]);

  // Scroll Handler
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
    handleHorizontalScroll,
    data,
    containerRef,
    loading,
    hasMore,
    search,
    setSearch,
    businesses,
    totalPages,
    currentPage,
    handleChange,
    handlePageChange,
    fetchBusinesses,
  };
};
