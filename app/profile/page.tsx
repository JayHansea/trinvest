"use client";
import DashboardNav from "@/components/DashboardNav";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaPen } from "react-icons/fa6";

interface Props {
  user: any; // Define the type of user details
  logout: () => void;
}

interface User {
  firstname: string;
  lastname: string;
  username: string;
  // Add other properties if necessary
}

const ProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [walletAddress, setWalletAddress] = useState("");
  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    username: "",
  });

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

  const handlePasswordChange = async () => {
    try {
      setLoading(true);
      // Make API call to update password
      await axios.put("/api/users/password", passwords);

      toast.success("Password updated successfully", {
        duration: 3000,
      });

      setPasswords({ currentPassword: "", newPassword: "" });
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, {
        duration: 3000,
      });
      setLoading(false);
    }
  };

  const handleAddressChange = async () => {
    try {
      setLoading(true);
      // Make API call to update wallet address
      await axios.put("/api/users/wallet", { walletAddress });

      toast.success("Wallet address updated successfully", {
        duration: 3000,
      });

      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, {
        duration: 3000,
      });
      setLoading(false);
    }
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

  return (
    <div className={`${loading && "cursor-wait"} bg-gray-100 h-screen md:`}>
      <Toaster />
      <DashboardNav logout={logout} user={user} />
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 pt-10 lg:w-2/4">
        <div className="flex items-center mb-4">
          <div className="w-24 h-24 md:w-32 md:h-32 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
              className="w-full h-full object-cover rounded-full"
            />
            <FaPen className="absolute bottom-0 right-4 w-8 h-8 text-white bg-gray-700 rounded-full p-1 cursor-pointer" />
          </div>
          <div className="ml-4">
            <p className="font-bold text-xl">
              {user.firstname} {user.lastname}
            </p>
            <p className="text-gray-500">{user.username}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">Current Password:</label>
          <input
            type="password"
            className="border rounded px-3 py-2 w-full"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">New Password:</label>
          <input
            type="password"
            className="border rounded px-3 py-2 w-full"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />
        </div>
        <button
          className="my-4 py-2 justify-center rounded-md px-3 text-sm font-semibold leading-6 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 bg-amber-300 text-black"
          onClick={handlePasswordChange}
          disabled={loading}
        >
          Update Password
        </button>
        <div className="mt-4">
          <label className="block mb-1 font-bold">Wallet Address:</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
        <button
          className="my-4 py-2 justify-center rounded-md px-3 text-sm font-semibold leading-6 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 bg-amber-300 text-black"
          onClick={handleAddressChange}
          disabled={loading}
        >
          Update Wallet Address
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
