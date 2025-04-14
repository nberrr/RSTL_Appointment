'use client';

import { useState } from "react";
import { format } from 'date-fns';
import { FaSearch, FaEye, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";
import AdminLayout from "@/app/components/shared/AdminLayout";
import { Button, Card, StatusBadge, Input, Select } from '@/app/components/shared/ui';

const ReportDetailsModal = ({ isOpen, onClose, report }) => {
  const [activeTab, setActiveTab] = useState('Product Info');
  if (!report) return null;

  const tabs = ['Contact', 'Test Status', 'Product Info', 'Test Details', 'Technical'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Contact':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Person</h3>
              <p className="text-sm">{report.contactPerson || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Email</h3>
              <p className="text-sm">{report.email || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Number</h3>
              <p className="text-sm">{report.contactNo || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Company Address</h3>
              <p className="text-sm">{report.companyAddress || 'N/A'}</p>
            </div>
          </div>
        );

      case 'Test Status':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Service Type</h3>
              <p className="text-sm">{report.serviceType || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Request Date</h3>
              <p className="text-sm">{report.requestDate || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Testing Period</h3>
              <p className="text-sm">{report.testingPeriod || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              <StatusBadge variant={report.status === 'completed' ? 'success' : 'danger'}>
                {report.status}
              </StatusBadge>
            </div>
          </div>
        );

      case 'Product Info':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Packaging Material</h3>
              <p className="text-sm">{report.packagingMaterial}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Production Type</h3>
              <p className="text-sm">{report.productionType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Existing Market</h3>
              <p className="text-sm">{report.existingMarket}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Existing Permits</h3>
              <p className="text-sm">{report.existingPermits}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Mode of Deterioration</h3>
              <div className="flex flex-wrap gap-2">
                {report.modeOfDeterioration?.map((mode, index) => (
                  <span key={index} className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                    {mode}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Product Ingredients</h3>
              <p className="text-sm">{report.productIngredients}</p>
            </div>
          </div>
        );

      case 'Test Details':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Objective</h3>
              <p className="text-sm">{report.objective || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Target Shelf Life</h3>
              <p className="text-sm">{report.targetShelfLife || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Method of Preservation</h3>
              <p className="text-sm">{report.methodOfPreservation || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Test Results</h3>
              <p className="text-sm">{report.results || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Conclusion</h3>
              <p className="text-sm">{report.conclusion || 'N/A'}</p>
            </div>
          </div>
        );

      case 'Technical':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Storage Conditions</h3>
              <p className="text-sm">{report.storageCondition || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Test Method</h3>
              <p className="text-sm">{report.testMethod || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Batch Number</h3>
              <p className="text-sm">{report.batchNumber || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Manufacturing Date</h3>
              <p className="text-sm">{report.manufacturingDate ? format(new Date(report.manufacturingDate), 'MMM d, yyyy') : 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Expiration Date</h3>
              <p className="text-sm">{report.expirationDate ? format(new Date(report.expirationDate), 'MMM d, yyyy') : 'N/A'}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-25"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-xl relative w-full max-w-4xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Report Details: {report.id}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        Test Date: {format(new Date(report.testDate), 'MMM d, yyyy')}
                      </span>
                      <StatusBadge variant={report.status === 'completed' ? 'success' : 'danger'}>
                        {report.status}
                      </StatusBadge>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex gap-4 border-b border-gray-200 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'text-blue-600 border-blue-600'
                          : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {renderTabContent()}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function ShelfLifeReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data
  const reports = [
    {
      id: 'SLR001',
      clientId: 'CLT001',
      productName: 'Vitamin C Tablets',
      testDate: '2024-04-01',
      packagingMaterial: 'Glass bottle with plastic cap',
      productionType: 'Company produced',
      existingMarket: 'US, Canada',
      existingPermits: 'FDA, USDA Organic',
      modeOfDeterioration: [
        'Color change',
        'Flavor loss',
        'Microbial growth',
        'Vitamin degradation',
        'Sedimentation'
      ],
      productIngredients: 'Organic apple juice, Organic orange juice, Citric acid, Ascorbic acid',
      status: 'completed'
    },
    {
      id: 'SLR002',
      clientId: 'CLT002',
      productName: 'Antibiotic Capsules',
      testDate: '2024-04-02',
      packagingMaterial: 'Blister packaging',
      productionType: 'Company produced',
      existingMarket: 'US, EU',
      existingPermits: 'FDA, GMP',
      modeOfDeterioration: [
        'Color change',
        'Active ingredient degradation',
        'Moisture sensitivity'
      ],
      productIngredients: 'Active pharmaceutical ingredient, Excipients',
      status: 'cancelled'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.productName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav/>
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar/>
          <main className="flex-1 bg-gray-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                 
                  <h1 className="text-2xl font-semibold">Shelf Life Reports</h1>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="relative w-[300px]">
                  <Input
                    placeholder="Search by ID, client, or product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 bg-white"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-[150px] h-10"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </div>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Report ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Test Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                            {report.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.clientId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {format(new Date(report.testDate), 'MMM d, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge variant={report.status === 'completed' ? 'success' : 'danger'}>
                              {report.status}
                            </StatusBadge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => handleViewReport(report)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <FaEye className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <ReportDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                report={selectedReport}
              />
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
}
