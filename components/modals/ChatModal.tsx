import Image from "next/image";
import { useEffect, useRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import useListenMessages from "@/hooks/useListenMessages";

import { formatMessageDate } from "@/helpers";
import { useGetChat } from "@/hooks/useGetChat";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useSocketContext } from "@/utils/SocketContext";

type Props = {
  handleOpen: () => void;
  user: any;
};

const ChatModal = ({ handleOpen, user }: Props) => {
  const lastMessageRef: any = useRef(null);

  useListenMessages();
  const { onlineUsers } = useSocketContext();
  const { getMessages, messages, isLoading, groupMessagesByDate } =
    useGetChat();
  const { message, setMessage, handleSendMessage } = useSendMessage();

  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    if (lastMessageRef.current) {
      setTimeout(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    setTimeout;
    getMessages(user?._id);
  }, [user]);

  return (
    <div className="h-screen w-full absolute top-0 left-0 right-0 flex justify-end items-center ">
      <div className=" max-w-[280px] w-[280px] min-w-[260px] bg-white min-h-[60vh] max-h-[60vh] mr-6 flex flex-col relative">
        <div className="px-4 py-2 max-sm:px-2 flex items-center justify-between border-b-1 border-[#8A8D8B]">
          <div className=" flex items-center gap-1">
            <div
              className={`min-w-[35px] min-h-[35px]  w-[35px] h-[35px] max-sm:w-[24px] max-sm:h-[24px] ${
                onlineUsers.includes(user?._id) && "online"
              } avatar`}
            >
              {user?.profileImage ? (
                <Image
                  src={user?.profileImage}
                  alt="menu"
                  width={35}
                  height={35}
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <p className="w-[35px] h-[35px]  max-sm:w-[24px] max-sm:h-[24px] rounded-full bg-slate-200 mr-2 flex-c justify-center font-bold">
                  {user?.userName?.[0]?.toUpperCase()}
                </p>
              )}
            </div>
            <p className="max-sm:text-sm">
              {user?.fullName ? user?.fullName : user?.userName}
            </p>
          </div>
          <button
            onClick={handleOpen}
            className="text-[18px] text text-zinc-400"
          >
            x
          </button>
        </div>

        {isLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[40vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            {" "}
            <ScrollArea className="px-4 py-2 max-sm:px-2 flex flex-col flex-1 h-full overflow-y-auto">
              {!messages || messages?.length < 1 ? (
                <p className="text-xs text-primary-green">
                  Send a message to start conversation.
                </p>
              ) : (
                <>
                  {Object.keys(groupedMessages).map((dateKey, dateIndex) => (
                    <div key={dateKey} className="flex flex-col">
                      <div className=" text-center text-gray-500 text-sm my-2">
                        {dateKey}
                      </div>
                      {groupedMessages[dateKey]?.map(
                        (message: any, index: number) => {
                          const isLastMessage =
                            dateIndex ===
                              Object.keys(groupedMessages).length - 1 &&
                            index === groupedMessages[dateKey].length - 1;

                          const isSentByCurrentUser =
                            message?.senderId !== user?._id;
                          const shakeClass = message?.shouldShake
                            ? "shake"
                            : "";
                          return (
                            <div
                              className="w-full flex flex-col"
                              key={index}
                              ref={isLastMessage ? lastMessageRef : null}
                            >
                              <div
                                className={`${
                                  isSentByCurrentUser
                                    ? "chat-end"
                                    : "chat-start"
                                } chat`}
                                key={index}
                              >
                                <div
                                  className={`chat-bubble ${
                                    isSentByCurrentUser
                                      ? "bg-[#054753]  text-[#FCFEFD]"
                                      : "bg-[#ECECEC]  text-[#1d231f]"
                                  } ${shakeClass}`}
                                >
                                  {message?.content}
                                </div>
                                <div className="chat-footer opacity-50">
                                  <time className="text-[#3F556E] text-xs">
                                    {message?.createdAt &&
                                      formatMessageDate(message?.createdAt)}
                                  </time>{" "}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ))}
                </>
              )}
            </ScrollArea>
            <div className="px-4 py-2 max-sm:px-2">
              <form
                onSubmit={(e) => handleSendMessage(e, user?._id)}
                className="bg-[#ECECEC] rounded-full h-[40px] p-1 px-2 flex items-center"
              >
                <button type="submit">
                  {" "}
                  <Image
                    src="/assets/icons/add-circle.svg"
                    alt="menu"
                    width={24}
                    height={24}
                    className="object-contain w-[24px] h-[24px] max-sm:w-[16px] max-sm:h-[16px] cursor-pointer"
                  />
                </button>

                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="outline-none flex-1 bg-transparent px-1 "
                />
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatModal;
