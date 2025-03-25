import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { CartContext } from "@/utils/CartState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useCheckoutCart = () => {
  const router = useRouter();
  const { setCartRerender } = useContext(CartContext);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("");

  const onCancel = () => {
    setOpen(false);
  };

  const handleCheckout = async (code?: string) => {
    setIsLoading(true);
    const payload = code ? { code } : {};
    try {
      await axiosInstance.post(`/cart/checkout`, payload);
      // toast.success("Order plcaed", toastOptions);
      setOpen(true);
    } catch (error) {
      console.log("error checking out", error);
      promiseErrorFunction(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderPayment = async (cartId: string) => {
    if (!paymentMethod) {
      toast.error("Please select payment method", toastOptions);
      return;
    }
    if (!currency) {
      toast.error("Please select currency", toastOptions);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        cartId,
        paymentMethod,
        currency,
      };

      const { data } = await axiosInstance.post(
        `/material/pay-for-product`,
        payload
      );

      const { paymentLink } = data?.data;
      if (payload.paymentMethod === "Card" && paymentLink) {
        router.push(paymentLink);
      }

      if (payload.paymentMethod === "Wallet" && data?.message === "success") {
        router.push(
          "https://emilist-tom.netlify.app/status?status=success"
        );
      }
      setOpen(false);
      setCurrency("");
      setPaymentMethod("");
      setLoading(false);
    } catch (error) {
      console.log("error initiating order payment", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    handleCheckout,
    open,
    onCancel,
    handleOrderPayment,
    currency,
    setCurrency,
    loading,
    paymentMethod,
    setPaymentMethod,
  };
};
