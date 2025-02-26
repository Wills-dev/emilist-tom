import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Modal } from "antd";

import { invoiceInfoType } from "@/types";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  uploadInvoice: any;
  loadInvoice: boolean;
  jobId: string;
  milestoneId: string;
  milestoneAmount: number;
  currency: string;
  invoiceInfo: invoiceInfoType;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const MilestonInputInvoice = ({
  isOpen,
  onCancel,
  uploadInvoice,
  loadInvoice,
  jobId,
  milestoneId,
  milestoneAmount,
  currency,
  handleChange,
  invoiceInfo,
}: Props) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={720} footer={null}>
      <form
        className="  px-6 max-sm:px-3 py-10"
        onSubmit={(e) => uploadInvoice(e, jobId, milestoneId)}
      >
        <h2 className="sm:text-lg font-bold mb-4">Milestone Invoice</h2>
        <div className="grid grid-cols-2 w-full gap-2">
          <div className="w-full col-span-2   ">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Amount
            </p>
            <div className="w-full expert-reg-input-div opacity-40 flex-c">
              {currency && currency} {milestoneAmount && milestoneAmount}
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <div className="py-2">
              <p className="text-[#5e625f] font-medium max-sm:text-sm">
                Additional amount (optional)
              </p>
              <p className="text-xs text-primary-green">
                Enter any incurred additional expenses.
              </p>
            </div>
            <div className="w-full">
              <input
                style={{ fontSize: "16px" }}
                type="text"
                className="expert-reg-input"
                name="additionalAmount"
                value={invoiceInfo?.additionalAmount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
              Note (optional)
            </p>
            <div className="w-full">
              <textarea
                style={{ fontSize: "16px" }}
                name="note"
                className="min-w-full w-full max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1 max-sm:text-sm"
                rows={4}
                value={invoiceInfo?.note}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-5">
          {loadInvoice ? (
            <button className="load-btn">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          ) : (
            <button type="submit" className="custom-btn">
              Submit
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default MilestonInputInvoice;
