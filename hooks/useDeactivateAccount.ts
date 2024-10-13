import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDeactivateAccount = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [load, setLoad] = useState(false);

  const handleDeactivate = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    const userId = currentUser.unique_id;
    try {
      await axiosInstance.post(
        `/deactivateAccount`,
        {
          user_id: userId,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      toast.success(`Acccount deactivated successfully`, toastOptions);
    } catch (error: any) {
      console.error("error deactivating account", error);
      promiseErrorFunction(error);
    } finally {
      setLoad(false);
    }
  };

  return {
    load,
    handleDeactivate,
  };
};
