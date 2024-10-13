import { useContext } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { clearAuthClear, toastOptions } from "@/helpers";

export const useLogout = () => {
  const router = useRouter();
  const { setCurrentUser } = useContext(AuthContext);

  const logout = () => {
    clearAuthClear("emilistUser");
    clearAuthClear("authToken");
    clearAuthClear("sessionId");
    setCurrentUser(null);
    toast.success("Logout successful!", toastOptions);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };
  return {
    logout,
  };
};
