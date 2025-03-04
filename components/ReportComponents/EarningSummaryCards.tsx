import { numberWithCommas } from "@/helpers";
import { getCurrencySign } from "@/helpers/getCurrencySign";
import React from "react";

interface EarningSummaryCardsProps {
  earnings: any;
}

const EarningSummaryCards = ({ earnings }: EarningSummaryCardsProps) => {
  const totalsByCurrency = earnings?.totalsByCurrency || {};
  const currentCurrency = Object.keys(totalsByCurrency)[0] || "";

  const earned = totalsByCurrency[currentCurrency]?.earned ?? 0;
  const expenses = totalsByCurrency[currentCurrency]?.expenses ?? 0;

  return (
    <div className="flex flex-wrap gap-6 mt-5">
      {/* Earned Section */}
      <div className="max-w-full w-full flex-1 min-w-[340px] max-h-[160px] min-h-[116px] bg-white  px-4 py-6  border-1 rounded-lg">
        <p className=" sm:text-lg font-medium font-inter ">Amount Spent</p>
        <h2 className="text-[#FF5D7A] text-3xl  font-bold max-sm:text-2xl">
          {currentCurrency && getCurrencySign(currentCurrency)}
          {numberWithCommas(expenses)}
        </h2>
        <p className="text-[#303632] text-sm max-sm:text-xs ">This Month</p>
      </div>

      {/* Expenses Section */}
      <div className="max-w-full w-full flex-1 min-w-[340px] max-h-[160px] min-h-[116px] bg-white px-4 py-6  border-1 rounded-lg">
        <p className=" sm:text-lg font-medium font-inter">Amount Earned</p>
        <h2 className="text-primary-green text-3xl  font-bold max-sm:text-2xl ">
          {currentCurrency && getCurrencySign(currentCurrency)}
          {numberWithCommas(earned)}
        </h2>
        <p className="text-[#303632] text-sm max-sm:text-xs ">This Month</p>
      </div>
    </div>
  );
};

export default EarningSummaryCards;
