import { useContext } from "react";

import { Modal } from "antd";

import { numberWithCommas } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";

interface SubscriptionPaymentProps {
  onCancel: () => void;
  isOpen: boolean;
  amount: number;
  currency: string;
  setCurrency: (currency: string) => void;
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
  handleSubNewPlan: (
    e: React.FormEvent,
    planId: string,
    isRenew: boolean
  ) => Promise<string | undefined>;
  planId: string;
  loading: boolean;
}

export const SubscriptionPayment = ({
  isOpen,
  onCancel,
  amount,
  currency,
  setPaymentMethod,
  setCurrency,
  paymentMethod,
  handleSubNewPlan,
  planId,
  loading,
}: SubscriptionPaymentProps) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={600} footer={null}>
      <form
        onSubmit={(e) => handleSubNewPlan(e, planId, false)}
        className="flex-c justify-center flex-col gap-4 px-6 max-sm:px-3 py-10"
      >
        <h2 className="sm:text-lg font-bold">Payment</h2>
        <div className="w-full col-span-2   max-lg:col-span-4   ">
          <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
            Plan amount
          </p>
          <div className="w-full expert-reg-input-div opacity-40 flex-c">
            ₦{amount && numberWithCommas(amount)}
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
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
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
            {paymentMethod === "Wallet" ? (
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

        {loading ? (
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
