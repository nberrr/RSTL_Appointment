import React from "react";
import { format, parseISO } from 'date-fns';
import { FaEllipsisH } from 'react-icons/fa';

export default function DashboardAppointmentsTable({
  filteredAppointments,
  viewMode,
  openModal,
  getStatusColor,
  loading,
  error
}) {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-auto h-full">
        {loading && <p className="p-4 text-center">Loading appointments...</p>}
        {error && <p className="p-4 text-center text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                {viewMode !== 'day' && <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>}
                {viewMode !== 'day' && <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>}
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Analysis</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => {
                  const statusColors = getStatusColor(appointment.status);
                  return (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-sm font-medium text-blue-600 whitespace-nowrap">{appointment.id}</td>
                      <td className="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">{appointment.customer_name}</td>
                      {viewMode !== 'day' && <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                        {format(parseISO(appointment.appointment_date), 'MMM d, yyyy')}
                      </td>}
                      {viewMode !== 'day' && <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                        {appointment.appointment_time ? format(parseISO(`1970-01-01T${appointment.appointment_time}Z`), 'p') : 'N/A'}
                      </td>}
                      <td className="px-3 py-2 text-sm text-gray-600 min-w-[150px]">{appointment.analysis_requested}</td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors.bgClass} ${statusColors.textClass}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-sm whitespace-nowrap">
                        <button
                          onClick={() => openModal(appointment)}
                          className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
                          title="View Details / Manage"
                        >
                          <FaEllipsisH />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={viewMode === 'day' ? 5 : 7} className="px-4 py-6 text-center text-sm text-gray-500">No appointments found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 
