import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { CartContext } from "@/utils/CartState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useDecreaseCartItem = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { setCartRerender } = useContext(CartContext);

  const [decreaseLoading, setDecreaseLoading] = useState(false);

  const decreaseCartQuantity = async (productId: string) => {
    setDecreaseLoading(true);
    if (!currentUser) {
      router.push("/login");
    }
    try {
      await axiosInstance.patch(`/cart/reduce-quantity/${productId}`);
      toast.success("Quantity updated", toastOptions);
      setCartRerender((prev: boolean) => !prev);
    } catch (error: any) {
      console.log("error on add to cart", error);
      promiseErrorFunction(error);
    } finally {
      setDecreaseLoading(false);
    }
  };

  return {
    decreaseCartQuantity,
    decreaseLoading,
  };
};
