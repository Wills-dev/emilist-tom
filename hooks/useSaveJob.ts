import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { promiseErrorFunction } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useSaveJob = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(true);
  const router = useRouter();

  const handleSaveJob = async (jobId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    try {
      setLoading(true);
      await axiosInstance.post(`/jobs/like-job/${jobId}`);
      // toast.success(`You have successfully saved this job `, toastOptions);
      setRerender((prev) => !prev);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error saving job", error);
      promiseErrorFunction(error);
    }
  };
  return {
    loading,
    handleSaveJob,
    rerender,
  };
};
