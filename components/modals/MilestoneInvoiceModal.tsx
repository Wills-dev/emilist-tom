import Image from "next/image";

import { Modal } from "antd";
import { numberWithCommas } from "@/helpers";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  invoiceDetails: any;
  currency: string;
};

const MilestoneInvoiceModal = ({
  isOpen,
  onCancel,
  invoiceDetails,
  currency,
}: Props) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={620} footer={null}>
      <div className="px-6 max-sm:px-3 py-10 w-full">
        <h4 className="sm:text-lg  font-semibold">Milestone Invoice</h4>
        <div className="flex flex-col  mt-6 gap-8 w-full">
          <div className="flex-c gap-8 flex-wrap">
            <div className="flex items-center gap-3 flex-1">
              {" "}
              <h6 className=" font-medium max-sm:text-sm">Amount:</h6>
              <p className=" text-[#303632] max-sm:text-sm">
                {currency && currency}{" "}
                {invoiceDetails?.amount &&
                  numberWithCommas(invoiceDetails?.amount)}
              </p>
            </div>
          </div>
          <div className="flex-c gap-8 flex-wrap">
            <div className="flex items-center gap-3 flex-1">
              {" "}
              <h6 className=" font-medium max-sm:text-sm">Payment Method:</h6>
              <p className=" text-[#303632] max-sm:text-sm">
                {invoiceDetails?.accountDetails?.paymentMethod}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-1">
              {" "}
              <h6 className=" font-medium max-sm:text-sm">Bank:</h6>
              <p className=" text-[#303632] max-sm:text-sm">
                {invoiceDetails?.accountDetails?.bank}
              </p>
            </div>
          </div>
          <div className="flex-c gap-8 flex-wrap">
            <div className="flex items-center gap-3 flex-1">
              {" "}
              <h6 className=" font-medium max-sm:text-sm">Account Number:</h6>
              <p className=" text-[#303632] max-sm:text-sm">
                {invoiceDetails?.accountDetails?.accountNumber}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-1">
              {" "}
              <h6 className=" font-medium max-sm:text-sm">Account Name:</h6>
              <p className=" text-[#303632] max-sm:text-sm">
                {invoiceDetails?.accountDetails?.accountName}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
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
