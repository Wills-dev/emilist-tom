import Image from "next/image";

import { Modal } from "antd";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
};

const PromoteModal = ({ isOpen, onCancel }: Props) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} footer={null}>
      <h2 className="text-xl pb-1 font-semibold w-full border-b-1 border-[#B8B9B8] max-sm:text-lg">
        Promote your post
      </h2>
      <div className="py-6  border-b-1 border-[#B8B9B8]">
        <h2 className="sm:text-lg pb-1 font-bold w-full">Target</h2>
        <div className="flex flex-col gap-4 mt-6 max-sm:mt-3">
          <div className="flex-c">
            <Image
              src="/assets/icons/circle.svg"
              alt="menu"
              width={25}
              height={25}
              className="object-contain w-6 h-6"
            />{" "}
            {/* <input
                  type="radio"
                  id="Emi Preferred"
                  name="contact"
                  value="telephone"
                /> */}
            <label className="ml-3 text-[#303632]">Anybody</label>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/circle.svg"
              alt="menu"
              width={25}
              height={25}
              className="object-contain w-6 h-6"
            />{" "}
            {/* <input
                  type="radio"
                  id="Emi Preferred"
                  name="contact"
                  value="telephone"
                /> */}
            <label className="ml-3 text-[#303632]">
              Customers hiring for the service i’m posting for.
            </label>
          </div>
        </div>
      </div>
      <div className="py-6  border-b-1 border-[#B8B9B8]">
        <h2 className="sm:text-lg  pb-1 font-bold w-full">
          Promotion duration
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="w-full col-span-1 max-md:col-span-2">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Start Date
            </p>
            <div className="w-full">
              <input type="date" className="expert-reg-input" />
            </div>
          </div>
          <div className="w-full col-span-1 max-md:col-span-2">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              End Date
            </p>
            <div className="w-full">
              <input
                type="date"
                className="expert-reg-input"
                placeholder="12345678990"
              />
            </div>
          </div>
        </div>
        <p className="sm:text-lg text-primary-green py-2 mt-3 font-semibold w-full">
          ₦11,500
        </p>
      </div>
      <div className="py-6  ">
        <h2 className="sm:text-lg pb-1 font-bold w-full">Clicks</h2>
        <div className="grid grid-cols-2">
          <div className="w-full col-span-2">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Input your budget
            </p>
            <div className="w-full">
              <input
                type="text"
                className=" min-w-full w-full  max-w-full rounded-[10px] h-[62px] px-4 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-[1px]  max-sm:h-[46px] max-sm:text-sm"
                placeholder="#2,000"
              />
            </div>
          </div>
          <div className="w-full col-span-2 flex items-center justify-between py-4">
            <p className="text-[#5e625f]  font-bold max-sm:text-sm">
              Approx 2000 clicks
            </p>
            <p className="text-[#5e625f]  font-bold max-sm:text-sm">
              NB: 1 Click cost ₦1
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <button className="custom-btn">Make Payment</button>
      </div>
    </Modal>
  );
};

export default PromoteModal;
