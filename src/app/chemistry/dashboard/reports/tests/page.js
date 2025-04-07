"use client";

import { useState } from 'react';
import { FaSearch, FaDownload, FaEllipsisH } from 'react-icons/fa';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";

export default function ChemistryReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for completed appointments
  const appointments = [
    {
      id: "AP-1001",
      client: "Dr. Emily Chen",
      sample: "Polymer Composite A-42",
      testType: "Thermal Analysis",
      date: "3/15/2025",
      status: "Completed"
    },
    {
      id: "AP-1002",
      client: "Prof. Michael Rodriguez",
      sample: "Catalyst XR-7",
      testType: "Spectroscopy",
      date: "3/18/2025",
      status: "Completed"
    },
    {
      id: "AP-1005",
      client: "Dr. Lisa Park",
      sample: "Soil Sample LP-12",
      testType: "Contaminant Screening",
      date: "3/25/2025",
      status: "Completed"
    }
  ];

  // Sample data for completion stats
  const completionStats = [
    { name: "Thermal Analysis", count: 8 },
    { name: "Spectroscopy", count: 6 },
    { name: "HPLC Analysis", count: 5 },
    { name: "Elemental Analysis", count: 3 },
    { name: "Other Tests", count: 2 }
  ];

  const getStatusColor = (status) => {
    return 'bg-green-100 text-green-800'; // All items are completed
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Appointment History</h1>
              <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <FaDownload className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Completed Tests</span>
                </div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Declined Tests</span>
                </div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 border-l-4 border-gray-500">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Cancelled Tests</span>
                </div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </div>
            </div>

            <div className="grid grid-cols-[1fr,300px] gap-6">
              {/* Main Content */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold mb-4">Completed Appointments</h2>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.sample}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.testType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900">
                              <FaEllipsisH className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Completion Stats */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-4">Completion Stats</h2>
                <div className="space-y-4">
                  {completionStats.map((stat) => (
                    <div key={stat.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">{stat.name}</span>
                        <span className="text-sm font-medium">{stat.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(stat.count / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
} 