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
import { FaBacteria, FaClock, FaSearch, FaCalendar, FaTimes, FaEllipsisH } from 'react-icons/fa';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";

const ScheduleModal = ({ isOpen, onClose, appointment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {appointment?.status === "Confirmed" ? "Appointment Details" : "Schedule Appointment"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="font-medium mb-3 pb-2 border-b">Client Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="text-sm font-medium text-gray-900">{appointment?.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <p className="text-sm font-medium text-gray-900">{appointment?.phone}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-sm font-medium text-gray-900">{appointment?.email}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-600">Organization</label>
                  <p className="text-sm font-medium text-gray-900">{appointment?.organization}</p>
                </div>
              </div>
            </div>

            {/* Sample Information */}
            <div>
              <h3 className="font-medium mb-3 pb-2 border-b">Sample Information</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Sample Name</label>
                    <p className="text-sm font-medium text-gray-900">{appointment?.sampleName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Sample Type</label>
                    <p className="text-sm font-medium text-gray-900">{appointment?.sampleType}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Description</label>
                  <p className="text-sm font-medium text-gray-900">{appointment?.sampleDescription}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Quantity</label>
                  <p className="text-sm font-medium text-gray-900">{appointment?.quantity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Test Information */}
            <div>
              <h3 className="font-medium mb-3 pb-2 border-b">Test Information</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Test Type</label>
                    <p className="text-sm font-medium text-gray-900">{appointment?.testType}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Request Date</label>
                    <p className="text-sm font-medium text-gray-900">{appointment?.requestDate}</p>
                  </div>
                </div>
                {appointment?.status === "Confirmed" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Scheduled Date</label>
                        <p className="text-sm font-medium text-gray-900">{appointment?.scheduledDate}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Scheduled Time</label>
                        <p className="text-sm font-medium text-gray-900">{appointment?.scheduledTime}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {appointment?.status !== "Confirmed" && (
              <>
                {/* Scheduling Section */}
                <div>
                  <h3 className="font-medium mb-3 pb-2 border-b">Schedule Test</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Date</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Time</label>
                        <select className="w-full px-3 py-2 border rounded-lg text-sm">
                          <option>09:00 AM</option>
                          <option>10:00 AM</option>
                          <option>11:00 AM</option>
                          <option>01:00 PM</option>
                          <option>02:00 PM</option>
                          <option>03:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          {appointment?.status !== "Confirmed" ? (
            <>
              <button
                onClick={() => {
                  // Handle decline
                  onClose();
                }}
                className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
              >
                Decline
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle confirmation
                  onClose();
                }}
                className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Confirm Appointment
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CalendarPage() {
  const today = new Date(); 
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(format(currentDate, 'MMMM yyyy'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample data
  const appointments = [
    {
      name: 'Dr. Maria Santos',
      email: 'maria@microbio.ph',
      organization: 'University of the Philippines',
      phone: '+63 917 876 5432',
      requestDate: 'Mar 25, 2025',
      sampleName: 'Water Sample A',
      sampleDescription: 'Collected from Pasig River',
      quantity: '500 mL',
      sampleType: 'Water Sample',
      testType: 'Bacterial Culture',
      status: 'Pending'
    },
    {
      name: 'Dr. Juan Dela Cruz',
      email: 'juan@research.ph',
      organization: 'DOST',
      phone: '+63 918 765 4321',
      requestDate: 'Apr 2, 2025',
      sampleName: 'Soil Sample B',
      sampleDescription: 'Agricultural soil, batch #B456',
      quantity: '1 kg',
      sampleType: 'Soil Sample',
      testType: 'Microbial Analysis',
      status: 'Confirmed'
    },
    {
      name: 'Dr. Ana Reyes',
      email: 'ana@foodsafety.ph',
      organization: 'Food Safety Institute',
      phone: '+63 919 654 3210',
      requestDate: 'Apr 3, 2025',
      sampleName: 'Food Sample C',
      sampleDescription: 'Raw chicken meat',
      quantity: '200 g',
      sampleType: 'Food Sample',
      testType: 'Pathogen Testing',
      status: 'Pending'
    }
  ];
  
  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const firstDayIndex = getDay(monthStart);
    
    const days = [];
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

  // Function to get appointment status for a specific day
  const getAppointmentStatus = (date) => {
    // Count appointments for this date
    const dayAppointments = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.requestDate);
      return isSameDay(appointmentDate, date);
    });

    // Return status based on number of appointments
    if (dayAppointments.length >= 3) return 'booked';
    if (dayAppointments.length >= 1) return 'limited';
    return 'available';
  };

  const handleSchedule = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-50 p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-teal-50 rounded-xl p-4 border border-gray-200 shadow-md">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-500 rounded-full p-3">
                    <FaBacteria className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-teal-900 font-medium">Pending Tests</p>
                    <p className="text-2xl font-semibold text-teal-700">12</p>
                    <p className="text-sm text-teal-600">Microbial Analysis</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 shadow-md  border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-emerald-900 font-medium">Tests in Progress</p>
                    <p className="text-2xl font-semibold text-emerald-700">6</p>
                    <p className="text-sm text-emerald-600">Active Analysis</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 shadow-md border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500 rounded-full p-3">
                    <FaCalendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-purple-900 font-medium">Today's Schedule</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-purple-700">4</p>
                      <p className="text-sm text-purple-600">Tests</p>
                    </div>
                    <p className="text-sm text-purple-600 mt-1">Next: 10:30 AM - Bacterial Culture</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              {/* Calendar Section */}
              <div className="bg-white rounded-xl shadow-sm w-[400px]">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{currentMonth}</h2>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                        className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        &lt;
                      </button>
                      <button 
                        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                        className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-[1px]">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="p-1 text-center text-xs font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                    
                    {calendarDays.map((day, idx) => {
                      if (!day) return <div key={idx} className="p-4"></div>;

                      const isSelected = isSameDay(day, selectedDate);
                      const isCurrentDay = isSameDay(day, today);
                      const status = getAppointmentStatus(day);

                      return (
                        <button
                          key={day.toString()}
                          onClick={() => setSelectedDate(day)}
                          className={`
                            relative p-4 text-xs flex flex-col items-center justify-center
                            ${isSelected ? 'ring-2 ring-teal-500' : ''}
                            ${isCurrentDay ? 'font-extrabold text-teal-600 ring-2 ring-teal-500' : ''}
                            hover:bg-gray-50 transition-colors duration-200
                          `}
                        >
                          {format(day, 'd')}
                          <span className={`w-2 h-2 rounded-full absolute bottom-2 ${
                            status === 'booked' ? 'bg-red-500' :
                            status === 'limited' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`} />
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
              </div>

              {/* Appointments Table Section */}
              <div className="flex-1 bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaBacteria className="text-teal-600" />
                      <h2 className="text-lg font-semibold text-gray-900">Microbial Testing Schedule</h2>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search samples..."
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      </div>
                      <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        <option value="all">All Tests</option>
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Name</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Type</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {appointments.map((appointment, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-teal-600">MB-{1000 + index}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{appointment.requestDate}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{appointment.organization}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                                {appointment.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{appointment.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{appointment.sampleName}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{appointment.testType}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-sm rounded-full ${
                              appointment.status === 'Pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : appointment.status === 'Confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <button 
                              onClick={() => handleSchedule(appointment)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <FaEllipsisH className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
      />
    </AdminLayout>
  );
} 