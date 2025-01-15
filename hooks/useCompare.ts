import { useContext } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/utils/AuthState";
import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useCompare = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const compare = async (serviceId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }

    try {
      await axiosInstance.patch(`/business/compare-business/${serviceId}`);
    } catch (error) {
      console.log("error adding business to compare", error);
      promiseErrorFunction(error);
    }
  };

  return {
    compare,
  };
};
