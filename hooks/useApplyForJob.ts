import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useApplyForJob = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rerender, setRerender] = useState(false);

  const handleApplyFofJob = async (jobId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setIsLoading(true);
    try {
      const userId = currentUser?.unique_id;
      const applyDetails = {
        userId,
        isRequestQuote: false,
        quote: "",
      };
      await axiosInstance.post(`/applyRegularJob/${jobId}`, applyDetails);
      setRerender((prev) => !prev);
      toast.success(
        `You have successfully applied for this job `,
        toastOptions
      );
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
