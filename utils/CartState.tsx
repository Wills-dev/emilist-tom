"use client";

import { createContext, useEffect, useState } from "react";

import { readAuthCookie } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

import UltimateLoadingUI from "@/components/UltimateLoadingPage/UltimateLoadingUI";

export const CartContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const CartState = ({ children }: Props) => {
  const token = readAuthCookie("sessionId");

  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartRerender, setCartRerender] = useState(false);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  const getCart = async () => {
    try {
      const { data } = await axiosInstance.get(`/cart/get-cart-items`);
      const totalQuantity = data?.data?.products.reduce(
        (sum: number, product: any) => sum + product.quantity,
        0
      );
      setTotalCartQuantity(totalQuantity);
      setCartItems(data?.data);
    } catch (error) {
      console.log("error getting cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getCart();
    } else {
      setLoading(false);
    }
  }, [cartRerender]);

  const value = {
    cartItems,
    setCartItems,
    totalCartQuantity,
    setCartRerender,
  };

  return (
    <CartContext.Provider value={value}>
      {loading ? <UltimateLoadingUI /> : children}
    </CartContext.Provider>
  );
};

export default CartState;
