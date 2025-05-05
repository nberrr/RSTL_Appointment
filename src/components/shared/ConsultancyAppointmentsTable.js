import React from "react";
import { FaSearch, FaFilter, FaChevronDown, FaCheck, FaTimes } from 'react-icons/fa';

export default function ConsultancyAppointmentsTable({
  filteredAppointments,
  loading,
  error,
  getStatusColor,
  onAccept,
  onDecline,
  onViewDetails,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus
}) {
  return (
    <>
      {/* Header: Title, Search, Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex-shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-900 flex-shrink-0">Appointments</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-grow justify-end">
            {/* Search Input */}
            <div className="relative w-full sm:w-56">
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
              >
                <option value="All">All Appointments</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Declined">Declined</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 pointer-events-none" />
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      {/* Table Container */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-grow">
          {loading && <p className="p-6 text-center text-gray-500">Loading appointments...</p>}
          {error && <p className="p-6 text-center text-red-500">Error loading data: {error}</p>}
          {!loading && !error && (
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Name & Organization</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Research Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment, index) => {
                    const statusColors = getStatusColor(appointment.status);
                    return (
                      <tr key={appointment.id || index} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewDetails(appointment)}>
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
                                onClick={e => { e.stopPropagation(); onAccept(appointment); }}
                                className="inline-flex items-center justify-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded"
                              >
                                <FaCheck size={11} /> Accept
                              </button>
                              <button
                                onClick={e => { e.stopPropagation(); onDecline(appointment); }}
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
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-500">No appointments found matching your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
} 