import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { CartContext } from "@/utils/CartState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

interface CartPayloadType {
  material_id: string;
  user_id: string;
}

export const useRemoveMaterialFromCart = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { setCartRerender } = useContext(CartContext);
  const [deleteCartLoading, setDeleteCartLoading] = useState(false);

  const deleteMaterialFromCart = async (materialId: string) => {
    setDeleteCartLoading(true);
    if (!currentUser) {
      router.push("/login");
    }
    try {
      const deleteCartPayload: CartPayloadType = {
        material_id: materialId,
        user_id: currentUser.unique_id,
      };
      await axiosInstance.delete(`/deleteCart`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: deleteCartPayload,
      });

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
