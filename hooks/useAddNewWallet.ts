import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { promiseErrorFunction, toastOptions } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { AuthContext } from "@/utils/AuthState";

export const useAddNewWallet = () => {
  const { currentUser, setRerender } = useContext(AuthContext);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [isDefault, setDefault] = useState(false);

  const handleSubmit = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    if (!currency) {
      toast.error("Please select a currency", toastOptions);
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        currency,
        isDefault,
      };
      await axiosInstance.post(`/wallet/create-wallet`, payload);
      toast.success("Wallet successfully added.", toastOptions);
      setRerender((prev: boolean) => !prev);
    } catch (error) {
      console.log("error creating wallet", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isDefault,
    setDefault,
    currency,
    setCurrency,
    isLoading,
    handleSubmit,
  };
};
