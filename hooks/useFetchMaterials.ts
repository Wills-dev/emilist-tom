import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { AuthContext } from "@/utils/AuthState";

export const useFetchMaterials = () => {
  const { currentUser } = useContext(AuthContext);

  const containerRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [allMaterials, setAllMaterials] = useState<any>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllMaterials = async () => {
    if (loading || !hasMore) return;

    const userId = currentUser?._id || "";
    const url = `/material/fetch-all-products?page=${currentPage}&limit=10${
      userId ? `&userId=${userId}` : ""
    }`;
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(url);

      const { products: newProducts, totalPages } = data?.data;
      setAllMaterials(newProducts);
      setData((prev) => [...prev, ...newProducts]);
      setTotalPages(totalPages);
      if (currentPage >= newProducts) {
        setHasMore(false);
      }
    } catch (error: any) {
      console.log("error fetching all materials", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMaterials();
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
    handleHorizontalScroll,
    data,
    containerRef,
    loading,
    hasMore,
    allMaterials,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    getAllMaterials,
  };
};
