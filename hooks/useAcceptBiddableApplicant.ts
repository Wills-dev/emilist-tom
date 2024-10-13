import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useAcceptBiddableApplicant = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [acceptRerender, setRerender] = useState(false);
  const [loadingAccept, setLoadingAceept] = useState(false);

  const acceptBiddableApplicant = async (
    applicantId: string,
    jobId: string
  ) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setLoadingAceept(true);
    try {
      const acceptDetails = {
        applicantId,
        jobId,
      };
      await axiosInstance.post(`/acceptBiddableJob`, acceptDetails);
      toast.success(
        `You have successfully accepted this applicant`,
        toastOptions
      );
      setRerender((prev) => !prev);
    } catch (error: any) {
      console.log("error accepting biddable applicant", error);
      promiseErrorFunction(error);
    } finally {
      setLoadingAceept(false);
    }
  };
  return {
    acceptBiddableApplicant,
    loadingAccept,
    acceptRerender,
  };
};
