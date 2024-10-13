import Image from "next/image";

import { Modal } from "antd";

type PromoModalProps = {
  isOpen: boolean;
  onCancel: () => void;
};

const PromoModal = ({ isOpen, onCancel }: PromoModalProps) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} footer={null}>
      <h2 className="text-[24px] text-[#030A05] leading-[32px] pb-1 font-[600] w-full border-b-[1px] border-[#B8B9B8] max-sm:text-[18px]">
        Promote your post
      </h2>
      <div className="py-6  border-b-[1px] border-[#B8B9B8]">
        <h2 className="text-[20px] text-[#030A05] leading-[28px] pb-1 font-[700] w-full  max-sm:text-[16px]">
          Target
        </h2>
        <div className="flex flex-col gap-4 mt-6 max-sm:mt-3">
          <div className="flex items-center">
            <Image
              src="/assets/icons/circle.svg"
              alt="menu"
              width={25}
              height={25}
              className="object-contain w-[25px] h-[25px]"
            />{" "}
            {/* <input
              type="radio"
              id="Emi Preferred"
              name="contact"
              value="telephone"
            /> */}
            <label
              htmlFor="Emi Preferred"
              className="ml-3 text-base text-[#303632]"
            >
              Anybody
            </label>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/circle.svg"
              alt="menu"
              width={25}
              height={25}
              className="object-contain w-[25px] h-[25px]"
            />{" "}
            {/* <input
              type="radio"
              id="Emi Preferred"
              name="contact"
              value="telephone"
            /> */}
            <label
              htmlFor="Emi Preferred"
              className="ml-3 text-base text-[#303632]"
            >
              Customers hiring for the service i’m posting for.
            </label>
          </div>
        </div>
      </div>
      <div className="py-6  border-b-[1px] border-[#B8B9B8]">
        <h2 className="text-[20px] text-[#030A05] leading-[28px] pb-1 font-[700] w-full  max-sm:text-[16px]">
          Promotion duration
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="w-full col-span-1 max-md:col-span-2">
            <p className="text-[#5e625f] py-2 text-[16px] font-[500] max-sm:text-[14px]">
              Start Date
            </p>
            <div className="w-full">
              <input
                type="date"
                className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-[14px] text-[#737774]"
                placeholder="12345678990"
              />
            </div>
          </div>
          <div className="w-full col-span-1 max-md:col-span-2">
            <p className="text-[#5e625f] py-2 text-[16px] font-[500] max-sm:text-[14px]">
              End Date
            </p>
            <div className="w-full">
              <input
                type="date"
                className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-[14px] text-[#737774]"
                placeholder="12345678990"
              />
            </div>
          </div>
        </div>
        <p className="text-[18px] text-primary-green leading-[24px] py-2 mt-3 font-[600] w-full  max-sm:text-[16px]">
          #11,500
        </p>
      </div>
      <div className="py-6  ">
        <h2 className="text-[20px] text-[#030A05] leading-[28px] pb-1 font-[700] w-full  max-sm:text-[16px]">
          Clicks
        </h2>
        <div className="grid grid-cols-2">
          <div className="w-full col-span-2">
            <p className="text-[#5e625f] py-2 text-[16px] font-[500] max-sm:text-[14px]">
              Input your budget
            </p>
            <div className="w-full">
              <input
                type="text"
                className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-[14px]"
                placeholder="#2,000"
              />
            </div>
          </div>
          <div className="w-full col-span-2 flex items-center justify-between py-4">
            <p className="text-[#5e625f]  text-[16px] font-[700] max-sm:text-[14px]">
              Approx 2000 clicks
            </p>
            <p className="text-[#5e625f]  text-[16px] font-[700] max-sm:text-[14px]">
              NB: 1 Click cost #1
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <button className="bg-primary-green px-[18px] py-[10px] text-[#fcfefd] rounded-[10px] cursor-pointer font-bold  mt-15 whitespace-nowrap  text-[14px] max-lg:mt-0 max-sm:text-[11px] max-sm:px-[20px] max-sm:py-[10px] max-sm:mt-20">
          Make Payment
        </button>
      </div>
    </Modal>
  );
};

export default PromoModal;
