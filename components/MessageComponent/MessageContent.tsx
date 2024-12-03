"use client";

import Image from "next/image";
import React, { useContext, useEffect } from "react";

import MessageTextarea from "./MessageTextarea";
import { ScrollArea } from "../ui/scroll-area";

import { useGetAllChats } from "@/hooks/useGetAllChats";
import { formatCreatedAt } from "@/helpers";
import { ChatContext } from "@/utils/ChatState";
import { AuthContext } from "@/utils/AuthState";
import { useSocketContext } from "@/utils/SocketContext";
import { useSendMessage } from "@/hooks/useSendMessage";
import MessageSkeleton from "../Skeleton/MessageSkeleton";

const MessageContent = () => {
  const { currentUser } = useContext(AuthContext);
  const { conversations, isLoading, getAllCoversations } = useGetAllChats();
  const { selectedConversation, setSelectedConversation } =
    useContext(ChatContext);
  const { loading, message, setMessage, handleSendMessage } = useSendMessage();
  const { onlineUsers } = useSocketContext();

  const currentUserId = currentUser?._id;

  useEffect(() => {
    getAllCoversations();
  }, []);

  return (
    <section className="padding-x py-28 ">
      <div className="border-1 border-[#DEE5ED]  grid grid-cols-3 h-[80svh] overflow-y-hidden">
        <ScrollArea className="col-span-1 max-lg:col-span-3 py-8  border-r-1  border-[#DEE5ED] h-full overflow-y-auto max-w-full w-full">
          <div className="flex items-center gap-4 px-6 max-md:px-3">
            <h4 className="sm:text-lg font-semibold">Inbox</h4>
          </div>
          <div className="px-6 max-md:px-3">
            <div className="flex my-5 items-center border-1 border-[#CBD5E1] bg-[#FAFAFA] rounded-[4.65px] px-2 h-[40px] focus-within:border-primary-green">
              <Image
                src="/assets/icons/search-icon.svg"
                width={20}
                height={20}
                alt="search"
                className="object-contain w-[20px] h-[20px] max-sm:w-[16px] max-sm:h-[16px]"
              />
              <input
                type="text"
                placeholder="search"
                className="pl-2  bg-transparent w-[90%] outline-none text-[#304155] text-[14px] font-[600] max-sm:text-[12px]"
              />
            </div>
          </div>

          <div className="flex flex-col my-3 mb-6 w-full overflow-hidden">
            {isLoading ? (
              <MessageSkeleton />
            ) : (
              <>
                {conversations.map((conversation: any, index) => {
                  const isReceiver = conversation?.participants?.find(
                    (participant: any) => participant?._id !== currentUser?._id
                  );
                  return (
                    <div
                      key={index}
                      className={`w-full px-6 max-md:px-3 py-3 hover:bg-slate-50 duration-300 transition-all cursor-pointer ${
                        conversations.length - 1 !== index &&
                        "border-[#CBD5E1] border-b"
                      } ${
                        selectedConversation?.chatId === conversation?.chatId &&
                        "bg-slate-100"
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      {conversation?.participants
                        ?.filter(
                          (participant: any) =>
                            participant._id !== currentUserId
                        )
                        .map((participant: any, index: number) => (
                          <div className="flex gap-2 w-full" key={index}>
                            <div
                              className={`${
                                onlineUsers.includes(isReceiver?._id) &&
                                "online"
                              } avatar`}
                            >
                              {participant.profileImage ? (
                                <Image
                                  src={participant.profileImage}
                                  alt={
                                    participant.fullName || participant.userName
                                  }
                                  width={40}
                                  height={40}
                                  className={`object-cover w-[40px] h-[40px] max-sm:w-[35px] max-sm:h-[35px] rounded-full `}
                                />
                              ) : (
                                <p className="w-[40px] h-[40px] max-sm:w-[35px] max-sm:h-[35px] rounded-full bg-slate-200 flex items-center justify-center font-bold">
                                  {participant.fullName
                                    ? participant.fullName[0].toUpperCase()
                                    : participant.userName[0].toUpperCase()}
                                </p>
                              )}
                            </div>
                            <div className="flex-1 flex flex-col w-full">
                              <div className="flex justify-between w-full items-center mb-2">
                                <h6 className="font-[700] max-sm:text-[13px] truncate">
                                  {participant.fullName || participant.userName}
                                </h6>
                                <p className="text-[#737774] text-xs max-sm:text-[8px]">
                                  {formatCreatedAt(
                                    conversation?.lastMessage?.createdAt
                                  )}{" "}
                                </p>
                              </div>
                              <p className="text-[#737774] text-sm max-sm:text-xs truncate w-full">
                                {conversation?.lastMessage?.content?.length > 30
                                  ? `${conversation?.lastMessage?.content.slice(
                                      0,
                                      30
                                    )}...`
                                  : conversation?.lastMessage?.content}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </ScrollArea>
        <div className="col-span-2 max-lg:hidden h-full relative">
          <MessageTextarea
            loading={loading}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </section>
  );
};

export default MessageContent;
