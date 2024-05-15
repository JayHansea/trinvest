"use client";
import React, { useEffect, useState } from "react";
import plans from "@/utils/PlanFeatures";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import PriceCard from "@/components/PriceCard";
import CalcRevenue from "@/components/CalcRevenue";
import DashboardNav from "@/components/DashboardNav";
import PulseLoader from "react-spinners/PulseLoader";
import Image from "next/image";

interface Props {
  user: any; // Define the type of user details
  logout: () => void;
}

interface Plan {
  planName: string;
  percentage: string;
  days: string;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Deposit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>({
    planName: "",
    percentage: "",
    days: "",
  });
  const [revenues, setRevenues] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // const [checkedRadio, setCheckedRadio] = useState("");
  const [user, setUser] = useState<{
    plan: { planName: string; percentage: string; days: string };
    amount: string;
  }>({
    plan: {
      planName: "",
      percentage: "",
      days: "",
    },
    amount: "",
  });

  // console.log(checkedRadio);
  // console.log(selectedPlan);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    openModal(); // Open the modal when the form is submitted
  };

  // const getUserDetails = async () => {
  //   try {
  //     const res = await axios.get("/api/users/user");
  //     setUser(res.data.data);
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //   }
  // };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  useEffect(() => {
    console.log("selectedPlan:", selectedPlan);
    // console.log("checkedRadio:", checkedRadio);
    console.log("user.amount:", user.amount);
    // Enable/disable button based on form validity
    if (selectedPlan && user.amount) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [selectedPlan, user.amount]);

  const handlePlanSelect = (
    planName: string,
    percentage: string,
    days: string
  ) => {
    // Update the selected plan state
    setSelectedPlan({
      planName,
      percentage,
      days,
    });

    // Update the user state with the selected plan details
    setUser((prevUser) => ({
      ...prevUser,
      plan: {
        planName,
        percentage,
        days,
      },
    }));
  };

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
  };

  useEffect(() => {
    // Function to restrict input to numbers only
    const handleInputChange = (e: any) => {
      const { value } = e.target;
      const newValue = value.replace(/[^\d.]/g, ""); // Remove non-numeric characters
      setUser({ ...user, amount: newValue }); // Update user.amount state
    };

    // Add event listener to the input field
    const inputElement = document.getElementById("amount");
    if (inputElement) {
      inputElement.addEventListener("input", handleInputChange);
    }

    // Cleanup function to remove event listener
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("input", handleInputChange);
      }
    };
  }, [user]);

  return (
    <div>
      <div className={`${loading && "cursor-wait"} bg-gray-100`}>
        <Toaster />
        <DashboardNav logout={logout} user={user} />
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
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
                  selected={selectedPlan.planName === planName}
                  onSelect={() =>
                    handlePlanSelect(
                      planName,
                      plans[planName].percentageInterest,
                      plans[planName].days
                    )
                  }
                />
              ))}
            </div>
            <CalcRevenue onRevenueChange={handleRevenueChange} />

            {/* <div className="p-2 place-self-center my-6 rounded-full">
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
                  id="usdt"
                  value="usdt"
                  checked={checkedRadio === "usdt"}
                  onChange={() => setCheckedRadio("USDT")}
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
                  checked={checkedRadio === "bitcoin"}
                  onChange={() => setCheckedRadio("bitcoin")}
                />
                <p className="text-2xl font-semibold leading-7 bg-gray-200 p-5 rounded-md">
                  Bitcoin
                </p>
              </div>
            </div> */}
            <div className="p-2 place-self-center my-6 rounded-full">
              <span className="text-2xl font-bold leading-7 bg-gray-800 px-2 py-1 mr-2 text-white rounded-md">
                Step 2 :{" "}
              </span>
              <span className="text-2xl font-bold leading-7">
                Enter amount to invest (TetherUSD ERC20)
              </span>
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-base font-medium leading-6"
              >
                Enter amount
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  inputMode="numeric"
                  value={user.amount}
                  placeholder="100"
                  required
                  onChange={(e) => setUser({ ...user, amount: e.target.value })}
                  className="block md:w-1/2 lg:w-4/12 rounded-md border-0 py-1.5 text-gray-800  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-5">
                <span className="font-bold">100.00 USDT</span> is the minimum
                investment price
              </p>
            </div>
            <div>
              <button
                type="submit"
                onClick={openModal}
                disabled={buttonDisabled}
                className={`flex w-full md:w-1/2 lg:w-4/12 my-10 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 bg-amber-300 text-black ${
                  buttonDisabled &&
                  "bg-gray-400 text-gray-700 cursor-not-allowed hover:bg-gray-400"
                }  ${loading && "cursor-wait"}`}
              >
                Invest
              </button>
            </div>
          </form>
        </div>
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-90"></div>
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
                          <div className="pt-5 pb-4 sm:pb-4 text-sm md:text-base">
                            <div className="flex flex-col gap-y-2">
                              <div className="flex justify-between">
                                <span className="font-semibold">Plan:</span>
                                <span>{selectedPlan.planName} Plan</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">Profit:</span>
                                <span>
                                  {selectedPlan.percentage}% Daily for{" "}
                                  {selectedPlan.days} days
                                </span>
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
                                <span>${user.amount}.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Deposit Fee:
                                </span>
                                <span>$0.00 (0.00%)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Debit Amount:
                                </span>
                                <span>${user.amount}.00</span>
                              </div>
                              {/* <div className="flex justify-between">
                                <span className="font-semibold">
                                  {checkedRadio} Debit Amount:
                                </span>
                                <span>7654.00</span>
                              </div> */}
                              <p className="mt-6 mb-2 text-xs md:text-base text-center">
                                Please send{" "}
                                <span className="font-bold">
                                  ${user.amount} USDT
                                </span>{" "}
                                to{" "}
                              </p>
                              <div className="flex place-content-center ">
                                <Image
                                  src={"/assets/ERC20_wallet.jpg"}
                                  width={100}
                                  height={100}
                                  alt="Wallet barcode"
                                />
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">
                                  Wallet Address:{" "}
                                </span>
                                <span className="font-bold md:ml-10">
                                  0xbd1d3ffb5a08097bdd40db86706 22aa47bf16cf5
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">Network:</span>
                                <span className="font-bold">ERC 20</span>
                              </div>
                              <div className="flex justify-between mt-6">
                                <span className="font-semibold">
                                  Order status:
                                </span>
                                <span>
                                  <span className="mr-3">
                                    Waiting for payment
                                  </span>
                                  <span>
                                    <PulseLoader
                                      color="#fcd34d"
                                      speedMultiplier={0.7}
                                    />
                                  </span>
                                </span>
                              </div>
                            </div>
                            <p className="mt-10 text-xs md:text-sm italic">
                              Note: Click on Confirm Payment button as soon as
                              you make payment
                            </p>
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
