import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { toastOptions } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetMaterialInfo = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const [loading, setLoading] = useState<boolean>(true);
  const [materialInfo, setMaterialInfo] = useState<any>({});

  const getMaterialInfo = async (materialId: string) => {
    let url = `/material/fetch-product/${materialId}${
      userId ? `?userId=${userId}` : ""
    }`;
    try {
      const { data } = await axiosInstance.get(url);

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
