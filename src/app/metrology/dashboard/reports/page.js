"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaChartLine, FaUsers, FaTruck, FaEllipsisH, FaCalendar, FaTint } from 'react-icons/fa';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";
import { FaDownload } from "react-icons/fa"; 
import Link from 'next/link';

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTime, setFilterTime] = useState('all');
  const router = useRouter();

  useEffect(() => {
    // Handle page refresh
    const handleBeforeUnload = () => {
      router.push('/metrology/dashboard');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1  bg-gray-100 p-5">
            <div className="h-full flex flex-col space-y-5">
              {/* Top Section - Chart and Stats */}
              <div className="flex gap-4 justify-between ">
                {/* Average Liters Chart Section - Left Side */}
                <div className="bg-white rounded-xl drop-shadow-md p-4 w-[45%]">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h2 className="text-lg font-semibold">Average Liters Accumulated</h2>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">Daily Average</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">Weekly Target</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[140px] flex flex-col items-center justify-center border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaTint className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">1,250 L</span>
                    </div>
                    <p className="text-xs text-gray-500">Average daily liters from all appointments</p>
                  </div>
                </div>

                {/* Stats Cards - Right Side */}
                <div className="flex-1 grid grid-cols-2 gap-4">
                  {/* Total Liters Card */}
                  <div className="bg-gradient-to-br from-cyan-700 to-cyan-500 rounded-xl drop-shadow-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-70 rounded-[10px]">
                          <FaTint className="w-4 h-4 text-cyan-600" />
                        </div>
                        <h3 className="text-sm text-white">Total Liters this month</h3>
                      </div>  
                      </div>
                    </div>
                    <div className='flex justify-center'><p className="text-3xl font-bold mt-1 text-white">100,000 L</p></div>

                  </div>

                  {/* Total Appointments Card */}
                  <div className="bg-gradient-to-br from-green-700 to-green-500 rounded-xl drop-shadow-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-70 rounded-[10px]">
                          <FaCalendar className="w-4 h-4 text-green-500" />
                          </div>
                          <h3 className="text-sm text-white">Total Appointments this month</h3>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-center'><p className="text-3xl font-bold mt-1 text-white">20</p></div>
                  </div>

                  {/* Registered Managers Card */}
                  <div className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl drop-shadow-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-70 rounded-[10px]">  
                          <FaUsers className="w-5 h-5 text-blue-500" />
                          </div>
                          <h3 className="text-sm text-white">Registered Managers</h3>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-center'><p className="text-3xl font-bold mt-1 text-white">13</p></div>

                  </div>

                  {/* Registered Trucks Card */}
                  <div className="bg-gradient-to-br from-orange-700 to-orange-500 rounded-xl drop-shadow-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-70 rounded-[10px]">  
                          <FaTruck className="w-5 h-5 text-orange-500" />
                          </div>
                          <h3 className="text-sm text-white">Registered Trucks</h3>
                        </div>
                      </div>
                    
                    </div>
                    <div className='flex justify-center'><p className="text-3xl font-bold mt-1 text-white">25</p></div>

                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-xl drop-shadow-md p-4 flex-1">
                {/* Search and Filter */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative w-64">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <FaSearch className="h-3 w-3 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search by name, company or plate number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    value={filterTime}
                    onChange={(e) => setFilterTime(e.target.value)}
                    className="w-40 text-xs border border-gray-200 rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Managers</option>
                    <option value="newest">Recent</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  
                  {/* Export Button */}
                  <div className="ml-auto">
                    <button id="exportBtn" className="bg-gray-200 text-black text-xs px-4 py-1.5 flex items-center gap-2 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <FaDownload className="w-3 h-3 text-gray-600" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact No.
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(5)].map((_, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="text-xs text-gray-900">Maidon Malone Espela</div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="text-xs text-gray-900">Department Of Science and Technology</div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="text-xs text-gray-900">03/20/2025</div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="text-xs text-gray-900">09345363636</div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <button className="text-blue-500 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                              <FaEllipsisH className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
} 