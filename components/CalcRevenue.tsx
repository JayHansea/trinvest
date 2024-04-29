"use client";
import React, { useState, useEffect, useCallback } from "react";
import plans, { Plan } from "@/utils/PlanFeatures";

interface CalcRevenueProps {
  onRevenueChange: (revenues: Record<string, string>) => void;
}

const CalcRevenue: React.FC<CalcRevenueProps> = ({ onRevenueChange }) => {
  const [volume, setVolume] = useState<number>(100); // Initial volume
  const [revenues, setRevenues] = useState<Record<string, string>>({});

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  const memoizedOnRevenueChange = useCallback(onRevenueChange, []);

  useEffect(() => {
    const calculateRevenues = () => {
      const newRevenues: Record<string, string> = {};
      Object.keys(plans).forEach((planName) => {
        const plan = plans[planName];
        const dailyInterestRate = parseFloat(plan.percentageInterest) / 100;
        const amountAfterDays =
          volume * Math.pow(1 + dailyInterestRate, parseInt(plan.days));
        const totalReturn = parseFloat(amountAfterDays.toFixed(2));

        // Check if total return is within the allowed range
        if (totalReturn < parseInt(plan.minTotalROI)) {
          // Total return is below minTotalROI
          newRevenues[planName] = `Min. amount is ${plan.minDeposit} USD`; // Flag for displaying minDeposit
        } else if (totalReturn > parseInt(plan.maxTotalROI)) {
          // Total return is above maxTotalROI
          newRevenues[planName] = `Max. amount is ${plan.maxDeposit} USD`; // Flag for displaying maxDeposit
        } else {
          // Total return is within range
          newRevenues[planName] = `Total return: ${totalReturn} USD`;
        }
      });
      setRevenues(newRevenues);
      memoizedOnRevenueChange(newRevenues);
    };

    calculateRevenues();
  }, [volume, memoizedOnRevenueChange]);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="my-6 md:w-6/12 lg:w-4/12 bg-gray-200 rounded-lg p-6">
        <div className="my-6 flex items-center">
          <p className="text-lg leading-8 text-gray-600">
            Calculate your revenue
          </p>
        </div>
        <div>
          <div className="mt-2.5">
            <input
              type="text"
              name="subject"
              id="subject"
              autoComplete="subject"
              value={volume.toString()}
              placeholder={volume.toString()}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs leading-8 text-gray-900 font-bold italic font-mono">
            (Drag range from left to right and vice versa to calculate interest)
          </p>
          <input
            type="range"
            min="100"
            max="500000"
            value={volume}
            onChange={handleVolumeChange}
            className="slider"
          />
        </div>
      </div>
    </div>
  );
};

export default CalcRevenue;
