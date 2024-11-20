"use client";

import { createContext, useState } from "react";

export const ChatContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const ChatState = ({ children }: Props) => {
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const value = {
    messages,
    setMessages,
    selectedConversation,
    setSelectedConversation,
  };

  return <ChatContext.Provider value={value}> {children}</ChatContext.Provider>;
};

export default ChatState;
