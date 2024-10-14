import React from 'react';

const MarketPlace = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-3/4 md:w-1/2 lg:w-1/3">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-4">MarketPlace</h1>
        <p className="text-gray-700 text-lg text-center">
          Explore market opportunities! Engage with others and make valuable connections.
        </p>
      </div>
    </div>
  );
};

export default MarketPlace;
