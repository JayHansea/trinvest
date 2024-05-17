"use client";
import DashboardNav from "@/components/DashboardNav";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  user: any; // Define the type of user details
  logout: () => void;
}

const Transactionhistory = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

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
  return (
    <div
      className={`${loading && "cursor-wait"} bg-gray-100 h-full md:h-screen`}
    >
      <Toaster />
      <DashboardNav logout={logout} user={user} />
      <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold mb-6">Transaction History</h2>
        <table className="w-full md:min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                Jan 1, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                Deposit
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                $10,000.00
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                Success
              </td> */}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                Jan 1, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                Deposit
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                $10,000.00
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                Success
              </td> */}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                Jan 1, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                Deposit
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                $10,000.00
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                Success
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactionhistory;
