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
        <div className="flex-c-b"></div>
        <h4 className="sm:text-lg  font-semibold">Milestone Invoice</h4>
        <div className="flex flex-col  mt-6 gap-8 w-full">
          <div className="flex items-center flex-wrap md:gap-3 gap-1 flex-1">
            {" "}
            <h6 className=" font-medium max-sm:text-sm whitespace-nowrap">
              Amount:
            </h6>
            <p className=" text-[#303632] max-sm:text-sm">
              {currency && currency}{" "}
              {invoiceDetails?.amount &&
                numberWithCommas(invoiceDetails?.amount)}
            </p>
          </div>
          <div className="flex items-center flex-wrap md:gap-3 gap-1 flex-1">
            {" "}
            <h6 className=" font-medium max-sm:text-sm whitespace-nowrap">
              Addintional amount:
            </h6>
            <p className=" text-[#303632] max-sm:text-sm">
              {currency && currency}{" "}
              {invoiceDetails?.invoice?.additionalAmount &&
                numberWithCommas(invoiceDetails?.invoice?.additionalAmount)}
            </p>
          </div>
          <div className="flex flex-col md:gap-3 gap-1 flex-1">
            {" "}
            <h6 className=" font-medium max-sm:text-sm">Note:</h6>
            <p className=" text-[#303632] max-sm:text-sm">
              {" "}
              {invoiceDetails?.invoice?.note}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MilestoneInvoiceModal;
