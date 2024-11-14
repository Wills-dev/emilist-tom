import { useState } from "react";

import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetServiceInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [serviceInfo, setServiceInfo] = useState<any>({});

  const getServiceInfo = async (serviceId: string) => {
    try {
      const { data } = await axiosInstance.get(
        `/business/fetch-single-business/${serviceId}`
      );
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
