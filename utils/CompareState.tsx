"use client";

import { createContext, useEffect, useState } from "react";

import { readAuthCookie } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const CompareContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const CompareState = ({ children }: Props) => {
  const token = readAuthCookie("sessionId");

  const [rrerender, setRerender] = useState(false);
  const [compareLoading, setLoading] = useState(true);
  const [compareServices, setCompareServices] = useState([]);

  const getComparedServices = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/business/fetch-compared-business`
      );
      setCompareServices(data?.data?.enhancedBusinesses);
    } catch (error) {
      console.log("error getting compared services", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getComparedServices();
    } else {
      setLoading(false);
    }
  }, [rrerender]);

  const value = {
    compareLoading,
    compareServices,
    setRerender,
    rrerender,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

export default CompareState;
