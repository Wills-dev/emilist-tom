import { useState } from "react";

import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useVerifyPaymentStatus = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<null | boolean>(null);

  const verifyPaymentStatus = async (referenceId: string) => {
    try {
      const { data } = await axiosInstance.get(
        `/wallet/verify-paystack/${referenceId}`
      );

      if (data?.data === "Wallet funded successfully") {
        setStatus(true);
      }
    } catch (error) {
      console.log("error verifying payment status", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    status,
    verifyPaymentStatus,
  };
};
