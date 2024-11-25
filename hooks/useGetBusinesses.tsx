import { axiosInstance } from "@/axiosInstance/baseUrls";
import { useState, useEffect, useRef, useCallback } from "react";

export const useGetBusinesses = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const fetchBusinesses = useCallback(async () => {
    if (loading || (totalPages && currentPage > totalPages)) return;

    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/business/fetch-all-business?page=${currentPage}&limit=10`
      );

      const { business: newBusinesses, totalPages } = data?.data;

      setData((prevData) => {
        const newData = [...prevData, ...newBusinesses];
        return Array.from(new Set(newData));
      });

      setTotalPages(totalPages);
      setHasMore(newBusinesses.length > 0);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, totalPages]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const handleHorizontalScroll = useCallback(() => {
    // if (!containerRef.current || loading || !hasMore) return;
    // const { scrollWidth, scrollLeft, clientWidth } = containerRef.current;
    // if (scrollLeft + clientWidth >= scrollWidth - 100) {
    //   setCurrentPage((prevPage) => prevPage + 1);
    // }
  }, [loading, hasMore]);

  return {
    handleHorizontalScroll,
    data,
    containerRef,
    loading,
  };
};
