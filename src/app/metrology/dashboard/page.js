"use client";

import { useState, useEffect } from 'react';
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import Link from "next/link";
import { FaUsers, FaCalendar, FaClock } from 'react-icons/fa';

export default function MetrologyDashboard() {
  // Get the current date information
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const [calendarDays, setCalendarDays] = useState([]);
  
  // Initialize date information on client-side
  useEffect(() => {
    const now = new Date();
    // Set current date to March 24, 2025 for demo purposes
    const demoDate = new Date(2025, 2, 24); // Month is 0-indexed
    setCurrentDate(demoDate);
    setCurrentDay(24);
    setSelectedDay(24);
    
    // Generate calendar days for current month
    generateCalendarDays(demoDate);
    updateMonthDisplay(demoDate);
  }, []);
  
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
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-5">
            <div className="grid grid-cols-1 lg:grid-cols-[45%,1fr] gap-4 h-full">
              {/* Left Section - Calendar and Info */}
              <div className="h-full">
                <div className="bg-white rounded-xl drop-shadow-sm  border border-gray-200 p-5 h-full flex flex-col">
                  {/* Calendar Header */}
                  <div className="flex justify-between items-center mb-2">
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
                  <div className="flex-1 flex flex-col min-h-0">
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
                              relative text-sm flex items-center justify-center bg-white hover:bg-gray-50
                              ${dayObj.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'} 
                              ${isCurrentDay(dayObj.day) ? 'font-bold text-blue-600' : ''}
                              ${isSelectedDay(dayObj.day) ? 'ring-2 ring-blue-500' : ''}
                            `}
                            onClick={() => dayObj.isCurrentMonth && setSelectedDay(dayObj.day)}
                            disabled={!dayObj.isCurrentMonth}
                          >
                            {dayObj.day}
                          </button>
                        ))}
                    </div>

                  </div>
                  
                  {/* Day Info */}
                  <div className="border-t pt-3 mt-3">
                    <div className="mb-2 flex justify-between">
                      <h2 className="text-sm font-semibold text-gray-900 inline-block">Infos in this Day:</h2>
                      <span className="text-sm font-semibold text-orange-600 inline-block">{currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="blue">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">Liters Available</span>
                        </div>
                        <span className="text-sm font-semibold">3,000</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="Purple">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">Appointments</span>
                        </div>
                        <span className="text-sm font-semibold">2</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="red">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">Available Slots</span>
                        </div>
                        <span className="text-sm font-semibold">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Section */}
              <div className="space-y-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Registered Managers */}
                 <div className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl p-3 min-h-[150px] flex flex-col justify-between drop-shadow-md  border border-gray-200 ">

                    <div className="flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm  text-white">Registered Managers</h3>
                       
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center  bg-blue-100 bg-opacity-70 text-blue-600 rounded-lg">
                        <FaUsers className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-grow flex items-center justify-center mt-2">
                        <p className="text-4xl text-white font-semibold">12</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-300">
                        New managers have been added.
                        <Link href="/metrology/dashboard/reports" className="text-gray-100 underline hover:text-blue-200">View info</Link>
                        </p>
                  </div>
                  
                  {/* Scheduled Appointments */}
                  <div className="bg-gradient-to-br from-green-700 to-green-500 rounded-xl p-3 min-h-[150px] flex flex-col justify-between drop-shadow-md  border border-gray-200">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm text-white">Scheduled Appointments</h3>
                       
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center  bg-white bg-opacity-70 text-green-600 rounded-lg">
                        <FaCalendar className="h-4 w-5" />
                        </div>
                      </div>
                      <div className="flex-grow flex items-center justify-center mt-2">
                        <p className="text-4xl text-white font-semibold">20</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-200">
                        New Appointments added. 
                        <Link href="/metrology/dashboard/calendar" className="text-gray-100 underline hover:text-blue-200">View info</Link>
                        </p>
                  </div>
                  
                  
                  {/* Appointments Today */}
                  <div className="bg-gradient-to-br from-violet-700 to-violet-500 rounded-xl p-3 min-h-[150px] flex flex-col justify-between drop-shadow-md border border-gray-200">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-white">Appointments Today</h3>
                       
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center  bg-blue-100 bg-opacity-70 text-violet-600 rounded-lg">
                        <FaClock className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex-grow flex items-center justify-center mt-2">
                        <p className="text-4xl text-white font-semibold">2</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-300">
                        Appointments Today. 
                        <Link href="/metrology/dashboard/calendar" className="text-gray-100 underline hover:text-blue-200">View info</Link>
                        </p>
                  </div>
                  
                </div>
                
                {/* Chart Section */}
                <div className="bg-white rounded-xl drop-shadow-sm p-3 border border-gray-200">
                  <h3 className="text-sm font-semibold mb-2">Daily Liquid Volume (Last 7 Days)</h3>
                  <div className="h-[200px] flex items-center justify-center border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-500">Chart will be displayed here</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Data updates every 3 hours</p>
                </div>
                
                {/* Appointments Table */}
                <div className="bg-white rounded-xl drop-shadow-sm p-3  border border-gray-200">
                  <h3 className="text-sm font-semibold mb-2">Upcoming Appointments</h3>
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td colSpan="4" className="px-3 py-2 text-center text-xs text-gray-500">
                            No appointments found
                          </td>
                        </tr>
                      </tbody>
                    </table>
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