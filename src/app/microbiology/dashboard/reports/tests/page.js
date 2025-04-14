"use client";

import { useState } from 'react';
import { FaSearch, FaDownload, FaEllipsisH, FaFilter, FaTimes } from 'react-icons/fa';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";

export default function MicrobiologyReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  const [selectedSample, setSelectedSample] = useState(null);
  const [activeTab, setActiveTab] = useState('sample-details');

  // Sample data for completed appointments
  const appointments = [
    {
      id: "AP-1001",
      client: {
        name: "Dr. Emily Chen",
        email: "emily.chen@biotech.com",
        phone: "+1 (555) 123-4567",
        organization: "BioTech Research Inc.",
        sex: "Female",
        submissionTimestamp: "3/15/2025, 9:23:45 AM"
      },
      sample: "Polymer Composite A-42",
      sampleDetails: {
        name: "Polymer Composite A-42",
        type: "Polymer",
        numSamples: 3,
        dateRequested: "2025-03-10",
        priority: "High",
        description: "Heat-resistant polymer composite for aerospace applications",
        laboratory: "Thermal Analysis Lab"
      },
      testResults: {
        summary: "All tests passed. Material meets specifications for heat resistance up to 450°C.",
        technician: "Robert Johnson",
        completedDate: "2025-03-15"
      },
      testType: "Thermal Analysis",
      date: "3/15/2025",
      status: "Completed"
    },
    {
      id: "AP-1002",
      client: {
        name: "Prof. Michael Rodriguez",
        email: "rodriguez@ucal.edu",
        phone: "+1 (555) 234-5678",
        organization: "University of California",
        sex: "Male",
        submissionTimestamp: "3/18/2025, 2:05:00 PM"
      },
      sample: "Catalyst XR-7",
      sampleDetails: {
        name: "Catalyst XR-7",
        type: "Catalyst",
        numSamples: 2,
        dateRequested: "2025-03-18",
        priority: "Medium",
        description: "Novel catalytic material for green chemistry applications",
        laboratory: "Spectroscopy Lab"
      },
      testResults: {
        summary: "Catalyst shows expected activity within specified parameters.",
        technician: "Sarah Williams",
        completedDate: "2025-03-20"
      },
      testType: "Spectroscopy",
      date: "3/18/2025",
      status: "Completed"
    },
    {
      id: "AP-1005",
      client: {
        name: "Dr. Lisa Park",
        email: "l.park@research.com",
        phone: "+1 (555) 345-6789",
        organization: "Environmental Research Labs",
        sex: "Female",
        submissionTimestamp: "3/25/2025, 10:15:00 AM"
      },
      sample: "Soil Sample LP-12",
      sampleDetails: {
        name: "Soil Sample LP-12",
        type: "Environmental",
        numSamples: 5,
        dateRequested: "2025-03-25",
        priority: "High",
        description: "Soil samples from industrial site for contamination analysis",
        laboratory: "Environmental Analysis Lab"
      },
      testResults: {
        summary: "Contaminant levels within acceptable range per EPA guidelines.",
        technician: "Mike Thompson",
        completedDate: "2025-03-27"
      },
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

  const sortByDate = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
  };

  const filteredAppointments = appointments
    .filter(item => {
      const matchesSearch = 
        item.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sample.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.testType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || item.testType.toLowerCase() === filterType.toLowerCase();
      
      return matchesSearch && matchesFilter;
    })
    .sort(sortByDate);

  const handleViewDetails = (sample) => {
    setSelectedSample(sample);
    setActiveTab('sample-details');
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-50 p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Appointment History</h1>
              <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 border border-gray-200">
                <FaDownload className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Completed Tests</span>
                </div>
                <p className="text-3xl font-bold">24</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
                <div className="absolute right-0 top-0 h-full w-1 bg-green-500"></div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Declined Tests</span>
                </div>
                <p className="text-3xl font-bold">5</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
                <div className="absolute right-0 top-0 h-full w-1 bg-red-500"></div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Cancelled Tests</span>
                </div>
                <p className="text-3xl font-bold">8</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
                <div className="absolute right-0 top-0 h-full w-1 bg-gray-500"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr,300px] gap-6">
              {/* Main Content */}
              <div className="bg-white rounded-2xl shadow-sm  border border-gray-200 ">
                <div className="p-6 border-b border-gray-200 ">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-lg font-semibold">Completed Appointments</h2>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaSearch className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="pl-10 pr-4 py-2 w-[300px] border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Search appointments..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="all">All Test Types</option>
                        <option value="thermal analysis">Thermal Analysis</option>
                        <option value="spectroscopy">Spectroscopy</option>
                        <option value="hplc analysis">HPLC Analysis</option>
                        <option value="elemental analysis">Elemental Analysis</option>
                      </select>
                      <select
                        value={dateSort}
                        onChange={(e) => setDateSort(e.target.value)}
                        className="border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Name</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laboratory</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-blue-600">{appointment.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{appointment.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{appointment.client.organization}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                                {appointment.client.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{appointment.client.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{appointment.sample}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{appointment.sampleDetails.laboratory}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <button 
                              onClick={() => handleViewDetails(appointment)}
                              className="text-gray-400 hover:text-gray-600"
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

              {/* Completion Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
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

      {/* Sample Details Modal */}
      {selectedSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Sample Details</h2>
                <button 
                  onClick={() => setSelectedSample(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-6">Complete information about sample {selectedSample.id}</p>
              
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-4">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === 'sample-details'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('sample-details')}
                  >
                    Sample Details
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === 'customer-info'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('customer-info')}
                  >
                    Customer Info
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === 'test-results'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('test-results')}
                  >
                    Test Results
                  </button>
                </div>
              </div>

              {activeTab === 'sample-details' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Sample ID</p>
                      <p className="font-medium">{selectedSample.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {selectedSample.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sample Name</p>
                      <p className="font-medium">{selectedSample.sampleDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sample Type</p>
                      <p className="font-medium">{selectedSample.sampleDetails.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Number of Samples</p>
                      <p className="font-medium">{selectedSample.sampleDetails.numSamples}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Laboratory</p>
                      <p className="font-medium">{selectedSample.sampleDetails.laboratory}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date Requested</p>
                      <p className="font-medium">{selectedSample.sampleDetails.dateRequested}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Priority</p>
                      <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {selectedSample.sampleDetails.priority}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-sm">{selectedSample.sampleDetails.description}</p>
                  </div>
                </div>
              )}

              {activeTab === 'customer-info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Customer Name</p>
                      <p className="font-medium">{selectedSample.client.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Organization</p>
                      <p className="font-medium">{selectedSample.client.organization}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedSample.client.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact Number</p>
                      <p className="font-medium">{selectedSample.client.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sex</p>
                      <p className="font-medium">{selectedSample.client.sex}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Submission Timestamp</p>
                      <p className="font-medium">{selectedSample.client.submissionTimestamp}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'test-results' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Test Results</p>
                    <p className="text-sm">{selectedSample.testResults.summary}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Technician</p>
                      <p className="font-medium">{selectedSample.testResults.technician}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed Date</p>
                      <p className="font-medium">{selectedSample.testResults.completedDate}</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                    <FaDownload className="w-4 h-4" />
                    Download Full Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
} 