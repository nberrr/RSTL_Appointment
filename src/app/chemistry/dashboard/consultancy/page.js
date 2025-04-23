"use client";

import React, { useState, useEffect, useCallback } from 'react';
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import { FaSearch, FaFilter, FaCalendar, FaTimes, FaDownload, FaChevronDown, FaCheck, FaRegFile } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

const ConsultationModal = ({ isOpen, onClose, consultation, onAccept, onDecline }) => {
  if (!isOpen) return null;

  // Determine status colors within the modal
  const getModalStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return { bgClass: 'bg-yellow-100', textClass: 'text-yellow-800' };
      case 'accepted': return { bgClass: 'bg-green-100', textClass: 'text-green-800' };
      case 'declined': return { bgClass: 'bg-red-100', textClass: 'text-red-800' };
      default: return { bgClass: 'bg-gray-100', textClass: 'text-gray-800' };
    }
  };
  const modalStatusColors = getModalStatusColor(consultation?.status);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold">Consultation Details</h2>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${modalStatusColors.bgClass} ${modalStatusColors.textClass}`}>
              {consultation?.status}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="space-y-6">
            {/* Researcher Info */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-600">Researcher Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex gap-2 items-start">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium">{consultation?.name || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium break-all">{consultation?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Contact Number</p>
                    <p className="text-sm font-medium">{consultation?.contactNo || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Position/Stage</p>
                    <p className="text-sm font-medium">{consultation?.position || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

             {/* School Info */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-600">School/Institution</h3>
              <div className="flex gap-2 items-start">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                 <p className="text-sm font-medium">{consultation?.organization || 'N/A'}</p>
              </div>
            </div>

            {/* Research Info */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-600">Research Information</h3>
              <div className="space-y-4">
                <div className="flex gap-2 items-start">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Research Topic</p>
                    <p className="text-sm font-medium">{consultation?.researchTopic || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Research Type</p>
                    <p className="text-sm font-medium">{consultation?.researchType || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

             {/* Consultation Details */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-600">Consultation Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                <div className="flex gap-2 items-start">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium">{consultation?.date || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-medium">{consultation?.time || 'N/A'}</p>
                  </div>
                </div>
              </div>
              {/* Description */}
              {(consultation?.description && consultation.description !== 'N/A') && (
                <div className="flex gap-2 items-start mt-4">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Description / Requirements</p>
                    <p className="text-sm mt-1 whitespace-pre-wrap font-medium">{consultation?.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Conditionally show buttons only if needed based on status */}
        {/* If actions are primarily in the table, this footer might just need a close button */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg border-t flex-shrink-0">
           {consultation?.status === 'pending' && (
              <>
                 <button
                    onClick={onDecline} // This should likely open the DeclineModal
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-2 rounded-lg hover:bg-red-50"
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
              </>
           )}
           {/* Always show Close button? Or only if not pending? */}
            <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
                Close
            </button>
        </div>

      </div>
    </div>
  );
};


const DeclineModal = ({ isOpen, onClose, onConfirm }) => {
   const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Decline Consultation</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="declineReason" className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Declining
          </label>
          <textarea
            id="declineReason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            rows="4"
            placeholder="Please provide a reason for declining this consultation..."
          ></textarea>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (reason.trim()) {
                onConfirm(reason);
                onClose();
                setReason(''); // Clear reason after confirming
              }
            }}
            disabled={!reason.trim()}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-150 ${
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


// Updated getStatusColor to provide dot class as well
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return { bgClass: 'bg-yellow-100', textClass: 'text-yellow-800', dotClass: 'bg-yellow-500' };
    case 'accepted': return { bgClass: 'bg-green-100', textClass: 'text-green-800', dotClass: 'bg-green-500' };
    case 'declined': return { bgClass: 'bg-red-100', textClass: 'text-red-800', dotClass: 'bg-red-500' };
    default: return { bgClass: 'bg-gray-100', textClass: 'text-gray-800', dotClass: 'bg-gray-500' };
  }
};


export default function ConsultancyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [appointmentToDecline, setAppointmentToDecline] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All'); // Added state for filter dropdown

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConsultations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/chemistry/consultancy-appointments');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success) {
        // Ensure data is always an array
        setAppointments(Array.isArray(data.data) ? data.data : []);
      } else {
        throw new Error(data.message || 'Failed to fetch consultations');
      }
    } catch (err) {
      console.error("Failed to fetch consultations:", err);
      setError(err.message);
      setAppointments([]); // Ensure appointments is an empty array on error
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const handleStatusUpdate = async (appointmentId, newStatus, declineReason = null) => {
     // Basic validation
    if (!appointmentId || !newStatus) {
        console.error("Missing appointmentId or newStatus for update.");
        return;
    }
    try {
      const bodyPayload = { status: newStatus };
      // Include reason if declining
      // if (newStatus === 'declined' && declineReason) {
      //   bodyPayload.reason = declineReason; // Add reason if your API supports it
      // }

      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to update status (${response.status})`);
      }

      // Re-fetch data to reflect changes
      fetchConsultations();

    } catch (err) {
      console.error("Failed to update status:", err);
      // Provide feedback to the user (e.g., using a toast notification library)
      alert(`Error updating status: ${err.message}`);
    }
  };


  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleAccept = (appointment) => {
    if (!appointment || !appointment.id) return;
    handleStatusUpdate(appointment.id, 'accepted');
    // Optionally close modal if it was open
    if (isModalOpen) setIsModalOpen(false);
  };


  const handleDeclineClick = (appointment) => {
    if (!appointment || !appointment.id) return;
    setAppointmentToDecline(appointment);
    // If modal is open for details, close it before opening decline modal
    if (isModalOpen) setIsModalOpen(false);
    setIsDeclineModalOpen(true);
  };


  const handleConfirmDecline = (reason) => {
    if (!appointmentToDecline || !appointmentToDecline.id) return;
    handleStatusUpdate(appointmentToDecline.id, 'declined', reason);
    setAppointmentToDecline(null); // Clear the state after confirming
     setIsDeclineModalOpen(false); // Close the decline modal
  };


  // --- Filtering Logic ---
  // Ensure appointments is an array before filtering
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const acceptedAppointments = safeAppointments.filter(apt => apt.status === 'accepted');

  const filteredAppointments = safeAppointments.filter(apt => {
    // Filter by Status Dropdown
    if (filterStatus !== 'All' && apt.status?.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }

    // Filter by Search Term (only apply if searchTerm exists)
    const lowerSearchTerm = searchTerm.toLowerCase();
    if (searchTerm && !(
        apt.name?.toLowerCase().includes(lowerSearchTerm) ||
        apt.organization?.toLowerCase().includes(lowerSearchTerm) ||
        apt.researchType?.toLowerCase().includes(lowerSearchTerm) ||
        apt.status?.toLowerCase().includes(lowerSearchTerm) // Include status in search
    )) {
      return false;
    }
    return true; // Return true if status matches (or is 'All') and search matches (or is empty)
  });


  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          {/* Main content area with two columns */}
          <main className="flex-1 bg-gray-100 p-4 lg:p-6 flex flex-col md:flex-row gap-6">

            {/* Left Column: Accepted Appointments List */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                  <h3 className="text-base font-semibold text-gray-800">Accepted Appointments</h3>
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {acceptedAppointments.length} Total
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-1"> {/* Added pr-1 for scrollbar spacing */}
                  {loading && <p className="text-gray-500 text-sm p-4 text-center">Loading...</p>}
                  {error && <p className="text-red-500 text-sm p-4 text-center">Error loading list.</p>}
                  {!loading && !error && acceptedAppointments.length > 0 ? (
                    acceptedAppointments.map(apt => {
                      const statusColors = getStatusColor(apt.status); // Reuse getStatusColor
                      return (
                        <div key={apt.id} className={`p-3 rounded-md border border-l-4 ${statusColors.bgClass.replace('bg-', 'border-')} ${statusColors.bgClass} cursor-pointer hover:shadow-md transition-shadow duration-150`} onClick={() => handleViewDetails(apt)}>
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-semibold text-sm text-gray-900 truncate" title={apt.name}>{apt.name}</p>
                            {/* Status badge removed from card per image */}
                          </div>
                          <p className="text-xs text-gray-600">{apt.date} &middot; {apt.time}</p>
                          <p className="text-xs text-gray-500 mt-1 truncate" title={apt.organization}>{apt.organization}</p>
                          <p className="text-xs text-gray-500 mt-0.5 truncate" title={apt.researchType}>{apt.researchType}</p>
                        </div>
                      );
                    })
                  ) : (
                    !loading && !error && <p className="text-sm text-gray-400 italic p-4 text-center">No accepted appointments.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Main Appointments Table */}
            <div className="flex-1 flex flex-col gap-4 min-w-0"> {/* Ensure right column can shrink */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex-shrink-0">
                {/* Header: Title, Search, Filter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-gray-900 flex-shrink-0">Appointments</h2>
                  <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-grow justify-end">
                      {/* Search Input */}
                      <div className="relative w-full sm:w-56"> {/* Adjusted width */}
                          <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      </div>
                      {/* Filter Dropdown */}
                       <div className="relative w-full sm:w-auto">
                          <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-8 pr-8 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                            // style={{ paddingRight: '2.5rem' }} // Ensure space for icon
                          >
                            <option value="All">All Appointments</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Declined">Declined</option>
                            {/* Add other statuses if needed */}
                          </select>
                           <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 pointer-events-none" />
                           <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                      </div>
                  </div>
                </div>
              </div>

              {/* Table Container */}
              <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col"> {/* Added flex flex-col */}
                <div className="overflow-auto flex-grow"> {/* Added flex-grow */}
                   {loading && <p className="p-6 text-center text-gray-500">Loading appointments...</p>}
                   {error && <p className="p-6 text-center text-red-500">Error loading data: {error}</p>}
                   {!loading && !error && <>{/* Ensure fragment has no extra space */}
                      <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                          <tr>{/* Ensure th tags immediately follow tr */}
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Time</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Name & Organization</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Research Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">{/* Ensure conditional fragments immediately follow tbody */}
                          {filteredAppointments.length > 0 ? <>{/* Ensure fragment has no extra space */}
                              {filteredAppointments.map((appointment, index) => {
                                const statusColors = getStatusColor(appointment.status);
                                return (
                                  <tr key={appointment.id || index} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewDetails(appointment)} >{/* Ensure td tags immediately follow tr */}
                                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{appointment.date}</td>
                                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{appointment.time}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 ">
                                      <div className="font-medium">{appointment.name}</div>
                                      <div className="text-xs text-gray-500">{appointment.organization}</div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{appointment.researchType}</td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${statusColors.bgClass} ${statusColors.textClass}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dotClass}`}></span>
                                        {appointment.status}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                                      {appointment.status === 'pending' ? (
                                        <div className="flex items-center gap-2">
                                          <button
                                            onClick={(e) => { e.stopPropagation(); handleAccept(appointment); }}
                                            className="inline-flex items-center justify-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded"
                                          >
                                            <FaCheck size={11} /> Accept
                                          </button>
                                          <button
                                             onClick={(e) => { e.stopPropagation(); handleDeclineClick(appointment); }}
                                             className="inline-flex items-center justify-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 hover:text-red-800 rounded hover:bg-red-50"
                                          >
                                            <FaTimes size={11} /> Decline
                                          </button>
                                        </div>
                                      ) : (
                                        <span className="text-gray-400 text-xs italic"></span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </> : <>{/* Ensure fragment has no extra space */}
                              <tr>{/* Ensure td immediately follows tr */}
                                  <td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-500">No appointments found matching your criteria.</td>
                              </tr>
                            </>}
                        </tbody>
                      </table>
                    </>}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modals remain the same, but Accept/Decline buttons might be redundant in ConsultationModal footer */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        consultation={selectedAppointment}
        // Pass handlers - they might be needed if user opens modal THEN decides
        onAccept={() => handleAccept(selectedAppointment)}
        onDecline={() => handleDeclineClick(selectedAppointment)}
      />
      <DeclineModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onConfirm={handleConfirmDecline}
      />
    </AdminLayout>
  );
} 