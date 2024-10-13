import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useWithdawApplication = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [rerenderWithdraw, setRerender] = useState(false);
  const [isWithdrawLoading, setIsWithdawLoading] = useState<boolean>(false);

  const handleWithdrawApplicationFofJob = async (
    jobId: string,
    jobType: string
  ) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setIsWithdawLoading(true);
    try {
      const withdrawDetails: any = {
        applicantId: currentUser.unique_id,
        jobId,
        jobType,
      };
      await axiosInstance.delete(`/withdrawApplication`, {
        data: withdrawDetails,
      });
      setRerender((prev) => !prev);

      setIsWithdawLoading(false);
      toast.success(
        `You have successfully withdrawn your application `,
        toastOptions
      );
    } catch (error: any) {
      setIsWithdawLoading(false);
      console.log("error withdrawing application", error);
      promiseErrorFunction(error);
    }
  };

  return {
    rerenderWithdraw,
    isWithdrawLoading,
    handleWithdrawApplicationFofJob,
  };
};
