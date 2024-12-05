import { Modal } from "antd";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
};

const ContactModal = ({ isOpen, onCancel }: Props) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={740} footer={null}>
      <div className="w-full  py-4 max-sm:py-3 ">
        <div className="flex justify-between items-center px-3 max-sm:px-2 border-b-[1px] border-[#A2A4A2] pb-5">
          <div className=" flex items-center gap-3 max-sm:gap-1">
            <div className="relative  w-[88px] h-[88px] max-sm:w-[35px] max-sm:h-[35px] ">
              <Image
                src="/assets/images/profile-pic.svg"
                alt="menu"
                width={88}
                height={88}
                className="object-cover rounded-full min-h-full max-h-full min-w-full max-w-full"
              />
            </div>
            <div className="flex flex-col gap-2 max-sm:gap-0">
              <p className="text-[#030A05] text-[24px] leading-[32px] font-[600] max-sm:text-[16px] max-sm:leading-[20px]">
                Toks Wale
              </p>
              <p className="text-[#5E625F] text-[16px] leading-[24px] font-[400] max-sm:text-[13px]  max-sm:leading-[18px]">
                Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 max-sm:gap-3 ">
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
          </div>
        </div>
        <div className="w-full px-3 max-sm:px-2 ">
          <textarea
            placeholder="Type your message here...."
            className="py-10  overflow-y-scroll w-full outline-none bg-white"
            rows={15}
          ></textarea>
        </div>
        <div className="w-full flex items-center justify-between">
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
              <input type="file" id="smiley" className="invisible h-0 w-0" />
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
              <input type="file" id="smiley" className="invisible h-0 w-0" />
            </div>
          </div>
          <button className="flex items-center bg-primary-green text-[#FCFEFD] py-3 px-6 rounded-[10px] whitespace-nowrap max-sm:px-4">
            Send Message
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;
