import React from "react";

const EarningSummaryCards = () => {
  return (
    <div className="flex overflow-x-scroll gap-6 mt-5">
      <div className="max-w-[350px] min-w-[280px] max-h-[160px] min-h-[116px] bg-white  px-4 py-6">
        <h2 className="text-[#FF5D7A] text-[36px] leading-[40px] font-[700] max-sm:text-[25px] ">
          ₦20,000
        </h2>
        <p className="text-[#303632] text-sm  font-[400] max-sm:text-xs ">
          This Month
        </p>
        <p className=" sm:text-lg font-medium text-sm font-inter text-right">
          Amount Spent
        </p>
      </div>
      <div className="max-w-[350px] min-w-[280px] max-h-[160px] min-h-[116px] bg-white px-4 py-6">
        <h2 className="text-primary-green text-[36px] leading-[40px] font-[700] max-sm:text-[25px] ">
          ₦50,000
        </h2>
        <p className="text-[#303632] text-sm  font-[400] max-sm:text-xs ">
          This Month
        </p>
        <p className=" sm:text-lg font-medium text-sm font-inter text-right">
          Amount Earned
        </p>
      </div>
    </div>
  );
};

export default EarningSummaryCards;
