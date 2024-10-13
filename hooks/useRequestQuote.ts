import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useRequestQuote = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [rerenderr, setRerender] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

  const requestQuote = async (applicantId: string, jobId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }

    setRequestLoading(true);
    try {
      const requestDetails = {
        applicantId,
        jobId,
      };
      await axiosInstance.post(`/requestQuote`, requestDetails);
      toast.success(`You have successfully requested for quote`, toastOptions);
      setRerender((prev) => !prev);
    } catch (error: any) {
      console.log("error requesting for quote", error);

      promiseErrorFunction(error);
    } finally {
      setRequestLoading(false);
    }
  };

  return {
    requestQuote,
    requestLoading,
    rerenderr,
  };
};
