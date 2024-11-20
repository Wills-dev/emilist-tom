import Image from "next/image";
import { useEffect, useRef } from "react";

import useListenMessages from "@/hooks/useListenMessages";

import { formatMessageDate } from "@/helpers";
import { useGetChat } from "@/hooks/useGetChat";
import { useSendMessage } from "@/hooks/useSendMessage";

type Props = {
  handleOpen: () => void;
  user: any;
};

const ChatModal = ({ handleOpen, user }: Props) => {
  const lastMessageRef: any = useRef(null);

  useListenMessages();
  const { getMessages, messages, isLoading } = useGetChat();
  const { message, setMessage, handleSendMessage } = useSendMessage();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    setTimeout;
    getMessages(user?._id);
  }, [user]);

  return (
    <div className="absolute max-w-[280px] w-[280px] min-w-[260px] bg-white right-6 min-h-[50vh] max-h-[70vh] top-[15%]">
      <div className="px-4 py-2 max-sm:px-2 flex items-center justify-between border-b-[1px] border-[#8A8D8B]">
        <div className=" flex items-center gap-1">
          {user?.profileImage ? (
            <Image
              src={user?.profileImage}
              alt="menu"
              width={35}
              height={35}
              className="object-cover w-[35px] h-[35px] max-sm:w-[24px] max-sm:h-[24px] rounded-full"
            />
          ) : (
            <p className="w-[35px] h-[35px] max-sm:w-24px] max-sm:h-[24px] rounded-full bg-slate-200 mr-2 flex-c justify-center font-bold">
              {user?.userName?.[0]?.toUpperCase()}
            </p>
          )}
          <p className="text-[#303632] text-[16px] leading-[24px] font-[400] max-sm:text-[13px]">
            {user?.fullName ? user?.fullName : user?.userName}
          </p>
        </div>
        <button onClick={handleOpen} className="text-[18px] text text-zinc-400">
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
          <div className="px-4 py-2 max-sm:px-2 flex flex-col  max-h-[50vh] max-xl:max-h-[45vh] overflow-y-scroll">
            {messages.map((message: any, index: number) => {
              const isSentByCurrentUser = message.senderId !== user?._id;
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
  );
};

export default ChatModal;
