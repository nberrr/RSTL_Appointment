"use client";

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FaCalendar, FaClock, FaCheckCircle, FaBacteria } from 'react-icons/fa';

const statConfig = [
  {
    key: 'total_appointments',
    label: 'Total Appointments',
    icon: <FaCalendar className="text-blue-500 w-8 h-8" />, 
    colorClass: ''
  },
  {
    key: 'pending',
    label: 'Pending',
    icon: <FaClock className="text-yellow-500 w-8 h-8" />, 
    colorClass: ''
  },
  {
    key: 'in_progress',
    label: 'In Progress',
    icon: <FaBacteria className="text-green-500 w-8 h-8" />, 
    colorClass: ''
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: <FaCheckCircle className="text-green-500 w-8 h-8" />, 
    colorClass: ''
  }
];

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
    currentDay: (new Date().getFullYear() === year && new Date().getMonth() === month) ? new Date().getDate() : null,
  };
}

export default function MicrobiologyDashboard() {
  const today = new Date();
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentDay, setCurrentDay] = useState(today.getDate());
  const [stats, setStats] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [analysisTypes, setAnalysisTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDayAppointments, setSelectedDayAppointments] = useState([]);
  const [loadingSelectedDay, setLoadingSelectedDay] = useState(false);

  // Fetch dashboard data
  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/microbiology/dashboard');
        const data = await res.json();
        if (data.success) {
          setStats(data.data.stats || {});
          setRecentAppointments(data.data.recentAppointments || []);
          setAnalysisTypes(data.data.analysisTypes || []);
          setAppointments(data.data.appointments || []);
        } else {
          setError(data.message || 'Failed to load dashboard data');
        }
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  // Rebuild calendar when appointments, month, or year changes
  useEffect(() => {
    const calendar = buildCalendarDays(appointments, calendarYear, calendarMonth);
    setCalendarDays(calendar.days);
    setCurrentMonth(calendar.currentMonth);
    setCurrentDay(calendar.currentDay);
  }, [appointments, calendarYear, calendarMonth]);

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
      const res = await fetch(`/api/appointments/by-date?date=${year}-${month}-${day}&service=microbiology`);
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
    <DashboardLayout
      stats={stats}
      statConfig={statConfig}
      calendarProps={{
        currentMonth,
        weekdays,
        calendarDays,
        selectedDay,
        currentDay,
        goToPreviousMonth,
        goToNextMonth,
        setSelectedDay,
        getStatusColor,
      }}
      recentAppointments={recentAppointments}
      loading={loading}
      error={error}
      selectedDayAppointments={selectedDayAppointments}
      loadingSelectedDay={loadingSelectedDay}
      dayAppointmentsProps={{
        selectedDay,
        currentMonth,
      }}
      analysisTypes={analysisTypes}
    />
  );
} 