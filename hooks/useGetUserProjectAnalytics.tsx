import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetUserProjectAnalytics = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [projectAnalytics, setProjectAnalytics] = useState<any>({});

  const getUserProjectAnalytics = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setLoadingAnalytics(true);
    try {
      const { data } = await axiosInstance.get(`/fetch-project-count`);
      setProjectAnalytics(data?.data);
    } catch (error: any) {
      console.log("error getting project analytics", error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    getUserProjectAnalytics();
  }, [currentUser.unique_id]);

  return {
    loadingAnalytics,
    projectAnalytics,
  };
};
