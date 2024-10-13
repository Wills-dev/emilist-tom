import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { toastOptions } from "@/helpers";
import { promiseErrorFunction } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";

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
      await axiosInstance.post(
        `/save-job?user_id=${currentUser?.unique_id}&job_id=${jobId}`
      );
      toast.success(`You have successfully saved this job `, toastOptions);
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
