import React from "react";
import Image from "next/image";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  GiftIcon,
  BanknotesIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Investments tracking",
    description:
      "Track your investments easily online from the comfort of your home through your back office.",
    icon: ChartBarIcon,
  },
  {
    name: "Fast Withdrawals",
    description:
      "Withdrawal requests process within 0- 24 hours (from Monday to Sunday) without any fee.",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Affiliate program",
    description:
      "Earn up to 20% referral rewards using our multi-level affiliate program.",
    icon: BriefcaseIcon,
  },
  {
    name: "Customer Service",
    description:
      "Top notch Customer Service ready to help and fix the issue no matter the time.",
    icon: GiftIcon,
  },
  {
    name: "We accept",
    description:
      "We accept the most popular e-currencies for deposits & withdrawals",
    icon: BanknotesIcon,
  },
  {
    name: "Collaboration",
    description:
      "Partner relations on mutually beneficial terms with the largest exchanges of the world.",
    icon: ChartPieIcon,
  },
];

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto px-6 lg:px-8 container">
        <div className="mx-auto md:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            FEATURES
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why choose TRINVEST
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            High levels of professionalism and a strong foundation of stability
            within the cryptocurrency industry.
          </p>
        </div>
        <div className="relative w-full h-[32rem] sm:h-[20rem] md:h-[25rem] lg:h-[38rem] mt-20">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-white" />
          <Image
            src={"/assets/about-img.png"}
            alt="Product screenshot"
            className="w-full h-full object-cover rounded-xl shadow-xl ring-1 ring-gray-400/10"
            layout="fill"
          />
        </div>
        <div className="mx-auto mt-16 sm:mt-20 lg:mt-24">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-950">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
