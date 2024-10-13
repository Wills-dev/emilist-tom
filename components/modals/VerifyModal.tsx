import Image from "next/image";

import { Modal } from "antd";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
};

const VerifyModal = ({ isOpen, onCancel }: Props) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} footer={null}>
      <div className="">
        <h4 className="py-2 sm:text-xl font-bold">
          Choose items you want ot verify
        </h4>
        <div className="flex flex-col gap-4 my-8">
          <div className="flex-c">
            <Image
              src="/assets/icons/checkbox.svg"
              alt="arrow-left"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-4"
            />
            <p className="max-sm:text-sm">Address</p>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/checkbox.svg"
              alt="arrow-left"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-4"
            />
            <p className="max-sm:text-sm">Police Report</p>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/checkbox.svg"
              alt="arrow-left"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-4"
            />
            <p className="max-sm:text-sm">CAC</p>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/checkbox.svg"
              alt="arrow-left"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-4"
            />
            <p className="max-sm:text-sm">Nafdac</p>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/checkbox.svg"
              alt="arrow-left"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-4"
            />
            <p className="max-sm:text-sm">Nimc</p>
          </div>
        </div>
        <h4 className="text-[#030A05] py-2 text-[16px] font-[600] max-sm:text-[14px]">
          Cerificates
        </h4>
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center">
            <Image
              src="/assets/icons/checkbox.svg"
              alt="arrow-left"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-4"
            />
            <p className="max-sm:text-sm">Painter Association of Nigeria</p>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/checkbox.svg"
              alt="arrow-left"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-4"
            />
            <p className="max-sm:text-sm">Bricklayer Association of Nigeria</p>
          </div>
        </div>

        <div className="">
          <p className="text-[#5E625F]  text-[16px] max-sm:text-[14px]">
            Total Price
          </p>
          <h4 className="text-[#030A05] text-[18px] font-[600] max-sm:text-[15px]">
            ₦ 3,000
          </h4>
        </div>
        <div className="w-full my-4 flex justify-center">
          <button className="w-[280px] max-w-[280px] min-w-[280px] h-[55px] max-h-[55px] min-h-[55px] bg-primary-green  text-center text-[#FCFEFD] text-[16px] font-[700] leading-[24px] max-sm:text-[12px] rounded-[10px] max-sm:leading-[24px] capitalize">
            Pay Now
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyModal;
