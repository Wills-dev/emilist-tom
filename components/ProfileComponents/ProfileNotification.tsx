"use client";

import { useState } from "react";

const ProfileNotification = () => {
  const [openMsg, setOpenMsg] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <div className="grid grid-cols-2 pt-14 pb-44">
      <div className="col-span-1 max-sm:col-span-2 flex-col flex gap-6">
        <div className="w-full border-b-[1px] border-[#CBD5E1]">
          <div className="flex justify-between mb-4">
            <h5 className="text-[18px] text-[#304155] font-[600] leading-[24px] max-sm:text-[14px]">
              Allow new message notification
            </h5>
            <div className="w-[40px] h-[22px] bg-primary-green  rounded-2xl p-1 flex items-center">
              <div
                className={`${
                  !openMsg && "bg-white "
                } flex-1 w-[20px] max-w-[20px]  h-[17px] max-h-[17px] rounded-full`}
                onClick={() => setOpenMsg(false)}
              ></div>
              <div
                className={`${
                  openMsg && "bg-white "
                } flex-1 w-[20px] max-w-[20px] h-[17px] max-h-[17px] rounded-full`}
                onClick={() => setOpenMsg(true)}
              ></div>
            </div>
          </div>
        </div>
        <div className="w-full border-b-[1px] border-[#CBD5E1]">
          <div className="flex justify-between mb-4">
            <h5 className="text-[18px] text-[#304155] font-[600] leading-[24px] max-sm:text-[14px]">
              Allow email notification
            </h5>
            <div className="w-[40px] h-[22px] bg-primary-green  rounded-2xl p-1 flex items-center">
              <div
                className={`${
                  !openNotification && "bg-white "
                } flex-1 w-[20px] max-w-[20px]  h-[17px] max-h-[17px] rounded-full`}
                onClick={() => setOpenNotification(false)}
              ></div>
              <div
                className={`${
                  openNotification && "bg-white "
                } flex-1 w-[20px] max-w-[20px] h-[17px] max-h-[17px] rounded-full`}
                onClick={() => setOpenNotification(true)}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNotification;
