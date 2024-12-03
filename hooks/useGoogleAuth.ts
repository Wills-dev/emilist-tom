import { useState } from "react";

import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGoogleAuth = () => {
  const [loadGoogleAuth, setLoadGoogleAuth] = useState(false);

  const googleAuth = async () => {
    window.location.href =
      "https://emilist-be-server.onrender.com/api/v1/auth/google";
  };
  return {
    googleAuth,
    loadGoogleAuth,
  };
};
