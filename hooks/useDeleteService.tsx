import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDeleteService = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleDeleteService = async (expertId: string) => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(`/deleteexpert/${expertId}`);
      toast.success(`You have successfully deleted service `, toastOptions);
      router.push("/dashboard/job");
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
