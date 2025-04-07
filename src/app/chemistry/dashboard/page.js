"use client";

import { useState, useEffect } from 'react';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";
import Link from "next/link";
import { FaCalendar, FaClock, FaCheckCircle, FaFlask, FaBook, FaCubes } from 'react-icons/fa';

export default function MetrologyDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const [calendarDays, setCalendarDays] = useState([]);

  // Sample appointment data
  const appointmentData = {
    "2025-03-24": { chemistry: true, consultancy: true },
    "2025-03-25": { shelfLife: true },
    "2025-03-26": { chemistry: true, shelfLife: true },
    "2025-03-27": { consultancy: true },
    "2025-03-28": { chemistry: true, consultancy: true, shelfLife: true },
  };
  
  // Sample data for the graph
  const weeklyData = {
    chemistry: [12, 15, 8, 20, 14, 18, 24],
    consultancy: [8, 10, 12, 15, 9, 11, 15],
    shelfLife: [5, 8, 10, 12, 15, 13, 18],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };
  
  useEffect(() => {
    const demoDate = new Date(2025, 2, 24);
    setCurrentDate(demoDate);
    setCurrentDay(24);
    setSelectedDay(24);
    generateCalendarDays(demoDate);
    updateMonthDisplay(demoDate);
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
    generateCalendarDays(newDate);
    updateMonthDisplay(newDate);
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    const lastDayOfNewMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    const preservedDay = Math.min(selectedDay, lastDayOfNewMonth);
    setCurrentDate(newDate);
    setSelectedDay(preservedDay);
    generateCalendarDays(newDate);
    updateMonthDisplay(newDate);
  };
  
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    const days = [];
    
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    
    for (let i = 1; i <= totalDays; i++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ 
        day: i, 
        isCurrentMonth: true,
        appointments: appointmentData[dateString] || {}
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
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-50 text-yellow-800 flex items-center gap-1 before:w-1.5 before:h-1.5 before:bg-yellow-500 before:rounded-full';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-50 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-[40%,1fr] gap-4 h-[calc(100vh-7rem)]">
              {/* Left Section - Calendar */}
              <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col">
                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-4">
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
                <div className="flex-1 flex flex-col">
                  <div className="grid grid-cols-7 mb-1">
                    {weekdays.map(day => (
                      <div key={day} className="text-xs text-gray-500 font-medium text-center py-1">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-px bg-gray-200 flex-1">
                    {calendarDays.map((dayObj, index) => (
                      <button
                        key={index}
                        className={`
                          relative text-sm p-1 flex flex-col items-center bg-white hover:bg-gray-50
                          ${dayObj.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'} 
                          ${isCurrentDay(dayObj.day) ? 'font-bold text-blue-600' : ''}
                          ${isSelectedDay(dayObj.day) ? 'ring-2 ring-blue-500' : ''}
                        `}
                        onClick={() => dayObj.isCurrentMonth && setSelectedDay(dayObj.day)}
                        disabled={!dayObj.isCurrentMonth}
                      >
                        <span>{dayObj.day}</span>
                        {dayObj.appointments && (
                          <div className="flex gap-0.5 mt-1">
                            {dayObj.appointments.chemistry && (
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" title="Chemistry Test"></div>
                            )}
                            {dayObj.appointments.consultancy && (
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" title="Consultancy"></div>
                            )}
                            {dayObj.appointments.shelfLife && (
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" title="Shelf Life"></div>
                            )}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar Legend */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-around">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs text-gray-600">Chemistry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-gray-600">Consultancy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-xs text-gray-600">Shelf Life</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Section */}
              <div className="space-y-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Chemistry Tests */}
                  <div className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl p-3 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm text-white">Chemistry Tests</h3>
                        <p className="text-2xl font-bold text-white mt-2">24</p>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-20 rounded-lg">
                        <FaFlask className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-blue-100 mt-2">12 Pending • 8 Today</p>
                  </div>
                  
                  {/* Consultancy */}
                  <div className="bg-gradient-to-br from-green-700 to-green-500 rounded-xl p-3 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm text-white">Consultancy</h3>
                        <p className="text-2xl font-bold text-white mt-2">15</p>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-20 rounded-lg">
                        <FaBook className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-green-100 mt-2">5 Pending • 3 Today</p>
                  </div>
                  
                  {/* Shelf Life */}
                  <div className="bg-gradient-to-br from-purple-700 to-purple-500 rounded-xl p-3 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm text-white">Shelf Life</h3>
                        <p className="text-2xl font-bold text-white mt-2">18</p>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-20 rounded-lg">
                        <FaCubes className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-purple-100 mt-2">7 Pending • 4 Today</p>
                  </div>
                </div>

                {/* Graph Section */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold">Weekly Appointment Trends</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Chemistry</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Consultancy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span>Shelf Life</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[120px] flex items-end gap-2">
                    {weeklyData.labels.map((label, index) => (
                      <div key={label} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex items-end justify-center gap-0.5 h-[100px]">
                          <div 
                            className="w-2 bg-blue-500 rounded-t"
                            style={{ height: `${(weeklyData.chemistry[index] / 24) * 100}%` }}
                          ></div>
                          <div 
                            className="w-2 bg-green-500 rounded-t"
                            style={{ height: `${(weeklyData.consultancy[index] / 24) * 100}%` }}
                          ></div>
                          <div 
                            className="w-2 bg-purple-500 rounded-t"
                            style={{ height: `${(weeklyData.shelfLife[index] / 24) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's Schedule */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold">Today&apos;s Schedule</h3>
                    <span className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Thermal Analysis - Dr. Emily Chen</p>
                        <p className="text-xs text-gray-500">9:00 AM • Chemistry Test</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Research Consultation - Prof. Rodriguez</p>
                        <p className="text-xs text-gray-500">11:30 AM • Consultancy</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Food Product Testing - ABC Foods</p>
                        <p className="text-xs text-gray-500">2:00 PM • Shelf Life</p>
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