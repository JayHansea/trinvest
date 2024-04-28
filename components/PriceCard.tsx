import React from "react";

interface PriceCardProps {
  name: string;
  description: string;
  deposit: string;
  roi: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
  name,
  description,
  deposit,
  roi,
}) => {
  return (
    <div className="w-full md:w-6/12 lg:w-4/12 p-4">
      <div className="bg-gray-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-4">
          {name}
        </h3>
        <p className="text-base font-bold tracking-tight text-gray-900 mb-8">
          Total ROI = {roi}
        </p>
        <p className="text-base font-semibold text-gray-600 mb-16">
          {description}
        </p>
        <p className="text-sm mb-2">Deposit Amount</p>
        <p className="flex items-baseline justify-center gap-x-2 mb-6">
          <span className="text-base font-bold tracking-tight text-gray-900">
            {deposit}
          </span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
            USD
          </span>
        </p>
        <a
          href="#"
          className="block w-full rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Invest
        </a>
        <p className="mt-4 text-xs leading-5 text-gray-600"></p>
      </div>
    </div>
  );
};

export default PriceCard;
