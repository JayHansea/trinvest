"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";
import Dashboard from "@/components/Dashboard";

interface User {
  id: string;
  firstname: string;
}

interface Investment {
  walletBalance: number;
  depositAmount: number;
  interest: number;
  percentageInterest: number;
  plan: string;
  bitcoinWalletAddress: string;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const ProfileDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({ firstname: "", id: "" });
  const [investment, setInvestment] = useState<Investment | null>(null);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");

      toast.success("Logout successful", {
        style: {
          backgroundColor: "#cef7ea",
          color: "#306844",
        },
        duration: 3000,
      });

      setTimeout(() => {
        setLoading(false);
        router.push("/");
      }, 3000);
    } catch (error: any) {
      console.log(error.message);

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
    depositAmount: 0,
    interest: 0,
    percentageInterest: 0,
    plan: "N/A",
    bitcoinWalletAddress: "N/A",
  };

  return (
    <div className={`${loading && "cursor-wait"} bg-gray-100`}>
      <Toaster />
      <DashboardNav user={user} logout={logout} />
      <main>
        <div className="mx-auto container py-6 h-auto md:h-screen">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Dashboard
              user={user}
              investment={investment ?? defaultInvestment}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfileDashboard;
