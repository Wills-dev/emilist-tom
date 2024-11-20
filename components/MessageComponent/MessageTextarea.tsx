import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";

import MessageEmptyState from "./MessageEmptyState";

import { AuthContext } from "@/utils/AuthState";
import { useGetChat } from "@/hooks/useGetChat";
import { ChatContext } from "@/utils/ChatState";
import { formatMessageDate } from "@/helpers";
import useListenMessages from "@/hooks/useListenMessages";

interface MessageTextareaProps {
  loading: boolean;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent, userId: string) => Promise<void>;
}

const MessageTextarea = ({
  loading,
  message,
  setMessage,
  handleSendMessage,
}: MessageTextareaProps) => {
  const lastMessageRef: any = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const { getMessages, messages, isLoading } = useGetChat();
  const { selectedConversation, setSelectedConversation } =
    useContext(ChatContext);

  useListenMessages();

  const currentUserId = currentUser?._id;

  useEffect(() => {
    //clean up (unmount)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    setTimeout;
    getMessages(isReceiver?._id);
  }, [selectedConversation]);

  const isReceiver = selectedConversation?.participants?.find(
    (participant: any) => participant?._id !== currentUser?._id
  );

  return (
    <>
      {!selectedConversation ? (
        <MessageEmptyState />
      ) : (
        <div className="">
          {" "}
          {selectedConversation?.participants
            ?.filter((participant: any) => participant._id !== currentUserId)
            .map((participant: any) => (
              <div
                className="w-full border-b-1  border-[#DEE5ED] flex items-center gap-2 px-6 max-md:px-3 py-3 "
                key={participant?._id}
              >
                {participant.profileImage ? (
                  <Image
                    src={participant.profileImage}
                    alt={participant.fullName || participant.userName}
                    width={40}
                    height={40}
                    className="object-cover w-[40px] h-[40px] max-sm:w-[35px] max-sm:h-[35px] rounded-full"
                  />
                ) : (
                  <p className="w-[40px] h-[40px] max-sm:w-[35px] max-sm:h-[35px] rounded-full bg-slate-200 flex items-center justify-center font-bold">
                    {participant.fullName
                      ? participant.fullName[0].toUpperCase()
                      : participant.userName[0].toUpperCase()}
                  </p>
                )}
                <h6 className="sm:text-lg font-bold ">
                  {participant.fullName || participant.userName}
                </h6>
              </div>
            ))}
          {isLoading ? (
            <div className="flex item-center justify-center text-green-500 mt-6 h-[40vh]">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            <>
              <div className=" h-[62svh] overflow-y-scroll w-full  px-6 max-md:px-3 pt-3 pb-8">
                {messages.map((message: any, index: number) => {
                  const isSentByCurrentUser =
                    message.senderId === currentUserId;
                  const shakeClass = message?.shouldShake ? "shake" : "";
                  return (
                    <div
                      className="w-full flex flex-col"
                      key={index}
                      ref={lastMessageRef}
                    >
                      <div
                        className={`${
                          isSentByCurrentUser ? "chat-end" : "chat-start"
                        } chat`}
                        key={index}
                      >
                        <div
                          className={`chat-bubble ${
                            isSentByCurrentUser
                              ? "bg-[#054753]  text-[#FCFEFD]"
                              : "bg-[#ECECEC]  text-[#303632]"
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
                })}
              </div>
              <form
                onSubmit={(e) => handleSendMessage(e, isReceiver?._id)}
                className="w-full flex items-center px-6 max-md:px-3 gap-4 absolute bottom-0 left-0 right-0 bg-white py-2"
              >
                <div className="flex-1 flex bg-[#ECECEC] rounded-full items-center h-[40px] px-6 gap-2">
                  <div className="flex items-center">
                    <label htmlFor="smiley">
                      <Image
                        src="/assets/icons/emoji-happy.svg"
                        width={15}
                        height={15}
                        alt="search"
                        className="object-contain w-[16px] h-[16px] cursor-pointer"
                      />
                    </label>
                    <input
                      type="file"
                      id="smiley"
                      className="invisible h-[1px] w-[1px]"
                    />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="smiley">
                      <Image
                        src="/assets/icons/attach-square.svg"
                        width={15}
                        height={15}
                        alt="search"
                        className="object-contain w-[16px] h-[16px] cursor-pointer"
                      />
                    </label>
                    <input
                      type="file"
                      id="smiley"
                      className="invisible h-[1px] w-[1px]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Type your message"
                    className="flex-1 bg-transparent outline-none text-[#303632] text-[14px] ml-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                {loading ? (
                  <button type="button">
                    <span className="loading loading-spinner loading-xs"></span>
                  </button>
                ) : (
                  <button type="submit">
                    <Image
                      src="/assets/icons/Paper airplane.svg"
                      width={15}
                      height={15}
                      alt="search"
                      className="object-contain w-[16px] h-[16px] cursor-pointer"
                    />
                  </button>
                )}
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MessageTextarea;
