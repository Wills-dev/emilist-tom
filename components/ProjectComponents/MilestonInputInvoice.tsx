import { Modal } from "antd";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  uploadInvoice: any;
  loadInvoice: boolean;
  handleChange: any;
  invoiceDetails: any;
  jobId: string;
  milestoneId: string;
  milestoneAmount: number;
  currency: string;
};

const MilestonInputInvoice = ({
  isOpen,
  onCancel,
  uploadInvoice,
  loadInvoice,
  handleChange,
  invoiceDetails,
  jobId,
  milestoneId,
  milestoneAmount,
  currency,
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
          <div className="w-full  col-span-2">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Payment Method
            </p>
            <div className="w-full">
              <div className=" min-w-full w-full  max-w-full expert-reg-input-div ">
                <select
                  className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm text-[#282828]"
                  name="paymentMethod"
                  value={invoiceDetails.paymentMethod}
                  onChange={handleChange}
                >
                  <option defaultValue="">select</option>
                  <option value="paypay">Paypal</option>
                  <option value="flutterwave">Flutterwave</option>
                  <option value="venmo">Venmo</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full col-span-1 max-md:col-span-2   ">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Bank Name
            </p>
            <div className="w-full">
              <input
                type="text"
                name="bankName"
                value={invoiceDetails.bankName}
                onChange={handleChange}
                className="expert-reg-input"
              />
            </div>
          </div>
          <div className="w-full col-span-1 max-md:col-span-2   ">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Acount Number
            </p>
            <div className="w-full">
              <input
                type="text"
                name="accountNumber"
                value={invoiceDetails.accountNumber}
                onChange={handleChange}
                className=" min-w-full w-full  max-w-full expert-reg-input"
              />
            </div>
          </div>
          <div className="w-full col-span-2   ">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Account Name
            </p>
            <div className="w-full">
              <input
                type="text"
                name="accountName"
                value={invoiceDetails.accountName}
                onChange={handleChange}
                className=" min-w-full w-full  max-w-full expert-reg-input"
              />
            </div>
          </div>
          <div className="w-full  col-span-2 ">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Note
            </p>
            <div className="w-full">
              <textarea
                className=" min-w-full w-full  max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1 max-sm:text-sm"
                name="note"
                value={invoiceDetails.note}
                onChange={handleChange}
                rows={4}
              ></textarea>
            </div>
          </div>
        </div>
        <p className="text-xs text-primary-green">
          Note: Please confirm account details before submitting.
        </p>
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
