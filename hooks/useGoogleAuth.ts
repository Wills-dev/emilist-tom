import { useState } from "react";

import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGoogleAuth = () => {
  const [loadGoogleAuth, setLoadGoogleAuth] = useState(false);

  const googleAuth = async () => {
    setLoadGoogleAuth(true);
    try {
      const data = await axiosInstance.get(`/auth/google`);
      console.log(" google data", data);
    } catch (error) {
      console.log("error google auth", error);
      promiseErrorFunction(error);
    } finally {
      setLoadGoogleAuth(false);
    }
  };
  return {
    googleAuth,
    loadGoogleAuth,
  };
};
