import { useContext, useEffect } from "react";

import { ChatContext } from "@/utils/ChatState";
import { useSocketContext } from "@/utils/SocketContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useContext(ChatContext);

  const notificationSound = "/assets/sound/notification.mp3";

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    // Return a proper cleanup function
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
