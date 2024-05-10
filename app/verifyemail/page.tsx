"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      const verifyUserEmail = async () => {
        try {
          await axios.post("/api/users/verifyemail", { token });
          setVerified(true);
        } catch (error: any) {
          setError(true);
          console.log(error.response.data);
        }
      };

      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Verify Email
          </h2>
          <p className="mt-5 text-center font-semibold text-sm text-amber-300">
            {token ? (
              `${token}`
            ) : (
              <span>
                Error... Token missing <span className="text-2xl">😢</span>
              </span>
            )}
          </p>
        </div>
        {verified && (
          <div className="text-center">
            <h2 className="text-xl text-green-600">Email Verified</h2>
            <p className="mt-2 text-sm text-white">
              You can now{" "}
              <Link
                className="font-semibold leading-6 text-indigo-600 hover:text-white"
                href="/login"
              >
                Login
              </Link>
            </p>
          </div>
        )}
        {error && (
          <div className="text-center">
            <h2 className="text-xl text-red-600">Email Verification Error</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
