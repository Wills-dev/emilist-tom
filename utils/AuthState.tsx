"use client";

import { createContext, useEffect, useState } from "react";

import UltimateLoadingUI from "@/components/UltimateLoadingPage/UltimateLoadingUI";

import { readAuthCookie } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const AuthContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const AuthState = ({ children }: Props) => {
  const token = readAuthCookie("sessionId");

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const getCurrentUser = async () => {
    try {
      const { data } = await axiosInstance.get(`/auth/current-user`);
      setCurrentUser(data?.data);
    } catch (error) {
      console.log("error getting user details", error);
      setUserLoading(false);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      setUserLoading(false);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    userLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {" "}
      {userLoading ? <UltimateLoadingUI /> : children}
    </AuthContext.Provider>
  );
};

export default AuthState;
