"use client";
import React, { useEffect, useState } from 'react';
import ConsultancyReportsDashboardLayout from '@/components/layout/ConsultancyReportsDashboardLayout';
import ConsultancyReportsToolbar from '@/components/shared/ConsultancyReportsToolbar';
import ConsultancyReportsStatsCards from '@/components/shared/ConsultancyReportsStatsCards';
import ConsultancyReportsTable from '@/components/shared/ConsultancyReportsTable';
import ConsultancyReportsModal from '@/components/shared/ConsultancyReportsModal';

export default function ConsultancyReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consultancyData, setConsultancyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch('/api/appointments?category=microbiology&type=consultancy');
        const json = await res.json();
        if (json.success) {
          setConsultancyData(json.data);
        } else {
          setConsultancyData([]);
        }
      } catch (error) {
        setConsultancyData([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Compute stats from fetched data
  const stats = {
    total: consultancyData.length,
    accepted: consultancyData.filter(
      c => c.status && (c.status.toLowerCase() === 'accepted' || c.status.toLowerCase() === 'completed')
    ).length,
    declined: consultancyData.filter(
      c => c.status && c.status.toLowerCase() === 'declined'
    ).length,
    thesisDissertation: consultancyData.filter(
      c => c.researchType && c.researchType.toLowerCase().includes('thesis')
    ).length,
    industryResearch: consultancyData.filter(
      c => c.researchType && c.researchType.toLowerCase().includes('industry')
    ).length,
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    const s = status.toLowerCase();
    if (s === 'completed' || s === 'accepted') return 'bg-green-100 text-green-800';
    if (s === 'declined') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleOpenModal = (consultation) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    // Implement export logic here
    alert('Export not implemented');
  };

  const sortByDate = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
  };

  const filterOptions = Array.from(new Set(consultancyData.map(c => c.researchType))).filter(Boolean);

  const filteredData = consultancyData
    .filter(item => {
      const matchesSearch = 
        (item.researcher && item.researcher.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.researchType && item.researchType.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.id && String(item.id).toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterType === 'all' || (item.researchType && item.researchType.toLowerCase() === filterType.toLowerCase());
      return matchesSearch && matchesFilter;
    })
    .sort(sortByDate);

  if (loading) {
    return (
      <ConsultancyReportsDashboardLayout
        toolbar={null}
        statsCards={null}
        mainContent={<div className="flex items-center justify-center h-full text-lg text-gray-600">Loading consultancy reports...</div>}
      />
    );
  }

  return (
    <ConsultancyReportsDashboardLayout
      toolbar={
        <ConsultancyReportsToolbar
          title="Consultancy Reports"
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
        <ConsultancyReportsStatsCards
          accepted={stats.accepted}
          declined={stats.declined}
          thesisDissertation={stats.thesisDissertation}
          industryResearch={stats.industryResearch}
        />
      }
      mainContent={
        <ConsultancyReportsTable
          data={filteredData}
          getStatusColor={getStatusColor}
          onViewDetails={handleOpenModal}
        />
      }
    >
      <ConsultancyReportsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          consultation={selectedConsultation}
        />
    </ConsultancyReportsDashboardLayout>
  );
} 