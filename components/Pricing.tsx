import React from "react";
import PriceCard from "./PriceCard";
import plans from "@/utils/PlanFeatures";

const Pricing = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto px-6 lg:px-8 container">
        <div className="mx-auto sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            PRICING & PLANS
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Investment plans we offer
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            TRINVEST is a highly profitable, secure, and stable investment
            platform. We provide a comprehensive profit system designed to help
            you generate passive income. We are dedicated to working for your
            financial success!
          </p>
        </div>
        {/* Loop through plans and render PriceCard for each plan */}
        <div className="py-10 flex flex-wrap justify-center">
          {Object.keys(plans).map((planName, index) => (
            <PriceCard
              key={index}
              name={plans[planName].Name}
              description={plans[planName].Description}
              deposit={plans[planName].Deposit}
              roi={plans[planName].TotalROI}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
