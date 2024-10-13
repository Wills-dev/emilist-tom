import Image from "next/image";

import { motion } from "framer-motion";

const NotificationDropdown = () => {
  const messages = [1, 2, 3, 4, 5];
  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      exit={{ y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute max-w-[400px] w-[400px] min-w-[300px] bg-white -right-full h-[85svh] max-h-[85svh] top-full overflow-y-hidden shadow border-1"
    >
      <h2 className="text-xl font-bold max-sm:text-lg px-6 max-md:px-3 py-6">
        Notification
      </h2>
      <div className="h-[74svh] max-h-[74svh] overflow-y-scroll">
        <div className="flex-c-b px-6 max-md:px-3 bg-[#F2F4F7] py-2 border-b-1 border-[#DEE5ED]">
          <h6 className="text-xs font-medium">Today</h6>
          <button className="text-sm text-primary-green font-medium uppercase">
            CLEAR
          </button>
        </div>
        <div className=" flex flex-col  ">
          {messages.slice(0, 3).map((msg, index) => (
            <div
              key={index}
              className="flex gap-2 border-b-1 border-[#CBD5E1] px-6 max-md:px-3 py-3"
            >
              <Image
                src="/assets/dummyImages/profilePic.png"
                width={25}
                height={25}
                alt="search"
                className="object-cover w-[25px] h-[25px] max-sm:w-[20px] max-sm:h-[20px] rounded-full"
              />
              <div className="flex-1">
                <div className="flex-c-b w-full mb-2">
                  <h6 className="font-bold max-sm:text-sm ">
                    Simisola Adeking
                  </h6>
                  <p className="text-[#737774] text-xs  max-sm:text-[8px]">
                    1h ago
                  </p>
                </div>
                <p className="text-[#737774] text-sm  max-sm:text-xs  ">
                  Lörem ipsum presk Lovisa Jonsson vinterkräksjuka.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-c-b px-6 max-md:px-3 bg-[#F2F4F7] py-2 border-b-1 border-[#DEE5ED]">
          <h6 className="text-xs font-bold  max-sm:text-[10px] ">Last Week</h6>
          <button className="text-xs text-primary-green font-bold max-sm:text-[10px] uppercase">
            CLEAR
          </button>
        </div>
        <div className=" flex flex-col   ">
          {messages.slice(0, 2).map((msg, index) => (
            <div
              key={index}
              className="flex gap-2 border-b-1 border-[#CBD5E1] px-6 max-md:px-3 py-3"
            >
              <Image
                src="/assets/dummyImages/profilePic.png"
                width={25}
                height={25}
                alt="search"
                className="object-cover w-[25px] h-[25px] max-sm:w-[20px] max-sm:h-[20px] rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between w-full items-center mb-2">
                  <h6 className="font-bold max-sm:text-sm ">
                    Simisola Adeking
                  </h6>
                  <p className="text-[#737774] text-xs  font-[400] max-sm:text-[8px]">
                    1h ago
                  </p>
                </div>
                <p className="text-[#737774] text-sm max-sm:text-xs  ">
                  Lörem ipsum presk Lovisa Jonsson vinterkräksjuka.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-6 max-md:px-3 bg-[#F2F4F7] py-2 border-b-1 border-[#DEE5ED]">
          <h6 className="text-xs font-bold  max-sm:text-[10px] ">
            2 Weeks Ago
          </h6>
          <button className="text-xs text-primary-green font-bold max-sm:text-[10px] uppercase">
            CLEAR
          </button>
        </div>
        <div className=" flex flex-col   ">
          {messages.slice(0, 1).map((msg, index) => (
            <div
              key={index}
              className="flex gap-2 border-b-1 border-[#CBD5E1] px-6 max-md:px-3 py-3"
            >
              <Image
                src="/assets/dummyImages/profilePic.png"
                width={25}
                height={25}
                alt="search"
                className="object-cover w-[25px] h-[25px] max-sm:w-[20px] max-sm:h-[20px] rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between w-full items-center mb-2">
                  <h6 className="font-bold max-sm:text-sm ">
                    Simisola Adeking
                  </h6>
                  <p className="text-[#737774] text-xs max-sm:text-[8px]">
                    1h ago
                  </p>
                </div>
                <p className="text-[#737774] text-sm  max-sm:text-xs">
                  Lörem ipsum presk Lovisa Jonsson vinterkräksjuka.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-c-b px-6 max-md:px-3 bg-[#F2F4F7] py-2 border-b-1 border-[#DEE5ED]">
          <h6 className="text-xs font-bold  max-sm:text-[10px] ">
            3 Weeks Ago
          </h6>
          <button className="text-xs text-primary-green font-bold max-sm:text-[10px] uppercase">
            CLEAR
          </button>
        </div>
        <div className=" flex flex-col   ">
          {messages.slice(0, 1).map((msg, index) => (
            <div
              key={index}
              className="flex gap-2 border-b-1 border-[#CBD5E1] px-6 max-md:px-3 py-3"
            >
              <Image
                src="/assets/dummyImages/profilePic.png"
                width={25}
                height={25}
                alt="search"
                className="object-cover w-[25px] h-[25px] max-sm:w-[20px] max-sm:h-[20px] rounded-full"
              />
              <div className="flex-1">
                <div className="flex-c-b w-full mb-2">
                  <h6 className="font-bold max-sm:text-sm ">
                    Simisola Adeking
                  </h6>
                  <p className="text-[#737774] text-xs  max-sm:text-[8px]">
                    1h ago
                  </p>
                </div>
                <p className="text-[#737774] text-sm max-sm:text-xs">
                  Lörem ipsum presk Lovisa Jonsson vinterkräksjuka.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationDropdown;
