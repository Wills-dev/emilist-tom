import { useContext, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetServiceInfo = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const [loading, setLoading] = useState<boolean>(true);
  const [serviceInfo, setServiceInfo] = useState<any>({});

  const getServiceInfo = async (serviceId: string) => {
    let url = `/business/fetch-single-business/${serviceId}${
      userId ? `?userId=${userId}` : ""
    }`;
    try {
      const { data } = await axiosInstance.get(url);
      setServiceInfo(data?.data);
    } catch (error: any) {
      console.log("error getting service info", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    getServiceInfo,
    serviceInfo,
  };
};
