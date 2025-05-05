import React from "react";
import { FaTimes, FaCheck } from 'react-icons/fa';

export default function ConsultationModal({ isOpen, onClose, consultation, onAccept, onDecline }) {
  if (!isOpen) return null;

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
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg border-t flex-shrink-0">
           {consultation?.status === 'pending' && (
              <>
            <button
                    onClick={onDecline}
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
} 