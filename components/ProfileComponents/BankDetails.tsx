import { useContext } from "react";

import { AuthContext } from "@/utils/AuthState";
import { useEditProfile } from "@/hooks/useEditProfile";

import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

const BankDetails = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleUpdate, handleBankInfoChange, bankDetails, loading, load } =
    useEditProfile();

  return (
    <div className="grid grid-cols-2 pt-14 pb-44">
      <LoadingOverlay loading={loading} />
      {load ? (
        <div className="flex w-full min-h-[30vh] item-center justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          {currentUser?.accountDetails?.number ? (
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                <p className="font-bold">Bank Name</p>
                <p>{currentUser?.accountDetails?.bank}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold">Account Number</p>
                <p>{currentUser?.accountDetails?.number}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold">Account Name</p>
                <p>{currentUser?.accountDetails?.holdersName}</p>
              </div>
              <p className="text-xs text-primary-green pt-1">
                <span className="font-bold">Note: </span> Contact Emilist
                support to update your bank details or for further assistance.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="">
                <input
                  type="text"
                  name="bank"
                  id="bank"
                  value={bankDetails?.bank}
                  onChange={handleBankInfoChange}
                  className=" max-sm:text-sm bg-white outline-none justify-between w-full border-b-1 border-[#CBD5E1] focus-within:border-primary-green"
                  placeholder="Enter Bank Name"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  name="number"
                  id="number"
                  value={bankDetails?.number}
                  onChange={handleBankInfoChange}
                  className=" max-sm:text-sm bg-white outline-none justify-between w-full border-b-1 border-[#CBD5E1] focus-within:border-primary-green"
                  placeholder="Enter Account Number"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  name="holdersName"
                  id="holdersName"
                  value={bankDetails?.holdersName}
                  onChange={handleBankInfoChange}
                  className=" max-sm:text-sm bg-white outline-none justify-between w-full border-b-1 border-[#CBD5E1] focus-within:border-primary-green"
                  placeholder="Enter Account Name"
                />
                <p className="text-xs text-primary-green pt-1">
                  <span className="font-bold">Note: </span> Ensure your account
                  name matches your Emilist account name, and verify your bank
                  details before submitting. For assistance, please contact the
                  admin.
                </p>
              </div>
              <div className="">
                <button className="custom-btn flex-1" onClick={handleUpdate}>
                  Save changes
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BankDetails;
