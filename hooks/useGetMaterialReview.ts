import { useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetMaterialReview = () => {
  const [data, setData] = useState<any>([]);
  const [reviews, setReviews] = useState<any>({});
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadin, setIsLoading] = useState(false);

  const getReviews = async (materialId: string, sort: string) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/material/fetch-product-reviews/${materialId}?page=${currentPage}&limit=10&sortBy=${sort}`
      );
      setData((prevReviews: any) => {
        const newReviews = data?.data.reviews.filter(
          (review: any) =>
            !prevReviews.some((prev: any) => prev._id === review._id)
        );
        return [...prevReviews, ...newReviews];
      });
      setReviews(data?.data);
      setTotalPages(data?.data?.totalPages);
      console.log("data", data);
    } catch (error) {
      console.log("error getting reviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    reviews,
    isLoadin,
    getReviews,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};
