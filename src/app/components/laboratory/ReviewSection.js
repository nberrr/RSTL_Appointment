'use client';

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
  isSubmitting = false
}) {
  // Get selected services details
  const getSelectedServicesDetails = () => {
    if (!appointment.selectedServices || appointment.selectedServices.length === 0) {
      return [];
    }
    
    // Make sure servicesData and the current tab exist
    if (!servicesData || !servicesData[appointment.currentServiceTab]) {
      return [];
    }
    
    const tabData = servicesData[appointment.currentServiceTab];
    
    // Extract all services from all categories
    const allServices = tabData.categories 
      ? tabData.categories.flatMap(category => category.services || [])
      : [];
      
    // Filter to get only selected services
    return allServices.filter(service => 
      appointment.selectedServices.includes(service.id)
    );
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
  const formatDate = (dateString) => {
    if (!dateString) return 'Not selected';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Render section with label and value
  const renderSection = (label, value, isError = false) => (
    <div className="py-3">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className={`mt-1 text-sm ${isError ? 'text-red-600' : 'text-gray-900'}`}>
        {value || 'Not provided'}
      </dd>
    </div>
  );

  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-3">Review Your Appointment Details</h3>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {/* Contact Information */}
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Contact Information</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            {renderSection('Client Name', appointment.clientName, errors.clientName)}
            {renderSection('Email Address', appointment.emailAddress, errors.emailAddress)}
            {renderSection('Phone Number', appointment.phoneNumber, errors.phoneNumber)}
            {renderSection('Organization', appointment.organization)}
          </dl>
        </div>
        
        {/* Sample Details */}
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Sample Details</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            {renderSection('Sample Name', appointment.sampleName, errors.sampleName)}
            {renderSection('Sample Type', appointment.sampleType, errors.sampleType)}
            {renderSection('Quantity', appointment.quantity, errors.quantity)}
            {renderSection('Preferred Date', formatDate(appointment.preferredDate), errors.preferredDate)}
          </dl>
          <div className="mt-4">
            {renderSection('Sample Description', appointment.sampleDescription, errors.sampleDescription)}
          </div>
        </div>
        
        {/* Selected Services */}
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Selected Services</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          {getSelectedServicesDetails().length > 0 ? (
            <div className="space-y-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getSelectedServicesDetails().map((service) => (
                    <tr key={service.id}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{service.name}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">{service.description || 'N/A'}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {service.price || 'N/A'}
                        {service.unit && <span className="text-xs text-gray-500"> per {service.unit}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="2" className="px-3 py-3 text-right text-sm font-semibold text-gray-700">Total Estimated Price:</th>
                    <th className="px-3 py-3 text-right text-sm font-semibold text-gray-900">
                      ₱{calculateTotalPrice().toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </th>
                  </tr>
                </tfoot>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                *Note: Final pricing may vary based on additional requirements or complexities discovered during testing.
              </p>
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500">
              <p>No services selected</p>
              {errors.selectedServices && (
                <p className="text-red-600 mt-2">{errors.selectedServices}</p>
              )}
            </div>
          )}
        </div>
        
        {/* Shelf Life Details - Only show if shelf life is selected */}
        {appointment.currentServiceTab === 'shelflife' && (
          <>
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Shelf Life Study Details</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                {renderSection('Product Name', appointment.productName, errors.productName)}
                {renderSection('Net Weight', appointment.netWeight, errors.netWeight)}
                {renderSection('Brand Name', appointment.brandName)}
                {renderSection('Existing Market', appointment.existingMarket)}
                {renderSection('Production Type', appointment.productionType)}
                {renderSection('Method of Preservation', appointment.methodOfPreservation, errors.methodOfPreservation)}
                {renderSection('Product Ingredients', appointment.productIngredients, errors.productIngredients)}
                {renderSection('Packaging Material', appointment.packagingMaterial, errors.packagingMaterial)}
                {renderSection('Target Shelf Life', appointment.targetShelfLife, errors.targetShelfLife)}
              </dl>
              
              <div className="mt-4">
                <dt className="text-sm font-medium text-gray-500">Modes of Deterioration</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {appointment.modeOfDeterioration && appointment.modeOfDeterioration.length > 0 && appointment.modeOfDeterioration[0] ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {appointment.modeOfDeterioration.map((mode, index) => (
                        mode && <li key={index}>{mode}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className={errors.modeOfDeterioration ? 'text-red-600' : 'text-gray-500'}>
                      {errors.modeOfDeterioration || 'No modes of deterioration specified'}
                    </p>
                  )}
                </dd>
              </div>
            </div>
          </>
        )}
        
        {/* Terms and Conditions */}
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Terms and Conditions</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className={`w-5 h-5 rounded border ${appointment.terms ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                {appointment.terms && (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div className="ml-3 text-sm">
              <p className={`${errors.terms ? 'text-red-600' : 'text-gray-500'}`}>
                {errors.terms || 'I agree to the terms and conditions of the laboratory testing services.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back to {appointment.currentServiceTab === 'shelflife' ? 'Shelf Life Details' : 'Sample Details'}
        </button>
        <button
          type="submit"
          className={`px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Appointment'}
        </button>
      </div>
    </div>
  );
} 