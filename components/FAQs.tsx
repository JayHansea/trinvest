import React from "react";
import { features } from "@/utils/FAQsData";

const FAQs = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto px-6 lg:px-8 container">
        <div className="mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to know
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Guides and information to help you navigate on TRINVEST
          </p>
        </div>
        <div className="mx-auto mt-16 sm:mt-20 lg:mt-24">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.question} className="relative">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  {feature.question}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
