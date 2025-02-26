import { useContext } from "react";

import { Modal } from "antd";

import { PaymentDetails } from "@/types";
import { numberWithCommas } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
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
  jobId: string;
  setCurrency: (currency: string) => void;
  currency: string;
  amount: number;
  jobCurrency: string;
  additionalAmount: string;
  note?: string;
  isAdditionalAmount: boolean;
  setIsAdditionalAmount: (isAdditionalAmount: boolean) => void;
};

const PaymentModal = ({
  isOpen,
  onCancel,
  paymentDetails,
  handlePaymentChange,
  confirmPayment,
  loadingPayment,
  milestoneId,
  currency,
  setCurrency,
  jobId,
  amount,
  jobCurrency,
  additionalAmount,
  note,
  isAdditionalAmount,
  setIsAdditionalAmount,
}: Props) => {
  const { currentUser } = useContext(AuthContext);

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
          <div className="w-full expert-reg-input-div opacity-40 flex-c">
            {jobCurrency && jobCurrency} {amount && numberWithCommas(amount)}
          </div>
        </div>
        <div className="w-full col-span-2   max-lg:col-span-4   ">
          <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
            Additional amount
          </p>
          <p className="w-full expert-reg-input-div opacity-40 flex-c">
            {jobCurrency && jobCurrency}{" "}
            {additionalAmount && numberWithCommas(additionalAmount)}
          </p>
        </div>
        {note && (
          <div className="w-full col-span-2   max-lg:col-span-4   ">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Artisan note
            </p>
            <p className="w-full bg-lighter-gray p-2 rounded-lg opacity-40 flex-c">
              {note && note}
            </p>
          </div>
        )}
        <div className="w-full  ">
          <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
            Payment method
          </p>
          <div className="w-full">
            <div className="expert-reg-input-div">
              <select
                className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                name="paymentMethod"
                value={paymentDetails.paymentMethod}
                onChange={handlePaymentChange}
              >
                {" "}
                <option defaultValue="">Select payment method</option>
                <option value="Card">Paystack</option>
                <option value="Wallet">Wallet</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Currency
          </p>
          <div className="expert-reg-input-div">
            {paymentDetails?.paymentMethod === "Wallet" ? (
              <select
                className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                onChange={(e) => {
                  const selectedWalletId = e.target.value;
                  const selectedWallet = currentUser?.wallets?.find(
                    (wallet: any) => wallet?._id === selectedWalletId
                  );
                  setCurrency(selectedWallet?.currency);
                }}
              >
                <option defaultValue="">Select wallet</option>

                {currentUser?.wallets?.map((wallet: any) => (
                  <option key={wallet?._id} value={wallet?._id}>
                    {wallet?.currency}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="currency"
                className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option defaultValue="">Select currency</option>

                <option value="NGN" className="capitalize">
                  NGN
                </option>
                <option value="USD" className="capitalize">
                  USD
                </option>
                <option value="GBP" className="capitalize">
                  GBP
                </option>
                <option value="EUR" className="capitalize">
                  EUR
                </option>
              </select>
            )}
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
            {additionalAmount && (
              <div className="">
                {isAdditionalAmount ? (
                  <button
                    type="button"
                    onClick={() => setIsAdditionalAmount(false)}
                    className="font-medium max-sm:text-sm flex items-center gap-2"
                  >
                    <Image
                      src="/assets/icons/tick-square.svg"
                      alt="menu"
                      width={20}
                      height={20}
                      className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] cursor-pointer "
                    />

                    <span> Reject additional payment</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAdditionalAmount(true)}
                    className="font-medium max-sm:text-sm flex items-center gap-2"
                  >
                    <Image
                      src="/assets/icons/checkbox.svg"
                      alt="menu"
                      width={20}
                      height={20}
                      className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] cursor-pointer"
                    />
                    <span> Accept additional payment</span>
                  </button>
                )}
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
    </Modal>
  );
};

export default PaymentModal;
