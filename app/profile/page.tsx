"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";

const ProfileDashboard = () => {
  return (
    <div>
      <Toaster />
      <DashboardNav />
    </div>
  );
};

export default ProfileDashboard;
