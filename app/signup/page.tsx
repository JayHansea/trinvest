"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const SignUp = () => {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to validate email address using regex
  const isValidEmail = (email: string): boolean => {
    // Regular expression pattern for validating email address
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email.toLowerCase());
  };

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Check if passwords match
      if (user.password !== user.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Validate email address
      if (!isValidEmail(user.email)) {
        throw new Error("Invalid email address");
      }

      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);

      // Simulate a successful signup
      setUser({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
      });
      toast.success("SignUp successful", {
        style: {
          backgroundColor: "#cef7ea",
          color: "#306844",
        },
        duration: 3000,
      });

      // Simulate a successful login and redirect after 3 seconds
      setTimeout(() => {
        setLoading(false);
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message, {
        style: {
          backgroundColor: "#FFCBDD",
          color: "#f00",
        },
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable/disable button based on form validity
    if (
      user.firstname.length > 0 &&
      user.lastname.length > 0 &&
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.confirmPassword.length > 0 &&
      agreed
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, agreed]);

  return (
    <div
      className={`bg-gray-950 flex md:h-full sm:h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 place-content-center ${
        loading && "cursor-wait"
      } `}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-2xl text-center uppercase font-bold text-amber-300">
          <Link href={"/"}>Trinvest</Link>
        </h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Create a new account
        </h2>
        <h2 className="mt-5 text-center text-base leading-9 tracking-tight text-white">
          <Toaster />
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSignUp}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium leading-6 text-white"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  autoComplete="given-name"
                  required
                  value={user.firstname}
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-white"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  autoComplete="family-name"
                  required
                  value={user.lastname}
                  onChange={(e) =>
                    setUser({ ...user, lastname: e.target.value })
                  }
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
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
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer stroke-cyan-500 hover:stroke-cyan-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-white"
              >
                Retype Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer stroke-cyan-500 hover:stroke-cyan-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                aria-required
                className={classNames(
                  agreed ? "bg-amber-300" : "bg-gray-200",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? "translate-x-3.5" : "translate-x-0",
                    "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-white">
              By selecting this, you agree to our{" "}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group>

          <div>
            <button
              type="submit"
              disabled={buttonDisabled}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 bg-amber-300 text-black ${
                buttonDisabled &&
                "bg-gray-400 text-gray-700 cursor-not-allowed hover:bg-gray-400"
              }  ${loading && "cursor-wait"}`}
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-white">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-white"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
