"use client";

import { useState, useEffect } from 'react';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";
import Link from "next/link";
import "@/app/styles/metro-dash.css";

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
      <div className="dashboard-container">
        <DashboardNav />
        <div className="dashboard-content">
          <DashboardSidebar />
          <div className="dashboard-main">
         
            
            <div className="dashboard-grid">
              {/* Left Section - Calendar and Info */}
              <div>
                {/* Combined Calendar and Info Container */}
                <div className="unified-calendar-container">
                  {/* Calendar */}
                  <div className="calendar-section">
                    <div className="calendar-header">
                      <h2 className="calendar-title">{currentMonth}</h2>
                      <div className="calendar-nav">
                        <button className="calendar-nav-button" onClick={goToPreviousMonth}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button className="calendar-nav-button" onClick={goToNextMonth}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Weekdays header */}
                    <div className="calendar-weekdays">
                      {weekdays.map(day => (
                        <div key={day} className="calendar-weekday">{day}</div>
                      ))}
                    </div>
                    
                    {/* Calendar days */}
                    <div className="calendar-days">
                      {calendarDays.map((dayObj, index) => (
                        dayObj.isCurrentMonth ? (
                          <button
                            key={index}
                            className={`calendar-day ${isCurrentDay(dayObj.day) ? 'calendar-day-current' : ''}`}
                            onClick={() => setSelectedDay(dayObj.day)}
                          >
                            {dayObj.day}
                          </button>
                        ) : (
                          <div key={index} className="calendar-day calendar-day-outside"></div>
                        )
                      ))}
                    </div>
                  </div>
                  
                  {/* Day Info */}
                  <div className="info-section">
                    <div className="info-header">
                      <h2 className="info-title">Infos in this Day:</h2>
                      <span className="info-date">{formattedSelectedDate()}</span>
                    </div>
                    
                    <div className="info-content">
                      <div className="info-item">
                        <div className="info-label">
                          <div className="info-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <span>Liters Available</span>
                        </div>
                        <span className="info-value">3,000</span>
                      </div>
                      
                      <div className="info-item">
                        <div className="info-label">
                          <div className="info-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span>Appointments</span>
                        </div>
                        <span className="info-value">2</span>
                      </div>
                      
                      <div className="info-item">
                        <div className="info-label">
                          <div className="info-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span>Available Slots</span>
                        </div>
                        <span className="info-value">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Section - Statistics and Table */}
              <div className="space-y-6">
                {/* Statistics Cards */}
                <div className="stats-grid">
                  {/* Registered Managers */}
                  <div className="stat-card stat-card-blue">
                    <div className="stat-header">
                      <div>
                        <h3 className="stat-title stat-title-blue">Registered Managers</h3>
                        <p className="stat-value">0</p>
                      </div>
                      <div className="stat-icon-container stat-icon-container-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stat-icon stat-icon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <p className="stat-footer">New registered managers has been added. <Link href="#" className="stat-link">View info</Link></p>
                  </div>
                  
                  {/* Scheduled Appointments */}
                  <div className="stat-card stat-card-green">
                    <div className="stat-header">
                      <div>
                        <h3 className="stat-title stat-title-green">Scheduled Appointments</h3>
                        <p className="stat-value">0</p>
                      </div>
                      <div className="stat-icon-container stat-icon-container-green">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stat-icon stat-icon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <p className="stat-footer">New appointments has been added. <Link href="#" className="stat-link">View info</Link></p>
                  </div>
                  
                  {/* Appointments Today */}
                  <div className="stat-card stat-card-cyan">
                    <div className="stat-header">
                      <div>
                        <h3 className="stat-title stat-title-cyan">Appointments Today</h3>
                        <p className="stat-value">0</p>
                      </div>
                      <div className="stat-icon-container stat-icon-container-cyan">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stat-icon stat-icon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <p className="stat-footer">Confirmed Appointments. <Link href="#" className="stat-link">View info</Link></p>
                  </div>
                </div>
                
                {/* Chart Section */}
                <div className="chart-container">
                  <h3 className="chart-title">Daily Liquid Volume (Last 7 Days)</h3>
                  <div className="chart-placeholder">
                    <p>Chart will be displayed here</p>
                  </div>
                </div>
                
                {/* Appointments Table */}
                <div className="table-container">
                  <h3 className="table-title">Daily Appointments This Month</h3>
                  <div className="table-scroll">
                    <table className="data-table">
                      <thead>
                        <tr className="table-header">
                          <th className="table-header-cell">Name</th>
                          <th className="table-header-cell">Email</th>
                          <th className="table-header-cell">Date</th>
                          <th className="table-header-cell">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-empty">
                          <td colSpan="4">No appointments found</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 