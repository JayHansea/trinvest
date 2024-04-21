import React from "react";
import Link from "next/link";

const BottomBanner = () => {
  return (
    <div className="relative isolate overflow-hidden bg-blue-950 py-10 sm:py-12 lg:py-16">
      <div className="mx-auto px-6 lg:px-8 container">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              We know how to trade successfully!
            </h2>
            <p className="mt-2 text-base leading-8 text-gray-300">
              Join us and enjoy real profit and rewards on your investment.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href={"/signup"}>
              <button
                type="submit"
                className="px-7 py-2.5 bg-amber-300 text-black text-sm rounded-md hover:bg-white"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
