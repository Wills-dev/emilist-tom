import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDeleteMaterial = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleDeleteMaterial = async (materialId: string) => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(`/material/delete-product/${materialId}`);
      toast.success(`Material deleted. `, toastOptions);
      router.push("/dashboard/material/my-listed-materials");
    } catch (error: any) {
      console.log("error deleting material", error);
      promiseErrorFunction(error);
    } finally {
      setIsDeleteLoading(false);
    }
    `  `;
  };
  return {
    handleDeleteMaterial,
    isDeleteLoading,
  };
};
