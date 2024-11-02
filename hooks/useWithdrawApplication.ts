import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useWithdrawApplication = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [rerenderWithdraw, setRerender] = useState(false);
  const [isWithdrawLoading, setIsWithdawLoading] = useState<boolean>(false);

  const handleWithdrawApplicationFofJob = async (applicationId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setIsWithdawLoading(true);
    try {
      await axiosInstance.delete(
        `/jobs/withdraw-job-application/${applicationId}`
      );
      setRerender((prev) => !prev);
      toast.success(`Application withdrawn!`, toastOptions);
    } catch (error: any) {
      console.log("error withdrawing regular job application", error);
      promiseErrorFunction(error);
    } finally {
      setIsWithdawLoading(false);
    }
  };

  return {
    rerenderWithdraw,
    isWithdrawLoading,
    handleWithdrawApplicationFofJob,
  };
};
