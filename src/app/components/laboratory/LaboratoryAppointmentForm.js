'use client';

import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Import components
import ContactInformation from './ContactInformation';
import AppointmentCalendar from './AppointmentCalendar';
import SampleDetails from './SampleDetails';
import ServiceSelection from './ServiceSelection';
import ShelfLifeDetails from './ShelfLifeDetails';
import ReviewSection from './ReviewSection';
import { AlertMessage, SubmissionStatus, DeleteConfirmModal } from './Notifications';

// Import services data
import { servicesData } from './servicesData';

export default function LaboratoryAppointmentForm() {
  // States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [appointments, setAppointments] = useState([{
    id: 1,
    // General Information
    clientName: '',
    emailAddress: '',
    phoneNumber: '',
    organization: '',
    sampleName: '',
    sampleType: '',
    quantity: '',
    preferredDate: '',
    sampleDescription: '',
    
    // Testing Services
    selectedServices: [],
    searchQuery: '',
    currentServiceTab: 'chemical',
    shelfLifeServices: {
      microbiologicalAnalysis: false,
      physiologicalAnalysis: false,
      sensoryAnalysis: false
    },
    
    // Shelf Life Details
    objectiveOfStudy: '',
    productName: '',
    netWeight: '',
    brandName: '',
    existingMarket: '',
    productionType: '',
    methodOfPreservation: '',
    productIngredients: '',
    packagingMaterial: '',
    targetShelfLife: '',
    modeOfDeterioration: [''],
    existingPermitsFile: null,
    productImageFile: null,
    hasAttemptedSubmit: false
  }]);

  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentStep, setCurrentStep] = useState('contact');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [bookedDates, setBookedDates] = useState([]);

  // Show alert message
  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  // Handle contact info change
  const handleContactInfoChange = (name, value) => {
    setAppointments(prev => {
      return prev.map(appointment => ({
        ...appointment,
        [name]: value
      }));
    });

    // Remove error for the field being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle appointment field change
  const handleAppointmentChange = (name, value) => {
    setAppointments(prev => {
      const newAppointments = [...prev];
      newAppointments[currentAppointmentIndex] = {
        ...newAppointments[currentAppointmentIndex],
        [name]: value
      };
      return newAppointments;
    });

    // Remove error for the field being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    
    // Update preferred date for all appointments
    setAppointments(prev => 
      prev.map(appointment => ({
        ...appointment,
        preferredDate: date.toISOString().split('T')[0]
      }))
    );
  };

  // Handle service selection
  const handleServiceSelection = (serviceId) => {
    setAppointments(prev => {
      const newAppointments = [...prev];
      const currentAppointment = newAppointments[currentAppointmentIndex];
      
      newAppointments[currentAppointmentIndex] = {
        ...currentAppointment,
        selectedServices: currentAppointment.selectedServices.includes(serviceId)
          ? currentAppointment.selectedServices.filter(id => id !== serviceId)
          : [...currentAppointment.selectedServices, serviceId]
      };
      
      return newAppointments;
    });
  };

  // Handle service tab change
  const handleServiceTabChange = (tab) => {
    setAppointments(prev => {
      const newAppointments = [...prev];
      newAppointments[currentAppointmentIndex] = {
        ...newAppointments[currentAppointmentIndex],
        currentServiceTab: tab
      };
      return newAppointments;
    });
  };

  // Handle shelf life service change
  const handleShelfLifeServiceChange = (serviceName) => {
    setAppointments(prev => {
      const newAppointments = [...prev];
      newAppointments[currentAppointmentIndex] = {
        ...newAppointments[currentAppointmentIndex],
        shelfLifeServices: {
          ...newAppointments[currentAppointmentIndex].shelfLifeServices,
          [serviceName]: !newAppointments[currentAppointmentIndex].shelfLifeServices[serviceName]
        }
      };
      return newAppointments;
    });
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setAppointments(prev => {
      const newAppointments = [...prev];
      newAppointments[currentAppointmentIndex] = {
        ...newAppointments[currentAppointmentIndex],
        searchQuery: e.target.value
      };
      return newAppointments;
    });
  };

  // Handle mode of deterioration change
  const handleModeChange = (index, value) => {
    setAppointments(prev => {
      const newAppointments = [...prev];
      const newModes = [...newAppointments[currentAppointmentIndex].modeOfDeterioration];
      newModes[index] = value;
      
      newAppointments[currentAppointmentIndex] = {
        ...newAppointments[currentAppointmentIndex],
        modeOfDeterioration: newModes
      };
      
      return newAppointments;
    });
  };

  // Add new mode of deterioration
  const handleAddMode = () => {
    setAppointments(prev => {
      const newAppointments = [...prev];
      newAppointments[currentAppointmentIndex] = {
        ...newAppointments[currentAppointmentIndex],
        modeOfDeterioration: [...newAppointments[currentAppointmentIndex].modeOfDeterioration, '']
      };
      return newAppointments;
    });
  };

  // Remove mode of deterioration
  const handleRemoveMode = (indexToRemove) => {
    setAppointments(prev => {
      const newAppointments = [...prev];
      newAppointments[currentAppointmentIndex] = {
        ...newAppointments[currentAppointmentIndex],
        modeOfDeterioration: prev[currentAppointmentIndex].modeOfDeterioration.filter((_, index) => index !== indexToRemove)
      };
      return newAppointments;
    });
  };

  // Handle file change
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setAppointments(prev => {
        const newAppointments = [...prev];
        newAppointments[currentAppointmentIndex] = {
          ...newAppointments[currentAppointmentIndex],
          [fieldName]: file
        };
        return newAppointments;
      });
    }
  };

  // Add a new appointment
  const addNewAppointment = () => {
    // Check if the current tab is empty
    const currentAppointment = appointments[currentAppointmentIndex];
    if (!currentAppointment.sampleName && !currentAppointment.quantity && !currentAppointment.sampleDescription) {
      showAlertMessage(`Please fill out Appointment ${currentAppointmentIndex + 1} before adding more tabs`);
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      // Keep contact information from the first appointment
      clientName: appointments[0].clientName,
      emailAddress: appointments[0].emailAddress,
      phoneNumber: appointments[0].phoneNumber,
      organization: appointments[0].organization,
      // Set the preferred date to the selected date
      preferredDate: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
      // Reset other fields
      sampleName: '',
      sampleType: '',
      quantity: '',
      sampleDescription: '',
      selectedServices: [],
      searchQuery: '',
      currentServiceTab: 'chemical',
      shelfLifeServices: {
        microbiologicalAnalysis: false,
        physiologicalAnalysis: false,
        sensoryAnalysis: false
      },
      objectiveOfStudy: '',
      productName: '',
      netWeight: '',
      brandName: '',
      existingMarket: '',
      productionType: '',
      methodOfPreservation: '',
      productIngredients: '',
      packagingMaterial: '',
      targetShelfLife: '',
      modeOfDeterioration: [''],
      existingPermitsFile: null,
      productImageFile: null,
      hasAttemptedSubmit: false
    };
    
    setAppointments([...appointments, newAppointment]);
    setCurrentAppointmentIndex(appointments.length);
    setErrors({});
  };

  // Handle delete appointment
  const handleDeleteAppointment = (index) => {
    setAppointmentToDelete(index);
    setShowDeleteModal(true);
  };

  // Confirm delete appointment
  const confirmDeleteAppointment = () => {
    if (appointments.length <= 1) {
      showAlertMessage('Cannot delete the only appointment');
      setShowDeleteModal(false);
      return;
    }
    
    setAppointments(prev => prev.filter((_, i) => i !== appointmentToDelete));
    
    if (currentAppointmentIndex >= appointments.length - 1) {
      setCurrentAppointmentIndex(Math.max(0, appointments.length - 2));
    }
    
    setShowDeleteModal(false);
    setAppointmentToDelete(null);
  };

  // Validation functions
  const validateContactInfo = () => {
    const newErrors = {};
    if (!appointments[0].clientName) newErrors.clientName = 'Please enter client name';
    if (!appointments[0].emailAddress) newErrors.emailAddress = 'Please enter your email address';
    if (!appointments[0].phoneNumber) newErrors.phoneNumber = 'Please enter your phone number';
    if (!appointments[0].organization) newErrors.organization = 'Please enter your organization name';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      showAlertMessage('Please fill in all required contact information fields');
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const validateSampleDetails = () => {
    const newErrors = {};
    const currentAppointment = appointments[currentAppointmentIndex];
    
    if (!currentAppointment.sampleName) newErrors.sampleName = 'Please enter sample name';
    if (!currentAppointment.quantity) newErrors.quantity = 'Please enter quantity';
    if (!currentAppointment.preferredDate) newErrors.preferredDate = 'Please select preferred date';
    if (!currentAppointment.sampleDescription) newErrors.sampleDescription = 'Please enter sample description';
    if (currentAppointment.selectedServices.length === 0 && !Object.values(currentAppointment.shelfLifeServices).some(value => value)) {
      newErrors.services = 'Please select at least one service';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      showAlertMessage(`Please fill in all required sample details fields for Appointment ${currentAppointmentIndex + 1}`);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const validateShelfLifeDetails = () => {
    const newErrors = {};
    const currentAppointment = appointments[currentAppointmentIndex];
    
    if (!currentAppointment.objectiveOfStudy) newErrors.objectiveOfStudy = 'Please enter objective of study';
    if (!currentAppointment.productName) newErrors.productName = 'Please enter product name';
    if (!currentAppointment.netWeight) newErrors.netWeight = 'Please enter net weight';
    if (!currentAppointment.brandName) newErrors.brandName = 'Please enter brand name';
    if (!currentAppointment.existingMarket) newErrors.existingMarket = 'Please enter existing market';
    if (!currentAppointment.productionType) newErrors.productionType = 'Please enter production type';
    if (!currentAppointment.methodOfPreservation) newErrors.methodOfPreservation = 'Please enter method of preservation';
    if (!currentAppointment.productIngredients) newErrors.productIngredients = 'Please enter product ingredients';
    if (!currentAppointment.packagingMaterial) newErrors.packagingMaterial = 'Please enter packaging material';
    if (!currentAppointment.targetShelfLife) newErrors.targetShelfLife = 'Please enter target shelf life';
    if (currentAppointment.modeOfDeterioration.length === 0 || currentAppointment.modeOfDeterioration[0] === '') {
      newErrors.modeOfDeterioration = 'Please enter at least one mode of deterioration';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      showAlertMessage('Please fill in all required shelf life information fields');
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    // First validate contact info
    if (!validateContactInfo()) return false;
    
    // Then validate all appointments
    let isValid = true;
    for (let i = 0; i < appointments.length; i++) {
      const currentIndex = currentAppointmentIndex;
      setCurrentAppointmentIndex(i);
      
      if (!validateSampleDetails()) {
        isValid = false;
      }
      
      // If this is a shelf life appointment, validate shelf life details
      if (isShelfLifeSelected() && !validateShelfLifeDetails()) {
        isValid = false;
      }
      
      setCurrentAppointmentIndex(currentIndex);
    }
    
    return isValid;
  };

  // Navigation functions
  const handleNextStep = () => {
    let canProceed = false;
    
    switch (currentStep) {
      case 'contact':
        canProceed = validateContactInfo();
        break;
      case 'sample':
        // Validate all appointments
        let hasErrors = false;
        let emptyTabIndex = -1;
        
        // First check if any tab is empty
        appointments.forEach((appointment, index) => {
          if (!appointment.sampleName && !appointment.quantity && !appointment.sampleDescription) {
            emptyTabIndex = index;
            hasErrors = true;
          }
        });

        if (emptyTabIndex !== -1) {
          showAlertMessage(`Please fill out Appointment ${emptyTabIndex + 1} before adding more tabs`);
          return;
        }

        // Then validate all filled tabs
        const currentIndex = currentAppointmentIndex;
        appointments.forEach((appointment, index) => {
          setCurrentAppointmentIndex(index);
          if (!validateSampleDetails()) {
            hasErrors = true;
          }
        });
        setCurrentAppointmentIndex(currentIndex);
        
        canProceed = !hasErrors;
        break;
      case 'shelflife':
        canProceed = validateShelfLifeDetails();
        break;
      default:
        break;
    }

    if (canProceed) {
      switch (currentStep) {
        case 'contact':
          setCurrentStep('sample');
          break;
        case 'sample':
          setCurrentStep('review');
          break;
        case 'shelflife':
          setCurrentStep('review');
          break;
        default:
          break;
      }
    }
  };

  const handlePreviousStep = () => {
    switch (currentStep) {
      case 'sample':
        setCurrentStep('contact');
        break;
      case 'shelflife':
        setCurrentStep('sample');
        break;
      case 'review':
        const hasShelfLife = appointments.some(appointment => 
          Object.values(appointment.shelfLifeServices).some(value => value));
        setCurrentStep(hasShelfLife ? 'shelflife' : 'sample');
        break;
      default:
        break;
    }
  };

  const handleContinueToShelfLife = () => {
    if (validateSampleDetails()) {
      setCurrentStep('shelflife');
    }
  };

  const isShelfLifeSelected = () => {
    return Object.values(appointments[currentAppointmentIndex].shelfLifeServices).some(value => value);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all appointments as attempted submit
    setAppointments(prev => 
      prev.map(appointment => ({
        ...appointment,
        hasAttemptedSubmit: true
      }))
    );
    
    if (!validateForm()) {
      showAlertMessage('Please fix the errors before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process each appointment
      const results = [];
      
      for (const appointment of appointments) {
        const formData = {
          // Common customer data (from first appointment)
          name: appointments[0].clientName,
          email: appointments[0].emailAddress,
          contactNumber: appointments[0].phoneNumber,
          companyName: appointments[0].organization,
          
          // Common sample data
          nameOfSamples: appointment.sampleName,
          sampleType: appointment.sampleType || 'Not specified',
          sampleQuantity: appointment.quantity,
          sampleDescription: appointment.sampleDescription,
          selectedDate: appointment.preferredDate,
          
          // Terms acceptance (hardcoded for now, should be added to the form)
          terms: true,
          
          // Default values for required fields
          sampleCondition: 'Normal',
          replicates: 1
        };
        
        // Determine endpoint based on service type
        let endpoint = '';
        
        // Add service-specific data
        if (appointment.currentServiceTab === 'chemical') {
          endpoint = '/api/appointments/chemistry';
          // Chemistry-specific fields
          formData.analysisRequested = appointment.selectedServices.join(', ');
          formData.parameters = 'Standard parameters';
          formData.deliveryType = 'Standard';
        } 
        else if (appointment.currentServiceTab === 'microbiological') {
          endpoint = '/api/appointments/microbiology';
          // Microbiology-specific fields
          formData.testType = appointment.selectedServices.join(', ');
          formData.organismTarget = 'Standard targets';
          formData.storageCondition = 'Room temperature';
        } 
        else if (appointment.currentServiceTab === 'shelflife') {
          endpoint = '/api/appointments/shelf-life';
          // Shelf life-specific fields
          formData.productType = appointment.productName || 'Not specified';
          formData.storageConditions = appointment.methodOfPreservation || 'Not specified';
          formData.shelfLifeDuration = appointment.targetShelfLife || 'Not specified';
          formData.packagingType = appointment.packagingMaterial || 'Not specified';
          formData.modesOfDeterioration = appointment.modeOfDeterioration.join(', ');
        }
        
        // Send the request
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to submit appointment');
        }
        
        results.push(result);
      }
      
      // All appointments submitted successfully
      setSubmissionStatus({
        success: true,
        message: `Successfully submitted ${results.length} appointment(s)`,
        appointmentIds: results.map(r => r.appointmentId)
      });
      
      // Reset form after successful submission
      if (results.length > 0) {
        // Keep only contact information in the first appointment
        const contactInfo = {
          clientName: appointments[0].clientName,
          emailAddress: appointments[0].emailAddress,
          phoneNumber: appointments[0].phoneNumber,
          organization: appointments[0].organization,
        };
        
        setAppointments([{
          id: 1,
          // Keep contact information
          ...contactInfo,
          // Reset all other fields
          sampleName: '',
          sampleType: '',
          quantity: '',
          preferredDate: '',
          sampleDescription: '',
          selectedServices: [],
          searchQuery: '',
          currentServiceTab: 'chemical',
          shelfLifeServices: {
            microbiologicalAnalysis: false,
            physiologicalAnalysis: false,
            sensoryAnalysis: false
          },
          objectiveOfStudy: '',
          productName: '',
          netWeight: '',
          brandName: '',
          existingMarket: '',
          productionType: '',
          methodOfPreservation: '',
          productIngredients: '',
          packagingMaterial: '',
          targetShelfLife: '',
          modeOfDeterioration: [''],
          existingPermitsFile: null,
          productImageFile: null,
          hasAttemptedSubmit: false
        }]);
        
        setCurrentAppointmentIndex(0);
        setCurrentStep('contact');
      }
      
    } catch (error) {
      console.error('Error submitting appointments:', error);
      setSubmissionStatus({
        success: false,
        message: error.message || 'Failed to submit appointment. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      {/* Notifications */}
      <AlertMessage 
        show={showAlert} 
        message={alertMessage} 
        onClose={() => setShowAlert(false)} 
      />
      
      <SubmissionStatus 
        status={submissionStatus} 
        onClose={() => setSubmissionStatus(null)} 
      />
      
      <DeleteConfirmModal 
        show={showDeleteModal} 
        onCancel={() => setShowDeleteModal(false)} 
        onConfirm={confirmDeleteAppointment} 
      />
      
      <div className="max-w-[98rem] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Laboratory Testing Appointment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule testing services for your samples across our specialized laboratories
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center items-center gap-6 mb-12">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === 'contact' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className={`ml-3 text-sm font-medium ${
              currentStep === 'contact' ? 'text-blue-600' : 'text-gray-400'
            }`}>Contact Information</span>
          </div>
          <div className="w-24 h-0.5 bg-gray-200"></div>
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === 'sample' || currentStep === 'shelflife' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className={`ml-3 text-sm font-medium ${
              currentStep === 'sample' || currentStep === 'shelflife' ? 'text-blue-600' : 'text-gray-400'
            }`}>Sample Details</span>
          </div>
          <div className="w-24 h-0.5 bg-gray-200"></div>
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === 'review' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className={`ml-3 text-sm font-medium ${
              currentStep === 'review' ? 'text-blue-600' : 'text-gray-400'
            }`}>Review</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information Section */}
          {currentStep === 'contact' && (
            <ContactInformation
              contactInfo={appointments[0]}
              onContactInfoChange={handleContactInfoChange}
              errors={errors}
              hasAttemptedSubmit={appointments[0].hasAttemptedSubmit}
              onNext={handleNextStep}
            />
          )}

          {/* Sample Details and Services Section */}
          {currentStep === 'sample' && (
            <div className="space-y-8">
              {/* Calendar Section */}
              <AppointmentCalendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                bookedDates={bookedDates}
              />

              {/* Laboratory Appointments Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-900">Laboratory Appointments</h2>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={addNewAppointment}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100"
                  >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Another Appointment
                  </button>
                </div>
              </div>

              {/* Sample Details and Services */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                {/* Appointment Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {appointments.map((appointment, index) => (
                    <div key={appointment.id} className="relative group">
                      <button
                        type="button"
                        onClick={() => setCurrentAppointmentIndex(index)}
                        className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          currentAppointmentIndex === index
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {appointment.sampleName || `Appointment ${index + 1}`}
                      </button>
                      {appointments.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteAppointment(index)}
                          className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Sample Details Form */}
                <SampleDetails
                  appointment={appointments[currentAppointmentIndex]}
                  onChange={handleAppointmentChange}
                  errors={errors}
                  hasAttemptedSubmit={appointments[currentAppointmentIndex].hasAttemptedSubmit}
                />

                {/* Testing Services Section */}
                <ServiceSelection
                  appointment={appointments[currentAppointmentIndex]}
                  onServiceTabChange={handleServiceTabChange}
                  onServiceSelection={handleServiceSelection}
                  onShelfLifeServiceChange={handleShelfLifeServiceChange}
                  onSearchChange={handleSearchChange}
                  onContinueToShelfLife={handleContinueToShelfLife}
                  servicesData={servicesData}
                  errors={errors}
                />

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Back to Contact Information
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md"
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Shelf Life Information Section */}
          {currentStep === 'shelflife' && (
            <ShelfLifeDetails
              appointment={appointments[currentAppointmentIndex]}
              onChange={handleAppointmentChange}
              onModeChange={handleModeChange}
              onAddMode={handleAddMode}
              onRemoveMode={handleRemoveMode}
              onFileChange={handleFileChange}
              errors={errors}
              onPrevious={handlePreviousStep}
              onNext={handleNextStep}
            />
          )}

          {/* Review Section */}
          {currentStep === 'review' && (
            <ReviewSection
              appointment={appointments[currentAppointmentIndex]}
              servicesData={servicesData}
              errors={errors}
              onPrevious={handlePreviousStep}
              isSubmitting={isSubmitting}
            />
          )}
        </form>
      </div>
    </div>
  );
} 