import React from "react";
import { FaEllipsisH } from 'react-icons/fa';

const displayValue = (val) => (!val || val === 'N/A' ? <span className="text-gray-400">—</span> : val);

export default function ConsultancyReportsTable({ data, getStatusColor, onViewDetails }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Research Topic</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultation Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Research Stage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((consultation) => (
            <tr key={consultation.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{displayValue(consultation.researchTopic)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{displayValue(consultation.researchType)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{displayValue(consultation.position)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{displayValue(consultation.date)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <span className={getStatusColor(consultation.status)}>
                  {displayValue(consultation.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  onClick={() => onViewDetails(consultation)}
                  className="text-blue-600 hover:text-blue-900"
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