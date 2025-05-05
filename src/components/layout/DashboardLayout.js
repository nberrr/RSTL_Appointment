import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardStats from "@/components/shared/DashboardStats";
import DashboardCalendar from "@/components/shared/DashboardCalendar";
import DashboardRecentAppointments from "@/components/shared/DashboardRecentAppointments";
import DashboardDayAppointments from "@/components/shared/DashboardDayAppointments";
import React from "react";

export default function DashboardLayout({
  stats,
  statConfig,
  calendarProps,
  recentAppointments,
  loading,
  error,
  selectedDayAppointments,
  loadingSelectedDay,
  dayAppointmentsProps,
  analysisTypes,
  children
}) {
  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 p-4 flex flex-col">
            <div className="flex-1 flex flex-col">
              {/* Stats Overview - Shared Component */}
              <DashboardStats stats={stats} statConfig={statConfig} />
              {/* Main Grid - 3 columns, third column split vertically and fills height */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full flex-1">
                {/* Column 1: Calendar */}
                <DashboardCalendar {...calendarProps} />
                {/* Column 2: Recent Appointments */}
                <DashboardRecentAppointments
                  recentAppointments={recentAppointments}
                  loading={loading}
                  error={error}
                  getStatusColor={calendarProps.getStatusColor}
                />
                {/* Column 3: Vertically center Popular Analysis Types */}
                <div className="flex flex-col h-full flex-1 gap-4">
                  {/* Top: Appointments for Selected Day */}
                  <div className="flex-1 flex flex-col h-full">
                    <DashboardDayAppointments
                      {...dayAppointmentsProps}
                      selectedDayAppointments={selectedDayAppointments}
                      loadingSelectedDay={loadingSelectedDay}
                      getStatusColor={calendarProps.getStatusColor}
                    />
                  </div>
                  {/* Centered: Popular Analysis Types */}
                  <div className="flex-1 flex flex-col h-full">
                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 w-full h-full flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Popular Analysis Types</h3>
                      <div className="space-y-3 flex-1">
                        {loading && <p className="text-sm text-gray-500 text-center">Loading...</p>}
                        {error && <p className="text-sm text-red-500 text-center">Error loading analysis types.</p>}
                        {!loading && !error && analysisTypes && analysisTypes.length > 0 ? (
                          analysisTypes.slice(0, 5).map((analysis, index) => (
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
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
} 