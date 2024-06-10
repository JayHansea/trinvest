"use client";
import DashboardNav from "@/components/DashboardNav";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  logout: () => void;
}

interface User {
  id: string;
}

interface Investment {
  walletBalance: number;
  previousWithdrawal: number;
  totalWithdrawal: number;
  plan: string;
  bitcoinWalletAddress: string;
}

const Withdraw = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [withdrawalLoading, setWithdrawalLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User>({ id: "" });
  const [investment, setInvestment] = useState<Investment | null>(null);

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

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawalLoading(true);
    if (!amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount.");
      setWithdrawalLoading(false);
      return;
    }
    // Add your withdrawal logic here
    setWithdrawalLoading(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue = value.replace(/[^\d.]/g, ""); // Remove non-numeric characters
    setAmount(newValue);
  };

  useEffect(() => {
    const getInvestmentDetails = async () => {
      try {
        const res = await axios.get(`/api/users/investment/${user.id}`);
        console.log("Investment API response:", res.data); // Log the API response
        setInvestment(res.data.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching investment details:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    getInvestmentDetails();
  }, [user.id]);

  const defaultInvestment: Investment = {
    walletBalance: 0,
    previousWithdrawal: 0.0,
    totalWithdrawal: 0.0,
    plan: "N/A",
    bitcoinWalletAddress: "N/A",
  };

  const investmentData = investment || defaultInvestment;

  return (
    <div
      className={`${loading && "cursor-wait"} bg-gray-100 h-full md:h-screen`}
    >
      <Toaster />
      <DashboardNav logout={logout} user={user} />
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Four grayish slightly transparent divs */}
          <div className="bg-gray-200 bg-opacity-50 rounded-lg p-4 w-full">
            <p>Wallet Balance</p>
            <h2 className="text-2xl font-semibold mt-2">
              ${investmentData.walletBalance.toLocaleString()}
            </h2>
          </div>
          <div className="bg-gray-200 bg-opacity-50 rounded-lg p-4 w-full">
            <p>Previous Withdrawal</p>
            <h2 className="text-2xl font-semibold mt-2">
              ${investmentData.previousWithdrawal.toLocaleString()}
            </h2>
          </div>
          <div className="bg-gray-200 bg-opacity-50 rounded-lg p-4 w-full">
            <p>Total Withdrawal</p>
            <h2 className="text-2xl font-semibold mt-2">
              ${investmentData.totalWithdrawal.toLocaleString()}
            </h2>
          </div>
          <div className="bg-gray-200 bg-opacity-50 rounded-lg p-4 w-full">
            <p>Current Plan</p>
            <h2 className="text-2xl font-semibold mt-2">
              {investmentData.plan}
            </h2>
          </div>
        </div>
        <div className="w-full lg:w-6/12 mx-auto my-20 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6">Withdraw Funds</h1>
          <form onSubmit={handleWithdrawal}>
            <div className="mb-4">
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
                  value={amount}
                  placeholder="100"
                  required
                  onChange={handleAmountChange}
                  className="form-input mt-1 w-full block rounded-md border-0 py-1.5 text-gray-800  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              className="w-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 bg-amber-300 text-black text-center"
              type="submit"
              disabled={withdrawalLoading}
            >
              {withdrawalLoading ? "Processing..." : "Withdraw"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
