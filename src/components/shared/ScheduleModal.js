import React from "react";
import { FaTimes, FaCheck, FaBan, FaFlask, FaCheckCircle, FaUser, FaVial, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-hidden p-0">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" /> Appointment Details <span className="text-xs font-normal text-gray-400">(ID: {appointment.id})</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl p-1 rounded-full hover:bg-gray-100 transition">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-2 px-4 py-3 bg-gray-50">
          {/* Client Information */}
          <div className="bg-white rounded-lg border p-3 text-xs flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1 text-blue-700 font-semibold"><FaUser /> Client</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <div><span className="text-gray-500">Name:</span> <span className="font-medium text-gray-900">{appointment.customer_name}</span></div>
              <div><span className="text-gray-500">Contact:</span> <span className="font-medium text-gray-900">{appointment.customer_contact || 'N/A'}</span></div>
              <div><span className="text-gray-500">Email:</span> <span className="font-medium text-gray-900 break-words">{appointment.customer_email || 'N/A'}</span></div>
            </div>
          </div>
          {/* Sample & Test Information */}
          <div className="bg-white rounded-lg border p-3 text-xs flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1 text-green-700 font-semibold"><FaVial /> Sample & Test</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {appointment.analysis_requested && (
                <div><span className="text-gray-500">Analysis:</span> <span className="font-medium text-gray-900">{appointment.analysis_requested}</span></div>
              )}
              {appointment.sample_description && (
                <div><span className="text-gray-500">Sample:</span> <span className="font-medium text-gray-900">{appointment.sample_description}</span></div>
              )}
              {appointment.delivery_type && (
                <div><span className="text-gray-500">Delivery:</span> <span className="font-medium text-gray-900">{appointment.delivery_type}</span></div>
              )}
            </div>
          </div>
          {/* Metrology Details */}
          {(appointment.type_of_test || appointment.number_of_liters || appointment.truck_plate_number) && (
            <div className="bg-white rounded-lg border p-3 text-xs flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1 text-indigo-700 font-semibold"><FaFlask /> Metrology</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {appointment.type_of_test && (
                  <div><span className="text-gray-500">Test:</span> <span className="font-medium text-gray-900">{appointment.type_of_test}</span></div>
                )}
                {appointment.number_of_liters && (
                  <div><span className="text-gray-500">Liters:</span> <span className="font-medium text-gray-900">{appointment.number_of_liters}</span></div>
                )}
                {appointment.truck_plate_number && (
                  <div><span className="text-gray-500">Plate:</span> <span className="font-medium text-gray-900">{appointment.truck_plate_number}</span></div>
                )}
              </div>
            </div>
          )}
          {/* Appointment Details */}
          <div className="bg-white rounded-lg border p-3 text-xs flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1 text-gray-700 font-semibold"><FaCalendarAlt /> Appointment</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <div><span className="text-gray-500">Date:</span> <span className="font-medium text-gray-900">{format(parseISO(appointment.appointment_date), 'PPP')}</span></div>
              <div><span className="text-gray-500">Time:</span> <span className="font-medium text-gray-900">{appointment.appointment_time ? format(parseISO(`1970-01-01T${appointment.appointment_time}Z`), 'p') : 'N/A'}</span></div>
              <div className="flex items-center gap-2 mt-1"><span className={`inline-block w-2 h-2 rounded-full ${statusColors.dotClass}`}></span><span className={`font-semibold px-2 py-0.5 rounded-full text-xxs ${statusColors.bgClass} ${statusColors.textClass}`}>{appointment.status}</span></div>
            </div>
          </div>
          {/* Actions */}
          <div className="bg-white rounded-lg border p-3 text-xs flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1 text-gray-700 font-semibold"><FaInfoCircle /> Manage</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {appointment.status === 'pending' && (
                <button
                  onClick={() => handleUpdate('accepted')}
                  className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1 shadow"
                >
                  <FaCheck /> Accept
                </button>
              )}
              {(appointment.status === 'pending' || appointment.status === 'accepted') && (
                <button
                  onClick={() => handleUpdate('declined')}
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1 shadow"
                >
                  <FaBan /> Decline
                </button>
              )}
              {appointment.status === 'accepted' && (
                <button
                  onClick={() => handleUpdate('in progress')}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1 shadow"
                >
                  <FaFlask /> Start Test
                </button>
              )}
              {appointment.status === 'in progress' && (
                <button
                  onClick={() => handleUpdate('completed')}
                  className="px-3 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center gap-1 shadow"
                >
                  <FaCheckCircle /> Mark Complete
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Footer Actions */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t bg-white rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium shadow"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 