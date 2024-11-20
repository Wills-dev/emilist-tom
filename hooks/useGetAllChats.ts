import { useState } from "react";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetAllChats = () => {
  const [isLoading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const getAllCoversations = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/chat/fetch-all-chat`);
      setConversations(data?.data);
    } catch (error) {
      console.log("error fetching all user conversations", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    conversations,
    isLoading,
    getAllCoversations,
  };
};
