import React from "react";

const stats = [
  {
    id: 1,
    name: "Register",
    description: "Access our platform with your data on hands.",
  },
  { id: 2, name: "Choose a plan", description: "There are 3 options for you." },
  {
    id: 3,
    name: "Follow",
    description:
      "Follow our platform that presents statements and daily earnings.",
  },
  {
    id: 4,
    name: "Earn",
    description: "Your applications yields every day, automatically.",
  },
];

const HowItWork = () => {
  return (
    <div className="bg-gray-200 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 container">
        <div className="mx-auto md:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            HOW IT WORKS
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How to earn with TRINVEST
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            It is very easy to start receiving earnings at TRINVEST
          </p>
        </div>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center md:grid-cols-2 lg:grid-cols-4 mt-16">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <div className=" bg-blue-950 w-10 p-2 place-self-center mb-6 rounded-full">
                <dt className="text-base leading-7 text-white">{stat.id}</dt>
              </div>
              <dt className="text-2xl font-semibold tracking-tight text-gray-900">
                {stat.name}
              </dt>
              <dd className="text-base  leading-7 text-gray-600 ">
                {stat.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default HowItWork;
