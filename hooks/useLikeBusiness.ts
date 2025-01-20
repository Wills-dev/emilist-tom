import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { promiseErrorFunction } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useLikeBusiness = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(true);
  const router = useRouter();

  const handleLikeBusiness = async (businessId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    try {
      setLoading(true);
      await axiosInstance.patch(`/business/like-business/${businessId}`);
      // toast.success(`You have successfully saved this job `, toastOptions);
      setRerender((prev) => !prev);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error saving job", error);
      promiseErrorFunction(error);
    }
  };
  return {
    isLoading,
    handleLikeBusiness,
    rerender,
  };
};
