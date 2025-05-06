import { useState } from "react";

export const useGoogleAuth = () => {
  const [loadGoogleAuth, setLoadGoogleAuth] = useState(false);

  const googleAuth = async () => {
    window.location.href =
      "https://emilist-be-server-05kc.onrender.com/api/v1/auth/google";
  };
  return {
    googleAuth,
    loadGoogleAuth,
  };
};
