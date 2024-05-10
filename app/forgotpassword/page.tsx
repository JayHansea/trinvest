"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userEmail = await axios.post("/api/users/forgotpassword", {
        email,
      });
      console.log(userEmail);

      // Simulate successful
      toast.success("Successful, check your email for reset token", {
        style: {
          backgroundColor: "#cef7ea",
          color: "#306844",
        },
        duration: 3000,
      });
    } catch (error: any) {
      console.log("Email submmission failed", error.message);

      const errorMessage =
        error.response.data.error || "Request error, Email submmission failed";

      toast.error(errorMessage, {
        style: {
          backgroundColor: "#FFCBDD",
          color: "#f00",
        },
        duration: 3000,
      });
    } finally {
      setEmail("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  return (
    <div
      className={`bg-gray-950 flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 place-content-center ${
        loading && "cursor-wait"
      } `}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-2xl text-center uppercase font-bold text-amber-300">
          <Link href={"/"}>Trinvest</Link>
        </h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Password Recovery
        </h2>
        <h2 className="mt-5 text-center text-base leading-9 tracking-tight text-white">
          <Toaster />
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submitEmail}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-800  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={buttonDisabled}
              className={`flex w-full justify-center rounded-md bg-amber-300 text-black px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                buttonDisabled &&
                "bg-gray-400 text-gray-700 cursor-not-allowed hover:bg-gray-400"
              }  ${loading && "cursor-wait"}`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
