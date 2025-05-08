"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardCalendar from '@/components/shared/DashboardCalendar';
import DashboardAppointmentsTable from '@/components/shared/DashboardAppointmentsTable';

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

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-4 flex flex-col h-full">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Shelf Life Calendar</h1>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-0">
              {/* Calendar */}
              <div className="h-full min-h-0 flex flex-col">
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
              </div>
              {/* Appointments Table */}
              <div className="h-full min-h-0 flex flex-col">
                <div className="flex-1 min-h-0 overflow-y-auto bg-white rounded-lg shadow-sm border border-gray-200">
                  <DashboardAppointmentsTable
                    filteredAppointments={selectedDayAppointments}
                    viewMode={"day"}
                    openModal={() => {}}
                    getStatusColor={getStatusColor}
                    loading={loadingSelectedDay}
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