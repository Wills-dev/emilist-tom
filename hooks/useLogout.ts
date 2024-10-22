import { useContext } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { clearAuthClear, toastOptions } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useLogout = () => {
  const router = useRouter();
  const { setCurrentUser } = useContext(AuthContext);

  const logout = async () => {
    try {
      await axiosInstance.get(`/auth/log-out`);
      clearAuthClear("sessionId");
      setCurrentUser(null);
      toast.success("Logout successful!", toastOptions);
      router.push("/");
    } catch (error) {
      console.log("error logging out", error);
    }
  };
  return {
    logout,
  };
};
