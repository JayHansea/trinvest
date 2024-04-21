"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`relative ${navbar ? "sticky top-0 bg-black z-50" : ""}`}>
      <div className="w-full bg-banner-bg bg-top bg-no-repeat bg-cover">
        <div className="w-full bg-black opacity-80 text-white">
          <div className="border-amber-300 text-amber-300 border-b-[1px]">
            <div className="place-content-center container w-full h-28 mx-auto">
              <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                  <h1 className="text-2xl uppercase font-bold">Trinvest</h1>
                </Link>
                {/* Hamburger button for mobile */}
                <div className="md:hidden">
                  <button className="p-2" onClick={() => setNavbar(!navbar)}>
                    {navbar ? (
                      <Image
                        src={"/assets/circle.png"}
                        width={40}
                        height={40}
                        alt="hamburger close"
                        className="hidden"
                      />
                    ) : (
                      <Image
                        src={"/assets/square.png"}
                        width={40}
                        height={40}
                        alt="hamburger open"
                      />
                    )}
                  </button>
                </div>
                {/* Nav menu */}
                <div className="hidden  md:flex md:items-center md:gap-6 md:text-sm md:justify-center">
                  <div className="mx-auto px-4 flex items-center gap-6 text-sm justify-between">
                    <Link className="navbarLi" href={"#"}>
                      About Us
                    </Link>
                    <Link className="navbarLi" href={"#"}>
                      Pricing & Plans
                    </Link>
                    <Link className="navbarLi" href={"#"}>
                      FAQs
                    </Link>
                    <Link className="navbarLi" href={"#"}>
                      Contacts
                    </Link>
                  </div>
                  <div className="flex items-center gap-6 text-sm justify-between">
                    <Link className="navbarLi" href={"/signin"}>
                      Sign in
                    </Link>
                    <Link href={"/signup"}>
                      <button className="w-auto h-auto px-7 py-2.5 bg-amber-300 text-black text-sm rounded-md hover:bg-white">
                        Register
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger menu overlay */}
      {navbar && (
        <div className="fixed top-0 left-0 w-full h-full bg-blue-950 bg-opacity-90 flex justify-center items-center z-50 md:hidden">
          <div className="fixed top-5 right-10">
            <button className="p-2" onClick={() => setNavbar(!navbar)}>
              {navbar ? (
                <Image
                  src={"/assets/circle.png"}
                  width={40}
                  height={40}
                  alt="hamburger close"
                />
              ) : (
                <Image
                  src={"/assets/square.png"}
                  width={40}
                  height={40}
                  alt="hamburger open"
                />
              )}
            </button>
          </div>
          <div className="text-white text-center">
            <Link
              className="block py-4 text-amber-300"
              href={"#"}
              onClick={() => setNavbar(!navbar)}
            >
              About Us
            </Link>
            <Link
              className="block py-4 text-amber-300"
              href={"#"}
              onClick={() => setNavbar(!navbar)}
            >
              Pricing & Plans
            </Link>
            <Link
              className="block py-4 text-amber-300"
              href={"#"}
              onClick={() => setNavbar(!navbar)}
            >
              FAQs
            </Link>
            <Link
              className="block py-4 text-amber-300"
              href={"#"}
              onClick={() => setNavbar(!navbar)}
            >
              Contacts
            </Link>
            <Link
              className="block py-4 text-amber-300"
              href={"/signin"}
              onClick={() => setNavbar(!navbar)}
            >
              Sign in
            </Link>
            <Link href={"/signup"}>
              <button
                onClick={() => setNavbar(!navbar)}
                className="w-auto h-auto px-7 py-2.5 bg-amber-300 text-black text-sm rounded-md hover:bg-white"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
