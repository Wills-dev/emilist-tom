import { AuthContext } from "@/utils/AuthState";
import { Modal } from "antd";
import { useContext } from "react";

interface OrderPaymentProps {
  isOpen: boolean;
  onCancel: () => void;
  loading: boolean;
  currency: string;
  setCurrency: (currency: string) => void;
  handleOrderPayment: (cardId: string) => Promise<void>;
  cartId: string;
  setPaymentMethod: (paymentMethod: string) => void;
  paymentMethod: string;
}

const OrderPayment = ({
  isOpen,
  onCancel,
  loading,
  paymentMethod,
  setPaymentMethod,
  currency,
  setCurrency,
  handleOrderPayment,
  cartId,
}: OrderPaymentProps) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={400} footer={null}>
      <form className="pt-8 flex flex-col gap-6 w-full ">
        <div className="w-full">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Payment method
          </p>
          <div className="expert-reg-input-div">
            <select
              className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option defaultValue="">Select payment method</option>

              <option value="Card">Paystack</option>
              <option value="Wallet">Wallet</option>
            </select>
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

        <div className="flex-c">
          {loading ? (
            <button type="button" className="load-btn">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          ) : (
            <button
              className="custom-btn"
              type="button"
              onClick={() => handleOrderPayment(cartId)}
            >
              Proceed
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default OrderPayment;
