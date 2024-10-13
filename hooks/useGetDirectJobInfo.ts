import { useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useGetDirectJobInfo = () => {
  const [jobInfo, setJobInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [currentMilestone, setCurrentMilestone] = useState<any>({});

  const getJobInfo = async (jobId: string) => {
    try {
      const data = await axiosInstance.get(`/directcontracts/${jobId}`);
      setJobInfo(data?.data?.directcontract);
      //   setCurrentMilestone(data?.data?.directcontract?.milestones[0]);
    } catch (error: any) {
      console.log("error getting direct job info", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    getJobInfo,
    jobInfo,
    currentMilestone,
    setCurrentMilestone,
  };
};
