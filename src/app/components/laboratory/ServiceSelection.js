'use client';

import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ServiceSelection({ 
  appointment, 
  onServiceTabChange, 
  onServiceSelection,
  onShelfLifeServiceChange,
  onSearchChange,
  onContinueToShelfLife,
  servicesData,
  errors,
  disabled = false
}) {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const filterServices = (services) => {
    return services.filter(service =>
      service.name.toLowerCase().includes(appointment.searchQuery.toLowerCase())
    );
  };

  const isShelfLifeSelected = () => {
    return Object.values(appointment.shelfLifeServices).some(value => value);
  };

  const handleServiceTabClick = (e, tab) => {
    e.preventDefault();
    e.stopPropagation();
    onServiceTabChange(tab);
  };

  const handleCategoryToggle = (e, categoryId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCategory(categoryId);
  };

  const handleServiceSelection = (e, serviceId) => {
    e.preventDefault();
    e.stopPropagation();
    onServiceSelection(serviceId);
  };

  const handleContinueToShelfLife = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onContinueToShelfLife();
  };

  const handleShelfLifeServiceChange = (e, serviceId) => {
    e.preventDefault();
    e.stopPropagation();
    onShelfLifeServiceChange(serviceId);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSearchChange(e);
  };

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      {/* Service Header */}
      <div className="bg-blue-600 p-8">
        <h3 className="text-2xl font-semibold text-white mb-2">
          {servicesData[appointment.currentServiceTab].title}
        </h3>
        <p className="text-blue-100">
          {servicesData[appointment.currentServiceTab].description}
        </p>
      </div>

      {/* Service Categories */}
      <div className="p-8">
        {/* Service Type Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-4">
            {['chemical', 'microbiological', 'shelflife'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={(e) => handleServiceTabClick(e, tab)}
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  appointment.currentServiceTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={disabled}
              >
                {tab === 'chemical' ? 'Chemical Analysis' :
                 tab === 'microbiological' ? 'Microbiological Tests' :
                 'Shelf Life Testing'}
              </button>
            ))}
          </div>
        </div>

        {/* Rest of the services section */}
        {appointment.currentServiceTab === 'shelflife' ? (
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Shelf Life Testing</h3>
            <p className="text-sm text-blue-700 mb-6">Select the required testing services for shelf life analysis</p>
            <div className="space-y-4">
              {servicesData.shelflife.categories[0].services.map((service) => (
                <label key={service.id} className={`flex items-start p-4 bg-white rounded-lg shadow-sm ${disabled ? 'opacity-75' : ''}`}>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={appointment.shelfLifeServices[service.id.replace('-analysis', 'Analysis')]}
                      onChange={(e) => handleShelfLifeServiceChange(e, service.id.replace('-analysis', 'Analysis'))}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                      required={service.id === 'microbiological-analysis'}
                      disabled={disabled}
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-900">{service.name}</span>
                      <span className="text-sm font-medium text-blue-600">{service.price}</span>
                    </div>
                    <p className="text-sm text-gray-500">{service.description}</p>
                  </div>
                </label>
              ))}
            </div>
            {errors.shelfLifeServices && (
              <p className="mt-2 text-sm text-red-600">{errors.shelfLifeServices}</p>
            )}
            {isShelfLifeSelected() && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={(e) => handleContinueToShelfLife(e)}
                  className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={disabled}
                >
                  Continue to Shelf Life Details
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Search Box */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search services..."
                value={appointment.searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-100"
                disabled={disabled}
              />
            </div>
            
            {servicesData[appointment.currentServiceTab].categories.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={(e) => handleCategoryToggle(e, `${appointment.currentServiceTab}-${index}`)}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={disabled}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
                      {category.description && (
                        <p className="text-sm text-gray-500">{category.description}</p>
                      )}
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      expandedCategories[`${appointment.currentServiceTab}-${index}`] ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedCategories[`${appointment.currentServiceTab}-${index}`] && (
                  <div className="border-t border-gray-200">
                    <div className="divide-y divide-gray-200">
                      {filterServices(category.services).map((service) => (
                        <label key={service.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 ${disabled ? 'opacity-75' : ''}`}>
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              checked={appointment.selectedServices.includes(service.id)}
                              onChange={(e) => handleServiceSelection(e, service.id)}
                              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                              disabled={disabled}
                            />
                            <span className="ml-3 text-sm text-gray-900">{service.name}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{service.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {errors.services && (
              <p className="mt-2 text-sm text-red-600">{errors.services}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}