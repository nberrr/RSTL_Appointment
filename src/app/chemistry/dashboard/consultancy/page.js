"use client";

import { useState } from 'react';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";
import { FaSearch, FaFilter, FaCalendar, FaTimes, FaDownload, FaChevronDown, FaCheck, FaRegFile } from 'react-icons/fa';

export default function ConsultancyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample appointment data
  const appointments = [
    {
      date: "Apr 2, 2025",
      time: "09:30 AM",
      name: "Maria Santos",
      organization: "National University",
      researchType: "Thesis/Dissertation",
      status: "Pending",
      email: "maria.santos@university.edu",
      contactNo: "09123456789",
      position: "Graduate Student",
      document: "Thesis_Proposal_Santos.pdf",
      description: "Need assistance with methodology for analyzing chemical compounds in soil samples."
    },
    {
      date: "Apr 2, 2025",
      time: "11:00 AM",
      name: "Juan Dela Cruz",
      organization: "Environmental Research Institute",
      researchType: "Industry Research",
      status: "Accepted"
    },
    {
      date: "Apr 5, 2025",
      time: "09:00 AM",
      name: "Elena Gomez",
      organization: "PharmaCorp Industries",
      researchType: "Industry Research",
      status: "Accepted"
    }
  ];

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-5">
           
              {/* Header Section */}
              <div className="flex justify-between items-center">
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-[350px,1fr] gap-5 ">
                {/* Left Panel - Accepted Appointments */}
                <div className="bg-white rounded-xl p-4 h-[calc(100vh-180px)] flex flex-col shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Accepted Appointments</h2>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">3 Total</span>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {appointments.map((appointment, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg cursor-pointer ${
                          appointment.status === 'Accepted' ? 'bg-green-50' : 'bg-white'
                        } hover:bg-green-100 border border-gray-200`}
                        onClick={() => handleViewDetails(appointment)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.name}</h3>
                            <p className="text-sm text-gray-600">
                              {appointment.date} · {appointment.time}
                            </p>
                            <p className="text-sm text-gray-600">{appointment.organization}</p>
                            <p className="text-sm text-gray-500 mt-1">{appointment.researchType}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            appointment.status === 'Accepted' 
                              ? 'bg-green-500 text-white' 
                              : ''
                          }`}>
                            {appointment.status === 'Accepted' && 'Accepted'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Panel - Appointments Table */}
                <div className="bg-white rounded-xl p-6 s">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Appointments</h2>
                    <div className="flex gap-3">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        <FaFilter className="text-gray-500" />
                      <select className='text-gray-500'>
                      <option value="all">All Appointments</option>
                      <option value="recent">Recent</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="oldest">Oldest</option>  
                    </select>
                      </button>
                    </div>
                  </div>
                <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Time</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name & Organization</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Research Type</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500"></th>
                              </tr>
                            </thead>
                            <tbody>
                            {appointments.slice(0, 2).map((appointment, index) => (
                              <tr 
                          key={index} 
                          className="border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                          onClick={() => handleViewDetails(appointment)}
                        >
                          <td className="py-4 px-4 text-sm">{appointment.date}</td>
                          <td className="py-4 px-4 text-sm">{appointment.time}</td>
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-sm">{appointment.name}</div>
                              <div className="text-sm text-gray-600">{appointment.organization}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm">{appointment.researchType}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              appointment.status === 'Accepted' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-orange-500 text-white'
                            }`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            {appointment.status === 'Pending' ? (
                              <div className="flex items-center justify-end gap-2">
                                <button className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                                  <FaCheck className="w-4 h-4 mr-1.5" />
                                  Accept
                                </button>
                                <button className="inline-flex items-center px-3 py-1.5 text-red-600 text-sm rounded-lg hover:text-red-700">
                                  <FaTimes className="w-4 h-4 mr-1.5" />
                                  Decline
                                </button>
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
              </div>

              {/* Appointment Details Modal */}
              {showDetails && selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl w-full max-w-3xl">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl font-semibold">Appointment Details</h2>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              selectedAppointment.status === 'Pending' ? 'bg-orange-500 text-white' : ''
                            }`}>
                              {selectedAppointment.status === 'Pending' && 'Pending'}
                            </span>
                          </div>
                          <p className="text-gray-600">{selectedAppointment.date} at {selectedAppointment.time}</p>
                        </div>
                        <button 
                          onClick={() => setShowDetails(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FaTimes className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-medium text-gray-700 mb-4">Personal Information</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-500">Full Name:</p>
                              <p className="font-medium">{selectedAppointment.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email Address:</p>
                              <p className="font-medium">{selectedAppointment.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Contact No:</p>
                              <p className="font-medium">{selectedAppointment.contactNo}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Organization:</p>
                              <p className="font-medium">{selectedAppointment.organization}</p>
                            </div>
                          </div>

                          <h3 className="font-medium text-gray-700 mt-6 mb-4">Research Information</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-500">Type:</p>
                              <p className="font-medium">{selectedAppointment.researchType}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Position:</p>
                              <p className="font-medium">{selectedAppointment.position}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-gray-700 mb-4">Document</h3>
                          <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <FaRegFile className="text-gray-400" />
                              <span className="text-sm">{selectedAppointment.document}</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                              <FaDownload className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                          </div>

                          <h3 className="font-medium text-gray-700 mb-4">Description</h3>
                          <p className="text-gray-600">{selectedAppointment.description}</p>
                        </div>
                      </div>

                      {selectedAppointment.status === 'Pending' && (
                        <div className="flex justify-end gap-3 mt-8">
                          <button className="px-4 py-2 text-red-600 hover:text-red-700 flex items-center gap-2">
                            <FaTimes className="w-4 h-4" />
                            Decline
                          </button>
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
                            <FaCheck className="w-4 h-4" />
                            Accept
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            
          </main>
        </div>
      </div>
    </AdminLayout>
  );
} 