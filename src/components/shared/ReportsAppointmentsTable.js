import React from "react";
import { FaEllipsisH } from 'react-icons/fa';

export default function ReportsAppointmentsTable({ appointments, getStatusColor, onViewDetails }) {
  return (
    <div className="overflow-x-auto flex-1 min-h-0 rounded-b-2xl" style={{ overflowY: 'auto' }}>
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
          {appointments.map((appointment, index) => (
            <tr key={appointment.id || index} className="hover:bg-blue-50 hover:border-l-4 hover:border-blue-400 transition-all duration-150 cursor-pointer" onClick={() => onViewDetails(appointment)}>
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
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status).bgClass} ${getStatusColor(appointment.status).textClass}`}>
                  {appointment.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <button 
                  onClick={e => { e.stopPropagation(); onViewDetails(appointment); }}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <FaEllipsisH className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 