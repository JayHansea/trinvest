"use client";
import React, { useState } from "react";

const CalcRevenue: React.FC = () => {
  const [volume, setVolume] = useState<number>(0); // Initial volume

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
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
              placeholder="100"
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-6">
          <input
            type="range"
            min="0"
            max="100"
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
