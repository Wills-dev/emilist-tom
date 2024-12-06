import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useBlackListJob = () => {
  const router = useRouter();
  const [rerenderrr, setRerenderrr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleBlackListJob = async (jobId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }

    try {
      await axiosInstance.get(`/jobs/mute-job/${jobId}`);
      toast.success(`You have successfully blacklisted this job`, toastOptions);
      setRerenderrr((prev) => !prev);
    } catch (error: any) {
      console.log(error);
      promiseErrorFunction(error);
    }
  };

  return {
    handleBlackListJob,
    rerenderrr,
  };
};
