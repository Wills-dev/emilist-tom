"use client";

import { createContext, useEffect, useState } from "react";

import { readAuthCookie } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrl";

import UltimateLoadingUI from "@/components/UltimateLoadingPage/UltimateLoadingUI";

export const CartContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const CartState = ({ children }: Props) => {
  const user = readAuthCookie("emilistUser");

  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartRerender, setCartRerender] = useState(false);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  const getCart = async () => {
    const userId = user.unique_id;
    try {
      const data = await axiosInstance.get(`/fetchCart/${userId}`);
      setTotalCartQuantity(data?.data?.totalQuantity);
      setCartItems(data?.data);
    } catch (error) {
      console.log("error getting cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
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
