"use client";

import { useState } from 'react';
import { FaPlus, FaSearch, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import AdminLayout from "@/app/components/shared/AdminLayout";
import DashboardNav from "@/app/components/shared/DashboardNav";
import DashboardSidebar from "@/app/components/shared/DashboardSidebar";

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

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Test Types');
  const [editingId, setEditingId] = useState(null);
  const [editedService, setEditedService] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [modalType, setModalType] = useState(null); // 'save', 'cancel', 'emptySave', 'emptyCancel'
  const [modalMessage, setModalMessage] = useState('');

  // Sample data for services
  const [services, setServices] = useState([
    {
      id: 1,
      sampleType: 'Petroleum',
      description: 'Crude oil and refined petroleum products',
      testType: 'Density Testing',
      testDescription: 'Measurement of density at standard temperature',
      pricing: 2500,
      appointment: 'Allowed',
      status: 'Active'
    },
    {
      id: 2,
      sampleType: 'Water',
      description: 'Potable and non-potable water samples',
      testType: 'Chemical Analysis',
      testDescription: 'Full chemical composition analysis including pH, minerals, and contaminants',
      pricing: 3500,
      appointment: 'Allowed',
      status: 'Active'
    },
    {
      id: 3,
      sampleType: 'Soil',
      description: 'Agricultural and construction soil samples',
      testType: 'Composition Analysis',
      testDescription: 'Analysis of soil composition, nutrients, and contaminants',
      pricing: 4000,
      appointment: 'Not Allowed',
      status: 'Active'
    },
    {
      id: 4,
      sampleType: 'Gas',
      description: 'Natural gas and industrial gas samples',
      testType: 'Purity Testing',
      testDescription: 'Measurement of gas purity and composition',
      pricing: 3000,
      appointment: 'Allowed',
      status: 'Active'
    },
    {
      id: 5,
      sampleType: 'Metals',
      description: 'Various metal alloys and compounds',
      testType: 'Hardness Testing',
      testDescription: 'Measurement of metal hardness and structural integrity',
      pricing: 5000,
      appointment: 'Allowed',
      status: 'Inactive'
    }
  ]);

  const handleEdit = (service) => {
  setEditingId(service.id);
  setEditedService({ ...service });
};

const handleSave = () => {
  if (
    !editedService.sampleType.trim() ||
    !editedService.description.trim() ||
    !editedService.testType.trim() ||
    !editedService.testDescription.trim()
  ) {
    setModalType('emptySave');
    setModalMessage('Are you sure you want to save service without information?');
    return;
  }

  setModalType('save');
  setModalMessage('Are you sure you want to save changes?');
};

const handleCancel = () => {
  if (!editedService.sampleType.trim() &&
      !editedService.description.trim() &&
      !editedService.testType.trim() &&
      !editedService.testDescription.trim()) {
    setModalType('emptyCancel');
    setModalMessage('This new service is empty. Delete it?');
  } else {
    setModalType('cancel');
    setModalMessage('Are you sure you want to cancel changes?');
  }
};

const handleAddNew = () => {
  setModalType('add');
  setModalMessage('Are you sure you want to add a new service?');
};

const handleChange = (field, value) => {
  setEditedService({ ...editedService, [field]: value });
};

const activeTests = services.filter(service => service.status === 'Active').length;
const totalTests = services.length;

const handleDeleteClick = (service) => {
  setServiceToDelete(service);
  setDeleteModal(true);
};

const handleDeleteConfirm = () => {
  setServices(services.filter(service => service.id !== serviceToDelete.id));
  setDeleteModal(false);
  setServiceToDelete(null);
};

const handleDeleteCancel = () => {
  setDeleteModal(false);
  setServiceToDelete(null);
};

const handleModalConfirm = () => {
  switch (modalType) {
    case 'save':
      setServices(services.map(service => 
        service.id === editingId ? editedService : service
        
      ));
      setEditingId(null);
      setEditedService(null);
      break;
    case 'emptySave':
      setServices(services.map(service => 
        service.id === editingId ? editedService : service
      ));
      break;
    case 'cancel':
      setEditingId(null);
      setEditedService(null);
      break;
    case 'emptyCancel':
      setServices(services.filter(service => service.id !== editingId));
      setEditingId(null);
      setEditedService(null);
      break;
    case 'add':
      const newService = {
        id: services.length + 1,
        sampleType: '',
        description: '',
        testType: '',
        testDescription: '',
        pricing: 0,
        appointment: 'Allowed',
        status: 'Active'
      };
      setServices([newService, ...services]);
      setEditingId(newService.id);
      setEditedService({ ...newService });
      break;
  }
  setModalType(null);
};

const handleModalCancel = () => {
  setModalType(null);
};

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-gray-100 flex flex-col overflow-hidden">
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
                      placeholder="Search sample or test type..."
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
                    <option>All Test Types</option>
                    <option>Density Testing</option>
                    <option>Chemical Analysis</option>
                    <option>Composition Analysis</option>
                    <option>Purity Testing</option>
                    <option>Hardness Testing</option>
                  </select>
                </div>
                <div className="text-gray-600">
                  <span>Total Tests: {totalTests}</span>
                  <span className="mx-2">|</span>
                  <span>Active: {activeTests}</span>
                </div>
              </div>
            </div>

            {/* Scrollable Table Section */}
            <div className="flex-1 overflow-hidden p-5 pt-0">
              <div className="bg-white rounded-lg shadow h-full flex flex-col ">
                <div className="overflow-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr className="border-b">
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type of Sample</th>
                        <th className="w-1/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type of Test</th>
                        <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing (₱)</th>
                        <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                        <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {services.map((service) => (
                        <tr key={service.id}>
                          <td className="w-1/4 px-6 py-4">
                            {editingId === service.id ? (
                              <div className="space-y-1">
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 border rounded text-sm"
                                  value={editedService.sampleType}
                                  onChange={(e) => handleChange('sampleType', e.target.value)}
                                />
                                <textarea
                                  className="w-full px-2 py-1 border rounded text-sm resize-none"
                                  value={editedService.description}
                                  onChange={(e) => handleChange('description', e.target.value)}
                                  rows="2"
                                />
                              </div>
                            ) : (
                              <div className="min-h-[70px]">
                                <div className="text-sm font-medium text-gray-900">{service.sampleType}</div>
                                <div className="text-sm text-gray-500">{service.description}</div>
                              </div>
                            )}
                          </td>
                          <td className="w-1/3 px-6 py-4">
                            {editingId === service.id ? (
                              <div className="space-y-1">
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 border rounded text-sm"
                                  value={editedService.testType}
                                  onChange={(e) => handleChange('testType', e.target.value)}
                                />
                                <textarea
                                  className="w-full px-2 py-1 border rounded text-sm resize-none"
                                  value={editedService.testDescription}
                                  onChange={(e) => handleChange('testDescription', e.target.value)}
                                  rows="2"
                                />
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
                                value={editedService.pricing}
                                onChange={(e) => handleChange('pricing', parseInt(e.target.value))}
                              />
                            ) : (
                              <span className="text-sm text-gray-900">{service.pricing.toLocaleString()}</span>
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
                          <td className="w-24 px-6 py-4 text-sm">
                            <div className="flex gap-2 justify-center">
                              {editingId === service.id ? (
                                <>
                                  <button 
                                    onClick={handleSave}
                                    className="text-green-600 hover:text-green-800"
                                  >
                                    <FaCheck className="w-5 h-5" />
                                  </button>
                                  <button 
                                    onClick={handleCancel}
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
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteClick(service)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <FaTrash className="w-5 h-5" />
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
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete the test &quot;{serviceToDelete?.testType}&quot; for {serviceToDelete?.sampleType}? 
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
                      className={`px-4 py-2 rounded-lg font-medium ${
                        modalType === 'emptyCancel' || modalType === 'delete'
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {modalType === 'emptySave' ? 'Yes' : 'Confirm'}
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
