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
  addDays,
  getDay
} from 'date-fns';
import { FaFlask, FaClock, FaTint, FaSearch } from 'react-icons/fa';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";

export default function CalendarPage() {
  const today = new Date(); 
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(format(currentDate, 'MMMM yyyy'));
  
  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const firstDayIndex = getDay(monthStart); // Get the starting day index (0 = Sunday, 1 = Monday, etc.)
    
    
    const days = [];

      // empty slots for days before the 1st of the month
      for (let i = 0; i < firstDayIndex; i++) {
        days.push(null);
      }
        let day = monthStart;
        while (day <= monthEnd) {
          days.push(day);
          day = addDays(day, 1);
        }
      
        setCalendarDays(days);
        setCurrentMonth(format(currentDate, 'MMMM yyyy'));
      }, [currentDate]);

      const getAppointmentStatus = (date) => {
        if (!date) return null;
        const day = date.getDate();
        if (day % 3 === 0) return 'booked';
        if (day % 3 === 1) return 'limited';
        return 'available';
      };
  function getAvailabilityStatus(date) {
    // This is a placeholder function - replace with your actual logic
    // You should implement this based on your actual availability data
    const day = date.getDay();
    if (day === 0 || day === 3) return 'available';
    if (day === 1 || day === 4) return 'booked';
    return 'limited';
  }

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-5">
            <div className="flex gap-6">
              {/* Left Side - Calendar */}
              <div className="bg-white rounded-xl drop-shadow-sm  border border-gray-200 p-4 w-[600px]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">{currentMonth}</h2>
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

                <div className="grid grid-cols-7 gap-[2px]">
                  {/* Days of week */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {calendarDays.map((day, idx) => {
                     if (!day) {
                      return <div key={idx} className="p-6"></div>; // Empty slots for alignment
                    }

                    const isSelected = isSameDay(day, selectedDate);
                    const isCurrentDay = isSameDay(day, today);
                    const status = getAppointmentStatus(day);

                   
                    const dotColor = {
                      'available': 'bg-green-500',
                      'limited': 'bg-yellow-500',
                      'booked': 'bg-red-500',
                    }[status];

                    return (
                      <button
                      key={day.toString()}
                      onClick={() => setSelectedDate(day)}
                      className={`
                        relative p-6 text-sm flex flex-col items-center justify-center
                        
                        ${isSelected ? 'ring-2 ring-blue-500' : ''}
                        ${isCurrentDay ? 'font-extrabold text-blue-600 ring-2 ring-blue-500' : ''}
                        hover:bg-opacity-75 transition-colors duration-200
                      `}
                    >
                      {format(day, 'd')}
                      <span className={`w-2 h-2 rounded-full absolute bottom-2 ${dotColor}`} />
                    </button>
                    );
                  })}

                </div>

                {/* Status indicators */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-600">Limited Slots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600">Fully Booked</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Info and Table */}
              <div className="flex-1 space-y-5">
                {/* Date and Stats */}
                <div className="bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl drop-shadow-md p-6">  
                  <h2 className="text-xl text-white font-semibold mb-6">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </h2>
                  <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gray-600 border border-white/40 rounded-lg p-4 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-cyan-700 text-white rounded-lg">
                          <FaTint className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">Remaining Liters</p>
                          <p className="text-xl font-semibold text-white">10,000 L</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-600 border border-white/40 rounded-lg p-4 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-teal-700 text-white rounded-full">
                          <FaFlask className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">Total Volume this day</p>
                          <p className="text-xl font-semibold text-white">70,000 L</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-600 border border-white/40 rounded-lg p-4 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-purple-700 text-white rounded-lg">
                          <FaClock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">Appointments this day</p>
                          <p className="text-xl font-semibold text-white">2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointments Table */}
                <div class="rounded-xl drop-shadow-md">
                {/* Header */}
                <div class="bg-gradient-to-br from-green-700 to-green-500 text-white p-4 rounded-t-xl flex justify-between items-center drop-shadow-md">
                  <h3 class="text-xl font-semibold">Appointments</h3>
                  <div class="flex gap-4">
                    {/* Search Bar */}
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="h-4 w-4 text-gray-400"/>
                      </div>
                      <input
                        type="text"
                        class="block w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        placeholder="Search by name, company, or plate no..."
                      />
                    </div>

                    {/* Filter */}
                    <select
                      class="block w-40 py-2 px-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    >
                      <option value="all">All Appointments</option>
                      <option value="recent">Recent (Last 7 days)</option>
                      <option value="upcoming">Upcoming (Next 7 days)</option>
                      <option value="today">Today</option>
                      <option value="tomorrow">Tomorrow</option>
                      <option value="thisWeek">This Week</option>
                    </select>
                  </div>
                </div>

              {/* Table */}
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr class="bg-green-100">
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name & Company</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Plate No.</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Request (L)</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 bg-gray-50">Mar 25, 2025</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">Pedro Reyes</div>
                          <div class="text-sm text-gray-500">123 Petroleum</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 bg-gray-50">PQR-789</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">100 L</td>
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