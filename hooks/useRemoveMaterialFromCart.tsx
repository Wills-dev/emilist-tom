import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { CartContext } from "@/utils/CartState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useRemoveMaterialFromCart = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { setCartRerender } = useContext(CartContext);
  const [deleteCartLoading, setDeleteCartLoading] = useState(false);

  const deleteMaterialFromCart = async (productId: string) => {
    setDeleteCartLoading(true);
    if (!currentUser) {
      router.push("/login");
    }
    try {
      await axiosInstance.patch(`/cart/remove-from-cart/${productId}`);
      toast.success("Material deleted from cart", toastOptions);
      setCartRerender((prev: boolean) => !prev);
    } catch (error: any) {
      console.log("error removing material from cart", error);
      promiseErrorFunction(error);
    } finally {
      setDeleteCartLoading(false);
    }
  };

  return {
    deleteMaterialFromCart,
    deleteCartLoading,
  };
};
