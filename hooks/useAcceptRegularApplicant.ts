import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";

import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useAcceptRegularApplicant = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [acceptRerender, setRerender] = useState(false);
  const [loadingAccept, setLoadingAceept] = useState(false);

  const acceptRegularApplicant = async (applicantId: string, jobId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setLoadingAceept(true);
    try {
      const acceptDetails = {
        applicantId,
        jobId,
      };
      await axiosInstance.post(`/acceptRegularJob`, acceptDetails);
      toast.success(`Applicant accepted successfully`, toastOptions);
      setRerender((prev) => !prev);
    } catch (error: any) {
      console.log("error accepting regular job application", error);
      promiseErrorFunction(error);
    } finally {
      setLoadingAceept(false);
    }
  };
  return {
    acceptRegularApplicant,
    loadingAccept,
    acceptRerender,
  };
};
