"use client";

import { useState } from 'react';
import { FaSearch, FaDownload, FaEllipsisH } from 'react-icons/fa';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";

export default function ShelfLifeReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for completed shelf life analysis
  const products = [
    {
      id: "SL-2024-001",
      product: "Polymer Adhesive XR-42",
      batch: "BA-78923",
      expiry: "1/15/2026",
      duration: "12 months",
      status: "Completed",
      result: "Passed"
    },
    {
      id: "SL-2024-002",
      product: "Catalyst Compound TC-7",
      batch: "BA-45672",
      expiry: "8/10/2025",
      duration: "6 months",
      status: "Completed",
      result: "Passed"
    },
    {
      id: "SL-2024-003",
      product: "Reagent Solution RS-201",
      batch: "BA-34521",
      expiry: "7/5/2025",
      duration: "9 months",
      status: "Completed",
      result: "Passed with Conditions"
    }
  ];

  // Sample statistics
  const stats = {
    total: 68,
    passed: 62,
    conditional: 6,
    shortTerm: 25,
    longTerm: 43
  };

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
              <h1 className="text-2xl font-semibold">Shelf Life Analysis Reports</h1>
              <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <FaDownload className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total Analyses</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <div className="text-right">
                    <p className="text-sm text-green-600">All Completed</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Results Overview</h3>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-600">Passed</p>
                    <p className="text-xl font-bold text-gray-900">{stats.passed}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Conditional</p>
                    <p className="text-xl font-bold text-gray-900">{stats.conditional}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Study Duration</h3>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-600">Short Term</p>
                    <p className="text-xl font-bold text-gray-900">{stats.shortTerm}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Long Term</p>
                    <p className="text-xl font-bold text-gray-900">{stats.longTerm}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Analysis History</h2>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.batch}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.expiry}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.result}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
          </main>
        </div>
      </div>
    </AdminLayout>
  );
} 