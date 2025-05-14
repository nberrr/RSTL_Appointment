"use client";

import React, { useEffect, useState } from 'react';
import ReportsDashboardLayout from '@/components/layout/ReportsDashboardLayout';
import ReportsToolbar from '@/components/shared/ReportsToolbar';
import ReportsStatsCards from '@/components/shared/ReportsStatsCards';
import ReportsAppointmentsTable from '@/components/shared/ReportsAppointmentsTable';
import SampleDetailsModal from '@/components/shared/SampleDetailsModal';

export default function ChemistryReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  const [selectedSample, setSelectedSample] = useState(null);
  const [activeTab, setActiveTab] = useState('sample-details');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch('/api/appointments?category=microbiology');
        const json = await res.json();
        if (json.success) {
          setAppointments(json.data);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        setAppointments([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Compute stats
  const completedCount = appointments.filter(a => a.status && a.status.toLowerCase() === 'completed').length;
  const declinedCount = appointments.filter(a => a.status && a.status.toLowerCase() === 'declined').length;
  const cancelledCount = appointments.filter(a => a.status && a.status.toLowerCase() === 'cancelled').length;

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    const s = status.toLowerCase();
    if (s === 'completed') return 'bg-green-100 text-green-800';
    if (s === 'declined') return 'bg-red-100 text-red-800';
    if (s === 'cancelled') return 'bg-gray-100 text-gray-800';
    return 'bg-gray-100 text-gray-800';
  };

  const sortByDate = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
  };

  const filterOptions = Array.from(new Set(appointments.map(a => a.testType))).filter(Boolean);

  const filteredAppointments = appointments
    .filter(item => {
      const matchesSearch = 
        (item.client?.name && item.client.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.sample && item.sample.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.testType && item.testType.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterType === 'all' || (item.testType && item.testType.toLowerCase() === filterType.toLowerCase());
      return matchesSearch && matchesFilter;
    })
    .sort(sortByDate);

  const handleViewDetails = (sample) => {
    setSelectedSample(sample);
    setActiveTab('sample-details');
  };

  const handleExport = () => {
    // Implement export logic here
    alert('Export not implemented');
  };

  if (loading) {
    return (
      <ReportsDashboardLayout
        toolbar={null}
        statsCards={null}
        mainContent={<div className="flex items-center justify-center h-full text-lg text-gray-600">Loading microbiology test reports...</div>}
        sidePanel={null}
      />
    );
  }

  return (
    <ReportsDashboardLayout
      toolbar={
        <ReportsToolbar
          title="Appointment History"
          onExport={handleExport}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          dateSort={dateSort}
          setDateSort={setDateSort}
          filterOptions={filterOptions}
        />
      }
      statsCards={
        <ReportsStatsCards
          completedCount={completedCount}
          declinedCount={declinedCount}
          cancelledCount={cancelledCount}
        />
      }
      mainContent={
        <ReportsAppointmentsTable
          appointments={filteredAppointments}
          getStatusColor={getStatusColor}
          onViewDetails={handleViewDetails}
        />
      }
      sidePanel={null}
    >
      <SampleDetailsModal
        isOpen={!!selectedSample}
        sample={selectedSample}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={() => setSelectedSample(null)}
      />
    </ReportsDashboardLayout>
  );
} 