import Image from "next/image";

import { motion } from "framer-motion";

import { ScrollArea } from "../ui/scroll-area";
import { useGetNotification } from "@/hooks/useGetNotification";
import { formatCreatedAt } from "@/helpers";

const NotificationDropdown = () => {
  const { isLoading, notifications, groupNotificationsByDate } =
    useGetNotification();

  const groupNotification = groupNotificationsByDate();

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      exit={{ y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute max-w-[400px] w-[400px] min-w-[300px] bg-white -right-full max-h-[85svh] top-full overflow-y-hidden shadow border-1"
    >
      <div className=""></div>
      <h2 className="text-xl font-bold max-sm:text-lg px-6 max-md:px-3 py-6">
        Notification
      </h2>
      <ScrollArea className="max-h-[74svh] overflow-y-auto pb-2">
        {isLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            {notifications?.length < 1 ? (
              <p className="py-8 px-6 text-gray-400 text-sm">
                You don't have any new notification
              </p>
            ) : (
              <>
                {Object.keys(groupNotification).map((dateKey) => (
                  <div className="flex flex-col" key={dateKey}>
                    <div className="flex-c-b px-6 max-md:px-3 bg-[#F2F4F7] py-2 border-b-1 border-[#DEE5ED]">
                      <h6 className="text-xs font-medium">{dateKey} </h6>
                    </div>
                    <div className=" flex flex-col  ">
                      {groupNotification[dateKey]
                        ?.slice(0, 3)
                        .map((msg: any, index: number) => (
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
                                <h6 className="font-bold max-sm:text-sm truncate">
                                  {msg?.title}
                                </h6>
                                <p className="text-[#737774] text-xs  max-sm:text-[8px]">
                                  {msg?.createdAt &&
                                    formatCreatedAt(msg.createdAt)}
                                </p>
                              </div>
                              <p className="text-[#737774] text-sm  max-sm:text-xs  ">
                                {msg?.message}
                              </p>
                              <div className="flex justify-end">
                                <button className="text-sm text-primary-green font-medium uppercase">
                                  CLEAR
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </ScrollArea>
    </motion.div>
  );
};

export default NotificationDropdown;
