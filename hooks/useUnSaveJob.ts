import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useUnsaveJob = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unsaveRerenderr, setRerenderr] = useState<boolean>(true);
  const router = useRouter();

  const handleUnsaveJob = async (jobId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    try {
      setIsLoading(true);
      await axiosInstance.delete(
        `/unsave-job?user_id=${currentUser?.unique_id}&job_id=${jobId}`
      );
      toast.success(`You have successfully unsaved this job `, toastOptions);
      setRerenderr((prev) => !prev);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log("error unsaving job", error);
      promiseErrorFunction(error);
    }
  };
  return {
    isLoading,
    handleUnsaveJob,
    unsaveRerenderr,
  };
};
