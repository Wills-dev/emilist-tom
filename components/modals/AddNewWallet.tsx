import { Modal } from "antd";

import { useAddNewWallet } from "@/hooks/useAddNewWallet";

interface AddNewWalletProps {
  isOpen: boolean;
  onCancel: () => void;
}

const AddNewWallet = ({ isOpen, onCancel }: AddNewWalletProps) => {
  const { setDefault, currency, setCurrency, isLoading, handleSubmit } =
    useAddNewWallet();

  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={400} footer={null}>
      <form className="pt-8 flex flex-col gap-6 w-full ">
        <div className="w-full">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Currency
          </p>
          <div className="expert-reg-input-div">
            <select
              className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
              name="currency"
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
          </div>
        </div>

        <div className="w-full">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Set wallet to default?
          </p>
          <div className="expert-reg-input-div">
            <select
              className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
              name="isDefault"
            >
              <option defaultValue="">Select</option>

              <option onClick={() => setDefault(true)} className="capitalize">
                Yes
              </option>
              <option onClick={() => setDefault(false)} className="capitalize">
                No
              </option>
            </select>
          </div>
        </div>
        <div className="flex-c">
          {isLoading ? (
            <button type="button" className="load-btn">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          ) : (
            <button
              className="custom-btn"
              type="button"
              onClick={async () => {
                await handleSubmit();
              }}
            >
              Proceed
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AddNewWallet;
