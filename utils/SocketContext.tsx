"use client";

import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

import { AuthContext } from "./AuthState";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: any;
}

type Props = {
  children: React.ReactNode;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export const SocketContextProvider = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>([]);

  useEffect(() => {
    if (currentUser) {
      const socketInstance = io("https://emilist-be-server.onrender.com", {
        query: {
          // sending Id of user logged in to the backend
          userId: currentUser?._id,
        },
      });
      setSocket(socketInstance);

      // Listen for online users
      socketInstance.on("getOnlineUsers", (users: any) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
