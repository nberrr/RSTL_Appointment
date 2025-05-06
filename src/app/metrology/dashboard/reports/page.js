"use client";
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import ReportsStatsCards from "@/components/shared/ReportsStatsCards";
import ReportsToolbar from "@/components/shared/ReportsToolbar";
import ReportsAppointmentsTable from "@/components/shared/ReportsAppointmentsTable";

export default function ReportsPage() {
  // State for search/filter/export, etc.
  // For brevity, use static data and handlers

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 min-h-0">
          <DashboardSidebar />
          <main className="flex-1 min-h-0 overflow-auto bg-gray-100 p-5 flex flex-col gap-6">
            <div className="flex flex-col gap-4 min-h-0 h-full">
              <ReportsStatsCards completedCount={10} declinedCount={2} cancelledCount={1} />
              <ReportsToolbar
                title="Reports"
                onExport={() => {}}
                searchTerm=""
                setSearchTerm={() => {}}
                filterType="all"
                setFilterType={() => {}}
                dateSort="newest"
                setDateSort={() => {}}
                filterOptions={["All", "Completed", "Declined"]}
              />
              <div className="flex-1 min-h-0">
                <ReportsAppointmentsTable
                  appointments={[]}
                  getStatusColor={() => ({ bgClass: "bg-blue-100", textClass: "text-blue-700" })}
                  onViewDetails={() => {}}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
} 