import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useInviteUsers = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleInviteUser = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setIsLoading(true);
    try {
      await axiosInstance.get(`/auth/invite-user?email=${email}`);
      toast.success("Invite sent successfully", toastOptions);
      setEmail("");
    } catch (error) {
      console.log("error inviting user", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleInviteUser,
    isLoading,
    email,
    setEmail,
  };
};
