import { Modal } from "antd";
import { PaymentDetails } from "@/types";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  paymentDetails: PaymentDetails;
  confirmPayment: (
    e: React.FormEvent<HTMLFormElement>,
    milestoneId: string,
    jobId: string
  ) => Promise<void>;
  loadingPayment: boolean;
  handlePaymentChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  milestoneId: string;
  currentFile: any;
  handleChangeFile: any;
  jobId: string;
  handleImageDelete: () => void;
};

const PaymentModal = ({
  isOpen,
  onCancel,
  paymentDetails,
  handlePaymentChange,
  confirmPayment,
  loadingPayment,
  milestoneId,
  currentFile,
  handleChangeFile,
  jobId,
  handleImageDelete,
}: Props) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={600} footer={null}>
      <form
        className="flex-c justify-center flex-col gap-4 px-6 max-sm:px-3 py-10"
        onSubmit={(e) => confirmPayment(e, milestoneId, jobId)}
      >
        <h2 className="sm:text-lg font-bold">Payment</h2>
        <div className="w-full col-span-2   max-lg:col-span-4   ">
          <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
            Amount paid
          </p>
          <div className="w-full">
            <input
              type="text"
              name="amountpaid"
              value={paymentDetails.amountpaid}
              onChange={handlePaymentChange}
              className="expert-reg-input"
              placeholder="#50,000 "
            />
          </div>
        </div>
        <div className="w-full  ">
          <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
            Payment method
          </p>
          <div className="w-full">
            <div className="expert-reg-input-div">
              <select
                className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                name="paymentmethod"
                value={paymentDetails.paymentmethod}
                onChange={handlePaymentChange}
              >
                {" "}
                <option defaultValue="">Select payment method</option>
                <option value="Paypal">Paypal</option>
                <option value="Flutterwave">Flutterwave</option>
                <option value="Venmo">Venmo</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">Date</p>
          <div className="w-full">
            <input
              type="date"
              name="date"
              value={paymentDetails.date}
              onChange={handlePaymentChange}
              className="expert-reg-input"
            />
          </div>
        </div>
        <div className="w-full my-3">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Note (optional)
          </p>
          <div className="w-full">
            <textarea
              className="min-w-full w-full max-w-full rounded-lg  p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1 max-sm:text-sm"
              name="note"
              rows={3}
              value={paymentDetails.note}
              onChange={handlePaymentChange}
            ></textarea>
          </div>
        </div>
        <div className="w-full">
          <label
            className=" flex-c gap-1 text-primary-green py-2 font-medium max-sm:text-sm cursor-pointer max-w-fit"
            htmlFor="attach-file"
          >
            <Image
              src="/assets/icons/add.svg"
              alt="logo"
              width={130}
              height={30}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
            />
            Attach a file
          </label>
          <input
            type="file"
            id="attach-file"
            className="h-0 w-0 invisible"
            name="files"
            accept="image/*"
            onChange={handleChangeFile}
          />
          <div className="flex-c gap-2 w-full flex-wrap">
            {currentFile && (
              <div className="relative w-20 h-20">
                <img
                  src={currentFile}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 absolute bottom-0 right-0 text-red-600 font-bold bg-white border-gray-100 cursor-pointer"
                  onClick={handleImageDelete}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        {loadingPayment ? (
          <button className="load-btn">
            <span className="loading loading-dots loading-lg"></span>
          </button>
        ) : (
          <button type="submit" className="custom-btn">
            Proceed
          </button>
        )}
      </form>
      <p className="text-xs text-primary-green text-center">
        Ensure you enter the correct payment details
      </p>
    </Modal>
  );
};

export default PaymentModal;
