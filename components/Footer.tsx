import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-950 py-10 sm:py-16 lg:py-24">
      <div className="mx-auto px-6 lg:px-8 container">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 ">
          <div className="max-w-xl lg:max-w-lg ">
            <h2 className="text-3xl font-bold tracking-tight text-amber-300 sm:text-4xl">
              TRINVEST
            </h2>
            <p className="mt-4 text-base leading-8 text-gray-300">
              TRINVEST, an AI-driven trading firm, integrates the finesse of
              trading with a dedication to ongoing evolution. These attributes
              form the bedrock for achieving notable milestones within the
              trading sector.
            </p>
          </div>
          <dl className="grid grid-cols-1 gap-x-0 gap-y-10 sm:grid-cols-2">
            <div className="flex flex-col items-start">
              <dt className="my-4 font-semibold text-amber-300">Navigation</dt>
              <dd className="my-2 leading-7 text-gray-400 text-sm">
                <Link
                  className="hover:text-amber-300 cursor-pointer duration-100"
                  href={"#"}
                >
                  About Us
                </Link>
              </dd>
              <dd className="my-2 leading-7 text-gray-400 text-sm">
                <Link
                  className="hover:text-amber-300 cursor-pointer duration-100"
                  href={"#"}
                >
                  Pricing & Plan
                </Link>
              </dd>
              <dd className="my-2 leading-7 text-gray-400 text-sm">
                <Link
                  className="hover:text-amber-300 cursor-pointer duration-100"
                  href={"#"}
                >
                  FAQs
                </Link>
              </dd>
              <dd className="my-2 leading-7 text-gray-400 text-sm">
                <Link
                  className="hover:text-amber-300 cursor-pointer duration-100"
                  href={"#"}
                >
                  Contact Us
                </Link>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="mt-4 font-semibold text-amber-300">
                Want product news and updates?
              </dt>
              <dt className="font-semibold text-amber-300">
                Sign up for our newsletter.
              </dt>
              <dd className="mt-2 leading-7 text-gray-400">
                <div className="mt-6 flex items-stretch max-w-xs md:max-w-md gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="w-auto h-auto px-7 py-2.5 bg-amber-300 text-black text-sm rounded-md hover:bg-white"
                  >
                    Subscribe
                  </button>
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <p className="text-xs text-center text-gray-600 pt-16">
          By utilizing this website, you acknowledge your acceptance of our
          Terms of Use and Privacy Policy. It is of utmost importance to conduct
          comprehensive research.
          <br />
          <br /> © 2024 trinvest.io
        </p>
      </div>
      {/* <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div> */}
    </div>
  );
};

export default Footer;
