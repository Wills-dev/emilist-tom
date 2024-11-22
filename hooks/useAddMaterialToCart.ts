import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { CartContext } from "@/utils/CartState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useAddMaterialToCart = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { setCartRerender } = useContext(CartContext);
  const [cartLoading, setCartLoading] = useState(false);

  const addMaterialToCart = async (productId: string) => {
    setCartLoading(true);
    if (!currentUser) {
      router.push("/login");
    }
    try {
      const cartPayload = {
        quantity: 1,
        productId,
      };
      await axiosInstance.post(`/cart/add-to-cart`, cartPayload);

      toast.success("Material added to cart", toastOptions);
      setCartRerender((prev: boolean) => !prev);
    } catch (error: any) {
      console.log("error on add to cart", error);
      promiseErrorFunction(error);
    } finally {
      setCartLoading(false);
    }
  };

  return {
    addMaterialToCart,
    cartLoading,
  };
};
