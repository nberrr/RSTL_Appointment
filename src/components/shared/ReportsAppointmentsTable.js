import React from "react";

export default function ReportsAppointmentsTable({ appointments, getStatusColor }) {
  return (
    <div className="overflow-x-auto flex-1 min-h-0 rounded-b-2xl" style={{ overflowY: 'auto' }}>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Name</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type of Test</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liters</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Truck Plate</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment.id || index} className="hover:bg-blue-50 transition-all duration-150 cursor-pointer">
              <td className="px-6 py-4 text-sm font-medium text-blue-600">{appointment.id}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{appointment.date || appointment.appointment_date || ''}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{appointment.organization || appointment.company_name || ''}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{appointment.customer_name || ''}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{appointment.name_of_samples || ''}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{appointment.type_of_test || ''}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{appointment.number_of_liters || ''}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{appointment.truck_plate_number || ''}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status).bgClass} ${getStatusColor(appointment.status).textClass}`}>
                  {appointment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 