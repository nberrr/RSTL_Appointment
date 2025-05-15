import React from "react";

export default function ReportsAppointmentsTable({ appointments, getStatusColor, columns = [] }) {
  return (
    <div className="overflow-x-auto flex-1 min-h-0 rounded-b-2xl" style={{ overflowY: 'auto' }}>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            {columns.map(col => (
              <th key={col.key} className={`px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.className || ''}`}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment.id || index} className="hover:bg-blue-50 transition-all duration-150 cursor-pointer">
              {columns.map(col => (
                <td key={col.key} className={`px-6 py-4 text-sm text-gray-900 ${col.className || ''}`}>
                  {col.key === 'status' ? (
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status).bgClass} ${getStatusColor(appointment.status).textClass}`}>
                      {appointment.status}
                    </span>
                  ) : (
                    appointment[col.key] || ''
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 