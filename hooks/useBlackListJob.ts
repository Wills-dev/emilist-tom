import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useBlackListJob = () => {
  const [rerenderrr, setRerenderrr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleBlackListJob = async (jobId: string) => {
    const userId = currentUser?.unique_id;
    try {
      await axiosInstance.put(
        `/user-blacklist/${userId}/blacklist-job/${jobId}`
      );

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
