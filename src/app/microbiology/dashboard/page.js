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

export default function MicrobiologyDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(0);
  const [calendarDays, setCalendarDays] = useState([]);
  const [stats, setStats] = useState({});
  const [appointments, setAppointments] = useState([]);
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
        // Fetch all appointments for microbiology
        const res = await fetch('/api/appointments?category=microbiology');
        const data = await res.json();
        if (data.success) {
          // Compute stats and recent appointments from the data
          const appointments = data.data || [];
          // Example stats computation (customize as needed)
          const stats = {
            total_appointments: appointments.length,
            pending: appointments.filter(a => a.status?.toLowerCase() === 'pending').length,
            in_progress: appointments.filter(a => a.status?.toLowerCase() === 'in progress').length,
            completed: appointments.filter(a => a.status?.toLowerCase() === 'completed').length,
            declined: appointments.filter(a => a.status?.toLowerCase() === 'declined').length,
          };
          setStats(stats);
          setRecentAppointments(appointments.slice(0, 5));
          setAppointments(appointments);
          // Count occurrences of each service_name or testType
          const analysisTypeCounts = {};
          appointments.forEach(a => {
            const name = a.service_name || a.testType;
            if (name) {
              analysisTypeCounts[name] = (analysisTypeCounts[name] || 0) + 1;
            }
          });
          const analysisTypes = Object.entries(analysisTypeCounts).map(([name, count]) => ({ analysis_requested: name, count }));
          setAnalysisTypes(analysisTypes);
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
    const today = new Date();
    setCurrentDate(today);
    setCurrentDay(today.getDate());
    setSelectedDay(today.getDate());
    generateCalendarDays(today, appointments);
    updateMonthDisplay(today);
  }, []);

  const updateMonthDisplay = (date) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
    setCurrentMonth(`${monthNames[date.getMonth()]} ${date.getFullYear()}`);
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    const lastDayOfNewMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    const preservedDay = Math.min(selectedDay, lastDayOfNewMonth);
    setCurrentDate(newDate);
    setSelectedDay(preservedDay);
    generateCalendarDays(newDate, appointments);
    updateMonthDisplay(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    const lastDayOfNewMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    const preservedDay = Math.min(selectedDay, lastDayOfNewMonth);
    setCurrentDate(newDate);
    setSelectedDay(preservedDay);
    generateCalendarDays(newDate, appointments);
    updateMonthDisplay(newDate);
  };

  const generateCalendarDays = (date, appointments = []) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    const days = [];
    // Create appointment lookup map
    const appointmentMap = {};
    appointments.forEach(apt => {
      let aptDate;
      if (typeof apt.appointment_date === 'string') {
        // Always parse as local date (YYYY-MM-DD)
        const [year, month, day] = apt.appointment_date.split('-').map(Number);
        aptDate = new Date(year, month - 1, day);
      } else if (apt.appointment_date instanceof Date) {
        aptDate = new Date(apt.appointment_date.getFullYear(), apt.appointment_date.getMonth(), apt.appointment_date.getDate());
      } else {
        aptDate = new Date(apt.appointment_date);
      }
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
      days.push({ day: null, isCurrentMonth: false, date: null });
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        appointments: appointmentMap[i]
          ? { count: appointmentMap[i].count, statuses: appointmentMap[i].statuses.join(', ') }
          : null,
        date: new Date(year, month, i)
      });
    }
    const neededRows = Math.ceil((firstDayWeekday + totalDays) / 7);
    const totalCells = neededRows * 7;
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push({ day: null, isCurrentMonth: false, date: null });
    }
    setCalendarDays(days);
  };

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