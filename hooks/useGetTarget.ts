import { useEffect, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetTarget = () => {
  const [target, setTarget] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const getTarget = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/target/fetch-target-metrics`);
      setTarget(data?.data);
    } catch (error) {
      console.log("error getting user target", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTarget();
  }, []);

  return {
    loading,
    target,
  };
};
