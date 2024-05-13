"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";
import Dashboard from "@/components/Dashboard";

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

const ProfileDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({ firstname: "" });

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

  return (
    <div className={`${loading && "cursor-wait"} bg-gray-100`}>
      <Toaster />
      <DashboardNav user={user} logout={logout} />
      <main>
        <div className={`mx-auto container py-6 h-auto md:h-screen`}>
          <Dashboard user={user} />
        </div>
      </main>
    </div>
  );
};

export default ProfileDashboard;
