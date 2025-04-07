"use client";

import { useState } from 'react';
import { FaSearch, FaEllipsisH, FaDownload, FaTimes, FaEnvelope, FaPhone, FaUsers } from 'react-icons/fa';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample data for appointments
  const appointments = [
    {
      id: "AP-1001",
      client: "Dr. Emily Chen",
      sample: "Polymer Composite A-42",
      testType: "Thermal Analysis",
      date: "3/15/2025",
      status: "Completed",
      email: "emily.chen@research.edu",
      phone: "555-123-4567",
      description: "Testing thermal properties of new polymer composite for automotive applications.",
      result: "Passed all thermal stability tests. Report available."
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
      id: "AP-1003",
      client: "Dr. Sarah Johnson",
      sample: "Compound SJ-201",
      testType: "HPLC Analysis",
      date: "3/20/2025",
      status: "Completed"
    },
    {
      id: "AP-1004",
      client: "Dr. James Wilson",
      sample: "Alloy JW-55",
      testType: "Elemental Analysis",
      date: "3/22/2025",
      status: "Completed"
    }
  ];

  const stats = {
    completed: appointments.length,
    declined: 0,
    cancelled: 0
  };

  const handleDetailsClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.sample.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    return 'bg-green-100 text-green-800'; // All items are completed
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-5">
            <div className="h-full flex flex-col space-y-5">
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border-l-4 border-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h3 className="text-sm font-medium">Completed Tests</h3>
                  </div>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border-l-4 border-red-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <h3 className="text-sm font-medium">Declined Tests</h3>
                  </div>
                  <p className="text-2xl font-bold">{stats.declined}</p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>

                <div className="bg-white rounded-xl p-4 border-l-4 border-gray-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <h3 className="text-sm font-medium">Cancelled Tests</h3>
                  </div>
                  <p className="text-2xl font-bold">{stats.cancelled}</p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-xl shadow">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold mb-4">All Appointment History</h2>
                  
                  {/* Search and Filters */}
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
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
                    
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      <FaDownload className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Table */}
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
                      {filteredAppointments.map((appointment) => (
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
                            <button
                              onClick={() => handleDetailsClick(appointment)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <FaEllipsisH className="w-4 h-4" />
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

      {/* Details Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Appointment {selectedAppointment.id}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Client Info */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Client</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium">{selectedAppointment.client}</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaEnvelope className="w-4 h-4 mr-2" />
                        {selectedAppointment.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaPhone className="w-4 h-4 mr-2" />
                        {selectedAppointment.phone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample Info */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Sample</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm">{selectedAppointment.sample}</p>
                    <p className="text-sm text-gray-500 mt-1">{selectedAppointment.testType}</p>
                  </div>
                </div>

                {/* Test Details */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Description</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm">{selectedAppointment.description}</p>
                  </div>
                </div>

                {/* Results (if completed) */}
                {selectedAppointment.status === 'Completed' && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Result</h3>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm">{selectedAppointment.result}</p>
                      <button className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                        <FaDownload className="w-4 h-4" />
                        Download Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
} 