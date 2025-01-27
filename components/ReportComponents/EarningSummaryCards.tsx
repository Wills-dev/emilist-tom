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
    <div className="flex overflow-x-scroll gap-6 mt-5">
      {/* Earned Section */}
      <div className="max-w-[400px] min-w-[280px] max-h-[160px] min-h-[116px] bg-white  px-4 py-6">
        <h2 className="text-[#FF5D7A] text-3xl  font-bold max-sm:text-2xl">
          {currentCurrency && getCurrencySign(currentCurrency)}
          {numberWithCommas(expenses)}
        </h2>
        <p className="text-[#303632] text-sm max-sm:text-xs ">This Month</p>
        <p className=" sm:text-lg font-medium text-sm font-inter text-right">
          Amount Spent
        </p>
      </div>

      {/* Expenses Section */}
      <div className="max-w-[400px] min-w-[280px] max-h-[160px] min-h-[116px] bg-white px-4 py-6">
        <h2 className="text-primary-green text-3xl  font-bold max-sm:text-2xl ">
          {currentCurrency && getCurrencySign(currentCurrency)}
          {numberWithCommas(earned)}
        </h2>
        <p className="text-[#303632] text-sm max-sm:text-xs ">This Month</p>
        <p className=" sm:text-lg font-medium text-sm font-inter text-right">
          Amount Earned
        </p>
      </div>
    </div>
  );
};

export default EarningSummaryCards;
