import { useState } from "react";

import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useGetMaterialInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [materialInfo, setMaterialInfo] = useState<any>({});

  const getMaterialInfo = async (materialId: string) => {
    try {
      const data = await axiosInstance.get(`/fetchMaterial/${materialId}`);
      setMaterialInfo(data?.data);
    } catch (error: any) {
      console.log("error getting material info", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    getMaterialInfo,
    materialInfo,
  };
};
