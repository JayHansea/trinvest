import React from "react";

interface DashboardProps {
  user: {
    firstname: string; // Assuming firstname is a string, adjust as necessary
    // Add other properties of user here if needed
    image: string; // URL of user's image
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div>
      <div className="flex flex-row my-5">
        <div className="md:mr-4 mb-4 md:mb-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="place-content-center ml-4">
          <h1 className="text-2xl font-medium tracking-tight text-gray-900">
            Welcome,{" "}
            <span className="font-bold">{user && user.firstname}!</span>
          </h1>
          {/* Add other content here */}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Four grayish slightly transparent divs */}
        <div className="bg-gray-200 bg-opacity-50 rounded-lg p-4 w-full">
          <p>Wallet Balance</p>
          <h2 className="text-2xl font-semibold mt-2">$62,558.24</h2>
        </div>
        <div className="bg-gray-200 bg-opacity-50 rounded-lg p-4 w-full">
          <p>Deposit Amount</p>
          <h2 className="text-2xl font-semibold mt-2">$40,000.00</h2>
        </div>
        <div className="bg-gray-200 bg-opacity-50 rounded-lg p-4 w-full">
          <p>Interest (3.5%)</p>
          <h2 className="text-2xl font-semibold mt-2">$22,558.24</h2>
        </div>
        <div className="bg-gray-200 bg-opacity-50 rounded-lg p-4 w-full">
          <p>Current Plan</p>
          <h2 className="text-2xl font-semibold mt-2">Gold Plan</h2>
        </div>
      </div>
      {/* Transaction History Table */}
      <div className="mt-20">
        <h2 className="text-xl font-semibold mb-6">Transaction History</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Jan 1, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Deposit
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                $10,000.00
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Jan 1, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Deposit
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                $10,000.00
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Jan 1, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Deposit
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                $10,000.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
