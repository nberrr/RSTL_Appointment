"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth,
  isSameMonth, 
  isSameDay, 
  isToday,
  startOfWeek,
  endOfWeek,
  addDays,
  getDay,
  parseISO,
  isWithinInterval
} from 'date-fns';
import { FaFlask, FaClock, FaSearch, FaCalendar, FaTimes, FaEllipsisH, FaCheck, FaBan, FaCheckCircle } from 'react-icons/fa';
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";

const ScheduleModal = ({ isOpen, onClose, appointment, onStatusUpdate }) => {
  if (!isOpen || !appointment) return null;
  
  const handleUpdate = async (newStatus) => {
    onClose();
    await onStatusUpdate(appointment.id, newStatus);
  };

  // Function to get status color (can be defined here or outside)
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
                            disabled 
                            className="px-3 py-1.5 text-xs bg-purple-500 text-white rounded-md hover:bg-purple-600 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
};

export default function ChemistryCalendarAndTable() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); 
  const [viewMode, setViewMode] = useState('month'); // 'day', 'week', 'month', 'all'

  // Function to get status color (shared by modal and calendar/table)
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

  // Fetch *all* chemistry appointments 
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/chemistry/calendar-appointments`); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setAppointments(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch appointments');
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // --- Status Update Logic (remains the same) --- 
  const handleStatusUpdate = async (appointmentId, newStatus) => {
     try {
      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }
      
      // Refetch appointments to show updates
      fetchAppointments(); 
      
    } catch (err) {
      console.error("Failed to update appointment status:", err);
      alert(`Error updating status: ${err.message}`);
    }
  };

  // --- Modal Open/Close Logic (remains the same) --- 
  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // --- Calendar Navigation Logic --- 
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // --- Calendar Rendering Functions --- 
  const renderCalendarHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-lg">&lt;</button>
          <button onClick={() => { setCurrentMonth(new Date()); setSelectedDate(null); setViewMode('month'); }} className="px-3 py-1 text-xs hover:bg-gray-100 rounded-lg border">Today</button>
          <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-lg">&gt;</button>
        </div>
      </div>
    );
  };

  const renderCalendarDaysHeader = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Use single letters for smaller view
    return (
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-1">
        {/* Use index to ensure unique keys for duplicate day letters */}
        {days.map((day, index) => <div key={`${day}-${index}`} className="py-1">{day}</div>)}
      </div>
    );
  };

  const renderCalendarCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        // Filter all fetched appointments for the current cell day
        const dayAppointments = appointments.filter(apt => 
          isSameDay(parseISO(apt.appointment_date), cloneDay)
        );
        
        days.push(
          <div
            key={format(day, 'yyyy-MM-dd')}
            day={cloneDay}
            className={`
              p-1 border border-gray-100 h-16 overflow-hidden flex flex-col items-center justify-start cursor-pointer 
              ${!isSameMonth(day, monthStart) ? 'bg-gray-50 text-gray-400' : 'bg-white hover:bg-blue-50'}
              ${isToday(day) ? 'border-blue-300 font-semibold' : ''}
              ${selectedDate && isSameDay(day, selectedDate) && viewMode === 'day' ? 'bg-blue-100 ring-1 ring-blue-300' : ''}
            `}
            onClick={() => {
              if (isSameMonth(cloneDay, monthStart)) {
                  setSelectedDate(cloneDay); 
                  setViewMode('day'); // Switch to day view when a date is clicked
              } else {
                  setCurrentMonth(cloneDay); // Navigate if clicking day outside current month
                  setSelectedDate(cloneDay);
                  setViewMode('day');
              }
            }}
          >
            <span className={`text-xs ${isToday(day) ? 'text-blue-600 font-bold' : ''}`}>
              {format(day, 'd')}
            </span>
            {/* Appointment Dots (simplified for small view) */}
            {dayAppointments.length > 0 && (
                <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                    {dayAppointments.slice(0, 4).map(apt => (
                        <span key={apt.id} className={`w-1 h-1 rounded-full ${getStatusColor(apt.status).dotClass}`} title={apt.status}></span>
                    ))}
                    {dayAppointments.length > 4 && <span className="w-1 h-1 rounded-full bg-gray-400" title={`${dayAppointments.length - 4} more`}></span>}
                </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={days.length > 0 ? format(days[0].props.day, 'yyyy-MM-dd-week') : `empty-row-${rows.length}`}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="border-t border-l border-gray-200">{rows}</div>;
  };

  // --- Filtering Logic for Table --- 
  const filteredAppointments = appointments.filter(apt => {
      // Date Range Filter based on viewMode
      let isInDateRange = true;
      const aptDate = parseISO(apt.appointment_date);
      const refDate = selectedDate || currentMonth; // Use selectedDate if available, else currentMonth for week/month context

      switch (viewMode) {
          case 'day':
              isInDateRange = isSameDay(aptDate, refDate);
              break;
          case 'week':
              const weekStart = startOfWeek(refDate, { weekStartsOn: 0 }); // Assuming Sunday start
              const weekEnd = endOfWeek(refDate, { weekStartsOn: 0 });
              isInDateRange = isWithinInterval(aptDate, { start: weekStart, end: weekEnd });
              break;
          case 'month':
              const monthStart = startOfMonth(currentMonth); // Always use currentMonth for month view
              const monthEnd = endOfMonth(currentMonth);
              isInDateRange = isWithinInterval(aptDate, { start: monthStart, end: monthEnd });
              break;
          case 'all':
              isInDateRange = true;
              break;
          default:
              isInDateRange = true;
      }

      if (!isInDateRange) return false; 

      // Search Term Filter
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || (
          apt.id.toString().includes(lowerSearchTerm) ||
          apt.customer_name?.toLowerCase().includes(lowerSearchTerm) ||
          apt.analysis_requested?.toLowerCase().includes(lowerSearchTerm) ||
          apt.status?.toLowerCase().includes(lowerSearchTerm)
      );
      
      // Status Filter
      const matchesStatus = filterStatus === 'all' || apt.status?.toLowerCase() === filterStatus;
      
      return matchesSearch && matchesStatus; // Must match date (if set), search, and status
  });

  // Calculate stats for the current view
  const currentViewStats = (() => {
      let stats = { total: 0 };
      let title = ''
      let dateRange = { start: null, end: null };
      const refDate = selectedDate || currentMonth;

      switch (viewMode) {
          case 'day':
              if (!selectedDate) return { title: 'Select a day', stats: { total: 0 } };
              title = `Info for ${format(selectedDate, 'MMM d')}`;
              dateRange = { start: selectedDate, end: selectedDate };
              break;
          case 'week':
              dateRange.start = startOfWeek(refDate, { weekStartsOn: 0 });
              dateRange.end = endOfWeek(refDate, { weekStartsOn: 0 });
              title = `Info for Week of ${format(dateRange.start, 'MMM d')}`;
              break;
          case 'month':
              dateRange.start = startOfMonth(currentMonth);
              dateRange.end = endOfMonth(currentMonth);
              title = `Info for ${format(currentMonth, 'MMMM yyyy')}`;
              break;
          case 'all':
          default:
              title = 'Info for All Appointments';
              dateRange = null; // No date range filtering for 'all' stats
      }

      appointments.forEach(apt => {
          const aptDate = parseISO(apt.appointment_date);
          // Check if appointment falls within the calculated range (if range exists)
          if (!dateRange || isWithinInterval(aptDate, dateRange) || (viewMode === 'day' && isSameDay(aptDate, dateRange.start))) {
              stats.total++;
              const status = apt.status.toLowerCase();
              stats[status] = (stats[status] || 0) + 1;
          }
      });

      return { title, stats };
  })();

  // --- Dynamic Table Title --- 
  const getTableTitle = () => {
      switch (viewMode) {
          case 'day': return `Appointments for ${format(selectedDate || new Date(), 'PPP')}`;
          case 'week':
              const weekStart = startOfWeek(selectedDate || currentMonth, { weekStartsOn: 0 });
              return `Appointments for Week of ${format(weekStart, 'MMM d')}`;
          case 'month': return `Appointments for ${format(currentMonth, 'MMMM yyyy')}`;
          case 'all': default: return 'All Chemistry Appointments';
      }
  };

  // --- Main JSX Layout --- 
  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-4 flex flex-col lg:flex-row gap-4">
            
            {/* Left Column: Calendar, Quick Info & Filters */}
            <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col gap-4">
                {/* Calendar Container */}
                <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200 flex-grow flex flex-col">
                    {renderCalendarHeader()}
                    {renderCalendarDaysHeader()}
                    <div className="flex-grow">
                        {renderCalendarCells()}
                  </div>
                </div>

                {/* Quick Info Container - Always Visible, Enlarged */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex-shrink-0">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">{currentViewStats.title}</h3>
                    <div className="text-sm space-y-1.5">
                        <p>Total Appointments: <span className="font-semibold text-lg">{currentViewStats.stats.total}</span></p>
                        {/* List counts by status */}
                        {Object.entries(currentViewStats.stats).map(([status, count]) => {
                            if (status === 'total' || count === 0) return null;
                            const color = getStatusColor(status);
                      return (
                                <p key={status} className={`${color.textClass} capitalize`}>
                                    {status}: <span className="font-medium">{count}</span>
                                </p>
                      );
                    })}
                        {currentViewStats.stats.total === 0 && <p className="text-gray-500 text-xs italic">No appointments in this view.</p>}
                </div>
              </div>

                {/* Filters Container */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex-shrink-0">
                   <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>
                   <div className="flex flex-col gap-3">
                        {/* Date Filter Display/Clear */}
                        {selectedDate && (
                  <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Date: {format(selectedDate, 'MMM d')}</span>
                                <button 
                                    onClick={() => setSelectedDate(null)} 
                                    className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
                                >
                                    Clear Date
                                </button>
                    </div>
                        )}
                        {/* Search Filter */}
                        <div className="relative w-full">
                        <input
                          type="text"
                                placeholder="Search ID, Name, Analysis..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 pr-3 py-1.5 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                      </div>
                        {/* Status Filter */}
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-1.5 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                            <option value="declined">Declined</option>
                      </select>
                    </div>
                  </div>
                </div>

            {/* Right Column: Table & View Controls */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              {/* View Controls & Table Title */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex-shrink-0">
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                     <h3 className="text-base md:text-lg font-semibold text-gray-900 whitespace-nowrap">
                          {getTableTitle()} {/* Dynamic Title */}
                      </h3>
                      {/* View Mode Buttons */}
                      <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5">
                          {(viewMode !== 'day' || !selectedDate) && (
                              <button 
                                  onClick={() => { setViewMode('day'); if(!selectedDate) setSelectedDate(new Date()); }}
                                  className={`px-3 py-1 text-xs rounded-md ${viewMode === 'day' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                                  title="Day View (requires selecting a day on calendar)"
                                  disabled={!selectedDate} // Disable if no date selected
                              >
                                  Day
                              </button>
                          )}
                          {selectedDate && viewMode === 'day' && (
                             <button className="px-3 py-1 text-xs rounded-md bg-gray-200 font-medium">Day</button> // Show selected state
                          )}
                           <button 
                              onClick={() => setViewMode('week')}
                              className={`px-3 py-1 text-xs rounded-md ${viewMode === 'week' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                          >
                              Week
                          </button>
                          <button 
                              onClick={() => setViewMode('month')}
                              className={`px-3 py-1 text-xs rounded-md ${viewMode === 'month' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                          >
                              Month
                          </button>
                          <button 
                              onClick={() => { setViewMode('all'); setSelectedDate(null); }}
                              className={`px-3 py-1 text-xs rounded-md ${viewMode === 'all' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                          >
                              All
                          </button>
                      </div>
                 </div>
              </div>

              {/* Appointments Table Container */}
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
                            {/* Show Date/Time only if not in Day view */}
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
            </div>
          </main>
        </div>
      </div>
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={closeModal} 
        appointment={selectedAppointment}
        onStatusUpdate={handleStatusUpdate}
      />
    </AdminLayout>
  );
} 