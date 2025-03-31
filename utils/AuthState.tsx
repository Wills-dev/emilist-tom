"use client";

import { createContext, useEffect, useState } from "react";

import UltimateLoadingUI from "@/components/UltimateLoadingPage/UltimateLoadingUI";

import { clearAuthClear, readAuthCookie } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const AuthContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const AuthState = ({ children }: Props) => {
  const token = readAuthCookie("sessionId");

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [reRender, setRerender] = useState(false);

  const getCurrentUser = async () => {
    try {
      const { data } = await axiosInstance.get(`/auth/current-user`);
      setCurrentUser(data?.data);
    } catch (error) {
      console.log("error getting user details", error);
      setUserLoading(false);
      clearAuthClear("sessionId");
      setCurrentUser(null);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    const isPreview = process.env.NEXT_PUBLIC_PREVIEW === 'true' || 
                      typeof window !== 'undefined' && window.location.hostname.includes('devinapps.com');
    
    if (isPreview) {
      console.log("Preview mode: Bypassing authentication");
      setUserLoading(false);
    } else if (token) {
      getCurrentUser();
    } else {
      setUserLoading(false);
    }
  }, [reRender]);

  const value = {
    currentUser,
    setCurrentUser,
    userLoading,
    setRerender,
  };

  return (
    <AuthContext.Provider value={value}>
      {" "}
      {userLoading ? <UltimateLoadingUI /> : children}
    </AuthContext.Provider>
  );
};

export default AuthState;
