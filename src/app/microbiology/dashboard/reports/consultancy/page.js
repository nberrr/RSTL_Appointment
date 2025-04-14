"use client";

import { useState } from 'react';
import { FaSearch, FaDownload, FaEllipsisH, FaFilter, FaTimes } from 'react-icons/fa';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";

const ConsultationModal = ({ isOpen, onClose, consultation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Consultation Details</h2>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              {consultation?.status}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">ID:</p>
              <p className="font-medium">{consultation?.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type:</p>
              <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded">
                {consultation?.type}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Researcher Information</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-sm">{consultation?.researcher}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm">{consultation?.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="text-sm">{consultation?.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Position/Year Level</p>
                    <p className="text-sm">{consultation?.position}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">School/Institution</h3>
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-sm">{consultation?.client}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Research Information</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Research Topic</p>
                    <p className="text-sm">{consultation?.researchTopic}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Research Paper</p>
                    <div className="flex items-center gap-2 mt-1 px-3 py-2 bg-gray-50 rounded text-sm">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-gray-600">{consultation?.researchFile}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Consultation Details</h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-sm">{consultation?.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-sm">{consultation?.time}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Consultation Notes</p>
                  <p className="text-sm mt-1">{consultation?.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Close
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ConsultancyReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data for completed consultancy appointments
  const consultancyData = [
    {
      id: "CON-2024-003",
      date: "April 8, 2024",
      time: "10:00 AM",
      client: "PharmaCorp Industries",
      type: "Industry Research",
      researcher: "Elena Gomez",
      email: "elena.gomez@pharmacorp.com",
      phone: "+63 912 345 6789",
      position: "Senior Researcher",
      status: "Completed",
      researchTopic: "Novel Antibiotic Compounds from Marine Sources",
      researchFile: "antibiotic_research_proposal.pdf",
      notes: "Seeking consultation on chemical analysis methods for marine-derived compounds with potential antibiotic properties.",
      outcome: "Analysis Complete"
    },
    {
      id: "CON-2024-002",
      date: "April 5, 2024",
      time: "2:30 PM",
      client: "Environmental Research Institute",
      type: "Industry Research",
      researcher: "Juan Dela Cruz",
      email: "juan.cruz@eri.org",
      phone: "+63 917 123 4567",
      position: "Research Associate",
      status: "Completed",
      researchTopic: "Water Quality Assessment Methods",
      researchFile: "water_quality_proposal.pdf",
      notes: "Discussion of advanced analytical techniques for water quality assessment.",
      outcome: "Research Plan Finalized"
    },
    {
      id: "CON-2024-001",
      date: "April 2, 2024",
      time: "9:00 AM",
      client: "National University",
      type: "Thesis/Dissertation",
      researcher: "Maria Santos",
      email: "m.santos@university.edu",
      phone: "+63 998 765 4321",
      position: "Graduate Student",
      status: "Completed",
      researchTopic: "Soil Contamination Analysis",
      researchFile: "thesis_proposal.pdf",
      notes: "Review of methodology for soil contamination analysis in urban areas.",
      outcome: "Methodology Approved"
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

  const handleOpenModal = (consultation) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };

  const sortByDate = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
  };

  const filteredData = consultancyData
    .filter(item => {
      const matchesSearch = 
        item.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      
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
              <div className="bg-white rounded-xl p-4  border border-gray-200 shadow-md">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total Consultations</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <div className="text-right">
                    <p className="text-sm text-green-600">All Completed</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
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
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Completion Rate</h3>
                <p className="text-2xl font-bold text-green-600">100%</p>
                <p className="text-sm text-gray-600 mt-1">All consultations completed</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-sm  border border-gray-200">
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
                        placeholder="Search by ID, name, or type..."
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((consultation) => (
                      <tr key={consultation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{consultation.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consultation.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{consultation.researcher}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                            {consultation.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            {consultation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleOpenModal(consultation)}
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
          </main>
        </div>

        <ConsultationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          consultation={selectedConsultation}
        />
      </div>
    </AdminLayout>
  );
} 