"use client";
import React, { useState } from "react";
import plans, { Plan } from "@/utils/PlanFeatures";

interface CalcRevenueProps {
  onRevenueChange: (revenues: Record<string, string>) => void;
}

const CalcRevenue: React.FC<CalcRevenueProps> = ({ onRevenueChange }) => {
  const [volume, setVolume] = useState<number>(100); // Initial volume

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    calculateRevenues(newVolume);
  };

  const calculateRevenues = (volume: number) => {
    const revenues: Record<string, string> = {};
    Object.keys(plans).forEach((planName) => {
      revenues[planName] = calculateRevenue(volume, plans[planName]);
    });
    onRevenueChange(revenues);
  };

  const calculateRevenue = (volume: number, plan: Plan): string => {
    const minDeposit = parseInt(
      plan.minDeposit.replace("$", "").replace(",", "")
    );
    const maxDeposit = parseInt(
      plan.maxDeposit.replace("$", "").replace(",", "")
    );

    if (volume < minDeposit) {
      return `Min. amount is ${plan.minDeposit}`;
    } else if (volume > maxDeposit) {
      return `Max. amount is ${plan.maxDeposit}`;
    } else {
      const description = plan.Description.split(" ");
      const dailyInterestRate = parseFloat(description[0].replace("%", ""));
      const days = parseInt(description[2]);
      let totalROI = volume;
      for (let i = 0; i < days; i++) {
        totalROI *= 1 + dailyInterestRate / 100;
      }
      return `Total return: ${totalROI.toFixed(2)} USD`;
    }
  };

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
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-6">
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
