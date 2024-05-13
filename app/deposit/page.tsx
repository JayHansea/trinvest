"use client";
import React, { useEffect, useState } from "react";
import plans from "@/utils/PlanFeatures";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import PriceCard from "@/components/PriceCard";
import CalcRevenue from "@/components/CalcRevenue";
import DashboardNav from "@/components/DashboardNav";

interface Props {
  user: any; // Define the type of user details
  logout: () => void;
}

interface User {
  firstname: string;
  // Add other properties if necessary
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Deposit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({ firstname: "" });
  const [revenues, setRevenues] = useState<Record<string, string>>({});
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentConfirmed(false);
  };

  const handleRevenueChange = (revenues: Record<string, string>) => {
    setRevenues(revenues);
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");

      // Simulate a successful logout
      toast.success("Logout successful", {
        style: {
          backgroundColor: "#cef7ea",
          color: "#306844",
        },
        duration: 3000,
      });

      // Simulate a successful logout and redirect after 3 seconds
      setTimeout(() => {
        setLoading(false);
        router.push("/");
      }, 3000);
    } catch (error: any) {
      console.log(error.message);

      // Simulate an unsuccessful logout
      toast.error(error.message, {
        style: {
          backgroundColor: "#FFCBDD",
          color: "#f00",
        },
        duration: 3000,
      });
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/user");
      setUser(res.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
  };

  return (
    <div>
      <div className={`${loading && "cursor-wait"} bg-gray-100`}>
        <Toaster />
        <DashboardNav logout={logout} user={user} />
        <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="p-2 place-self-center mb-6 rounded-full">
            <span className="text-2xl font-bold leading-7 bg-gray-800 px-2 py-1 mr-2 text-white rounded-md">
              Step 1 :{" "}
            </span>
            <span className="text-2xl font-bold leading-7">
              Choose Investment Plan
            </span>
          </div>
          <div className="flex flex-wrap justify-center">
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
                selected={selectedPlan === planName}
                onSelect={() => handlePlanSelect(planName)}
              />
            ))}
          </div>
          <CalcRevenue onRevenueChange={handleRevenueChange} />

          <div className="p-2 place-self-center my-6 rounded-full">
            <span className="text-2xl font-bold leading-7 bg-gray-800 px-2 py-1 mr-2 text-white rounded-md">
              Step 2 :{" "}
            </span>
            <span className="text-2xl font-bold leading-7">
              Choose Payment Method
            </span>
          </div>
          <div className="my-10">
            <div className="my-5 flex">
              <input
                className="mr-5 mt-6"
                type="radio"
                name="paymentCurrency"
                id="tetherUSDT"
                value="usdt"
              />
              <p className="text-2xl font-semibold leading-7 bg-gray-200 p-5 rounded-md">
                Tether TRC 20 (USDT)
              </p>
            </div>
            <div className="my-5 flex">
              <input
                className="mr-5 mt-6"
                type="radio"
                name="paymentCurrency"
                id="bitcoin"
                value="bitcoin"
              />
              <p className="text-2xl font-semibold leading-7 bg-gray-200 p-5 rounded-md">
                Bitcoin
              </p>
            </div>
          </div>
          <div className="p-2 place-self-center my-6 rounded-full">
            <span className="text-2xl font-bold leading-7 bg-gray-800 px-2 py-1 mr-2 text-white rounded-md">
              Step 3 :{" "}
            </span>
            <span className="text-2xl font-bold leading-7">
              Enter amount to invest (USD)
            </span>
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-base font-medium leading-6"
            >
              Email amount
            </label>
            <div className="mt-2">
              <input
                id="amount"
                name="amount"
                type="text"
                required
                className="block md:w-1/2 lg:w-4/12 rounded-md border-0 py-1.5 text-gray-800  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={openModal}
              className="flex md:w-1/2 lg:w-4/12 justify-center rounded-md bg-amber-300 text-black my-16 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              Invest
            </button>
          </div>
        </main>
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      {paymentConfirmed ? (
                        <h3
                          className="text-lg leading-6 font-medium text-green-600"
                          id="modal-title"
                        >
                          Thank you
                        </h3>
                      ) : (
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          Investment Information
                        </h3>
                      )}

                      <div className="pt-5 pb-4 sm:pb-4">
                        {paymentConfirmed ? (
                          <p className="text-lg font-semibold text-green-700">
                            Investment will reflect on your dashboard as soon as
                            an admin confirms your payment
                          </p>
                        ) : (
                          <div className="pt-5 pb-4 sm:pb-4">
                            <div className="flex flex-col gap-y-2">
                              <div className="flex justify-between">
                                <span className="font-semibold">Plan:</span>
                                <span>Amateur Plan: 2% Daily for 12 Days</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">Profit:</span>
                                <span>2.00% Daily for 12 days</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Principal Return:
                                </span>
                                <span>Yes</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Principal Withdraw:
                                </span>
                                <span>Not available</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Credit Amount:
                                </span>
                                <span>$7654.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Deposit Fee:
                                </span>
                                <span>
                                  0.00% + $0.00 (min. $0.00 max. $0.00)
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Debit Amount:
                                </span>
                                <span>$7654.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  USDT.TRC20 Debit Amount:
                                </span>
                                <span>7654.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Order status:
                                </span>
                                <span>Waiting for payment</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {paymentConfirmed ? (
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-gray-300 hover:border-0 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Okay
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={handleConfirmPayment}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-300 text-base font-medium text-black hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Confirm Payment
                    </button>
                    <button
                      onClick={closeModal}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deposit;
