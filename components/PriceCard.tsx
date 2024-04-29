import Link from "next/link";
import React from "react";

interface PriceCardProps {
  name: string;
  description: string;
  minDeposit: string;
  maxDeposit: string;
  roi: string;
  revenue: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
  name,
  description,
  minDeposit,
  maxDeposit,
  roi,
  revenue,
}) => {
  const isMaxOrMin =
    revenue !== null &&
    revenue !== undefined &&
    (revenue.toString().includes("Max.") ||
      revenue.toString().includes("Min."));
  const isTotalReturn =
    revenue !== null &&
    revenue !== undefined &&
    revenue.toString().includes("Total return:");

  return (
    <div className="w-full md:w-6/12 lg:w-4/12 p-4">
      <div className="bg-gray-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-4">
          {name}
        </h3>
        <p className="flex items-baseline justify-center gap-x-2 mb-6">
          <span className="text-base font-bold tracking-tight text-gray-900 mb-8">
            Total ROI = {roi}
          </span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
            (USD)
          </span>
        </p>

        <p className="text-base font-semibold text-gray-600 mb-16">
          {description}
        </p>
        <p className="text-sm mb-2">Deposit Amount</p>
        <p className="flex items-baseline justify-center gap-x-2 mb-6">
          <span className="text-base font-bold tracking-tight text-gray-900">
            {minDeposit} - {maxDeposit}
          </span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
            (USD)
          </span>
        </p>
        <Link
          href={"/signup"}
          className="block w-full rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Invest
        </Link>
        <p
          id="revenueDisplay"
          className={`text-sm mt-4 py-2 font-bold tracking-tight ${
            isMaxOrMin ? "text-red-500" : "text-gray-900"
          } ${isMaxOrMin && "bg-red-100"} ${
            isTotalReturn && "text-green-500 bg-amber-200"
          }`}
        >
          {revenue}
        </p>
      </div>
    </div>
  );
};

export default PriceCard;
