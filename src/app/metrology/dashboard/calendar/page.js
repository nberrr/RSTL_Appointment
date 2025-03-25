"use client";

import { useState, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth,
  isSameMonth, 
  isSameDay, 
  isToday,
  startOfWeek,
  endOfWeek,
  addDays
} from 'date-fns';
import { FaCalendarAlt, FaFlask, FaClock, FaTint, FaSearch, FaFilter } from 'react-icons/fa';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";

export default function CalendarPage() {
  const defaultDate = new Date(2025, 2, 25); // March 25, 2025
  const [currentDate, setCurrentDate] = useState(defaultDate);
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(format(currentDate, 'MMMM yyyy'));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTime, setFilterTime] = useState('all');
  
  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    
    const days = [];
    let day = calendarStart;
    while (day <= calendarEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    
    setCalendarDays(days);
    setCurrentMonth(format(currentDate, 'MMMM yyyy'));
  }, [currentDate]);

  const getAppointmentStatus = (date) => {
    const day = date.getDate();
    if (day % 3 === 0) return 'booked';
    if (day % 3 === 1) return 'limited';
    return 'available';
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-50 p-6">
            <div className="flex gap-6">
              {/* Left Side - Calendar */}
              <div className="bg-white rounded-xl shadow-sm p-6 w-[600px]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">{currentMonth}</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                      className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      &lt;
                    </button>
                    <button 
                      onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                      className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-sm text-gray-500 font-medium text-center py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-[1px] bg-gray-100">
                  {calendarDays.map((day) => {
                    const status = getAppointmentStatus(day);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isOutsideMonth = !isSameMonth(day, currentDate);
                    const isTodayDate = isToday(day);
                    
                    return (
                      <button
                        key={day.toString()}
                        onClick={() => !isOutsideMonth && setSelectedDate(day)}
                        className={`
                          relative bg-white p-6 text-sm flex flex-col items-center justify-center
                          ${isOutsideMonth ? 'text-gray-400' : 'hover:bg-gray-50'}
                          ${isSelected ? 'ring-2 ring-blue-500' : ''}
                          ${isTodayDate ? 'font-bold' : ''}
                        `}
                        disabled={isOutsideMonth}
                      >
                        {format(day, 'd')}
                        <span 
                          className={`
                            w-2 h-2 rounded-full absolute bottom-2
                            ${status === 'available' ? 'bg-green-500' : ''}
                            ${status === 'limited' ? 'bg-yellow-500' : ''}
                            ${status === 'booked' ? 'bg-red-500' : ''}
                          `}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center gap-6 pt-4 mt-4 border-t">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"/>
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"/>
                    <span className="text-sm text-gray-600">Limited Slots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"/>
                    <span className="text-sm text-gray-600">Fully Booked</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Info and Table */}
              <div className="flex-1 space-y-6">
                {/* Date and Stats */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </h2>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
                          <FaTint className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Remaining Liters</p>
                          <p className="text-xl font-semibold">10,000 L</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg">
                          <FaFlask className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Volume this day</p>
                          <p className="text-xl font-semibold">70,000 L</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                          <FaClock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Appointments Today</p>
                          <p className="text-xl font-semibold">2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointments Table */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Appointments</h3>
                    <div className="flex gap-4">
                      {/* Search Bar */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaSearch className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="block w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Search by name, company, or plate no..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      {/* Time Filter */}
                      <select
                        className="block w-40 py-2 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={filterTime}
                        onChange={(e) => setFilterTime(e.target.value)}
                      >
                        <option value="all">All Appointments</option>
                        <option value="recent">Recent (Last 7 days)</option>
                        <option value="upcoming">Upcoming (Next 7 days)</option>
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                        <option value="thisWeek">This Week</option>
                        <option value="nextWeek">Next Week</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-l-lg">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name & Company
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Plate No.
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-r-lg">
                            Request (L)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-gray-50 rounded-lg">
                            Mar 25, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Pedro Reyes</div>
                            <div className="text-sm text-gray-500">123 Petroleum</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-gray-50 rounded-lg">
                            PQR-789
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            100 L
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