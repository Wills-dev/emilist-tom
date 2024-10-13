import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { toastOptions } from "@/helpers";

import { AuthContext } from "@/utils/AuthState";
import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useSaveMaterials = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(true);
  const router = useRouter();

  const handleSaveMaterial = async (materialId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    try {
      setLoading(true);
      await axiosInstance.post(
        `/save-material?user_id=${currentUser?.unique_id}&material_id=${materialId}`
      );
      toast.success(`You have successfully saved this material `, toastOptions);
      setRerender((prev) => !prev);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error saving material", error);
      promiseErrorFunction(error);
    }
  };
  return {
    isLoading,
    handleSaveMaterial,
    rerender,
  };
};
