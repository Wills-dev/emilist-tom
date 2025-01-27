"use client";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { readAuthCookie } from "@/helpers";
import { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

interface CompareMaterialContextType {
  compareLoading: boolean;
  compareMaterials: any[];
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
  rrerender: boolean;
}

export const CompareMaterialContext = createContext<CompareMaterialContextType>(
  {
    compareLoading: false,
    compareMaterials: [],
    setRerender: () => {},
    rrerender: false,
  }
);

const CompareMaterialState = ({ children }: Props) => {
  const token = readAuthCookie("sessionId");

  const [rrerender, setRerender] = useState(false);
  const [compareLoading, setLoading] = useState(true);
  const [compareMaterials, setCompareMaterials] = useState([]);

  const getComparedMaterials = async () => {
    try {
      const { data } = await axiosInstance.get(
        `material/fetch-compared-products`
      );
      setCompareMaterials(data?.data?.enhancedProducts);
    } catch (error) {
      console.log("error getting compared materials", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getComparedMaterials();
    } else {
      setLoading(false);
    }
  }, [rrerender]);

  const value = {
    compareLoading,
    compareMaterials,
    setRerender,
    rrerender,
  };

  return (
    <CompareMaterialContext.Provider value={value}>
      {children}
    </CompareMaterialContext.Provider>
  );
};

export default CompareMaterialState;
