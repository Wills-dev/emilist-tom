import { useContext } from "react";

import { AuthContext } from "@/utils/AuthState";
import { useDeactivateAccount } from "@/hooks/useDeactivateAccount";
import { useChangePassword } from "@/hooks/useChangePassword";

const ProfileSecurity = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    loading,
    handleChange,
    handleSubmit,
    password,
    inputType,
    inputTypee,
    handlePasswordToggle,
    handlePasswordTogglee,
    setEdit,
    edit,
  } = useChangePassword();

  const { load, handleDeactivate } = useDeactivateAccount();

  return (
    <div className="grid grid-cols-2 pt-14 pb-44 text-[#304155]">
      {loading && (
        <div className="absolute w-full min-h-screen top-0 left-0 bg-white opacity-50" />
      )}
      {load && (
        <div className="absolute w-full min-h-screen top-0 left-0 bg-white opacity-50" />
      )}
      <div className="col-span-1 max-sm:col-span-2 flex-col flex gap-6">
        <div className="w-full border-b-1 border-[#CBD5E1]">
          <div className="flex justify-between mb-2">
            <h5 className="text-lg  font-semibold  max-sm:text-sm">Email</h5>
            <button className="transition-all text-[#FF5D7A] hover:text-pink-600  font-semibold  max-sm:text-sm">
              Unsubscribe
            </button>
          </div>
          <p className="max-sm:text-xs capitalize mb-1 mt-5">
            {currentUser?.email ? currentUser?.email : "Not subscribed"}
          </p>
        </div>
        <div className="w-full ">
          <div className="flex justify-between mb-2">
            <h5 className="text-lg text-[#304155] font-semibold  max-sm:text-sm">
              Password
            </h5>
            {edit ? (
              <button
                className=" text-primary-green font-semibold  max-sm:text-sm"
                onClick={handleSubmit}
              >
                Save
              </button>
            ) : (
              <button
                className=" text-primary-green font-semibold  max-sm:text-sm"
                onClick={() => setEdit(true)}
              >
                Change
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 justify-between w-full border-b-1 border-[#CBD5E1] focus-within:border-primary-green">
            <input
              type={inputType}
              name="old"
              value={password.old}
              onChange={handleChange}
              className=" max-sm:text-sm bg-white outline-none flex-1"
              placeholder={edit ? "Enter old password" : "**************"}
            />
            <span className="cursor-pointer">
              {inputType === "password" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                  onClick={handlePasswordToggle}
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
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                  onClick={handlePasswordToggle}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </span>
          </div>
          {edit && (
            <div className="flex items-center gap-3 justify-between w-full border-b-1 border-[#CBD5E1] focus-within:border-primary-green mt-10">
              <input
                type={inputTypee}
                name="new"
                value={password.new}
                onChange={handleChange}
                className=" max-sm:text-sm bg-white outline-none flex-1"
                placeholder="Enter new password"
              />
              <span className="cursor-pointer">
                {inputTypee === "password" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                    onClick={handlePasswordTogglee}
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                    onClick={handlePasswordTogglee}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </span>
            </div>
          )}
        </div>
        <div className="">
          <button
            className="transition-all text-[#FF5D7A] hover:text-pink-600  font-semibold  max-sm:text-sm"
            onClick={handleDeactivate}
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSecurity;
