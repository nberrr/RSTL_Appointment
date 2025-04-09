"use client";

import { useState } from 'react';
import { FaSearch, FaDownload, FaEllipsisH, FaFilter } from 'react-icons/fa';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";

export default function ConsultancyReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateSort, setDateSort] = useState('newest');

  // Sample data for completed consultancy appointments
  const consultancyData = [
    {
      id: "CON-2024-001",
      date: "Apr 2, 2024",
      client: "National University",
      type: "Thesis/Dissertation",
      researcher: "Maria Santos",
      status: "Completed",
      outcome: "Methodology Approved"
    },
    {
      id: "CON-2024-002",
      date: "Apr 5, 2024",
      client: "Environmental Research Institute",
      type: "Industry Research",
      researcher: "Juan Dela Cruz",
      status: "Completed",
      outcome: "Research Plan Finalized"
    },
    {
      id: "CON-2024-003",
      date: "Apr 8, 2024",
      client: "PharmaCorp Industries",
      type: "Industry Research",
      researcher: "Elena Gomez",
      status: "Completed",
      outcome: "Analysis Complete"
    }
  ];

  // Sample statistics
  const stats = {
    total: 45,
    completed: 45,
    thesisDissertation: 18,
    industryResearch: 27
  };

  const getStatusColor = (status) => {
    return 'bg-green-100 text-green-800'; // All items are completed
  };

  const sortByDate = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
  };

  const filteredData = consultancyData
    .filter(item => {
      const matchesSearch = 
        item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || item.type.toLowerCase() === filterType.toLowerCase();
      
      return matchesSearch && matchesFilter;
    })
    .sort(sortByDate);

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Consultancy Reports</h1>
              <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <FaDownload className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total Consultations</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <div className="text-right">
                    <p className="text-sm text-green-600">All Completed</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Research Types</h3>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-600">Thesis/Dissertation</p>
                    <p className="text-xl font-bold text-gray-900">{stats.thesisDissertation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Industry Research</p>
                    <p className="text-xl font-bold text-gray-900">{stats.industryResearch}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Completion Rate</h3>
                <p className="text-2xl font-bold text-green-600">100%</p>
                <p className="text-sm text-gray-600 mt-1">All consultations completed</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Consultation History</h2>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Search consultations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFilter className="text-gray-400" />
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All Types</option>
                        <option value="thesis/dissertation">Thesis/Dissertation</option>
                        <option value="industry research">Industry Research</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={dateSort}
                        onChange={(e) => setDateSort(e.target.value)}
                        className="border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Researcher</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((consultation, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{consultation.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consultation.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{consultation.client}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consultation.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{consultation.researcher}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${getStatusColor(consultation.status)}`}>
                            {consultation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consultation.outcome}</td>
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