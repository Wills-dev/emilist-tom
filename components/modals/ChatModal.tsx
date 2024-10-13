import Image from "next/image";

import { messages } from "@/constants/dummy";

type Props = {
  handleOpen: () => void;
};

const ChatModal = ({ handleOpen }: Props) => {
  return (
    <div className="absolute max-w-[280px] w-[280px] min-w-[260px] bg-white right-6 min-h-[50vh] max-h-[70vh] top-[15%]">
      <div className="px-4 py-2 max-sm:px-2 flex items-center justify-between border-b-[1px] border-[#8A8D8B]">
        <div className=" flex items-center gap-1">
          <Image
            src="/assets/dummyImages/profilePic.png"
            alt="menu"
            width={35}
            height={35}
            className="object-cover w-[35px] h-[35px] max-sm:w-[24px] max-sm:h-[24px] rounded-full"
          />
          <p className="text-[#303632] text-[16px] leading-[24px] font-[400] max-sm:text-[13px]">
            Toks Wale
          </p>
        </div>
        <button onClick={handleOpen} className="text-[18px] text text-zinc-400">
          x
        </button>
      </div>

      <div className="px-4 py-2 max-sm:px-2 flex flex-col  max-h-[50vh] max-xl:max-h-[45vh] overflow-y-scroll">
        {messages.map((day, index) => (
          <div className="w-full flex flex-col" key={index}>
            {day?.msg.map((msg, index) => (
              <div
                className={`${
                  msg.who === "sender" ? "justify-start" : "justify-end"
                } flex  py-5 `}
                key={index}
              >
                <div className="flex flex-col gap-4">
                  <div
                    className={`${
                      msg.who === "sender" ? "flex-row" : " flex-row-reverse"
                    } flex items-end`}
                  >
                    <Image
                      src="/assets/dummyImages/profilePic.png"
                      width={20}
                      height={20}
                      alt="search"
                      className="object-cover w-[20px] h-[20px] max-sm:w-[15px] max-sm:h-[15px] mb-2 rounded-full"
                    />
                    <div className={`flex flex-col`}>
                      <p
                        className={`${
                          msg.who === "sender"
                            ? " rounded-r-[23px]"
                            : " rounded-l-[23px]"
                        } bg-[#F6FDF9]  text-[#303632]  max-w-[225px] w-[225px]  p-4 rounded-t-[23px]  text-sm max-sm:text-xs max-sm:leading-[16px]`}
                      >
                        {msg.content[0]}
                      </p>
                      <p
                        className={`${
                          msg.who === "sender" ? "text-left" : "text-right"
                        } text-[#737774] text-[12px] leading-[18px] font-[400] max-sm:text-[10px] max-sm:leading-[16px] mt-1`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="px-4 py-2 max-sm:px-2">
        <div className="bg-[#ECECEC] rounded-full h-[40px] p-1 px-2 flex items-center">
          <Image
            src="/assets/icons/add-circle.svg"
            alt="menu"
            width={24}
            height={24}
            className="object-contain w-[24px] h-[24px] max-sm:w-[16px] max-sm:h-[16px] cursor-pointer"
            onClick={handleOpen}
          />
          <input
            type="text"
            className="outline-none flex-1 bg-transparent px-1 "
          />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
