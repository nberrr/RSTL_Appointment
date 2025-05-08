"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import ReportsStatsCards from "@/components/shared/ReportsStatsCards";
import ReportsToolbar from "@/components/shared/ReportsToolbar";
import ReportsAppointmentsTable from "@/components/shared/ReportsAppointmentsTable";

export default function ReportsPage() {
  const [completedCount, setCompletedCount] = useState(0);
  const [declinedCount, setDeclinedCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateSort, setDateSort] = useState("newest");

  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/metrology/dashboard/reports");
        const data = await res.json();
        if (data.success) {
          setCompletedCount(data.data.completedCount);
          setDeclinedCount(data.data.declinedCount);
          setCancelledCount(data.data.cancelledCount);
          setReports(data.data.reports);
        } else {
          setError(data.message || "Failed to load reports");
        }
      } catch (err) {
        setError(err.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  // Normalize reports for the table
  const normalizedReports = reports.map(report => ({
    ...report,
    date: report.appointment_date || '',
    client: {
      name: report.customer_name || '',
      organization: report.organization || '',
    },
    sample: report.name_of_samples || report.sample || '',
    sampleDetails: { laboratory: 'Metrology' },
  }));

  // Filter and sort reports (basic example)
  const filteredReports = normalizedReports.filter(r => {
    if (filterType === "all") return true;
    return r.status === filterType;
  }).filter(r => {
    if (!searchTerm) return true;
    return r.client.name.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (dateSort === "newest") return new Date(b.date) - new Date(a.date);
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 min-h-0">
          <DashboardSidebar />
          <main className="flex-1 min-h-0 overflow-auto bg-gray-100 p-5 flex flex-col gap-6">
            <div className="flex flex-col gap-4 min-h-0 h-full">
              <ReportsStatsCards completedCount={completedCount} declinedCount={declinedCount} cancelledCount={cancelledCount} />
              <ReportsToolbar
                title="Reports"
                onExport={() => {}}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterType={filterType}
                setFilterType={setFilterType}
                dateSort={dateSort}
                setDateSort={setDateSort}
                filterOptions={["All", "Completed", "Declined", "Cancelled"]}
              />
              <div className="flex-1 min-h-0">
                <ReportsAppointmentsTable
                  appointments={filteredReports}
                  getStatusColor={status => {
                    switch (status?.toLowerCase()) {
                      case 'completed': return { bgClass: 'bg-green-100', textClass: 'text-green-800' };
                      case 'declined': return { bgClass: 'bg-red-100', textClass: 'text-red-800' };
                      case 'cancelled': return { bgClass: 'bg-gray-100', textClass: 'text-gray-800' };
                      default: return { bgClass: 'bg-blue-100', textClass: 'text-blue-700' };
                    }
                  }}
                  onViewDetails={() => {}}
                  loading={loading}
                  error={error}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
} 