'use client';

import { Fragment } from 'react';

export default function ReviewSection({ 
  appointment = {
    clientName: '',
    emailAddress: '',
    phoneNumber: '',
    organization: '',
    sampleName: '',
    sampleType: '',
    quantity: '',
    preferredDate: '',
    sampleDescription: '',
    selectedServices: [],
    currentServiceTab: 'chemical',
    productName: '',
    netWeight: '',
    brandName: '',
    existingMarket: '',
    productionType: '',
    methodOfPreservation: '',
    productIngredients: '',
    packagingMaterial: '',
    targetShelfLife: '',
    modeOfDeterioration: [],
    terms: false
  },
  servicesData = {},
  errors = {},
  onPrevious,
  isSubmitting = false,
  onSubmit,
  allAppointments = []
}) {
  // Get selected services details
  const getSelectedServicesDetails = () => {
    if (!appointment.selectedServices || appointment.selectedServices.length === 0) {
      console.log("No selected services found");
      return [];
    }
    
    // Make sure servicesData exists
    if (!servicesData) {
      console.log("No servicesData available");
      return [];
    }
    
    console.log("Selected services IDs:", appointment.selectedServices);
    
    // Collect all services from all tabs
    const allServices = [];
    
    // Loop through all service types (chemical, microbiological, shelflife)
    Object.keys(servicesData).forEach(tabKey => {
      const tabData = servicesData[tabKey];
      if (tabData && tabData.categories) {
        // Extract services from each category in this tab
        tabData.categories.forEach(category => {
          if (category.services) {
            category.services.forEach(service => {
              if (appointment.selectedServices.includes(service.id)) {
                allServices.push({
                  ...service,
                  serviceType: tabKey  // Add the service type for reference
                });
              }
            });
          }
        });
      }
    });
    
    // Also check shelf life services if applicable
    if (appointment.shelfLifeServices) {
      Object.entries(appointment.shelfLifeServices).forEach(([key, isSelected]) => {
        if (isSelected && servicesData.shelflife && servicesData.shelflife.categories) {
          // Convert the key format (e.g., microbiologicalAnalysis to microbiological-analysis)
          const serviceId = key.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
          
          // Find this service in the shelflife category
          servicesData.shelflife.categories.forEach(category => {
            if (category.services) {
              const service = category.services.find(s => s.id === serviceId);
              if (service) {
                allServices.push({
                  ...service,
                  serviceType: 'shelflife'
                });
              }
            }
          });
        }
      });
    }
    
    console.log("Selected services details:", allServices);
    return allServices;
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const services = getSelectedServicesDetails();
    return services.reduce((total, service) => {
      // Convert price from string format like '₱1,500.00' to number
      const priceString = service.price || '₱0';
      const priceNumber = parseFloat(priceString.replace(/[₱,]/g, '')) || 0;
      return total + priceNumber;
    }, 0);
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Render section with label and value
  const renderSection = (label, value) => {
    if (!value) return null;
    return (
      <div className="py-1">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{value}</dd>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Appointments Summary
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Review your appointment details before submission.</p>
          </div>
          
          {allAppointments && allAppointments.length > 0 ? (
            <div className="mt-5 space-y-6">
              {allAppointments.map((appointment, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } border border-gray-200`}
                >
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    Appointment #{index + 1}
                  </h4>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    {renderSection("Client Name", appointment.clientName)}
                    {renderSection("Email", appointment.emailAddress)}
                    {renderSection("Phone", appointment.phoneNumber)}
                    {renderSection("Organization", appointment.organization)}
                    {renderSection("Sample Name", appointment.sampleName)}
                    {renderSection("Sample Type", appointment.sampleType)}
                    {renderSection("Quantity", appointment.quantity)}
                    {renderSection("Preferred Date", formatDate(appointment.preferredDate))}
                    {renderSection("Sample Description", appointment.sampleDescription)}
                    
                    {appointment.shelfLifeDetails && (
                      <Fragment>
                        {renderSection("Storage Temperature", appointment.shelfLifeDetails.storageTemperature)}
                        {renderSection("Storage Condition", appointment.shelfLifeDetails.storageCondition)}
                        {renderSection("Shelf Life Duration", appointment.shelfLifeDetails.shelfLifeDuration)}
                      </Fragment>
                    )}
                  </dl>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <p className="text-sm text-red-600">No appointments have been added yet.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Selected Services
          </h3>
          <div className="mt-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getSelectedServicesDetails().map((service, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {service.price}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    ₱{calculateTotalPrice().toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Terms and Conditions
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>By submitting this form, you agree to our terms of service and privacy policy.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Fragment>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </Fragment>
          ) : (
            'Submit Appointment'
          )}
        </button>
      </div>
    </div>
  );
} 