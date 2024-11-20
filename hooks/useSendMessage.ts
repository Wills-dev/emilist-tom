import { useContext, useState } from "react";

import { ChatContext } from "@/utils/ChatState";
import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useSendMessage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  const { messages, setMessages, selectedConversation } =
    useContext(ChatContext);

  const handleSendMessage = async (e: any, userId: string) => {
    e.preventDefault();
    if (!message) return;
    setLoading(true);

    try {
      const { data } = await axiosInstance.post(
        `/chat/send-message/${userId}`,
        {
          content: message,
        }
      );
      setMessages([...messages, data?.data]);
      setRerender((prev) => !prev);
      setMessage("");
    } catch (error) {
      console.log("error sending message", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    message,
    setMessage,
    handleSendMessage,
    rerender,
  };
};
