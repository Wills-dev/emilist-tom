"use  client";

import AuthState from "@/utils/AuthState";
import CartState from "@/utils/CartState";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartState>
      <AuthState>{children}</AuthState>
    </CartState>
  );
};
