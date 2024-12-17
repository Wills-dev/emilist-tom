import { useContext } from "react";

import { Modal } from "antd";

import { AuthContext } from "@/utils/AuthState";
import { useFundWallet } from "@/hooks/useFundWallet";
import Image from "next/image";

interface FundWalletProps {
  isOpen: boolean;
  onCancel: () => void;
}

const FundWallet = ({ isOpen, onCancel }: FundWalletProps) => {
  const { currentUser } = useContext(AuthContext);
  const {
    handleChange,
    handleFundWallet,
    loading,
    walletInfo,
    setWalletInfo,
    paymentProof,
    fundInfo,
    handleChangeFile,
    handleDelete,
  } = useFundWallet();

  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={400} footer={null}>
      <form className="pt-8 flex flex-col gap-6 w-full ">
        <div className="w-full">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Wallet to fund
          </p>
          <div className="expert-reg-input-div">
            <select
              className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
              onChange={(e) => {
                const selectedWalletId = e.target.value;
                const selectedWallet = currentUser?.wallets?.find(
                  (wallet: any) => wallet?._id === selectedWalletId
                );
                setWalletInfo(selectedWallet);
              }}
            >
              <option defaultValue="">Select wallet</option>

              {currentUser?.wallets?.map((wallet: any) => (
                <option key={wallet?._id} value={wallet?._id}>
                  {wallet?.currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Payment method
          </p>
          <div className="expert-reg-input-div">
            <select
              className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
              name="paymentMethod"
              value={fundInfo?.paymentMethod}
              onChange={handleChange}
            >
              <option defaultValue="">Select payment method</option>

              <option value="Card">Card</option>
              <option value="BankTransfer">Bank transfer</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Amount
          </p>
          <div className="w-full">
            <input
              type="text"
              name="amount"
              value={fundInfo?.amount}
              onChange={handleChange}
              className="expert-reg-input"
            />
          </div>
        </div>
        {fundInfo?.paymentMethod === "BankTransfer" && (
          <div className="flex flex-col gap-2 text-sm">
            <div className="">
              <p>Bank name</p>
              <p className="font-bold">First Bank PLC</p>
            </div>
            <div className="">
              <p>Account number</p>
              <p className="font-bold"> 302384848</p>
            </div>
            <div className="">
              <p>Account name</p>
              <p className="font-bold"> Emilist Enterprise</p>
            </div>
          </div>
        )}
        {fundInfo?.paymentMethod === "BankTransfer" && (
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
              Attach payment proof
            </label>
            <input
              type="file"
              id="attach-file"
              className="h-0 w-0 invisible"
              name="image"
              onChange={handleChangeFile}
            />
            <div className="flex-c gap-2 w-full flex-wrap">
              {paymentProof && (
                <div className="relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(paymentProof)}
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
                    onClick={handleDelete}
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
        )}
        <div className="flex-c">
          {loading ? (
            <button type="button" className="load-btn">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          ) : (
            <button
              className="custom-btn"
              type="button"
              onClick={async () => {
                await handleFundWallet();
                onCancel();
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

export default FundWallet;
