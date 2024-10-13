import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useGetJobSummary = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [jobAnalytics, setJobAnalytics] = useState<any>({});
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const getUserJobAnalytics = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    setLoadingAnalytics(true);
    try {
      const { data } = await axiosInstance.post(`/jobAnalytics`, {
        userId: currentUser.unique_id,
      });
      setJobAnalytics(data);
    } catch (error: any) {
      console.log("error fetching user job analytics", error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    getUserJobAnalytics();
  }, [currentUser.unique_id]);

  return {
    loadingAnalytics,
    jobAnalytics,
  };
};
