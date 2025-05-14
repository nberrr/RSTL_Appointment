"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardCalendar from '@/components/shared/DashboardCalendar';
import DashboardAppointmentsTable from '@/components/shared/DashboardAppointmentsTable';
import DashboardQuickInfo from '@/components/shared/DashboardQuickInfo';
import CalendarDashboardLayout from '@/components/layout/CalendarDashboardLayout';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case 'pending':
      return { bgClass: 'bg-yellow-100', textClass: 'text-yellow-800', dotClass: 'bg-yellow-500' };
    case 'in progress':
      return { bgClass: 'bg-blue-100', textClass: 'text-blue-800', dotClass: 'bg-blue-500' };
    case 'completed':
      return { bgClass: 'bg-green-100', textClass: 'text-green-800', dotClass: 'bg-green-500' };
    case 'declined':
      return { bgClass: 'bg-red-100', textClass: 'text-red-800', dotClass: 'bg-red-500' };
    default:
      return { bgClass: 'bg-gray-100', textClass: 'text-gray-800', dotClass: 'bg-gray-500' };
  }
}

function buildCalendarDays(appointments, year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();
  const days = [];
  // Map appointments by day
  const appointmentMap = {};
  appointments.forEach(apt => {
    const aptDate = new Date(apt.appointment_date);
    if (aptDate.getMonth() === month && aptDate.getFullYear() === year) {
      const dayKey = aptDate.getDate();
      appointmentMap[dayKey] = {
        count: apt.appointment_count,
        statuses: apt.statuses
      };
    }
  });
  for (let i = 0; i < firstDayWeekday; i++) {
    days.push({ day: null, isCurrentMonth: false, date: null });
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      appointments: appointmentMap[i] || null,
      date: new Date(year, month, i)
    });
  }
  const neededRows = Math.ceil((firstDayWeekday + totalDays) / 7);
  const totalCells = neededRows * 7;
  const remainingCells = totalCells - days.length;
  for (let i = 0; i < remainingCells; i++) {
    days.push({ day: null, isCurrentMonth: false, date: null });
  }
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
  return {
    days,
    currentMonth: `${monthNames[month]} ${year}`,
  };
}

export default function ShelfLifeCalendarPage() {
  const today = new Date();
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentDay, setCurrentDay] = useState(today.getDate());
  const [selectedDayAppointments, setSelectedDayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSelectedDay, setLoadingSelectedDay] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState('day');

  // Fetch dashboard data for calendar
  useEffect(() => {
    async function fetchCalendarData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/shelf-life/dashboard');
        const data = await res.json();
        if (data.success) {
          setAppointments(data.data.appointments || []);
          const calendar = buildCalendarDays(data.data.appointments || [], calendarYear, calendarMonth);
          setCalendarDays(calendar.days);
          setCurrentMonth(calendar.currentMonth);
        } else {
          setError(data.message || 'Failed to load calendar data');
        }
      } catch (err) {
        setError(err.message || 'Failed to load calendar data');
      } finally {
        setLoading(false);
      }
    }
    fetchCalendarData();
  }, [calendarYear, calendarMonth]);

  // Fetch appointments for a selected day
  const fetchAppointmentsForDay = useCallback(async (date) => {
    if (!date) {
      setSelectedDayAppointments([]);
      return;
    }
    setLoadingSelectedDay(true);
    try {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const res = await fetch(`/api/appointments/by-date?date=${year}-${month}-${day}&service=shelf-life`);
      const data = await res.json();
      if (data.success) {
        setSelectedDayAppointments(data.data || []);
      } else {
        setSelectedDayAppointments([]);
      }
    } catch (err) {
      setSelectedDayAppointments([]);
    } finally {
      setLoadingSelectedDay(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDay && selectedDay instanceof Date && !isNaN(selectedDay)) {
      fetchAppointmentsForDay(selectedDay);
    } else {
      setSelectedDayAppointments([]);
    }
  }, [selectedDay, fetchAppointmentsForDay]);

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCalendarMonth(prev => {
      if (prev === 0) {
        setCalendarYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };
  const goToNextMonth = () => {
    setCalendarMonth(prev => {
      if (prev === 11) {
        setCalendarYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // View mode switcher
  const viewModeButtons = (
    <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5">
      <button 
        onClick={() => { setViewMode('day'); setSelectedDay(today); }}
        className={`px-3 py-1 text-xs rounded-md ${viewMode === 'day' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
      >Day</button>
      <button 
        onClick={() => setViewMode('week')}
        className={`px-3 py-1 text-xs rounded-md ${viewMode === 'week' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
      >Week</button>
      <button 
        onClick={() => setViewMode('month')}
        className={`px-3 py-1 text-xs rounded-md ${viewMode === 'month' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
      >Month</button>
      <button 
        onClick={() => setViewMode('all')}
        className={`px-3 py-1 text-xs rounded-md ${viewMode === 'all' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
      >All</button>
    </div>
  );

  return (
    <CalendarDashboardLayout
      leftColumn={
        <>
          <DashboardCalendar
            currentMonth={currentMonth}
            weekdays={weekdays}
            calendarDays={calendarDays}
            selectedDay={selectedDay}
            currentDay={calendarYear === today.getFullYear() && calendarMonth === today.getMonth() ? today.getDate() : null}
            goToPreviousMonth={goToPreviousMonth}
            goToNextMonth={goToNextMonth}
            setSelectedDay={dayObj => setSelectedDay(dayObj?.date || null)}
            getStatusColor={getStatusColor}
          />
          <DashboardQuickInfo
            title="Date and Stats"
            stats={{ total: selectedDayAppointments.length, pending: selectedDayAppointments.filter(a => a.status === 'pending').length, completed: selectedDayAppointments.filter(a => a.status === 'completed').length }}
            getStatusColor={status => ({ textClass: "text-blue-500" })}
          />
        </>
      }
      rightColumn={
        <>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex-shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 whitespace-nowrap">
                {selectedDay ? `Appointments for ${selectedDay.toLocaleDateString()}` : 'Appointments'}
              </h3>
              <div className="flex flex-1 items-center gap-2 w-full justify-between">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Search ID, Name, Status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 w-48 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
                {viewModeButtons}
              </div>
            </div>
          </div>
          <DashboardAppointmentsTable
            filteredAppointments={selectedDayAppointments.filter(apt => {
              const lowerSearchTerm = searchTerm?.toLowerCase?.() || '';
              const matchesSearch = !searchTerm || (
                apt.id?.toString().includes(lowerSearchTerm) ||
                apt.customer_name?.toLowerCase().includes(lowerSearchTerm) ||
                apt.status?.toLowerCase().includes(lowerSearchTerm)
              );
              const matchesStatus = filterStatus === 'all' || apt.status?.toLowerCase() === filterStatus;
              return matchesSearch && matchesStatus;
            })}
            viewMode={viewMode}
            openModal={() => {}}
            getStatusColor={getStatusColor}
            loading={loadingSelectedDay}
            error={error}
          />
        </>
      }
    />
  );
} 