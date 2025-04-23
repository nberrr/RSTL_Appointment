"use client";

import { useState, useEffect, useCallback } from 'react';
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import Link from "next/link";
import { FaCalendar, FaClock, FaCheckCircle, FaFlask, FaBook, FaCubes } from 'react-icons/fa';

export default function ChemistryDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState(0);
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
      days.push({ day: null, isCurrentMonth: false });
    }
    
    for (let i = 1; i <= totalDays; i++) {
      days.push({ 
        day: i, 
        isCurrentMonth: true,
        appointments: appointmentMap[i] || null
      });
    }
    
    const neededRows = Math.ceil((firstDayWeekday + totalDays) / 7);
    const totalCells = neededRows * 7;
    const remainingCells = totalCells - days.length;
    
    for (let i = 0; i < remainingCells; i++) {
      days.push({ day: null, isCurrentMonth: false });
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
    if (selectedDay && currentDate) {
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = selectedDay.toString().padStart(2, '0');
      fetchAppointmentsForDay(`${year}-${month}-${day}`);
    } else {
      setSelectedDayAppointments([]); // Clear if no valid day/date
    }
  }, [selectedDay, currentDate, fetchAppointmentsForDay]);

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-4">
            {/* Wrap all main content in a single container div */}
            <div>
              {/* Stats Overview - Add hover effects */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white rounded-lg shadow-sm p-4 transition duration-150 ease-in-out hover:scale-[1.02] hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Appointments</p>
                      <h3 className="text-xl font-semibold">{dashboardData.stats.total_appointments}</h3>
                    </div>
                    <FaCalendar className="text-blue-500 w-8 h-8" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 transition duration-150 ease-in-out hover:scale-[1.02] hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Pending</p>
                      <h3 className="text-xl font-semibold">{dashboardData.stats.pending}</h3>
                    </div>
                    <FaClock className="text-yellow-500 w-8 h-8" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 transition duration-150 ease-in-out hover:scale-[1.02] hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">In Progress</p>
                      <h3 className="text-xl font-semibold">{dashboardData.stats.in_progress}</h3>
                    </div>
                    <FaFlask className="text-blue-500 w-8 h-8" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 transition duration-150 ease-in-out hover:scale-[1.02] hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <h3 className="text-xl font-semibold">{dashboardData.stats.completed}</h3>
                    </div>
                    <FaCheckCircle className="text-green-500 w-8 h-8" />
                  </div>
                </div>
              </div>

              {/* Main Grid - Changed to 3 columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Column 1: Calendar */}
                <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col border border-gray-200 min-w-0 lg:h-[calc(100vh-12rem)]">
                  {/* Calendar Header */}
                  <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-gray-900">{currentMonth}</h2>
                    <div className="flex gap-2">
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={goToPreviousMonth}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={goToNextMonth}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* Calendar Grid */}
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="grid grid-cols-7 mb-1 flex-shrink-0">
                      {weekdays.map(day => (
                        <div key={day} className="text-xs text-gray-500 font-medium text-center py-1">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-gray-200 flex-1 overflow-hidden">
                      {calendarDays.map((dayObj, index) => {
                        const isSelected = isSelectedDay(dayObj.day);
                        const isToday = isCurrentDay(dayObj.day);
                        const isCurrentMonthDay = dayObj.isCurrentMonth;
                        
                        let statusDots = [];
                        // Check if statuses exists and is a non-empty string
                        if (isCurrentMonthDay && dayObj.appointments?.statuses && typeof dayObj.appointments.statuses === 'string') {
                            // Split the aggregated string by comma and space, then limit to 4 dots
                            statusDots = dayObj.appointments.statuses.split(', ').slice(0, 4); 
                         }
                         // Optional: Add back checks for array/object if the API might return different formats in the future
                         // else if (isCurrentMonthDay && Array.isArray(dayObj.appointments?.statuses)) { ... }
                         // else if (isCurrentMonthDay && typeof dayObj.appointments?.statuses === 'object') { ... }

                        return (
                          <button
                            key={index}
                            className={`
                              h-full p-1.5 flex flex-col justify-between relative group overflow-hidden 
                              transition-colors duration-150 ease-in-out
                              ${isCurrentMonthDay ? 'bg-white' : 'bg-gray-50'}
                              ${isCurrentMonthDay && !isSelected ? 'hover:bg-blue-50' : ''}
                              ${isSelected ? 'bg-blue-500 text-white' : isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'}
                            `}
                            onClick={() => isCurrentMonthDay && setSelectedDay(dayObj.day)}
                            disabled={!isCurrentMonthDay}
                          >
                            {/* Day Number & Today Marker */}
                            <span className={`text-xs font-medium self-end relative ${isSelected ? 'text-white' : isToday ? 'text-blue-600' : ''}`}> 
                               {isToday && !isSelected && (
                                 <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-600 rounded-full"></span> // Today dot marker
                               )}
                               {dayObj.day}
                            </span>
                            
                            {/* Status Dots Container */}
                            {statusDots.length > 0 && (
                                <div className="flex flex-wrap items-end gap-0.5 mt-1 self-start"> {/* Align dots bottom-left */}
                                    {statusDots.map((status, idx) => (
                                        <span 
                                            key={idx} 
                                            className={`w-1.5 h-1.5 rounded-full ${getStatusColor(status).dotClass}`} 
                                            title={status} // Add title for hover info
                                        ></span>
                                    ))}
                                    {/* Optional: Add indicator if more than 4 dots */}
                                    {/* {dayObj.appointments?.statuses?.length > 4 && <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>} */}
                                </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Status Legend */}
                  <div className="mt-4 pt-3 border-t border-gray-200 flex-shrink-0">
                    <h4 className="text-xs font-medium text-gray-500 mb-2">Legend:</h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {[ 'Pending', 'In Progress', 'Completed', 'Declined' ].map(status => {
                        const color = getStatusColor(status); // Use the existing helper
                        return (
                          <div key={status} className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${color.dotClass}`}></span>
                            <span className="text-xs text-gray-600">{status}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Column 2: Recent Appointments */}
                <div className="min-w-0">
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 h-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
                    <div className="space-y-3 overflow-y-auto max-h-[calc(100%-3rem)]">
                      {loading && <p>Loading...</p>}
                      {error && <p>Error loading appointments.</p>}
                      {!loading && !error && dashboardData.recentAppointments.length > 0 ? (
                        dashboardData.recentAppointments.map((appointment, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition duration-150 ease-in-out hover:bg-gray-100 hover:shadow-sm cursor-pointer" 
                            onClick={() => {/* Decide if clicking opens details */}}
                          >
                            <div>
                              <p className="font-medium text-sm text-gray-900">{appointment.customer_name}</p>
                              <p className="text-xs text-gray-500">{new Date(appointment.appointment_date).toLocaleDateString()}</p>
                              <p className="text-xs text-gray-600">{appointment.analysis_requested}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                        ))
                      ) : (
                        !loading && !error && <p className="text-sm text-gray-400 italic">No recent appointments.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 3: Split Horizontally */}
                <div className="min-w-0 flex flex-col gap-4">
                  
                  {/* Top Section: Appointments for Selected Day - UPDATED */}
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex-shrink-0">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
                       {/* Show date only if a day is selected */}
                       Appointments for {selectedDay ? `${currentMonth.split(' ')[0]} ${selectedDay}` : 'Selected Day'}
                     </h3>
                     <div className="space-y-3 overflow-y-auto max-h-[calc(50vh-8rem)]"> {/* Adjust max-height */}
                        {/* Use loadingSelectedDay state */}
                        {loadingSelectedDay && <p className="text-sm text-gray-500">Loading appointments...</p>}
                        {!loadingSelectedDay && (() => {
                           // Use selectedDayAppointments state
                           if (selectedDayAppointments.length > 0) {
                            return selectedDayAppointments.map((appointment, index) => (
                              <div 
                                key={appointment.id || index} // Use appointment.id if available
                                className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg transition duration-150 ease-in-out hover:bg-gray-100 hover:shadow-sm cursor-pointer"
                                // onClick={() => handleViewDetails(appointment)} // Add if needed
                              >
                                <div>
                                  <p className="font-medium text-sm text-gray-900">{appointment.customer_name}</p>
                                  {/* Display details available from the new API endpoint */}
                                  <p className="text-xs text-gray-600 mt-0.5">{appointment.analysis_requested || 'No details'}</p> 
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                  {appointment.status}
                                </span>
                              </div>
                            ));
                          } else {
                             // Improved message based on selection state
                             return <p className="text-sm text-gray-400 italic">{selectedDay ? 'No appointments for this day.' : 'Select a day to view appointments.'}</p>;
                          }
                        })()}
                     </div>
                   </div>

                   {/* Bottom Section: Popular Analysis Types (Remains the same) */}
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex-shrink-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Analysis Types</h3>
                     <div className="space-y-3">
                       {loading && <p className="text-sm text-gray-500">Loading...</p>}
                       {error && <p className="text-sm text-red-500">Error loading analysis types.</p>}
                       {!loading && !error && dashboardData.analysisTypes.length > 0 ? (
                          // Use slice(0, 5) to get only the top 5
                          dashboardData.analysisTypes.slice(0, 5).map((analysis, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{analysis.analysis_requested}</span>
                              <span className="text-sm font-medium text-gray-900">{analysis.count} tests</span>
                            </div>
                          ))
                       ) : (
                           !loading && !error && <p className="text-sm text-gray-400 italic">No analysis data available.</p>
                       )}
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