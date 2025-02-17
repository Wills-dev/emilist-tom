import Image from "next/image";
import { useEffect, useRef } from "react";

import { Modal } from "antd";
import { ScrollArea } from "@/components/ui/scroll-area";

import useListenMessages from "@/hooks/useListenMessages";

import { formatMessageDate } from "@/helpers";
import { useGetChat } from "@/hooks/useGetChat";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useSocketContext } from "@/utils/SocketContext";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  user: any;
};

const ContactModal = ({ isOpen, onCancel, user }: Props) => {
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
    <Modal open={isOpen} onCancel={onCancel} centered width={740} footer={null}>
      <div className="w-full  py-4 max-sm:py-3 ">
        <div className="flex justify-between items-center px-3 max-sm:px-2 border-b-[1px] border-[#A2A4A2] pb-5">
          <div className=" flex items-center gap-3 max-sm:gap-1">
            <div className="relative  w-[88px] h-[88px] max-sm:w-[35px] max-sm:h-[35px] ">
              {user?.profileImage ? (
                <Image
                  src={user?.profileImage}
                  alt="menu"
                  width={88}
                  height={88}
                  className="object-cover rounded-full min-h-full max-h-full min-w-full max-w-full"
                />
              ) : (
                <p className="w-[88px] h-[88px] max-sm:w-[35px] max-sm:h-[35px] rounded-full bg-slate-200 mr-2 flex-c justify-center font-bold">
                  {user?.userName?.[0]?.toUpperCase()}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 max-sm:gap-0">
              <p className=" sm:text-xl font-semibold">
                {user?.fullName ? user?.fullName : user?.userName}
              </p>
              {onlineUsers.includes(user?._id) && (
                <p className="text-[#5E625F] max-sm:text-sm">Online</p>
              )}
            </div>
          </div>

          {/* <div className="flex items-center gap-6 max-sm:gap-3 ">
            <button className="  rounded-full flex justify-center items-center contact-phone">
              <Image
                src="/assets/icons/call.svg"
                alt="menu"
                width={20}
                height={20}
                className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
              />
            </button>
            <Image
              src="/assets/icons/close-square2.svg"
              alt="menu"
              width={20}
              height={20}
              className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] cursor-pointer"
              onClick={onCancel}
            />
          </div> */}
        </div>
        {isLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[40vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="w-full px-3 max-sm:px-2">
              <ScrollArea className="px-4 py-2 max-sm:px-2 flex flex-col flex-1 max-h-[60vh] h-[60vh] min-h-[60vh] overflow-y-auto">
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
            </div>
            <form
              onSubmit={(e) => handleSendMessage(e, user?._id)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {" "}
                <div className="flex items-center">
                  <label htmlFor="smiley">
                    <Image
                      src="/assets/icons/emoji-happy.svg"
                      width={15}
                      height={15}
                      alt="search"
                      className="object-contain w-6 h-6 cursor-pointer"
                    />
                  </label>
                  <input
                    style={{ fontSize: "16px" }}
                    type="file"
                    id="smiley"
                    className="invisible h-0 w-0"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="smiley">
                    <Image
                      src="/assets/icons/attach-square.svg"
                      width={15}
                      height={15}
                      alt="search"
                      className="object-contain w-6 h-6 cursor-pointer"
                    />
                  </label>
                  <input
                    style={{ fontSize: "16px" }}
                    type="file"
                    id="smiley"
                    className="invisible h-0 w-0"
                  />
                </div>
              </div>
              <div className="flex-1 px-3 max-sm:px-2 ">
                <input
                  style={{ fontSize: "16px" }}
                  type="text"
                  placeholder="Type your message here...."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="outline-none flex-1 bg-transparent px-1 "
                />
              </div>
              <button
                type="submit"
                className="flex items-center bg-primary-green text-[#FCFEFD] py-3 px-6 rounded-[10px] whitespace-nowrap max-sm:px-4"
              >
                Send Message
              </button>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ContactModal;
