"use  client";

import AuthState from "@/utils/AuthState";
import CartState from "@/utils/CartState";
import ChatState from "@/utils/ChatState";
import { SocketContextProvider } from "@/utils/SocketContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartState>
      <AuthState>
        <ChatState>
          <SocketContextProvider>{children}</SocketContextProvider>
        </ChatState>
      </AuthState>
    </CartState>
  );
};
