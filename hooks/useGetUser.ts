import { axiosInstance } from "@/axiosInstance/baseUrls";
import React, { useState } from "react";

export const useGetUser = () => {
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const getUserInfo = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/auth/user-details/${userId}`);
      console.log("data", data);
      setUser(data?.data);
    } catch (error) {
      console.log("error getting user info", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    getUserInfo,
  };
};
