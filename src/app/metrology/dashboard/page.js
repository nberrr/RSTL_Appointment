"use client";

import { useState, useEffect } from 'react';
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import Link from "next/link";
import { FaUsers, FaCalendar, FaClock, FaFlask } from 'react-icons/fa';
import DashboardCalendar from "@/components/shared/DashboardCalendar";
import DashboardStats from "@/components/shared/DashboardStats";
import DashboardQuickInfo from "@/components/shared/DashboardQuickInfo";
import DashboardAppointmentsTable from "@/components/shared/DashboardAppointmentsTable";

const getDemoDate = () => {
  const demoDate = new Date(2025, 2, 24); // Month is 0-indexed
  return demoDate;
};

const getInitialMonth = (date) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

const generateInitialCalendarDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // First day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  // Last day of the month
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  // Day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayWeekday = firstDayOfMonth.getDay();
  
  // Total days in month
  const totalDays = lastDayOfMonth.getDate();
  
  // Create array for calendar
  const days = [];
  
  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayWeekday; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }
  
  // Add days of current month
  for (let i = 1; i <= totalDays; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }
  
  // Calculate needed rows to fit all days (standard 6 rows for most months)
  const neededRows = Math.ceil((firstDayWeekday + totalDays) / 7);
  const totalCells = neededRows * 7;
  
  // Add empty cells for days after the last day of month
  const remainingCells = totalCells - days.length;
  for (let i = 0; i < remainingCells; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }
  
  return days;
};

export default function MetrologyDashboard() {
  const initialDate = getDemoDate();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentMonth, setCurrentMonth] = useState(() => getInitialMonth(initialDate));
  const [selectedDay, setSelectedDay] = useState(24);
  const [currentDay, setCurrentDay] = useState(24);
  const [calendarDays, setCalendarDays] = useState(() => generateInitialCalendarDays(initialDate));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/appointments/metrology/calendar-appointments');
        const data = await res.json();
        if (data.success) {
          setAppointments(data.data);
        } else {
          setError(data.message || 'Failed to fetch appointments');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  // Generate calendarDays with appointment info
  useEffect(() => {
    const date = currentDate;
    const year = date.getFullYear();
    const month = date.getMonth();
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
        if (!appointmentMap[dayKey]) {
          appointmentMap[dayKey] = { count: 0, statuses: [] };
        }
        appointmentMap[dayKey].count += 1;
        appointmentMap[dayKey].statuses.push(apt.status);
      }
    });
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        appointments: appointmentMap[i]
          ? { count: appointmentMap[i].count, statuses: appointmentMap[i].statuses.join(', ') }
          : null
      });
    }
    const neededRows = Math.ceil((firstDayWeekday + totalDays) / 7);
    const totalCells = neededRows * 7;
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    setCalendarDays(days);
  }, [currentDate, appointments]);

  // Stats calculation
  const stats = {
    managers: 0, // TODO: fetch or calculate if available
    scheduled: appointments.length,
    today: appointments.filter(a => a.appointment_date === getDemoDate().toISOString().slice(0, 10)).length,
    liters: appointments.reduce((sum, a) => sum + (a.number_of_liters || 0), 0),
  };
  const statConfig = [
    { key: "managers", label: "Registered Managers", icon: "👤", colorClass: "bg-blue-700" },
    { key: "scheduled", label: "Scheduled Appointments", icon: "📅", colorClass: "bg-green-700" },
    { key: "today", label: "Appointments Today", icon: "⏰", colorClass: "bg-violet-700" },
    { key: "liters", label: "Liters Available", icon: "🧪", colorClass: "bg-orange-700" },
  ];

  // Quick info for selected day
  const selectedDateStr = `${initialDate.getFullYear()}-${String(initialDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
  const dayAppointments = appointments.filter(a => a.appointment_date === selectedDateStr);
  const quickInfoStats = {
    total: dayAppointments.length,
    pending: dayAppointments.filter(a => a.status === 'pending').length,
    completed: dayAppointments.filter(a => a.status === 'completed').length,
  };

  // Update the month display
  const updateMonthDisplay = (date) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
    setCurrentMonth(`${monthNames[date.getMonth()]} ${date.getFullYear()}`);
  };
  
  // Go to previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    
    // Get last day of new month to handle edge cases
    const lastDayOfNewMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    
    // Keep the same day if possible, otherwise use the last day of the month
    const preservedDay = Math.min(selectedDay, lastDayOfNewMonth);
    
    setCurrentDate(newDate);
    setSelectedDay(preservedDay);
    generateCalendarDays(newDate);
    updateMonthDisplay(newDate);
  };
  
  // Go to next month
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    
    // Get last day of new month to handle edge cases
    const lastDayOfNewMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    
    // Keep the same day if possible, otherwise use the last day of the month
    const preservedDay = Math.min(selectedDay, lastDayOfNewMonth);
    
    setCurrentDate(newDate);
    setSelectedDay(preservedDay);
    generateCalendarDays(newDate);
    updateMonthDisplay(newDate);
  };
  
  // Generate calendar days with proper placement
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayWeekday = firstDayOfMonth.getDay();
    
    // Total days in month
    const totalDays = lastDayOfMonth.getDate();
    
    // Create array for calendar
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    
    // Add days of current month
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    
    // Calculate needed rows to fit all days (standard 6 rows for most months)
    const neededRows = Math.ceil((firstDayWeekday + totalDays) / 7);
    const totalCells = neededRows * 7;
    
    // Add empty cells for days after the last day of month
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    
    setCalendarDays(days);
  };
  
  // Calendar data
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const isCurrentDay = (day) => day === currentDay;
  const isSelectedDay = (day) => day === selectedDay;
  
  const formattedSelectedDate = () => {
    if (currentDate && selectedDay) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
      return `${monthNames[currentDate.getMonth()]} ${selectedDay}, ${currentDate.getFullYear()}`;
    }
    return "";
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 min-h-0">
          <DashboardSidebar />
          <main className="flex-1 min-h-0 overflow-auto bg-gray-100 p-5">
            <div className="grid grid-cols-1 lg:grid-cols-[45%,1fr] gap-6 h-full min-h-0">
              <div className="flex flex-col gap-4 min-h-0 h-full">
                <div className="flex-1 min-h-0">
                  <DashboardCalendar
                    currentMonth={currentMonth}
                    weekdays={weekdays}
                    calendarDays={calendarDays}
                    selectedDay={selectedDay}
                    currentDay={currentDay}
                    goToPreviousMonth={goToPreviousMonth}
                    goToNextMonth={goToNextMonth}
                    setSelectedDay={setSelectedDay}
                    getStatusColor={() => ({ bgClass: "bg-blue-100", dotClass: "bg-blue-500" })}
                  />
                </div>
                <DashboardQuickInfo
                  title="Infos in this Day"
                  stats={quickInfoStats}
                  getStatusColor={status => ({ textClass: "text-blue-500" })}
                />
              </div>
              <div className="flex flex-col gap-4 min-h-0 h-full">
                <DashboardStats stats={stats} statConfig={statConfig} />
                <div className="bg-white rounded-xl shadow-sm p-3 border border-gray-200 flex flex-col flex-1 min-h-[200px]">
                  <h3 className="text-sm font-semibold mb-2">Daily Liquid Volume (Last 7 Days)</h3>
                  <div className="flex-1 flex items-center justify-center border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-500">Chart will be displayed here</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Data updates every 3 hours</p>
                </div>
                <div className="flex-1 min-h-0">
                  <DashboardAppointmentsTable
                    filteredAppointments={appointments}
                    viewMode="upcoming"
                    openModal={() => {}}
                    getStatusColor={() => ({ bgClass: "bg-blue-100", textClass: "text-blue-700" })}
                    loading={loading}
                    error={error}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
} 