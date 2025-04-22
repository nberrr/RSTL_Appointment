'use client';

import { Fragment } from 'react';

export default function ReviewSection({ 
  servicesData = {},
  errors = {},
  onPrevious,
  isSubmitting = false,
  onSubmit,
  allAppointments = []
}) {
  // Log the received allAppointments prop
  console.log("ReviewSection received allAppointments:", allAppointments);

  // Helper to get selected services details for a SINGLE appointment
  const getSelectedServicesDetailsForAppointment = (appointment) => {
    if (!appointment) return [];

    const selectedServiceIds = appointment.selectedServices || [];
    const shelfLifeServices = appointment.shelfLifeServices || {};

    if (selectedServiceIds.length === 0 && !Object.values(shelfLifeServices).some(Boolean)) {
      return [];
    }
    
    if (!servicesData) {
      console.log("No servicesData available");
      return [];
    }
    
    const allServicesDetails = [];
    
    // Loop through standard service types
    Object.keys(servicesData).forEach(tabKey => {
      // Skip shelf life tab here, handle separately
      if (tabKey === 'shelflife') return; 

      const tabData = servicesData[tabKey];
      if (tabData && tabData.categories) {
        tabData.categories.forEach(category => {
          if (category.services) {
            category.services.forEach(service => {
              if (selectedServiceIds.includes(service.id)) {
                allServicesDetails.push({
                  ...service,
                  serviceType: tabKey
                });
              }
            });
          }
        });
      }
    });
    
    // Handle shelf life services checkboxes
    Object.entries(shelfLifeServices).forEach(([key, isSelected]) => {
      if (isSelected && servicesData.shelflife && servicesData.shelflife.categories) {
        const serviceId = key.replace(/([A-Z])/g, '-$1').toLowerCase(); // Adjusted key conversion
        
        servicesData.shelflife.categories.forEach(category => {
          if (category.services) {
            const service = category.services.find(s => s.id === serviceId);
            // Avoid duplicates if already added via selectedServices (unlikely but possible)
            if (service && !allServicesDetails.some(s => s.id === service.id)) { 
              allServicesDetails.push({
                ...service,
                serviceType: 'shelflife'
              });
            }
          }
        });
      }
    });

    return allServicesDetails;
  };

  // Helper to calculate total price for a SINGLE appointment
  const calculateTotalPriceForAppointment = (appointment) => {
    const services = getSelectedServicesDetailsForAppointment(appointment);
    return services.reduce((total, service) => {
      const priceString = service.price || '₱0';
      const priceNumber = parseFloat(priceString.replace(/[₱,]/g, '')) || 0;
      return total + priceNumber;
    }, 0);
  };

  // Calculate overall total price for ALL appointments
  const calculateOverallTotalPrice = () => {
    return allAppointments.reduce((total, app) => total + calculateTotalPriceForAppointment(app), 0);
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
            Selected Services Summary
          </h3>
          <div className="mt-5 space-y-6">
            {allAppointments.map((appointment, index) => {
              const servicesForThisAppointment = getSelectedServicesDetailsForAppointment(appointment);
              const totalForThisAppointment = calculateTotalPriceForAppointment(appointment);
              
              // Don't render a table if no services selected for this appointment
              if (servicesForThisAppointment.length === 0) {
                return null; 
              }

              return (
                <div key={`services-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                   <h4 className="text-md font-medium text-gray-800 bg-gray-50 px-4 py-3 border-b border-gray-200">
                    Services for Appointment #{index + 1} (Sample: {appointment.sampleName || 'N/A'})
                  </h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Optional: Add thead back if desired per table */}
                    <tbody className="bg-white divide-y divide-gray-200">
                      {servicesForThisAppointment.map((service, serviceIndex) => (
                        <tr key={serviceIndex}>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                            {service.name}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                            {service.price}
                          </td>
                        </tr>
                      ))}
                      {/* Subtotal for this appointment */} 
                      <tr className="bg-gray-50">
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          Subtotal
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          ₱{totalForThisAppointment.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}

            {/* Overall Total Section */} 
            <div className="mt-6 pt-4 border-t border-gray-300 flex justify-end items-center">
              <span className="text-lg font-semibold text-gray-900 mr-4">Overall Total:</span>
              <span className="text-xl font-bold text-blue-600">
                ₱{calculateOverallTotalPrice().toFixed(2)}
              </span>
            </div>

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
          onClick={onSubmit} // Use the passed onSubmit prop
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Appointment'}
        </button>
      </div>
    </div>
  );
} 