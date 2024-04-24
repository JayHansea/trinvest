"use client";
import React, { useEffect } from "react";
import { AnalyticsData } from "@/utils/AnalyticsData";
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

const About = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": ${JSON.stringify(AnalyticsData.symbols)},
        "chartOnly": ${AnalyticsData.chartOnly},
        "width": ${AnalyticsData.width},
        "height": ${AnalyticsData.height},
        "locale": "${AnalyticsData.locale}",
        "colorTheme": "${AnalyticsData.colorTheme}",
        "autosize": ${AnalyticsData.autosize},
        "showVolume": ${AnalyticsData.showVolume},
        "showMA": ${AnalyticsData.showMA},
        "hideDateRanges": ${AnalyticsData.hideDateRanges},
        "hideMarketStatus": ${AnalyticsData.hideMarketStatus},
        "hideSymbolLogo": ${AnalyticsData.hideSymbolLogo},
        "scalePosition": "${AnalyticsData.scalePosition}",
        "scaleMode": "${AnalyticsData.scaleMode}",
        "fontFamily": "${AnalyticsData.fontFamily}",
        "fontSize": "${AnalyticsData.fontSize}",
        "noTimeScale": ${AnalyticsData.noTimeScale},
        "valuesTracking": "${AnalyticsData.valuesTracking}",
        "changeMode": "${AnalyticsData.changeMode}",
        "chartType": "${AnalyticsData.chartType}",
        "maLineColor": "${AnalyticsData.maLineColor}",
        "maLineWidth": ${AnalyticsData.maLineWidth},
        "maLength": ${AnalyticsData.maLength},
        "lineWidth": ${AnalyticsData.lineWidth},
        "lineType": ${AnalyticsData.lineType},
        "dateRanges": ${JSON.stringify(AnalyticsData.dateRanges)},
        "upColor": "${AnalyticsData.upColor}",
        "downColor": "${AnalyticsData.downColor}",
        "borderUpColor": "${AnalyticsData.borderUpColor}",
        "borderDownColor": "${AnalyticsData.borderDownColor}",
        "wickUpColor": "${AnalyticsData.wickUpColor}",
        "wickDownColor": "${AnalyticsData.wickDownColor}"
      }
    `;

    // Append the script to the parent div of Coinprice component
    const analyticsDiv = document.getElementById("analytics-container");
    if (analyticsDiv) {
      analyticsDiv.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (analyticsDiv && analyticsDiv.contains(script)) {
        analyticsDiv.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto px-6 lg:px-8 container">
        <div className="mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            ABOUT US
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why choose TRINVEST
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            High levels of professionalism and a strong foundation of stability
            within the cryptocurrency industry.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center mt-10">
          <div className="max-w-lg mx-auto lg:mx-0 lg:max-w-none lg:w-1/2 lg:pr-8 ">
            <div className="mb-10 lg:mb-0">
              <h1 className="text-base font-bold mb-2">
                TRINVEST is a global company with many investors in the World.
              </h1>
              <p className="text-gray-600">
                The trading BOT, developed by a team of experts in the crypto
                trading sphere and powered by AI, is designed for maximum
                efficiency and effectiveness. It offers a valuable opportunity
                for individuals, regardless of their experience in the market,
                to automatically earn profits and experience substantial growth.
              </p>
            </div>
          </div>
          <div className="max-w-lg mx-auto lg:mx-0 lg:max-w-none lg:w-1/2 lg:pl-8 sm:w-full">
            <div
              id="analytics-container"
              className="tradingview-widget-container"
            >
              <div className="tradingview-widget-container__widget"></div>
            </div>
          </div>
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
};

export default About;
