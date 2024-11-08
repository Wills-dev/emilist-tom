import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useRequestQuote = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [rerenderr, setRerender] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

  const requestQuote = async (jobId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }

    setRequestLoading(true);
    try {
      await axiosInstance.patch(`/jobs/request-for-quote/${jobId}`);
      toast.success(`You have requested for quote!`, toastOptions);
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
