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
        <tbody className="divide-y divide-gray-100">
          {data.map((consultation, index) => (
            <tr key={consultation.id || index} className="hover:bg-gray-50 hover:border-l-4 hover:border-blue-400 transition-all duration-150 cursor-pointer" onClick={() => onViewDetails(consultation)}>
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{displayValue(consultation.researchTopic)}</td>
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{displayValue(consultation.researchType)}</td>
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{displayValue(consultation.position)}</td>
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{displayValue(consultation.date)}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status).bgClass} ${getStatusColor(consultation.status).textClass}`}>{displayValue(consultation.status)}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <button 
                  onClick={e => { e.stopPropagation(); onViewDetails(consultation); }}
                  className="text-gray-400 hover:text-gray-600"
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