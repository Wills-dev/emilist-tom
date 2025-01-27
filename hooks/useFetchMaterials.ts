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
  const [loading, setLoading] = useState<boolean>(true);
  const [allMaterials, setAllMaterials] = useState<any>([]);
  const [rating, setRating] = useState("");
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(150);
  const [noOfReviews, setNoOfReviews] = useState<string | undefined>(undefined);
  const [totalProducts, setTotalProducts] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1); // Prevent overlap
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1); // Prevent overlap
    setMaxValue(value);
  };

  const getAllMaterials = async (
    material?: string | null,
    locationQuery?: string | null
  ) => {
    if (!hasMore) return;

    const userId = currentUser?._id || "";
    let url = `/material/fetch-all-products?page=${currentPage}&limit=10${
      userId ? `&userId=${userId}` : ""
    }`;
    if (search) {
      url += `&search=${search}`;
    } else if (material) {
      url += `&search=${material}`;
    }
    if (locationQuery) {
      url += `&location=${locationQuery}`;
    }
    // if (minValue) {
    //   url += `&minPrice=${minValue}`;
    // }
    // if (maxValue) {
    //   url += `&maxPrice=${maxValue}`;
    // }
    if (rating) {
      url += `&minRating=${rating}`;
    }
    if (noOfReviews) {
      url += `&minReviews=${noOfReviews}`;
    }

    try {
      const { data } = await axiosInstance.get(url);

      const { products: newProducts, totalPages, totalProducts } = data?.data;
      setAllMaterials(newProducts);
      setTotalProducts(totalProducts);
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
    handleMinChange,
    handleMaxChange,
    rating,
    setRating,
    minValue,
    maxValue,
    noOfReviews,
    setNoOfReviews,
    totalProducts,
  };
};
