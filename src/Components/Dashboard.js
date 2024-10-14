import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-3/4 md:w-1/2 lg:w-1/3">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Dashboard</h1>
        <p className="text-gray-700 text-lg text-center">
          Welcome to your Dashboard! Here you can view an overview of your activities and performance metrics.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
