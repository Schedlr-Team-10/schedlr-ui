import React from "react";

const ProgressTracker = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg p-6">

        {/* Progress Tracker */}
        <div className="relative flex items-center justify-between mt-8">
          {/* Step 1 */}
          <div className="relative text-center w-1/4">
            <div className="w-10 h-10 bg-green-500 rounded-full mx-auto flex items-center justify-center z-10">
              <i className="fas fa-check text-white"></i>
            </div>
            <p className="mt-2 text-sm font-semibold">Order Confirmed</p>
            <p className="text-xs text-gray-500">Step 1</p>
          </div>
          {/* Connecting Line 1 */}
          <div className="absolute top-5 left-1/4 w-1/4 h-1 bg-green-500 z-0"></div>

          {/* Step 2 */}
          <div className="relative text-center w-1/4">
            <div className="w-10 h-10 bg-green-500 rounded-full mx-auto flex items-center justify-center z-10">
              <i className="fas fa-check text-white"></i>
            </div>
            <p className="mt-2 text-sm font-semibold">Order Shipped</p>
            <p className="text-xs text-gray-500">Step 2</p>
          </div>
          {/* Connecting Line 2 */}
          <div className="absolute top-5 left-1/2 w-1/4 h-1 bg-green-500 z-0"></div>

          {/* Step 3 */}
          <div className="relative text-center w-1/4">
            <div className="w-10 h-10 bg-green-500 rounded-full mx-auto flex items-center justify-center z-10">
              <i className="fas fa-check text-white"></i>
            </div>
            <p className="mt-2 text-sm font-semibold">Out for Delivery</p>
            <p className="text-xs text-gray-500">Step 3</p>
          </div>
          {/* Connecting Line 3 */}
          <div className="absolute top-5 left-3/4 w-1/4 h-1 bg-gray-300 z-0"></div>

          {/* Step 4 */}
          <div className="relative text-center w-1/4">
            <div className="w-10 h-10 bg-gray-300 rounded-full mx-auto flex items-center justify-center z-10">
              <i className="fas fa-times text-gray-500"></i>
            </div>
            <p className="mt-2 text-sm font-semibold">Order Delivered</p>
            <p className="text-xs text-gray-500">Step 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
