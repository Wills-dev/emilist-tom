import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useApplyForJob = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rerender, setRerender] = useState(false);

  const handleApplyFofJob = async (jobId: string, businessId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setIsLoading(true);
    try {
      const payload = {
        jobId,
        type: "regular",
        businessId,
      };
      await axiosInstance.post(`/jobs/apply-job`, payload);
      setRerender((prev) => !prev);
      toast.success(`Application submitted!`, toastOptions);
    } catch (error: any) {
      console.log("error applying for regular job", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleApplyFofJob,
    isLoading,
    rerender,
  };
};
