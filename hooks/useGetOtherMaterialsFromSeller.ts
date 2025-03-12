import { useContext, useRef, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetOtherMaterialsFromSeller = () => {
  const { currentUser } = useContext(AuthContext);

  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllOtherMaterialsByUser = async (materialId: string) => {
    if (!hasMore) return;
    const userId = currentUser?._id || "";
    let url = `/material/fetch-other-products-by-user/${materialId}?page=${currentPage}&limit=10${
      userId ? `&userId=${userId}` : ""
    }`;

    try {
      const { data } = await axiosInstance.get(url);
      const { products: newProducts, totalPages, totalProducts } = data?.data;
      setData((prev) => [...prev, ...newProducts]);
      setTotalPages(totalPages);
      if (currentPage >= newProducts) {
        setHasMore(false);
      }
      console.log("data", data);
    } catch (error: any) {
      console.log("error fetching all materials", error);
    } finally {
      setLoading(false);
    }
  };

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
    loading,
    data,
    getAllOtherMaterialsByUser,
    containerRef,
    hasMore,
    handleHorizontalScroll,
  };
};
