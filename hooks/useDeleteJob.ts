import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDeleteJob = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleDeleteJob = async (jobId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(`/jobs/delete-job/${jobId}`);
      toast.success(`Job deleted!`, toastOptions);
      router.push("/dashboard/job/my-listed-jobs");
    } catch (error: any) {
      setIsDeleteLoading(false);
      console.log("error deleting  jobb", error);
      promiseErrorFunction(error);
    }
  };
  return {
    handleDeleteJob,
    isDeleteLoading,
  };
};
