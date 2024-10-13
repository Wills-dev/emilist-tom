import Image from "next/image";

import { Modal } from "antd";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  invoiceDetails: any;
};

const MilestoneInvoiceModal = ({ isOpen, onCancel, invoiceDetails }: Props) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={620}>
      <div className="flex items-center justify-center flex-col gap-4 px-6 max-sm:px-3 py-10 w-full">
        <div className="flex items-center justify-between w-full">
          <h4 className="text-[#000000] text-[20px] leading-[28px] font-[600] max-sm:text-[16px]">
            Milestone Invoice
          </h4>
          <Image
            src="/assets/icons/Menu.svg"
            alt="menu"
            width={32}
            height={32}
            className="object-contain w-6 h-8 max-sm:w-5 max-sm:h-6 "
          />
        </div>
        <div className="grid grid-cols-2 mt-6 gap-3">
          <div className="col-span-1 max-md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {" "}
              <h6 className=" font-medium max-sm:text-sm">Payment Method:</h6>
              <p className=" text-[#303632] max-sm:text-sm">
                {invoiceDetails?.paymentMethod}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {" "}
              <h6 className=" font-medium max-sm:text-sm">Bank:</h6>
              <p className=" text-[#303632] max-sm:text-sm">
                {invoiceDetails?.bankName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {" "}
              <h6 className=" font-medium max-sm:text-sm">Account Number:</h6>
              <p className=" text-[#303632] max-sm:text-sm">
                {invoiceDetails?.accountNumber}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {" "}
              <h6 className=" font-medium max-sm:text-sm">Account Name:</h6>
              <p className=" text-[#303632] max-sm:text-sm">
                {invoiceDetails?.accountName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {" "}
              <h6 className=" font-medium max-sm:text-sm">Amount:</h6>
              <p className=" text-[#303632] max-sm:text-sm">
                ₦ {invoiceDetails?.milestoneAmount}
              </p>
            </div>
          </div>

          <div className=" col-span-2 flex flex-col gap-2 max-sm:gap-1 mt-8 max-sm:mt-6">
            <h6 className=" font-medium max-sm:text-sm">Note:</h6>
            <p className=" text-[#303632] max-sm:text-sm">
              {invoiceDetails?.note}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MilestoneInvoiceModal;
