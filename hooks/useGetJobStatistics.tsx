import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/axiosInstance/baseUrl";
import { AuthContext } from "@/utils/AuthState";

export const useGetJobStatistics = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [loadStat, setLoadStat] = useState(true);
  const [statisticInfo, setStatisticsInfo] = useState({});

  const getStat = async (filterby?: string) => {
    if (!currentUser) {
      router.push("/login");
    }
    try {
      const data = await axiosInstance.get(
        `/getUserReport?userId=${currentUser?.unique_id}&filter=${
          filterby ? filterby : "monthly"
        }`
      );

      console.log("data", data);
    } catch (error) {
      console.log("error gettting job statistic", error);
    } finally {
      setLoadStat(false);
    }
  };

  return {
    loadStat,
    statisticInfo,
    getStat,
  };
};
