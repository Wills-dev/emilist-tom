import { useContext } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/utils/AuthState";
import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { CompareMaterialContext } from "@/utils/CompareMaterialState";

export const useCompareMaterial = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { setRerender } = useContext(CompareMaterialContext);

  const compareMaterial = async (materialId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }

    try {
      await axiosInstance.patch(`/material/compare-product/${materialId}`);
      setRerender((prev: boolean) => !prev);
    } catch (error) {
      console.log("error adding business to compare", error);
      promiseErrorFunction(error);
    }
  };

  return {
    compareMaterial,
  };
};
