import { Modal } from "antd";
import { PaymentDetails } from "@/types";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  paymentDetails: PaymentDetails;
  confirmPayment: (
    e: React.FormEvent<HTMLFormElement>,
    milestoneId: string
  ) => void;
  loadingPayment: boolean;
  handlePaymentChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  >;
  milestoneId: string;
};

const PaymentModal = ({
  isOpen,
  onCancel,
  paymentDetails,
  handlePaymentChange,
  confirmPayment,
  loadingPayment,
  milestoneId,
}: Props) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={600}>
      <form
        className="flex-c justify-center flex-col gap-4 px-6 max-sm:px-3 py-10"
        onSubmit={(e) => confirmPayment(e, milestoneId)}
      >
        <h2 className="sm:text-lg font-bold">Payment</h2>
        <div className="w-full col-span-2   max-lg:col-span-4   ">
          <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
            Amount paid
          </p>
          <div className="w-full">
            <input
              type="number"
              name="amountpaid"
              value={paymentDetails.amountpaid}
              onChange={handlePaymentChange}
              className="expert-reg-input"
              placeholder="#50,000 "
            />
          </div>
        </div>
        <div className="w-full  ">
          <p className="text-[#5e625f] py-2 text-[16px] font-medium max-sm:text-sm">
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
          <p className="text-[#5e625f] py-2 text-[16px] font-medium max-sm:text-sm">
            State Date
          </p>
          <div className="w-full">
            <input
              type="date"
              name="date"
              value={paymentDetails.date}
              onChange={handlePaymentChange}
              className="expert-reg-input"
              placeholder="12345678990"
            />
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
    </Modal>
  );
};

export default PaymentModal;
