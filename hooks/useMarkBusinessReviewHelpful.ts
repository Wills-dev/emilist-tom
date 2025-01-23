import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useMarkBusinessReviewHelpful = () => {
  const markReviewBusinessHelpful = async (
    reviewId: string,
    status: boolean
  ) => {
    try {
      await axiosInstance.patch(`/business/mark-helpul-review/${reviewId}`, {
        isHelpful: status,
      });
      toast.success("Thanks for your feedback!", toastOptions);
    } catch (error) {
      console.log("error updating business review helpful", error);
      promiseErrorFunction(error);
    }
  };
  return {
    markReviewBusinessHelpful,
  };
};
