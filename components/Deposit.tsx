import React, { useState } from "react";
import plans from "@/utils/PlanFeatures";
import PriceCard from "@/components/PriceCard";
// import CalcRevenue from "@/components/CalcRevenue";

const Deposit = () => {
  const [revenues, setRevenues] = useState<Record<string, string>>({});

  // const handleRevenueChange = (revenues: Record<string, string>) => {
  //   setRevenues(revenues);
  // };
  return (
    <div>
      {/* <CalcRevenue onRevenueChange={handleRevenueChange} /> */}
      <div className="py-10 flex flex-wrap justify-center">
        {/* Loop through plans and render PriceCard for each plan */}
        {Object.keys(plans).map((planName, index) => (
          <PriceCard
            key={index}
            name={plans[planName].Name}
            description={plans[planName].Description}
            minDeposit={plans[planName].minDeposit}
            maxDeposit={plans[planName].maxDeposit}
            roi={plans[planName].TotalROIDesc}
            revenue={revenues[planName]}
          />
        ))}
      </div>
    </div>
  );
};

export default Deposit;
