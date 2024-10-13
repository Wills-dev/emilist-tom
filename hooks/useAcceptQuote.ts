import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useAcceptQuote = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [acceptQuoteRerender, setRerender] = useState(false);
  const [loadingAcceptQuote, setLoadingAceeptQuote] = useState(false);

  const acceptQuote = async (applicantId: string, jobId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setLoadingAceeptQuote(true);
    try {
      const acceptQuotePayload = {
        applicantId,
        jobId,
      };

      await axiosInstance.post(`/acceptQuote`, acceptQuotePayload);
      toast.success(`Quote accepted successfully`, toastOptions);
      setLoadingAceeptQuote(false);
      setRerender((prev) => !prev);
    } catch (error: any) {
      console.log("error accepting quote", error);
      setLoadingAceeptQuote(false);
      promiseErrorFunction(error);
    }
  };
  return {
    acceptQuote,
    loadingAcceptQuote,
    acceptQuoteRerender,
  };
};
