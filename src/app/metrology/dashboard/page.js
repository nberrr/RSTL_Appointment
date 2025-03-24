"use client";

export default function MetrologyDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Metrology Laboratory Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Calibration Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calibration Overview</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Pending Calibrations</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span>In Progress</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Completed Today</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>

        {/* Equipment Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Equipment Status</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Available Equipment</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span>In Maintenance</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Calibration Due</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
              Schedule Calibration
            </button>
            <button className="w-full p-2 bg-green-50 text-green-700 rounded hover:bg-green-100">
              Equipment Management
            </button>
            <button className="w-full p-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100">
              Calibration Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 