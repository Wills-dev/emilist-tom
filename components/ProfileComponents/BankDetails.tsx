import { asteriskAllExceptLastFour } from "@/helpers/asteriskAllNumbersExceptLastFour";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

import { useAddBankDetails } from "@/hooks/useAddBankDetails";

const BankDetails = () => {
  const {
    edit,
    setEdit,
    loading,
    inputType,
    setInputType,
    handleChange,
    bankDetails,
    handleSubmitBankDetails,
    currentUser,
  } = useAddBankDetails();

  return (
    <div className="grid grid-cols-2 pt-14 pb-44">
      <LoadingOverlay loading={loading} />

      <>
        {currentUser?.accountDetails?.number && !edit ? (
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <p className="font-bold">Bank Name</p>
              <p>{currentUser?.accountDetails?.bank}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Account Number</p>
              <p>
                {currentUser?.accountDetails?.number &&
                  asteriskAllExceptLastFour(
                    currentUser?.accountDetails?.number
                  )}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Account Name</p>
              <p>{currentUser?.accountDetails?.holdersName}</p>
            </div>
            <div className="">
              <button className="custom-btn" onClick={() => setEdit(true)}>
                Edit bank details
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="">
              <input
                type="text"
                name="bank"
                id="bank"
                value={bankDetails?.bank}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className=" max-sm:text-sm bg-white outline-none justify-between w-full border-b-1 border-[#CBD5E1] focus-within:border-primary-green"
                placeholder="Enter Account Name"
              />
            </div>
            <div className="">
              <div className="flex-c-b max-sm:text-sm outline-none w-full border-b-1 border-[#CBD5E1] focus-within:border-primary-green">
                <input
                  type={inputType}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="outline-none flex-1 appearance-none bg-white"
                  value={bankDetails.password}
                  onChange={handleChange}
                />
                {inputType === "password" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => setInputType("text")}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => setInputType("password")}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </div>
              <p className="text-xs text-primary-green pt-1">
                <span className="font-bold">Note: </span> Ensure your account
                name matches your Emilist account name, and verify your bank
                details before submitting. For assistance, please contact the
                admin.
              </p>
            </div>

            <div className="">
              <button
                className="custom-btn flex-1"
                onClick={handleSubmitBankDetails}
              >
                Save changes
              </button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default BankDetails;
