"use client";

import Link from "next/link";
import Image from "next/image";

import { useResetPassword } from "@/hooks/useResetPassword";

const page = ({ params }: any) => {
  const email = decodeURIComponent(params.email);

  const {
    handleChange,
    handleResetPassword,
    resetPasswordDetails,
    loading,
    setInputType,
    inputType,
  } = useResetPassword();

  return (
    <div className="w-full flex-c justify-center min-h-screen custom-auth-input">
      <div className=" max-h-full xl:w-2/5 lg:w-1/2 w-full  p-6 max-sm:pt-3 shadow flex-c justify-center flex-col gap-6">
        <Link href="/">
          <Image
            src="/assets/images/Logo.svg"
            alt="logo"
            width={100}
            height={30}
            className="object-contain w-28 h-auto"
            priority
          />
        </Link>
        <h1 className="sm:text-lg font-bold  sm:pt-3 capitalize">
          {" "}
          Reset Password
        </h1>
        <form
          className="w-full flex flex-col gap-3 text-gray-600"
          onSubmit={(e) => handleResetPassword(e, email)}
        >
          <div className="flex items-start gap-2">
            <p className=" max-sm:text-sm">
              Enter the otp sent to {email && email} and your new password to
              reset your password.
            </p>
          </div>
          <div className="w-full">
            <label className="font-medium max-sm:text-sm py-2" htmlFor="otp">
              Enter OTP
            </label>
            <div className="w-full">
              <input
                type="text"
                id="otp"
                className="auth-input appearance-none"
                placeholder="Enter OTP"
                name="otp"
                value={resetPasswordDetails.otp}
                onChange={handleChange}
                style={{ fontSize: "16px" }}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="font-medium max-sm:text-sm py-2"
            >
              Enter New Password
            </label>
            <div className="w-full">
              <div className="auth-input-div">
                <input
                  type={inputType}
                  id="new password"
                  placeholder="Enter your new password"
                  className="outline-none flex-1 h-full bg-[#ececec] appearance-none"
                  name="newPassword"
                  value={resetPasswordDetails.newPassword}
                  onChange={handleChange}
                  style={{ fontSize: "16px" }}
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
            </div>
          </div>
          <button
            type="submit"
            className={` text-white  whitespace-nowrap transition-all duration-300 rounded-lg w-full h-12 ${
              loading
                ? "bg-green-200 cursor-not-allowed"
                : "bg-primary-green hover:bg-green-600"
            }`}
          >
            {loading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Reset password"
            )}
          </button>
        </form>

        <div className="w-full flex justify-center sm:pt-5 ">
          <p className="max-sm:text-sm">
            Have an EmiList account?{" "}
            <Link href="/login" className="text-primary-green">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
