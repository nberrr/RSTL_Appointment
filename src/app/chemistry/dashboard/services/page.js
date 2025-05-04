"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaCheck, FaTimes, FaTrash, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

// Add this Toggle Switch component at the top level of the file
function ToggleSwitch({ enabled, onChange, activeColor = "bg-blue-600", inactiveColor = "bg-gray-200" }) {
  return (
    <button
      type="button"
      className={`${enabled ? activeColor : inactiveColor} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
}

// Sample type options
const SAMPLE_TYPE_OPTIONS = [
  'Food',
  'Water and Wastewater',
  'Plant and Plant Extracts',
  'Packages',
  'Others',
  'Uncategorized'
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editedService, setEditedService] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupedServices, setGroupedServices] = useState({});
  const [expandedSampleType, setExpandedSampleType] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/chemistry/services');
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data.map(service => ({
          id: service.id,
          testType: service.test_type || '',
          testDescription: service.test_description || '',
          pricing: parseFloat(service.pricing) || 0,
          appointment: service.appointment || 'Allowed',
          status: service.active ? 'Active' : 'Inactive',
          sampleType: service.sample_type || 'Uncategorized',
        })));
        // Group by sampleType
        const grouped = {};
        data.data.forEach(service => {
          const sampleType = service.sample_type || 'Uncategorized';
          if (!grouped[sampleType]) grouped[sampleType] = [];
          grouped[sampleType].push({
            id: service.id,
            testType: service.test_type || '',
            testDescription: service.test_description || '',
            pricing: parseFloat(service.pricing) || 0,
            appointment: service.appointment || 'Allowed',
            status: service.active ? 'Active' : 'Inactive',
            sampleType: sampleType,
          });
        });
        setGroupedServices(grouped);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch services');
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setEditedService({ 
      ...service,
      pricing: parseFloat(service.pricing) || 0
    });
  };

  const handleAddNew = () => {
    const newService = {
      id: 'new',
      testType: '',
      testDescription: '',
      pricing: 0,
      appointment: 'Allowed',
      status: 'Active',
      sampleType: 'Uncategorized',
    };
    setEditedService(newService);
    setEditingId('new');
    setShowAddModal(true);
  };

  const handleChange = (field, value) => {
    setEditedService(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveService = async () => {
    if (!editedService.testType?.trim() || !editedService.testDescription?.trim()) {
      setModalType('emptySave');
      setModalMessage('Are you sure you want to save service without information?');
      return;
    }

    try {
      const response = await fetch('/api/chemistry/services', {
        method: editingId === 'new' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingId === 'new' ? undefined : editingId,
          testType: editedService.testType.trim(),
          testDescription: editedService.testDescription.trim(),
          pricing: parseFloat(editedService.pricing) || 0,
          appointment: editedService.appointment,
          active: editedService.status === 'Active',
          sampleType: editedService.sampleType || 'Uncategorized',
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchServices();
        setEditingId(null);
        setEditedService(null);
        setModalType(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to save service');
      console.error('Error saving service:', error);
    }
  };

  const handleCancelEdit = () => {
    if (
      editingId === 'new' && 
      !editedService.testType?.trim() && 
      !editedService.testDescription?.trim()
    ) {
      // If it's a new service and empty, just cancel without confirmation
      setEditingId(null);
      setEditedService(null);
      setModalType(null);
    } else {
      setModalType('cancel');
      setModalMessage('Are you sure you want to cancel changes?');
    }
  };

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/chemistry/services?id=${serviceToDelete.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchServices();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to delete service');
      console.error('Error deleting service:', error);
    } finally {
      setDeleteModal(false);
      setServiceToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setServiceToDelete(null);
  };

  const handleModalConfirm = () => {
    switch (modalType) {
      case 'save':
      case 'emptySave':
        handleSaveService();
        break;
      case 'cancel':
      case 'emptyCancel':
        setEditingId(null);
        setEditedService(null);
        setModalType(null);
        break;
    }
  };

  const handleModalCancel = () => {
    setModalType(null);
  };

  const activeTests = services.filter(service => service.status === 'Active').length;
  const totalTests = services.length;

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.testType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || service.testType?.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleAddModalSave = async () => {
    await handleSaveService();
    setShowAddModal(false);
  };

  const handleAddModalCancel = () => {
    setEditingId(null);
    setEditedService(null);
    setShowAddModal(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-screen flex flex-col">
          <DashboardNav />
          <div className="flex flex-1 overflow-hidden">
            <DashboardSidebar />
            <main className="flex-1 bg-gray-50 p-8 flex items-center justify-center">
              <div className="text-lg text-gray-600">Loading chemistry services...</div>
            </main>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 flex flex-col overflow-hidden">
            {error && (
              <div className="p-4 bg-red-100 text-red-700 mb-4">
                {error}
                <button 
                  onClick={() => setError(null)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            )}

            {/* Fixed Header Section */}
            <div className="p-5 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Sample Tests</h1>
                <button 
                  onClick={handleAddNew}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FaPlus className="w-4 h-4" />
                  Add New Test
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search test type..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Test Types</option>
                    {Array.from(new Set(services.map(s => s.testType))).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="text-gray-600">
                  <span>Total Tests: {totalTests}</span>
                  <span className="mx-2">|</span>
                  <span>Active: {activeTests}</span>
                </div>
              </div>
            </div>

            {/* Scrollable Table */}
            <div className="flex-1 overflow-auto p-5">
              <div className="bg-white rounded-lg shadow h-full flex flex-col border-gray-200">
                <div className="overflow-auto">
                  {/* Grouped by sample type, collapsible sections */}
                  {Object.entries(groupedServices).map(([sampleType, servicesList]) => (
                    <div key={sampleType} className="mb-6 border rounded-lg bg-gray-50">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-6 py-4 text-left text-xl font-semibold text-blue-700 hover:bg-blue-100 focus:outline-none rounded-t-lg"
                        onClick={() => setExpandedSampleType(expandedSampleType === sampleType ? null : sampleType)}
                      >
                        <span>{sampleType}</span>
                        {expandedSampleType === sampleType ? (
                          <FaChevronDown className="h-5 w-5" />
                        ) : (
                          <FaChevronRight className="h-5 w-5" />
                        )}
                      </button>
                      {expandedSampleType === sampleType && (
                        <div className="p-0">
                  <table className="min-w-full">
                            <thead className="bg-gray-100 sticky top-0">
                      <tr className="border-b">
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type of Test</th>
                        <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing (₱)</th>
                        <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                        <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                              {servicesList.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="w-1/4 px-6 py-4">
                            {editingId === service.id ? (
                              <div className="space-y-1">
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 border rounded text-sm"
                                  value={editedService.testType}
                                  onChange={(e) => handleChange('testType', e.target.value)}
                                  placeholder="Enter test type"
                                />
                                <textarea
                                  className="w-full px-2 py-1 border rounded text-sm resize-none"
                                  value={editedService.testDescription}
                                  onChange={(e) => handleChange('testDescription', e.target.value)}
                                  rows="2"
                                  placeholder="Enter test description"
                                />
                                        <select
                                          className="w-full px-2 py-1 border rounded text-sm mt-1"
                                          value={editedService.sampleType || 'Uncategorized'}
                                          onChange={(e) => handleChange('sampleType', e.target.value)}
                                        >
                                          {SAMPLE_TYPE_OPTIONS.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                          ))}
                                        </select>
                              </div>
                            ) : (
                              <div className="min-h-[70px]">
                                <div className="text-sm font-medium text-gray-900">{service.testType}</div>
                                <div className="text-sm text-gray-500">{service.testDescription}</div>
                              </div>
                            )}
                          </td>
                          <td className="w-32 px-6 py-4">
                            {editingId === service.id ? (
                              <input
                                type="number"
                                className="w-24 px-2 py-1 border rounded text-sm"
                                value={editedService.pricing || 0}
                                onChange={(e) => handleChange('pricing', parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                              />
                            ) : (
                              <span className="text-sm text-gray-900">
                                {typeof service.pricing === 'number' ? service.pricing.toLocaleString() : '0'}
                              </span>
                            )}
                          </td>
                          <td className="w-32 px-6 py-4">
                            {editingId === service.id ? (
                              <div className="flex items-center justify-center w-full">
                                <ToggleSwitch
                                  enabled={editedService.appointment === 'Allowed'}
                                  onChange={(enabled) => handleChange('appointment', enabled ? 'Allowed' : 'Not Allowed')}
                                />
                              </div>
                            ) : (
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                service.appointment === 'Allowed' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {service.appointment}
                              </span>
                            )}
                          </td>
                          <td className="w-32 px-6 py-4">
                            {editingId === service.id ? (
                              <div className="flex items-center justify-center w-full">
                                <ToggleSwitch
                                  enabled={editedService.status === 'Active'}
                                  onChange={(enabled) => handleChange('status', enabled ? 'Active' : 'Inactive')}
                                  activeColor="bg-green-600"
                                />
                              </div>
                            ) : (
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                service.status === 'Active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {service.status}
                              </span>
                            )}
                          </td>
                          <td className="w-24 px-6 py-4">
                            <div className="flex gap-2 justify-center">
                              {editingId === service.id ? (
                                <>
                                  <button 
                                    onClick={handleSaveService}
                                    className="text-green-600 hover:text-green-800"
                                  >
                                    <FaCheck className="w-5 h-5" />
                                  </button>
                                  <button 
                                    onClick={handleCancelEdit}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <FaTimes className="w-5 h-5" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button 
                                    onClick={() => handleEdit(service)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                            Edit
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteClick(service)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                            <FaTrash className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                            </tbody>
                          </table>
                            </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete the test &quot;{serviceToDelete?.testType}&quot;? 
                    This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleDeleteCancel}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteConfirm}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Confirmation Modal */}
            {modalType && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Action</h3>
                  <p className="text-gray-600 mb-6">{modalMessage}</p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleModalCancel}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleModalConfirm}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add New Test Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Test</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded text-sm"
                      value={editedService.testType}
                      onChange={(e) => handleChange('testType', e.target.value)}
                      placeholder="Enter test type"
                    />
                    <textarea
                      className="w-full px-2 py-1 border rounded text-sm resize-none"
                      value={editedService.testDescription}
                      onChange={(e) => handleChange('testDescription', e.target.value)}
                      rows="2"
                      placeholder="Enter test description"
                    />
                    <select
                      className="w-full px-2 py-1 border rounded text-sm"
                      value={editedService.sampleType || 'Uncategorized'}
                      onChange={(e) => handleChange('sampleType', e.target.value)}
                    >
                      {SAMPLE_TYPE_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      className="w-full px-2 py-1 border rounded text-sm"
                      value={editedService.pricing || 0}
                      onChange={(e) => handleChange('pricing', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      placeholder="Enter price"
                    />
                    <div className="flex items-center gap-2">
                      <span>Appointment:</span>
                      <ToggleSwitch
                        enabled={editedService.appointment === 'Allowed'}
                        onChange={(enabled) => handleChange('appointment', enabled ? 'Allowed' : 'Not Allowed')}
                      />
                      <span className="text-sm">{editedService.appointment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Status:</span>
                      <ToggleSwitch
                        enabled={editedService.status === 'Active'}
                        onChange={(enabled) => handleChange('status', enabled ? 'Active' : 'Inactive')}
                        activeColor="bg-green-600"
                      />
                      <span className="text-sm">{editedService.status}</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={handleAddModalCancel}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddModalSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </AdminLayout>
  );
}