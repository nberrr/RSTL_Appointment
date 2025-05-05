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
import CalendarDashboardLayout from "@/components/layout/CalendarDashboardLayout";
import CalendarMonthView from "@/components/shared/CalendarMonthView";
import DashboardQuickInfo from "@/components/shared/DashboardQuickInfo";
import DashboardFilters from "@/components/shared/DashboardFilters";
import DashboardAppointmentsTable from "@/components/shared/DashboardAppointmentsTable";
import ScheduleModal from "@/components/shared/ScheduleModal";

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
    <CalendarDashboardLayout
      leftColumn={
        <>
          <CalendarMonthView
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            appointments={appointments}
            onDateSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                setViewMode('day');
              }
            }}
            onMonthChange={(delta) => {
              if (delta === 0) {
                setCurrentMonth(new Date());
                setSelectedDate(null);
                setViewMode('month');
              } else {
                setCurrentMonth(addMonths(currentMonth, delta));
              }
            }}
            getStatusColor={getStatusColor}
            viewMode={viewMode}
          />
          <DashboardQuickInfo
            title={currentViewStats.title}
            stats={currentViewStats.stats}
            getStatusColor={getStatusColor}
          />
          <DashboardFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </>
      }
      rightColumn={
        <>
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex-shrink-0">
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                     <h3 className="text-base md:text-lg font-semibold text-gray-900 whitespace-nowrap">
                {getTableTitle()}
                      </h3>
                      <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5">
                          {(viewMode !== 'day' || !selectedDate) && (
                              <button 
                    onClick={() => { setViewMode('day'); if (!selectedDate) setSelectedDate(new Date()); }}
                                  className={`px-3 py-1 text-xs rounded-md ${viewMode === 'day' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                                  title="Day View (requires selecting a day on calendar)"
                    disabled={!selectedDate}
                              >
                                  Day
                              </button>
                          )}
                          {selectedDate && viewMode === 'day' && (
                  <button className="px-3 py-1 text-xs rounded-md bg-gray-200 font-medium">Day</button>
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
          <DashboardAppointmentsTable
            filteredAppointments={filteredAppointments}
            viewMode={viewMode}
            openModal={openModal}
            getStatusColor={getStatusColor}
            loading={loading}
            error={error}
          />
        </>
      }
      modal={
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={closeModal} 
        appointment={selectedAppointment}
        onStatusUpdate={handleStatusUpdate}
      />
      }
    />
  );
} 