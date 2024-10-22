import { useState } from "react";

import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useDeactivateUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeactivateUser = async () => {
    setIsLoading(true);
    try {
      axiosInstance.patch(`/auth/deactivate-user`);
    } catch (error) {
      console.log("error deactivating user", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleDeactivateUser,
    isLoading,
  };
};
