import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { CartContext } from "@/utils/CartState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useAddMaterialToCart = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { setCartRerender } = useContext(CartContext);
  const [cartLoading, setCartLoading] = useState(false);

  const addMaterialToCart = async (materialId: string) => {
    setCartLoading(true);
    if (!currentUser) {
      router.push("/login");
    }
    try {
      const cartPayload = {
        quantity: 1,
        material_id: materialId,
        user_id: currentUser.unique_id,
      };
      await axiosInstance.post(`/addToCart`, cartPayload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

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
