'use client';

import { useState, useEffect, useRef } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Import components
import ContactInformation from './ContactInformation';
import AppointmentCalendar from './AppointmentCalendar';
import SampleDetails from './SampleDetails';
import ServiceSelection from './ServiceSelection';
import ShelfLifeDetails from './ShelfLifeDetails';
import ReviewSection from './ReviewSection';
import { SubmissionStatus, DeleteConfirmModal } from './Notifications';

// Import services data
import { servicesData } from './servicesData';

// Add a loading overlay component at the top of the file, before the main component
const LoadingOverlay = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-lg font-semibold text-gray-800">Submitting your appointment...</p>
        <p className="text-sm text-gray-600 mt-2">Please wait, this may take a moment.</p>
      </div>
    </div>
  );
};

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
  const [bookedDates, setBookedDates] = useState([]);
  const [isSelectingService, setIsSelectingService] = useState(false);

  // Add useEffect to log errors state changes
  useEffect(() => {
    console.log("Errors state updated:", errors);
  }, [errors]);

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
    // Set the flag to prevent other effects from triggering during service selection
    setIsSelectingService(true);
    
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
    
    // Remove service-related errors when a service is selected
    if (errors.services || errors.selectedServices) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.services;
        delete newErrors.selectedServices;
        return newErrors;
      });
    }
    
    // Reset the flag after a short delay to allow the state updates to complete
    setTimeout(() => {
      setIsSelectingService(false);
    }, 100);
  };

  // Handle service tab change
  const handleServiceTabChange = (tab) => {
    // Set the flag to prevent validation during tab change
    setIsSelectingService(true);
    
    // Don't perform validation when switching tabs
    setAppointments(prev => {
      const newAppointments = [...prev];
      newAppointments[currentAppointmentIndex] = {
        ...newAppointments[currentAppointmentIndex],
        currentServiceTab: tab
      };
      return newAppointments;
    });
    
    // Remove service-related errors when changing tabs
    if (errors.services || errors.selectedServices) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.services;
        delete newErrors.selectedServices;
        return newErrors;
      });
    }
    
    // Reset the flag after a short delay
    setTimeout(() => {
      setIsSelectingService(false);
    }, 100);
  };

  // Handle shelf life service change
  const handleShelfLifeServiceChange = (serviceName) => {
    // Set the flag to prevent validation during service selection
    setIsSelectingService(true);
    
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
    
    // Reset the flag after a short delay
    setTimeout(() => {
      setIsSelectingService(false);
    }, 100);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    // Set the flag to prevent validation during search
    setIsSelectingService(true);
    
    setAppointments(prev => {
      const newAppointments = [...prev];
      newAppointments[currentAppointmentIndex] = {
        ...newAppointments[currentAppointmentIndex],
        searchQuery: e.target.value
      };
      return newAppointments;
    });
    
    // Reset the flag after a short delay
    setTimeout(() => {
      setIsSelectingService(false);
    }, 100);
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
        modeOfDeterioration: newAppointments[currentAppointmentIndex].modeOfDeterioration.filter((_, index) => index !== indexToRemove)
      };
      return newAppointments;
    });
  };

  // Handle file change
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setAppointments(prev => {
      const newAppointments = [...prev];
      newAppointments[currentAppointmentIndex] = {
        ...newAppointments[currentAppointmentIndex],
        [fieldName]: file
      };
      return newAppointments;
    });
  };

  // Add new appointment tab
  const addNewAppointment = () => {
    if (!selectedDate) {
      // console.warn('Please select a date before adding another appointment'); // Removed log
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
    // console.log("confirmDeleteAppointment called for index:", appointmentToDelete); // Remove log
    if (appointments.length <= 1) {
      // console.warn('Cannot delete the only appointment'); // Removed log
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
    
    // DON'T setErrors here
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors }; // Return error object
  };

  const validateSampleDetails = () => {
    const newErrors = {};
    const currentAppointment = appointments[currentAppointmentIndex];

    if (!currentAppointment.sampleName) newErrors.sampleName = 'Please enter sample name';
    if (!currentAppointment.quantity) newErrors.quantity = 'Please enter quantity';
    if (!currentAppointment.preferredDate) newErrors.preferredDate = 'Please select a preferred date';
    if (!currentAppointment.sampleDescription) newErrors.sampleDescription = 'Please enter sample description';

    // Check if services are selected based on the tab
    if (currentAppointment.currentServiceTab === 'chemical' || currentAppointment.currentServiceTab === 'microbiological') {
      if (currentAppointment.selectedServices.length === 0) {
        newErrors.services = `Please select at least one ${currentAppointment.currentServiceTab} service`;
      }
    } else if (currentAppointment.currentServiceTab === 'shelflife') {
      // For shelf life, check if any checkbox is selected
      if (!Object.values(currentAppointment.shelfLifeServices).some(val => val === true)) {
        newErrors.shelfLifeServices = 'Please select at least one shelf life testing service';
      }
    }

    // DON'T setErrors here
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors }; // Return error object
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
    
    // DON'T setErrors here
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors }; // Return error object
  };

  const validateForm = () => {
    const contactValidation = validateContactInfo();
    if (!contactValidation.isValid) {
        setErrors(prev => ({ ...prev, ...contactValidation.errors })); // Ensure errors are set
        return false;
    }

    let allAppointmentsValid = true;
    let combinedErrors = {}; // Keep combined errors locally for this validation pass

    for (let i = 0; i < appointments.length; i++) {
        const currentIndex = currentAppointmentIndex; 
        setCurrentAppointmentIndex(i); 

        const sampleValidation = validateSampleDetails();
        combinedErrors = { ...combinedErrors, ...sampleValidation.errors }; 
        if (!sampleValidation.isValid) {
            allAppointmentsValid = false;
        }

        const currentApp = appointments[i]; 
        const hasShelfLife = Object.values(currentApp.shelfLifeServices).some(value => value);
        if (hasShelfLife) {
            const shelfLifeValidation = validateShelfLifeDetails();
            combinedErrors = { ...combinedErrors, ...shelfLifeValidation.errors }; 
            if (!shelfLifeValidation.isValid) {
                allAppointmentsValid = false;
            }
        }
        
        setCurrentAppointmentIndex(currentIndex); 
    }
    
    setErrors(combinedErrors); // Set all collected errors at the end

    return allAppointmentsValid;
  };

  // Navigation functions
  const handleNextStep = () => {
    let validationResult = { isValid: false, errors: {} };
    
    switch (currentStep) {
      case 'contact':
        validationResult = validateContactInfo();
        setErrors(validationResult.errors);
        if (validationResult.isValid) {
          // Log state right before changing step
          // console.log("Appointments state before setting step to sample:", appointments); // Remove log
          setCurrentStep('sample');
        }
        break;
      case 'sample':
        const emptyTabIndex = appointments.findIndex(
          (appointment) => !appointment.sampleName && !appointment.quantity && !appointment.sampleDescription
        );

        if (emptyTabIndex !== -1 && appointments.length > 1) {
          // console.warn(`Attempted to proceed with empty Appointment ${emptyTabIndex + 1}`); // Removed log
          setErrors(prev => ({ ...prev, global: `Please fill out Appointment ${emptyTabIndex + 1} or remove it.` })); // Example global error
          return;
        }

        validationResult = validateSampleDetails();
        setErrors(validationResult.errors);
        if (validationResult.isValid) {
           const hasShelfLife = appointments.some(appointment => 
             Object.values(appointment.shelfLifeServices).some(value => value));
           setCurrentStep(hasShelfLife ? 'shelflife' : 'review');
        }
        break;
      case 'shelflife':
        validationResult = validateShelfLifeDetails();
        setErrors(validationResult.errors);
        if (validationResult.isValid) {
          setCurrentStep('review');
        }
        break;
      default:
        break;
    }
  };

  const handlePreviousStep = () => {
    // Clear errors when going back
    setErrors({}); 
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
    const validationResult = validateSampleDetails();
    setErrors(validationResult.errors);
    if (validationResult.isValid) {
      setCurrentStep('shelflife');
    }
  };

  const isShelfLifeSelected = () => {
    return Object.values(appointments[currentAppointmentIndex].shelfLifeServices).some(value => value);
  };

  // Form submission
  const checkIfSubmissionAllowed = () => {
    return currentStep === 'review' && !isSubmitting;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if submission is allowed from this step
    if (!checkIfSubmissionAllowed()) {
      return;
    }
    
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }
    
    // Mark all appointments as attempted submit
    setAppointments(prev => 
      prev.map(appointment => ({
        ...appointment,
        hasAttemptedSubmit: true
      }))
    );
    
    // Call validateForm which now handles setting errors state ONLY on final submit validation
    if (!validateForm()) {
      // showAlertMessage is already called inside validateForm if invalid
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
      // console.error('Submission error:', error); // Keep error logging for now
      setSubmissionStatus({
        success: false,
        message: error.message || 'An error occurred during submission. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this useEffect to handle the beforeunload event
  useEffect(() => {
    if (isSubmitting) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isSubmitting]);

  // console.log("Rendering LaboratoryAppointmentForm"); // Removed log

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDeleteAppointment}
        />
      )}
      {isSubmitting && <LoadingOverlay isVisible={isSubmitting} />}

      {/* Navigation / Stepper */}
      <div className="mb-10 px-16 hidden md:block">
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
            }`}>Review & Submit</span>
          </div>
        </div>
      </div>

      {/* Submission Status Message */}
      {submissionStatus && (
        <SubmissionStatus status={submissionStatus} onClose={() => setSubmissionStatus(null)} />
      )}
      
      {/* Form Container */}
      <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
        {/* Contact Information Section */}
        {currentStep === 'contact' && (
          <>
            <ContactInformation
              contactInfo={appointments[0]} // Always use the first appointment for contact info
              onContactInfoChange={handleContactInfoChange}
              errors={errors}
              onNext={handleNextStep}
              disabled={isSubmitting}
            />
          </>
        )}

        {/* Sample Details and Service Selection Section */}
        {(currentStep === 'sample' || currentStep === 'shelflife') && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {/* Appointment Tabs */}
            <div className="flex flex-wrap items-center border-b border-gray-200 pb-4 mb-6">
              {appointments.map((appointment, index) => {
                // Determine the label: use sampleName if available, otherwise default
                const tabLabel = (appointment.sampleName && appointment.sampleName.trim())
                                 ? appointment.sampleName.trim()
                                 : `Appointment ${index + 1}`;
                
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentAppointmentIndex(index)}
                    className={`px-4 py-2 mr-2 mb-2 rounded-lg text-sm font-medium border transition-colors max-w-[150px] sm:max-w-[200px] ${
                      index === currentAppointmentIndex
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={isSubmitting}
                    title={tabLabel}
                  >
                    {/* Use flexbox to align label and delete icon */}
                    <div className="flex items-center justify-between w-full">
                      {/* Display the dynamic label, truncated */} 
                      <span className="truncate block mr-2"> {/* Added right margin */}
                        {tabLabel}
                      </span>
                      {appointments.length > 1 && (
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            console.log(`Delete clicked for index: ${index}, label: ${tabLabel}`); // Add log
                            e.stopPropagation(); // Prevent tab selection
                            handleDeleteAppointment(index);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              console.log(`Delete keydown for index: ${index}, label: ${tabLabel}`); // Add log
                              e.stopPropagation(); // Prevent tab selection
                              handleDeleteAppointment(index);
                            }
                          }}
                          className="text-gray-400 hover:text-red-500 inline-block flex-shrink-0 cursor-pointer"
                          aria-label={`Delete ${tabLabel}`} // Use dynamic label in aria-label
                        >
                          <XMarkIcon className="h-4 w-4 inline-block" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={addNewAppointment}
                className="px-4 py-2 mr-2 mb-2 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <PlusIcon className="h-4 w-4 inline-block mr-1" /> Add Appointment
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left side: Calendar */}
              <div className="lg:col-span-1">
                <AppointmentCalendar 
                  selectedDate={selectedDate} 
                  onDateSelect={handleDateSelect}
                  bookedDates={bookedDates}
                  disabled={isSubmitting}
                />
              </div>

              {/* Right side: Sample details and services */}
              <div className="lg:col-span-2">
                <SampleDetails
                  appointment={appointments[currentAppointmentIndex]}
                  onChange={handleAppointmentChange}
                  errors={errors}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    Back to Contact Information
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        
        {currentStep === 'shelflife' && (
          <ShelfLifeDetails
            appointment={appointments[currentAppointmentIndex]}
            onChange={handleAppointmentChange}
            onModeChange={handleModeChange}
            onAddMode={handleAddMode}
            onRemoveMode={handleRemoveMode}
            onFileChange={handleFileChange}
            errors={errors}
            disabled={isSubmitting}
          />
        )}

        {/* Review Section */}
        {currentStep === 'review' && (
          <>
            {/* Removed logs for review section props */}
            {/* {console.log("Current appointment in review:", appointments[currentAppointmentIndex])} */}
            {/* {console.log("All appointments:", appointments)} */}
            {/* {console.log("Service data:", servicesData)} */}
            <ReviewSection
              servicesData={servicesData}
              errors={errors}
              onPrevious={handlePreviousStep}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              allAppointments={appointments}
            />
          </>
        )}
      </div>
    </div>
  );
} 