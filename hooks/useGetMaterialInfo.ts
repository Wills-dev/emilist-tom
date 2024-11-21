import { useState } from "react";

import toast from "react-hot-toast";

import { toastOptions } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetMaterialInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [materialInfo, setMaterialInfo] = useState<any>({});

  const getMaterialInfo = async (materialId: string) => {
    try {
      const { data } = await axiosInstance.get(
        `/material/fetch-product/${materialId}`
      );
      setMaterialInfo(data?.data);
    } catch (error: any) {
      console.log("error getting material info", error);
      toast.error("Internal server error or No network", toastOptions);
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
