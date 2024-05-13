"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
  user: any; // Define the type of user details
  logout: () => void;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const DashboardNav = ({ logout }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState("");

  const handleNavItemClick = (text: React.SetStateAction<string>) => {
    setSelectedNavItem(text);
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-1xl lg:text-2xl uppercase font-bold text-white">
                Trinvest
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-baseline space-x-2">
                <Link
                  className={classNames(
                    selectedNavItem === "Dashboard"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-3 py-2 rounded-md text-sm"
                  )}
                  href={"/dashboard"}
                  onClick={() => handleNavItemClick("Dashboard")}
                >
                  Dashboard
                </Link>
                <Link
                  className={classNames(
                    selectedNavItem === "Deposit"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-3 py-2 rounded-md text-sm"
                  )}
                  href={"/deposit"}
                  onClick={() => handleNavItemClick("Deposit")}
                >
                  Deposit
                </Link>
                <Link
                  className={classNames(
                    selectedNavItem === "Withdraw"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-3 py-2 rounded-md text-sm"
                  )}
                  href={"/withdraw"}
                  onClick={() => handleNavItemClick("Withdraw")}
                >
                  Withdraw
                </Link>
                <Link
                  className={classNames(
                    selectedNavItem === "History"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-3 py-2 rounded-md text-sm"
                  )}
                  href={"history"}
                  onClick={() => handleNavItemClick("History")}
                >
                  History
                </Link>
                <Link
                  className={classNames(
                    selectedNavItem === "Profile"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-3 py-2 rounded-md text-sm"
                  )}
                  href={"profile"}
                  onClick={() => handleNavItemClick("Profile")}
                >
                  Profile
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      type="button"
                      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex justify-center">
          <div
            className={classNames(isOpen ? "block" : "hidden", "container")}
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                className={classNames(
                  selectedNavItem === "Dashboard"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "px-3 py-2 rounded-md block font-medium text-sm"
                )}
                href={"/dashboard"}
                onClick={() => handleNavItemClick("Dashboard")}
              >
                Dashboard
              </Link>
              <Link
                className={classNames(
                  selectedNavItem === "Deposit"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "px-3 py-2 rounded-md block font-medium text-sm"
                )}
                href={"/deposit"}
                onClick={() => handleNavItemClick("Deposit")}
              >
                Deposit
              </Link>
              <Link
                className={classNames(
                  selectedNavItem === "Withdraw"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "px-3 py-2 rounded-md block font-medium text-sm"
                )}
                href={"withdraw"}
                onClick={() => handleNavItemClick("Withdraw")}
              >
                Withdraw
              </Link>
              <Link
                className={classNames(
                  selectedNavItem === "History"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "px-3 py-2 rounded-md block font-medium text-sm"
                )}
                href={"history"}
                onClick={() => handleNavItemClick("History")}
              >
                History
              </Link>
              <Link
                className={classNames(
                  selectedNavItem === "Profile"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "px-3 py-2 rounded-md block font-medium text-sm"
                )}
                href={"profile"}
                onClick={() => handleNavItemClick("Profile")}
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="mx-auto container flex justify-between items-center px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-base md:text-3xl font-bold tracking-tight text-gray-900">
            {selectedNavItem}
          </h1>
          <div className="flex items-center">
            <button className="bg-amber-400 text-gray-800 px-4 py-2 rounded-md mr-2 md:mr-4 text-sm md:text-base">
              Make a deposit
            </button>
            <button
              onClick={logout}
              className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md text-sm md:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardNav;
