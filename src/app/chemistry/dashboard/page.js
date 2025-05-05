"use client";

import { useState, useEffect, useCallback } from 'react';
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import Link from "next/link";
import { FaCalendar, FaClock, FaCheckCircle, FaFlask, FaBook, FaCubes } from 'react-icons/fa';
import DashboardCalendar from "@/components/shared/DashboardCalendar";
import DashboardRecentAppointments from "@/components/shared/DashboardRecentAppointments";
import DashboardDayAppointments from "@/components/shared/DashboardDayAppointments";
import DashboardStats from "@/components/shared/DashboardStats";

export default function ChemistryDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(0);
  const [calendarDays, setCalendarDays] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      total_appointments: 0,
      pending: 0,
      completed: 0,
      in_progress: 0
    },
    appointments: [],
    recentAppointments: [],
    analysisTypes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDayAppointments, setSelectedDayAppointments] = useState([]);
  const [loadingSelectedDay, setLoadingSelectedDay] = useState(false);
  
  useEffect(() => {
    fetchDashboardData();
    const today = new Date();
    setCurrentDate(today);
    setCurrentDay(today.getDate());
    setSelectedDay(today.getDate());
    generateCalendarDays(today);
    updateMonthDisplay(today);
  }, []);
  
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/chemistry/dashboard');
      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data.data);
        generateCalendarDays(currentDate, data.data.appointments);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
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
    generateCalendarDays(newDate, dashboardData.appointments);
    updateMonthDisplay(newDate);
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    const lastDayOfNewMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    const preservedDay = Math.min(selectedDay, lastDayOfNewMonth);
    setCurrentDate(newDate);
    setSelectedDay(preservedDay);
    generateCalendarDays(newDate, dashboardData.appointments);
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
    setCalendarDays(days);
  };
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const isCurrentDay = (day) => day === currentDay;
  const isSelectedDay = (day) => day === selectedDay;

  const getStatusColor = (status) => {
    // Ensure dotClass is included for calendar dots
    switch (status?.toLowerCase()) {
      case 'completed': return { bgClass: 'bg-green-100', textClass: 'text-green-800', dotClass: 'bg-green-500' };
      case 'pending': return { bgClass: 'bg-yellow-100', textClass: 'text-yellow-800', dotClass: 'bg-yellow-500' }; // Adjusted pending for dot
      case 'in progress': return { bgClass: 'bg-blue-100', textClass: 'text-blue-800', dotClass: 'bg-blue-500' };
      case 'declined': return { bgClass: 'bg-red-100', textClass: 'text-red-800', dotClass: 'bg-red-500' };
      default: return { bgClass: 'bg-gray-100', textClass: 'text-gray-800', dotClass: 'bg-gray-500' };
    }
  };

  const fetchAppointmentsForDay = useCallback(async (date) => {
    if (!date) {
      setSelectedDayAppointments([]);
      return;
    }
    setLoadingSelectedDay(true);
    try {
      // IMPORTANT: Ensure this API endpoint exists and handles the date & service query params
      const response = await fetch(`/api/appointments/by-date?date=${date}&service=chemistry`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.success) {
        setSelectedDayAppointments(data.data || []);
      } else {
         setSelectedDayAppointments([]);
         console.error("API Error fetching day appointments:", data.message);
      }
    } catch (error) {
      console.error('Error fetching day appointments:', error);
      setSelectedDayAppointments([]); // Clear on error
    } finally {
      setLoadingSelectedDay(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDay && selectedDay instanceof Date && !isNaN(selectedDay)) {
      const year = selectedDay.getFullYear();
      const month = (selectedDay.getMonth() + 1).toString().padStart(2, '0');
      const day = selectedDay.getDate().toString().padStart(2, '0');
      fetchAppointmentsForDay(`${year}-${month}-${day}`);
    } else {
      setSelectedDayAppointments([]); // Clear if no valid day/date
    }
  }, [selectedDay, fetchAppointmentsForDay]);

  const statConfig = [
    {
      key: "total_appointments",
      label: "Total Appointments",
      icon: <FaCalendar className="text-blue-500 w-8 h-8" />,
      colorClass: ""
    },
    {
      key: "pending",
      label: "Pending",
      icon: <FaClock className="text-yellow-500 w-8 h-8" />,
      colorClass: ""
    },
    {
      key: "in_progress",
      label: "In Progress",
      icon: <FaFlask className="text-blue-500 w-8 h-8" />,
      colorClass: ""
    },
    {
      key: "completed",
      label: "Completed",
      icon: <FaCheckCircle className="text-green-500 w-8 h-8" />,
      colorClass: ""
    }
  ];

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-4 flex flex-col">
            <div className="flex-1 flex flex-col">
              {/* Stats Overview - Shared Component */}
              <DashboardStats stats={dashboardData.stats} statConfig={statConfig} />
              {/* Main Grid - 3 columns, third column split vertically and fills height */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full flex-1">
                {/* Column 1: Calendar */}
                <DashboardCalendar
                  currentMonth={currentMonth}
                  weekdays={weekdays}
                  calendarDays={calendarDays}
                  selectedDay={selectedDay}
                  currentDay={currentDay}
                  goToPreviousMonth={goToPreviousMonth}
                  goToNextMonth={goToNextMonth}
                  setSelectedDay={setSelectedDay}
                  getStatusColor={getStatusColor}
                />
                {/* Column 2: Recent Appointments */}
                <DashboardRecentAppointments
                  recentAppointments={dashboardData.recentAppointments}
                  loading={loading}
                  error={error}
                  getStatusColor={getStatusColor}
                />
                {/* Column 3: Vertically center Popular Analysis Types */}
                <div className="flex flex-col h-full flex-1 gap-4">
                  {/* Top: Appointments for Selected Day */}
                  <div className="flex-1 flex flex-col h-full">
                    <DashboardDayAppointments
                      selectedDay={selectedDay}
                      currentMonth={currentMonth}
                      selectedDayAppointments={selectedDayAppointments}
                      loadingSelectedDay={loadingSelectedDay}
                      getStatusColor={getStatusColor}
                    />
                  </div>
                  {/* Centered: Popular Analysis Types */}
                  <div className="flex-1 flex flex-col h-full">
                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 w-full h-full flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Popular Analysis Types</h3>
                      <div className="space-y-3 flex-1">
                        {loading && <p className="text-sm text-gray-500 text-center">Loading...</p>}
                        {error && <p className="text-sm text-red-500 text-center">Error loading analysis types.</p>}
                        {!loading && !error && dashboardData.analysisTypes.length > 0 ? (
                          dashboardData.analysisTypes.slice(0, 5).map((analysis, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between transition-all duration-300 hover:border-l-4 hover:border-blue-400 hover:pl-2 hover:bg-blue-50 hover:scale-105 hover:shadow-md rounded cursor-pointer"
                            >
                              <span className="text-sm text-gray-600">{analysis.analysis_requested}</span>
                              <span className="text-sm font-medium text-gray-900">{analysis.count} tests</span>
                            </div>
                          ))
                        ) : (
                          !loading && !error && <p className="text-sm text-gray-400 italic text-center">No analysis data available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
} 