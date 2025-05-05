import React from "react";
import { FaTimes, FaCheck, FaBan, FaFlask, FaCheckCircle } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

export default function ScheduleModal({ isOpen, onClose, appointment, onStatusUpdate }) {
  if (!isOpen || !appointment) return null;

  const handleUpdate = async (newStatus) => {
    onClose();
    await onStatusUpdate(appointment.id, newStatus);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return { bgClass: 'bg-green-100', textClass: 'text-green-800', dotClass: 'bg-green-500' };
      case 'pending': return { bgClass: 'bg-yellow-100', textClass: 'text-yellow-800', dotClass: 'bg-yellow-500' };
      case 'accepted': return { bgClass: 'bg-blue-100', textClass: 'text-blue-800', dotClass: 'bg-blue-500' };
      case 'in progress': return { bgClass: 'bg-indigo-100', textClass: 'text-indigo-800', dotClass: 'bg-indigo-500' };
      case 'declined': return { bgClass: 'bg-red-100', textClass: 'text-red-800', dotClass: 'bg-red-500' };
      default: return { bgClass: 'bg-gray-100', textClass: 'text-gray-800', dotClass: 'bg-gray-500' };
    }
  };
  const statusColors = getStatusColor(appointment.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Appointment Details (ID: {appointment.id})</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="font-medium mb-3 pb-2 border-b">Client Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-gray-600">Name</label>
                  <p className="font-medium text-gray-900">{appointment.customer_name}</p>
                </div>
                <div>
                  <label className="text-gray-600">Contact</label>
                  <p className="font-medium text-gray-900">{appointment.customer_contact || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-gray-600">Email</label>
                  <p className="font-medium text-gray-900 break-words">{appointment.customer_email || 'N/A'}</p>
                </div>
              </div>
            </div>
            {/* Sample Information */}
            <div>
              <h3 className="font-medium mb-3 pb-2 border-b">Sample & Test Information</h3>
              <div className="grid gap-4 text-sm">
                <div>
                  <label className="text-gray-600">Analysis Requested</label>
                  <p className="font-medium text-gray-900">{appointment.analysis_requested}</p>
                </div>
                <div>
                  <label className="text-gray-600">Sample Description</label>
                  <p className="font-medium text-gray-900">{appointment.sample_description || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-gray-600">Delivery Type</label>
                  <p className="font-medium text-gray-900">{appointment.delivery_type}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            {/* Appointment Details */}
            <div>
              <h3 className="font-medium mb-3 pb-2 border-b">Appointment Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-gray-600">Date</label>
                  <p className="font-medium text-gray-900">{format(parseISO(appointment.appointment_date), 'PPP')}</p>
                </div>
                <div>
                  <label className="text-gray-600">Time</label>
                  <p className="font-medium text-gray-900">{appointment.appointment_time ? format(parseISO(`1970-01-01T${appointment.appointment_time}Z`), 'p') : 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-gray-600">Status</label>
                  <p className={`font-medium px-2 py-0.5 rounded inline-block ${statusColors.bgClass} ${statusColors.textClass}`}>{appointment.status}</p>
                </div>
              </div>
            </div>
            {/* Actions */}
            <div>
              <h3 className="font-medium mb-3 pb-2 border-b">Manage Appointment</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {appointment.status === 'pending' && (
                  <button
                    onClick={() => handleUpdate('accepted')}
                    className="px-3 py-1.5 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-1"
                  >
                    <FaCheck /> Accept
                  </button>
                )}
                {(appointment.status === 'pending' || appointment.status === 'accepted') && (
                  <button
                    onClick={() => handleUpdate('declined')}
                    className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-1"
                  >
                    <FaBan /> Decline
                  </button>
                )}
                {appointment.status === 'accepted' && (
                  <button
                    onClick={() => handleUpdate('in progress')}
                    className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-1"
                  >
                    <FaFlask /> Start Test
                  </button>
                )}
                {appointment.status === 'in progress' && (
                  <button
                    onClick={() => handleUpdate('completed')}
                    className="px-3 py-1.5 text-xs bg-purple-500 text-white rounded-md hover:bg-purple-600 flex items-center gap-1"
                  >
                    <FaCheckCircle /> Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Footer Actions */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 