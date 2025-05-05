import React from "react";

export default function ReportsStatsCards({ completedCount, declinedCount, cancelledCount }) {
  return (
    <div className="mb-5 flex-shrink-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-0">
        <div className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Completed Tests</span>
          </div>
          <p className="text-3xl font-bold">{completedCount}</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
          <div className="absolute right-0 top-0 h-full w-1 bg-green-500"></div>
        </div>
        <div className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Declined Tests</span>
          </div>
          <p className="text-3xl font-bold">{declinedCount}</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
          <div className="absolute right-0 top-0 h-full w-1 bg-red-500"></div>
        </div>
        <div className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-msm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Cancelled Tests</span>
          </div>
          <p className="text-3xl font-bold">{cancelledCount}</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
          <div className="absolute right-0 top-0 h-full w-1 bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
} 