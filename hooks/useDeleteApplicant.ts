import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDeleteApplicant = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [removeRerender, setRerender] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);

  const removeApplicant = async (applicantId: string, jobId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setLoadingRemove(true);
    try {
      const removeDetails = {
        applicantId,
        userId: currentUser.unique_id,
      };
      await axiosInstance.post(`/deleteApplication/${jobId}`, removeDetails);
      toast.success(
        `You have successfully accepted this applicant`,
        toastOptions
      );
      setRerender((prev) => !prev);
    } catch (error: any) {
      console.log("error deleting applicant from job", error);
      promiseErrorFunction(error);
    } finally {
      setLoadingRemove(false);
    }
  };
  return {
    removeApplicant,
    loadingRemove,
    removeRerender,
  };
};
