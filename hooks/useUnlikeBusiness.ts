import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/utils/AuthState";
import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useUnlikeBusiness = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoad, setIsLoading] = useState<boolean>(false);
  const [unsaveRerenderr, setRerenderr] = useState<boolean>(true);
  const router = useRouter();

  const handleUnlikeBusiness = async (businessId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    try {
      setIsLoading(true);
      await axiosInstance.patch(`/business/unlike-business/${businessId}`);
      // toast.success(`You have successfully unsaved this job `, toastOptions);
      setRerenderr((prev) => !prev);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log("error unsaving job", error);
      promiseErrorFunction(error);
    }
  };
  return {
    isLoad,
    handleUnlikeBusiness,
    unsaveRerenderr,
  };
};
