"use client";

import Link from "next/link";
import Image from "next/image";

import { useForgotPassword } from "@/hooks/useForgotPassword";

const page = () => {
  const { loading, setEmail, email, handleForgotPassword } =
    useForgotPassword();

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
          Forgot Password
        </h1>
        <form
          className="w-full flex flex-col gap-3 text-gray-600"
          onSubmit={handleForgotPassword}
        >
          <div className="flex items-start gap-2">
            <p className=" max-sm:text-sm">
              Please enter email to reset your password
            </p>
          </div>
          <div className="w-full">
            <div className="w-full">
              <input
                type="email"
                id="email"
                className="auth-input appearance-none"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontSize: "16px" }}
              />
            </div>
          </div>
          <div className="flex justify-end sm:text-sm text-xs">
            Remember password?
            <Link href="/login" className="text-primary-green pl-1">
              {" "}
              Login
            </Link>
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
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
