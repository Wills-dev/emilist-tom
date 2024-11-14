import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDeleteService = () => {
  const router = useRouter();

  const { currentUser, setRerender } = useContext(AuthContext);

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleDeleteService = async (expertId: string) => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(`/business/delete-business/${expertId}`);
      toast.success(`Business deleted!`, toastOptions);
      router.push("/dashboard/job");
      setRerender((prev: boolean) => !prev);
    } catch (error: any) {
      console.log("error deleting service", error);
      promiseErrorFunction(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };
  return {
    handleDeleteService,
    isDeleteLoading,
  };
};
