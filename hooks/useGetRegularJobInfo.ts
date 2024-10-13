import { useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useGetRegularJobInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [jobInfo, setJobInfo] = useState<any>({});
  const [currentMilestone, setCurrentMilestone] = useState<any>({});

  const getJobInfo = async (jobId: string) => {
    try {
      const data = await axiosInstance.get(`/get_regular_job_info/${jobId}`);
      setJobInfo(data?.data);
      setCurrentMilestone(data?.data?.milestoneDetails[0]);
    } catch (error: any) {
      console.log("error fetching regular job info", error);
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
