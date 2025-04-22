"use client";

import { useState } from 'react';
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import { FaSearch, FaTimes, FaDownload,  FaCheck, FaRegFile } from 'react-icons/fa';

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

  // Sample appointment data for microbiology
  const appointments = [
    {
      date: "Apr 2, 2025",
      time: "09:30 AM",
      name: "Maria Santos",
      organization: "National University",
      researchType: "Microbial Analysis",
      status: "Pending",
      email: "maria.santos@university.edu",
      contactNo: "09123456789",
      position: "Graduate Student",
      document: "Thesis_Proposal_Santos.pdf",
      description: "Research on bacterial contamination in water sources"
    },
    {
      date: "Apr 5, 2025",
      time: "02:00 PM",
      name: "John Smith",
      organization: "State University",
      researchType: "Pathogen Testing",
      status: "Pending",
      email: "john.smith@state.edu",
      contactNo: "09234567890",
      position: "Research Assistant",
      document: "Research_Proposal_Smith.pdf",
      description: "Study on foodborne pathogens in processed foods"
    },
    {
      date: "Apr 8, 2025",
      time: "10:00 AM",
      name: "Sarah Johnson",
      organization: "City College",
      researchType: "Air Quality Testing",
      status: "Accepted",
      email: "sarah.johnson@citycollege.edu",
      contactNo: "09345678901",
      position: "Professor",
      document: "Research_Proposal_Johnson.pdf",
      description: "Analysis of microbial air quality in urban environments"
    }
  ];

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAccept = (appointment) => {
    // Update appointment status to Accepted
    const updatedAppointments = appointments.map(a => 
      a === appointment ? { ...a, status: 'Accepted' } : a
    );
    // In a real app, you would update the state here
    setIsModalOpen(false);
  };

  const handleDeclineClick = (appointment) => {
    setAppointmentToDecline(appointment);
    setIsDeclineModalOpen(true);
  };

  const handleConfirmDecline = (reason) => {
    // Update appointment status to Declined with reason
    const updatedAppointments = appointments.map(a => 
      a === appointmentToDecline ? { ...a, status: 'Declined', declineReason: reason } : a
    );
    // In a real app, you would update the state here
    setIsDeclineModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-5">
            <div className="h-full flex flex-col space-y-5">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Consultation Requests</h1>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search consultations..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                 
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl shadow  border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Research Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments.map((appointment, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.organization}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.researchType}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => handleViewDetails(appointment)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View Details
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

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        consultation={selectedAppointment}
        onAccept={() => handleAccept(selectedAppointment)}
        onDecline={() => handleDeclineClick(selectedAppointment)}
      />

      {/* Decline Modal */}
      <DeclineModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onConfirm={handleConfirmDecline}
      />
    </AdminLayout>
  );
}
