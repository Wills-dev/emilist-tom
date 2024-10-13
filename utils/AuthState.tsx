"use client";

import { createContext, useEffect, useState } from "react";

import UltimateLoadingUI from "@/components/UltimateLoadingPage/UltimateLoadingUI";

import { readAuthCookie } from "@/helpers";

export const AuthContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const AuthState = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const user = readAuthCookie("emilistUser");
    if (user) {
      setCurrentUser(user);
    }
    setUserLoading(false);
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
