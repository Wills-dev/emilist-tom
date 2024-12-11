import { useContext, useState } from "react";

import { format, isToday, isYesterday, parseISO } from "date-fns";

import { ChatContext } from "@/utils/ChatState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages } = useContext(ChatContext);

  const getMessages = async (userId: string) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/chat/fetch-message/${userId}`);
      setMessages(data?.data?.messages || []);
    } catch (error) {
      console.log("error fetching chats of just a user", error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupMessagesByDate = (messages: any) => {
    const grouped: { [key: string]: any } = {};

    messages.forEach((message: any) => {
      // Parse the message date
      const messageDate = parseISO(message?.createdAt);

      let key: string;
      if (isToday(messageDate)) {
        key = "Today";
      } else if (isYesterday(messageDate)) {
        key = "Yesterday";
      } else {
        key = format(messageDate, "dd/MM/yyyy");
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(message);
    });

    return grouped;
  };

  return {
    getMessages,
    messages,
    isLoading,
    groupMessagesByDate,
  };
};
