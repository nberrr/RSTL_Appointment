"use client";

import { useState } from 'react';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";
import { FaSearch, FaFilter, FaCalendar, FaTimes, FaDownload, FaChevronDown, FaCheck, FaRegFile } from 'react-icons/fa';

const ConsultationModal = ({ isOpen, onClose, consultation, onAccept, onDecline }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Consultation Details</h2>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              consultation?.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              consultation?.status === 'Accepted' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {consultation?.status}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
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
                    <p className="text-sm">{consultation?.name}</p>
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
                    <p className="text-sm">{consultation?.contactNo}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Position</p>
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
                <p className="text-sm">{consultation?.organization}</p>
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
                    <p className="text-sm text-gray-500">Research Type</p>
                    <p className="text-sm">{consultation?.researchType}</p>
                  </div>
                </div>
                {consultation?.document && (
                  <div className="flex gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Research Document</p>
                      <div className="flex items-center gap-2 mt-1 px-3 py-2 bg-gray-50 rounded text-sm">
                        <FaRegFile className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{consultation?.document}</span>
                        <button className="ml-auto text-blue-600 hover:text-blue-700">
                          <FaDownload className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
              {consultation?.description && (
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-sm mt-1">{consultation?.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {consultation?.status === 'Pending' && (
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
            <button
              onClick={onDecline}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-2"
            >
              <FaTimes className="w-4 h-4" />
              Decline
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2"
            >
              <FaCheck className="w-4 h-4" />
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DeclineModal = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Decline Consultation</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Declining
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Please provide a reason for declining this consultation..."
          ></textarea>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (reason.trim()) {
                onConfirm(reason);
                onClose();
              }
            }}
            disabled={!reason.trim()}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
              reason.trim() ? 'bg-red-600 hover:bg-red-700' : 'bg-red-400 cursor-not-allowed'
            }`}
          >
            Confirm Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ConsultancyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [appointmentToDecline, setAppointmentToDecline] = useState(null);

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-50 text-yellow-800 flex items-center gap-1 before:w-1.5 before:h-1.5 before:bg-yellow-500 before:rounded-full';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-50 text-red-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAccept = (appointment) => {
    // Update the appointment status to Accepted
    const updatedAppointments = appointments.map(app => 
      app === appointment ? { ...app, status: 'Accepted' } : app
    );
    // Here you would typically update your backend/database
    console.log('Accepted appointment:', appointment);
    setShowDetails(false);
  };

  const handleDeclineClick = (appointment) => {
    setAppointmentToDecline(appointment);
    setIsDeclineModalOpen(true);
  };

  const handleConfirmDecline = (reason) => {
    if (appointmentToDecline) {
      // Update the appointment status to Declined
      const updatedAppointments = appointments.map(app => 
        app === appointmentToDecline ? { ...app, status: 'Declined', declineReason: reason } : app
      );
      // Here you would typically update your backend/database
      console.log('Declined appointment:', appointmentToDecline, 'Reason:', reason);
      setShowDetails(false);
      setIsDeclineModalOpen(false);
      setAppointmentToDecline(null);
    }
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
                          <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
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
                            <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            {appointment.status === 'Pending' && (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleAccept(appointment)}
                                  className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                                >
                                  <FaCheck className="w-4 h-4 mr-1.5" />
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleDeclineClick(appointment)}
                                  className="inline-flex items-center px-3 py-1.5 text-red-600 text-sm rounded-lg hover:text-red-700"
                                >
                                  <FaTimes className="w-4 h-4 mr-1.5" />
                                  Decline
                                </button>
                              </div>
                            )}
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
                <ConsultationModal
                  isOpen={showDetails}
                  onClose={() => setShowDetails(false)}
                  consultation={selectedAppointment}
                  onAccept={() => handleAccept(selectedAppointment)}
                  onDecline={() => handleDeclineClick(selectedAppointment)}
                />
              )}
            
          </main>
        </div>
      </div>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        consultation={selectedAppointment}
        onAccept={() => handleAccept(selectedAppointment)}
        onDecline={() => handleDeclineClick(selectedAppointment)}
      />

      <DeclineModal
        isOpen={isDeclineModalOpen}
        onClose={() => {
          setIsDeclineModalOpen(false);
          setAppointmentToDecline(null);
        }}
        onConfirm={handleConfirmDecline}
      />
    </AdminLayout>
  );
} 