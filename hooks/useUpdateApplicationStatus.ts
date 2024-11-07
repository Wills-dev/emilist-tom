import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useUpdateApplicationStatus = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [acceptRerender, setRerender] = useState(false);
  const [loadingAccept, setLoadingAceept] = useState(false);

  const updateApplicationStatus = async (
    applicationId: string,
    status: string
  ) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setLoadingAceept(true);
    try {
      const acceptDetails = {
        status,
      };

      await axiosInstance.patch(
        `/jobs/update-application-status/${applicationId}`,
        acceptDetails
      );
      toast.success(`Successful!`, toastOptions);
      setRerender((prev) => !prev);
    } catch (error: any) {
      console.log("error accepting regular job application", error);
      promiseErrorFunction(error);
    } finally {
      setLoadingAceept(false);
    }
  };
  return {
    updateApplicationStatus,
    loadingAccept,
    acceptRerender,
  };
};
