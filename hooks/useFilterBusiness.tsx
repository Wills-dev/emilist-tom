import { useState, useCallback, ChangeEvent } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useFilterBusiness = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBuinesses, setTotalBusinesses] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [minValue, setMinValue] = useState<number>(100);
  const [maxValue, setMaxValue] = useState<number>(150);
  const [expertType, setExpertType] = useState("");
  const [rating, setRating] = useState("");
  const [noOfReviews, setNoOfReviews] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState("");
  const [noticePeriod, setNoticePeriod] = useState<number | undefined>(
    undefined
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1); // Prevent overlap
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1); // Prevent overlap
    setMaxValue(value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchBusinesses = useCallback(async () => {
    setLoading(true);
    let url = `/business/fetch-all-business?page=${currentPage}&limit=10`;
    if (search) {
      url += `&search=${search}`;
    }
    // if (minValue) {
    //   url += `&startPriceRange[0]=${minValue}`;
    // }
    // if (maxValue) {
    //   url += `&startPriceRange[1]=${maxValue}`;
    // }
    if (location) {
      url += `&location=${location}`;
    }
    if (noticePeriod) {
      url += `&noticePeriod=${noticePeriod}`;
    }
    if (noOfReviews) {
      url += `&minReviews=${noOfReviews}`;
    }
    if (rating) {
      url += `&minRating=${rating}`;
    }
    if (expertType) {
      url += `&expertType=${expertType}`;
    }

    try {
      const { data } = await axiosInstance.get(url);
      const {
        business: newBusinesses,
        totalPages,
        totalBusinesses,
      } = data?.data;

      setBusinesses(newBusinesses);
      setTotalBusinesses(totalBusinesses);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, totalPages]);

  return {
    fetchBusinesses,
    loading,
    search,
    setSearch,
    businesses,
    totalPages,
    currentPage,
    handleChange,
    handlePageChange,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    expertType,
    setExpertType,
    handleMinChange,
    handleMaxChange,
    rating,
    setRating,
    noOfReviews,
    setNoOfReviews,
    location,
    setLocation,
    noticePeriod,
    setNoticePeriod,
    totalBuinesses,
  };
};
