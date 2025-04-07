'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function LaboratoryAppointment() {
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
    const [currentTab, setCurrentTab] = useState('general');
    const [errors, setErrors] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentStep, setCurrentStep] = useState('contact');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [bookedDates, setBookedDates] = useState([]); // Add this line to track booked dates

    const showAlertMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000); // Hide alert after 5 seconds
    };

    // Add progress calculation function
    const calculateContactProgress = () => {
        const requiredFields = ['clientName', 'emailAddress', 'phoneNumber', 'organization'];
        const filledFields = requiredFields.filter(field => appointments[0][field].trim() !== '');
        return (filledFields.length / requiredFields.length) * 100;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointments(prev => {
            const newAppointments = [...prev];
            newAppointments[currentAppointmentIndex] = {
                ...newAppointments[currentAppointmentIndex],
                [name]: value
            };
            return newAppointments;
        });

        // Remove error for the field being edited
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });

        // If all errors are resolved, hide the alert
        if (Object.keys(errors).length === 1 && errors[name]) {
            setShowAlert(false);
        }
    };

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

    const isShelfLifeSelected = () => {
        return Object.values(appointments[currentAppointmentIndex].shelfLifeServices).some(value => value);
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Mark all appointments as attempted submit
        setAppointments(prev => {
            return prev.map(appointment => ({
                ...appointment,
                hasAttemptedSubmit: true
            }));
        });
        
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

    const validateForm = () => {
        const newErrors = {};
        const currentAppointment = appointments[currentAppointmentIndex];
        
        if (currentAppointment.hasAttemptedSubmit) {
            if (!currentAppointment.clientName) newErrors.clientName = 'Please enter client name';
            if (!currentAppointment.emailAddress) newErrors.emailAddress = 'Please enter your email address';
            if (!currentAppointment.phoneNumber) newErrors.phoneNumber = 'Please enter your phone number';
            if (!currentAppointment.organization) newErrors.organization = 'Please enter your organization name';
            if (!currentAppointment.sampleName) newErrors.sampleName = 'Please enter sample name';
            if (!currentAppointment.quantity) newErrors.quantity = 'Please enter quantity';
            if (!currentAppointment.preferredDate) newErrors.preferredDate = 'Please select preferred date';
            if (!currentAppointment.sampleDescription) newErrors.sampleDescription = 'Please enter sample description';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
        setCurrentTab('general');
        setErrors({});
    };

    const handleDeleteAppointment = (index) => {
        setAppointmentToDelete(index);
        setShowDeleteModal(true);
    };

    const confirmDeleteAppointment = () => {
        setAppointments(prev => prev.filter((_, i) => i !== appointmentToDelete));
        if (currentAppointmentIndex >= appointments.length - 1) {
            setCurrentAppointmentIndex(Math.max(0, appointments.length - 2));
        }
        setShowDeleteModal(false);
        setAppointmentToDelete(null);
    };

    // Calendar functions
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    // Add this function to check if a date is available
    const isDateAvailable = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const twoDaysFromNow = new Date(today);
        twoDaysFromNow.setDate(today.getDate() + 2);
        
        // Check if date is at least 2 days ahead
        if (date < twoDaysFromNow) {
            return false;
        }
        
        // Check if date is already booked
        return !bookedDates.some(bookedDate => 
            new Date(bookedDate).toDateString() === date.toDateString()
        );
    };

    // Update the renderCalendar function
    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8" />);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isAvailable = isDateAvailable(date);

            days.push(
                <button
                    key={day}
                    onClick={() => {
                        if (isAvailable) {
                            setSelectedDate(date);
                            // Update preferred date for all appointments
                            setAppointments(prev => {
                                return prev.map(appointment => ({
                                    ...appointment,
                                    preferredDate: date.toISOString().split('T')[0]
                                }));
                            });
                        }
                    }}
                    disabled={!isAvailable || isWeekend}
                    className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full transition-colors
                        ${isSelected ? 'bg-blue-600 text-white' : ''}
                        ${isToday && !isSelected ? 'bg-blue-50 text-blue-600' : ''}
                        ${isWeekend ? 'text-gray-300' : ''}
                        ${!isAvailable ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900'}
                        ${!isSelected && !isToday && !isWeekend && isAvailable ? 'hover:bg-gray-100' : ''}
                    `}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    const addModeOfDeterioration = () => {
        setAppointments(prev => {
            const newAppointments = [...prev];
            newAppointments[currentAppointmentIndex] = {
                ...newAppointments[currentAppointmentIndex],
                modeOfDeterioration: [...newAppointments[currentAppointmentIndex].modeOfDeterioration, '']
            };
            return newAppointments;
        });
    };

    const removeModeOfDeterioration = (indexToRemove) => {
        setAppointments(prev => {
            const newAppointments = [...prev];
            newAppointments[currentAppointmentIndex] = {
                ...newAppointments[currentAppointmentIndex],
                modeOfDeterioration: prev[currentAppointmentIndex].modeOfDeterioration.filter((_, index) => index !== indexToRemove)
            };
            return newAppointments;
        });
    };

    const handleServiceSearch = (e) => {
        setAppointments(prev => {
            const newAppointments = [...prev];
            newAppointments[currentAppointmentIndex] = {
                ...newAppointments[currentAppointmentIndex],
                searchQuery: e.target.value
            };
            return newAppointments;
        });
    };

    const handleServiceSelection = (serviceId) => {
        setAppointments(prev => {
            const newAppointments = [...prev];
            newAppointments[currentAppointmentIndex] = {
                ...newAppointments[currentAppointmentIndex],
                selectedServices: prev[currentAppointmentIndex].selectedServices.includes(serviceId)
                    ? prev[currentAppointmentIndex].selectedServices.filter(id => id !== serviceId)
                    : [...prev[currentAppointmentIndex].selectedServices, serviceId]
            };
            return newAppointments;
        });
    };

    const filterServices = (services) => {
        return services.filter(service =>
            service.name.toLowerCase().includes(appointments[currentAppointmentIndex].searchQuery.toLowerCase())
        );
    };

    const servicesData = {
        chemical: {
            title: 'Chemical Testing Services',
            description: 'Our chemical laboratory offers comprehensive analytical services for food, water, and environmental samples, providing accurate and reliable results for research and regulatory compliance.',
            categories: [
                {
                    name: 'Food Analysis',
                    description: 'Comprehensive testing of food samples for various parameters',
                    services: [
                        { id: 'alcohol', name: 'Alcohol (by volume or ethanol liquor)', price: '₱900.00' },
                        { id: 'ash', name: 'Ash', price: '₱500.00' },
                        { id: 'brix', name: 'Brix Reading', price: '₱300.00' },
                        { id: 'crude-fiber', name: 'Crude Fiber', price: '₱1,380.00' },
                        { id: 'dietary-fiber', name: 'Dietary Fiber', price: '₱5,000.00' }
                    ]
                },
                {
                    name: 'Water and Wastewater',
                    description: 'Analysis of water quality and wastewater treatment parameters',
                    services: [
                        { id: 'water-ph', name: 'pH', price: '₱300.00' },
                        { id: 'water-tds', name: 'Total Dissolved Solids', price: '₱500.00' },
                        { id: 'water-hardness', name: 'Hardness', price: '₱500.00' },
                        { id: 'water-chloride', name: 'Chloride', price: '₱500.00' },
                        { id: 'water-sulfate', name: 'Sulfate', price: '₱500.00' }
                    ]
                },
                {
                    name: 'Plant and Plant Extract',
                    description: 'Analysis of plant materials and their extracts',
                    services: [
                        { id: 'plant-moisture', name: 'Moisture Content', price: '₱500.00' },
                        { id: 'plant-ash', name: 'Ash Content', price: '₱500.00' },
                        { id: 'plant-fiber', name: 'Fiber Content', price: '₱1,380.00' },
                        { id: 'plant-protein', name: 'Protein Content', price: '₱1,500.00' },
                        { id: 'plant-fat', name: 'Fat Content', price: '₱1,500.00' }
                    ]
                },
                {
                    name: 'Packages',
                    description: 'Testing services for packaging materials',
                    services: [
                        { id: 'package-thickness', name: 'Thickness Measurement', price: '₱500.00' },
                        { id: 'package-tensile', name: 'Tensile Strength', price: '₱1,500.00' },
                        { id: 'package-burst', name: 'Burst Strength', price: '₱1,500.00' },
                        { id: 'package-seal', name: 'Seal Strength', price: '₱1,500.00' },
                        { id: 'package-migration', name: 'Migration Test', price: '₱2,500.00' }
                    ]
                }
            ]
        },
        microbiological: {
            title: 'Food Microbiological Tests',
            description: 'Comprehensive microbiological testing services for food safety and quality assurance.',
            categories: [
                {
                    name: 'Food Analysis',
                    description: 'Microbiological analysis of food products',
                    services: [
                        { id: 'food-aerobic', name: 'Aerobic Plate Count', price: '₱550.00' },
                        { id: 'food-yeast', name: 'Yeast and Mold Count', price: '₱550.00' },
                        { id: 'food-coliform', name: 'Coliform Count', price: '₱550.00' },
                        { id: 'food-ecoli', name: 'E. coli Count', price: '₱550.00' },
                        { id: 'food-staph', name: 'Staphylococcus aureus Count', price: '₱550.00' }
                    ]
                },
                {
                    name: 'Water and Wastewater',
                    description: 'Microbiological analysis of water samples',
                    services: [
                        { id: 'water-tc', name: 'Total Coliform', price: '₱550.00' },
                        { id: 'water-fc', name: 'Fecal Coliform', price: '₱550.00' },
                        { id: 'water-ecoli', name: 'E. coli', price: '₱550.00' },
                        { id: 'water-hpc', name: 'Heterotrophic Plate Count', price: '₱550.00' }
                    ]
                },
                {
                    name: 'Plant and Plant Extract',
                    description: 'Microbiological analysis of plant materials',
                    services: [
                        { id: 'plant-tc', name: 'Total Count', price: '₱550.00' },
                        { id: 'plant-yeast', name: 'Yeast and Mold Count', price: '₱550.00' },
                        { id: 'plant-coliform', name: 'Coliform Count', price: '₱550.00' }
                    ]
                },
                {
                    name: 'Packages',
                    description: 'Microbiological testing of packaging materials',
                    services: [
                        { id: 'package-tc', name: 'Total Count', price: '₱550.00' },
                        { id: 'package-yeast', name: 'Yeast and Mold Count', price: '₱550.00' },
                        { id: 'package-coliform', name: 'Coliform Count', price: '₱550.00' }
                    ]
                },
                {
                    name: 'Others',
                    description: 'Additional microbiological testing services',
                    services: [
                        { id: 'other-salmonella', name: 'Salmonella Detection', price: '₱550.00' },
                        { id: 'other-listeria', name: 'Listeria Detection', price: '₱550.00' },
                        { id: 'other-campylobacter', name: 'Campylobacter Detection', price: '₱550.00' }
                    ]
                }
            ]
        },
        shelflife: {
            title: 'Shelf Life Testing',
            description: 'Additional information required',
            categories: [
                {
                    name: 'Shelf Life Analysis',
                    description: 'Testing services to determine product stability and shelf life',
                    services: [
                        { 
                            id: 'microbiological-analysis', 
                            name: 'Microbiological Analysis',
                            description: 'Microbial growth during storage period',
                            price: '₱2,500.00' 
                        },
                        { 
                            id: 'physiological-analysis', 
                            name: 'Physiological Analysis',
                            description: 'Physical changes during storage',
                            price: '₱2,500.00' 
                        },
                        { 
                            id: 'sensory-analysis', 
                            name: 'Sensory Analysis',
                            description: 'Taste, texture, appearance changes',
                            price: '₱2,500.00' 
                        }
                    ]
                }
            ]
        }
    };

    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

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

    // Update handleNextStep function
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
                appointments.forEach((appointment, index) => {
                    setCurrentAppointmentIndex(index);
                    if (!validateSampleDetails()) {
                        hasErrors = true;
                    }
                });
                
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
                setCurrentStep('sample');
                break;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            {/* Alert Component */}
            {showAlert && (
                <div className="fixed top-4 right-4 z-50 animate-fade-in">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{alertMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Submission Status Message */}
            {submissionStatus && (
                <div className="fixed top-4 right-4 z-50 animate-fade-in">
                    <div className={`${
                        submissionStatus.success ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
                    } border-l-4 p-4 rounded-lg shadow-lg max-w-md`}>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {submissionStatus.success ? (
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className={`text-sm ${submissionStatus.success ? 'text-green-700' : 'text-red-700'}`}>
                                    {submissionStatus.message}
                                </p>
                                {submissionStatus.success && submissionStatus.appointmentIds && (
                                    <p className="text-sm text-green-600 mt-1">
                                        Appointment ID{submissionStatus.appointmentIds.length > 1 ? 's' : ''}: {submissionStatus.appointmentIds.join(', ')}
                                    </p>
                                )}
                            </div>
                            <div className="ml-auto pl-3">
                                <button
                                    onClick={() => setSubmissionStatus(null)}
                                    className={`inline-flex text-gray-400 focus:outline-none focus:text-gray-500`}
                                >
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
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
                            currentStep === 'sample' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                        }`}>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <span className={`ml-3 text-sm font-medium ${
                            currentStep === 'sample' ? 'text-blue-600' : 'text-gray-400'
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
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
                            <div className="max-w-3xl mx-auto">
                                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                                            <input
                                                type="text"
                                                name="clientName"
                                                value={appointments[0].clientName}
                                                onChange={handleChange}
                                                placeholder="Enter your client name"
                                                className={`w-full px-4 py-3 rounded-lg border ${
                                                    appointments[0].hasAttemptedSubmit && errors.clientName ? 'border-red-500' : 'border-gray-300'
                                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                            />
                                            {appointments[0].hasAttemptedSubmit && errors.clientName && (
                                                <p className="mt-2 text-sm text-red-600">{errors.clientName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="emailAddress"
                                                value={appointments[0].emailAddress}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                className={`w-full px-4 py-3 rounded-lg border ${
                                                    appointments[0].hasAttemptedSubmit && errors.emailAddress ? 'border-red-500' : 'border-gray-300'
                                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                            />
                                            {appointments[0].hasAttemptedSubmit && errors.emailAddress && (
                                                <p className="mt-2 text-sm text-red-600">{errors.emailAddress}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={appointments[0].phoneNumber}
                                                onChange={handleChange}
                                                placeholder="Enter your phone number"
                                                className={`w-full px-4 py-3 rounded-lg border ${
                                                    appointments[0].hasAttemptedSubmit && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                            />
                                            {appointments[0].hasAttemptedSubmit && errors.phoneNumber && (
                                                <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Organization/Company</label>
                                            <input
                                                type="text"
                                                name="organization"
                                                value={appointments[0].organization}
                                                onChange={handleChange}
                                                placeholder="Enter your organization name"
                                                className={`w-full px-4 py-3 rounded-lg border ${
                                                    appointments[0].hasAttemptedSubmit && errors.organization ? 'border-red-500' : 'border-gray-300'
                                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                            />
                                            {appointments[0].hasAttemptedSubmit && errors.organization && (
                                                <p className="mt-2 text-sm text-red-600">{errors.organization}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-8">
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                                    >
                                        Continue to Sample Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sample Details and Services Section */}
                    {currentStep === 'sample' && (
                        <div className="space-y-8">
                            {/* Calendar Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Select Preferred Testing Date for All Samples</h3>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <button 
                                            type="button" 
                                            onClick={handlePrevMonth}
                                            disabled={selectedDate}
                                            className={`${selectedDate ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900'}`}
                                        >
                                            <ChevronLeftIcon className="w-6 h-6" />
                                        </button>
                                        <span className="text-lg font-medium">
                                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                        </span>
                                        <button 
                                            type="button" 
                                            onClick={handleNextMonth}
                                            disabled={selectedDate}
                                            className={`${selectedDate ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900'}`}
                                        >
                                            <ChevronRightIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                    {selectedDate && (
                                        <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                                            <span className="text-sm font-medium text-blue-900">Selected Date:</span>
                                            <span className="text-sm font-medium text-blue-700">{selectedDate.toLocaleDateString()}</span>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-7 gap-2 mb-3">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                            <div key={day} className="text-center text-sm font-medium text-gray-500">{day}</div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {renderCalendar()}
                                    </div>
                                </div>
                            </div>

                            {/* Laboratory Appointments Header */}
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold text-gray-900">Laboratory Appointments</h2>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAppointments(prev => {
                                                const newAppointments = [...prev];
                                                newAppointments[currentAppointmentIndex] = {
                                                    ...newAppointments[currentAppointmentIndex],
                                                    // Keep contact information and preferred date
                                                    clientName: appointments[0].clientName,
                                                    emailAddress: appointments[0].emailAddress,
                                                    phoneNumber: appointments[0].phoneNumber,
                                                    organization: appointments[0].organization,
                                                    preferredDate: appointments[currentAppointmentIndex].preferredDate,
                                                    // Reset sample details
                                                    sampleName: '',
                                                    sampleType: '',
                                                    quantity: '',
                                                    sampleDescription: '',
                                                    // Reset services
                                                    selectedServices: [],
                                                    searchQuery: '',
                                                    currentServiceTab: 'chemical',
                                                    shelfLifeServices: {
                                                        microbiologicalAnalysis: false,
                                                        physiologicalAnalysis: false,
                                                        sensoryAnalysis: false
                                                    },
                                                    // Reset shelf life details
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
                                                return newAppointments;
                                            });
                                            showAlertMessage(`Sample details for Appointment ${currentAppointmentIndex + 1} have been reset`);
                                        }}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Reset Sample
                                    </button>
                                    <button type="button" onClick={addNewAppointment} className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100">
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
                                                onClick={() => setCurrentAppointmentIndex(index)}
                                                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                                    currentAppointmentIndex === index
                                                        ? 'bg-blue-600 text-white shadow-md'
                                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                {appointment.sampleName || `Appointment ${index + 1}`}
                                            </button>
                                            {index > 0 && (
                                                <button
                                                    onClick={() => handleDeleteAppointment(index)}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                            )}
                                            {index === 0 && appointments.length > 1 && (
                                                <button
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
                                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">Sample Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-700">Sample Name</label>
                                            <input
                                                type="text"
                                                name="sampleName"
                                                value={appointments[currentAppointmentIndex].sampleName}
                                                onChange={handleChange}
                                                className={`mt-1 block w-full px-3 py-2 border ${
                                                    errors.sampleName ? 'border-red-500' : 'border-gray-300'
                                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                            />
                                            {errors.sampleName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.sampleName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-700">Quantity</label>
                                            <input
                                                type="text"
                                                name="quantity"
                                                value={appointments[currentAppointmentIndex].quantity}
                                                onChange={handleChange}
                                                className={`mt-1 block w-full px-3 py-2 border ${
                                                    errors.quantity ? 'border-red-500' : 'border-gray-300'
                                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                            />
                                            {errors.quantity && (
                                                <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <label className="block text-sm text-gray-700">Sample Description</label>
                                        <textarea
                                            name="sampleDescription"
                                            value={appointments[currentAppointmentIndex].sampleDescription}
                                            onChange={handleChange}
                                            rows={4}
                                            className={`mt-1 block w-full px-3 py-2 border ${
                                                errors.sampleDescription ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                        />
                                        {errors.sampleDescription && (
                                            <p className="mt-1 text-sm text-red-600">{errors.sampleDescription}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Testing Services Section */}
                                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                                    {/* Service Header */}
                                    <div className="bg-blue-600 p-8">
                                        <h3 className="text-2xl font-semibold text-white mb-2">
                                            {servicesData[appointments[currentAppointmentIndex].currentServiceTab].title}
                                        </h3>
                                        <p className="text-blue-100">
                                            {servicesData[appointments[currentAppointmentIndex].currentServiceTab].description}
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
                                                        onClick={() => setAppointments(prev => {
                                                            const newAppointments = [...prev];
                                                            newAppointments[currentAppointmentIndex] = {
                                                                ...newAppointments[currentAppointmentIndex],
                                                                currentServiceTab: tab
                                                            };
                                                            return newAppointments;
                                                        })}
                                                        className={`px-4 py-2 text-sm font-medium border-b-2 ${
                                                            appointments[currentAppointmentIndex].currentServiceTab === tab
                                                                ? 'border-blue-600 text-blue-600'
                                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        {tab === 'chemical' ? 'Chemical Analysis' :
                                                         tab === 'microbiological' ? 'Microbiological Tests' :
                                                         'Shelf Life Testing'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Rest of the services section */}
                                        {appointments[currentAppointmentIndex].currentServiceTab === 'shelflife' ? (
                                            <div className="bg-blue-50 p-6 rounded-lg">
                                                <h3 className="text-lg font-medium text-blue-900 mb-2">Shelf Life Testing</h3>
                                                <p className="text-sm text-blue-700 mb-6">Select the required testing services for shelf life analysis</p>
                                                <div className="space-y-4">
                                                    {servicesData.shelflife.categories[0].services.map((service) => (
                                                        <label key={service.id} className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                                                            <div className="flex items-center h-5">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={appointments[currentAppointmentIndex].shelfLifeServices[service.id.replace('-analysis', 'Analysis')]}
                                                                    onChange={() => handleShelfLifeServiceChange(service.id.replace('-analysis', 'Analysis'))}
                                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                                    required={service.id === 'microbiological-analysis'}
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
                                                            onClick={() => setCurrentStep('shelflife')}
                                                            className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md"
                                                        >
                                                            Continue to Shelf Life Details
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {servicesData[appointments[currentAppointmentIndex].currentServiceTab].categories.map((category, index) => (
                                                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                                        <button
                                                            onClick={() => toggleCategory(`${appointments[currentAppointmentIndex].currentServiceTab}-${index}`)}
                                                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
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
                                                                    expandedCategories[`${appointments[currentAppointmentIndex].currentServiceTab}-${index}`] ? 'rotate-180' : ''
                                                                }`}
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </button>
                                                        
                                                        {expandedCategories[`${appointments[currentAppointmentIndex].currentServiceTab}-${index}`] && (
                                                            <div className="border-t border-gray-200">
                                                                <div className="divide-y divide-gray-200">
                                                                    {filterServices(category.services).map((service) => (
                                                                        <label key={service.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                                                            <div className="flex items-start">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={appointments[currentAppointmentIndex].selectedServices.includes(service.id)}
                                                                                    onChange={() => handleServiceSelection(service.id)}
                                                                                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                                            </div>
                                        )}
                                    </div>
                                </div>

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
                                        onClick={() => {
                                            if (isShelfLifeSelected() && !appointments[currentAppointmentIndex].objectiveOfStudy) {
                                                setCurrentStep('shelflife');
                                            } else {
                                                handleNextStep();
                                            }
                                        }}
                                        className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Shelf Life Information Section */}
                    {currentStep === 'shelflife' && (
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                            <div className="flex items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-3">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Shelf Life Information
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Objective of Study *</label>
                                    <input
                                        type="text"
                                        name="objectiveOfStudy"
                                        value={appointments[currentAppointmentIndex].objectiveOfStudy}
                                        onChange={handleChange}
                                        placeholder="Enter the objective of your study"
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.objectiveOfStudy ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        required
                                    />
                                    {errors.objectiveOfStudy && (
                                        <p className="mt-2 text-sm text-red-600">{errors.objectiveOfStudy}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={appointments[currentAppointmentIndex].productName}
                                        onChange={handleChange}
                                        placeholder="Enter the product name"
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.productName ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        required
                                    />
                                    {errors.productName && (
                                        <p className="mt-2 text-sm text-red-600">{errors.productName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Net Weight *</label>
                                    <input
                                        type="text"
                                        name="netWeight"
                                        value={appointments[currentAppointmentIndex].netWeight}
                                        onChange={handleChange}
                                        placeholder="Enter the net weight"
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.netWeight ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        required
                                    />
                                    {errors.netWeight && (
                                        <p className="mt-2 text-sm text-red-600">{errors.netWeight}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name *</label>
                                    <input
                                        type="text"
                                        name="brandName"
                                        value={appointments[currentAppointmentIndex].brandName}
                                        onChange={handleChange}
                                        placeholder="Enter the brand name"
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.brandName ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        required
                                    />
                                    {errors.brandName && (
                                        <p className="mt-2 text-sm text-red-600">{errors.brandName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Existing Market *</label>
                                    <input
                                        type="text"
                                        name="existingMarket"
                                        value={appointments[currentAppointmentIndex].existingMarket}
                                        onChange={handleChange}
                                        placeholder="Enter the existing market"
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.existingMarket ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        required
                                    />
                                    {errors.existingMarket && (
                                        <p className="mt-2 text-sm text-red-600">{errors.existingMarket}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Production Type *</label>
                                    <input
                                        type="text"
                                        name="productionType"
                                        value={appointments[currentAppointmentIndex].productionType}
                                        onChange={handleChange}
                                        placeholder="Enter the production type"
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.productionType ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        required
                                    />
                                    {errors.productionType && (
                                        <p className="mt-2 text-sm text-red-600">{errors.productionType}</p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Method of Preservation *</label>
                                    <input
                                        type="text"
                                        name="methodOfPreservation"
                                        value={appointments[currentAppointmentIndex].methodOfPreservation}
                                        onChange={handleChange}
                                        placeholder="Enter the method of preservation"
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.methodOfPreservation ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        required
                                    />
                                    {errors.methodOfPreservation && (
                                        <p className="mt-2 text-sm text-red-600">{errors.methodOfPreservation}</p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Ingredients *</label>
                                    <textarea
                                        name="productIngredients"
                                        value={appointments[currentAppointmentIndex].productIngredients}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Enter the product ingredients"
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.productIngredients ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        required
                                    />
                                    {errors.productIngredients && (
                                        <p className="mt-2 text-sm text-red-600">{errors.productIngredients}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Packaging Material *</label>
                                    <input
                                        type="text"
                                        name="packagingMaterial"
                                        value={appointments[currentAppointmentIndex].packagingMaterial}
                                        onChange={handleChange}
                                        placeholder="Enter the packaging material"
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.packagingMaterial ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        required
                                    />
                                    {errors.packagingMaterial && (
                                        <p className="mt-2 text-sm text-red-600">{errors.packagingMaterial}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Shelf Life *</label>
                                    <input
                                        type="text"
                                        name="targetShelfLife"
                                        value={appointments[currentAppointmentIndex].targetShelfLife}
                                        onChange={handleChange}
                                        placeholder="Enter the target shelf life"
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.targetShelfLife ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        required
                                    />
                                    {errors.targetShelfLife && (
                                        <p className="mt-2 text-sm text-red-600">{errors.targetShelfLife}</p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Deterioration *</label>
                                    <div className="space-y-2">
                                        {appointments[currentAppointmentIndex].modeOfDeterioration.map((mode, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={mode}
                                                    onChange={(e) => {
                                                        const newModes = [...appointments[currentAppointmentIndex].modeOfDeterioration];
                                                        newModes[index] = e.target.value;
                                                        setAppointments(prev => {
                                                            const newAppointments = [...prev];
                                                            newAppointments[currentAppointmentIndex] = {
                                                                ...newAppointments[currentAppointmentIndex],
                                                                modeOfDeterioration: newModes
                                                            };
                                                            return newAppointments;
                                                        });
                                                    }}
                                                    placeholder="Enter mode of deterioration"
                                                    className={`flex-1 px-4 py-3 rounded-lg border ${
                                                        errors.modeOfDeterioration ? 'border-red-500' : 'border-gray-300'
                                                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                                    required
                                                />
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeModeOfDeterioration(index)}
                                                        className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <XMarkIcon className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {errors.modeOfDeterioration && (
                                            <p className="mt-2 text-sm text-red-600">{errors.modeOfDeterioration}</p>
                                        )}
                                        <button
                                            type="button"
                                            onClick={addModeOfDeterioration}
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                        >
                                            <PlusIcon className="w-5 h-5 mr-2" />
                                            Add Another Mode
                                        </button>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Existing Permits</label>
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'existingPermitsFile')}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                    {appointments[currentAppointmentIndex].existingPermitsFile && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Selected file: {appointments[currentAppointmentIndex].existingPermitsFile.name}
                                        </p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'productImageFile')}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                    {appointments[currentAppointmentIndex].productImageFile && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Selected file: {appointments[currentAppointmentIndex].productImageFile.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <button
                                    type="button"
                                    onClick={handlePreviousStep}
                                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Back to Sample Details
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    Continue to Review
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Review Section */}
                    {currentStep === 'review' && (
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center gap-3">
                                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Review Appointment Details
                            </h2>
                            
                            {/* Contact Information Review */}
                            <div className="mb-8 bg-blue-50 rounded-xl p-6">
                                <h3 className="text-lg font-medium text-blue-900 mb-4 flex items-center gap-3">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Contact Information
                                </h3>
                                <div className="bg-white p-6 rounded-xl border border-blue-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-blue-50/50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-blue-900 mb-1">Client Name</p>
                                            <p className="text-base text-blue-700">{appointments[0].clientName}</p>
                                        </div>
                                        <div className="bg-blue-50/50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-blue-900 mb-1">Email Address</p>
                                            <p className="text-base text-blue-700">{appointments[0].emailAddress}</p>
                                        </div>
                                        <div className="bg-blue-50/50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-blue-900 mb-1">Phone Number</p>
                                            <p className="text-base text-blue-700">{appointments[0].phoneNumber}</p>
                                        </div>
                                        <div className="bg-blue-50/50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-blue-900 mb-1">Organization/Company</p>
                                            <p className="text-base text-blue-700">{appointments[0].organization}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Appointments Review Tabs */}
                            <div className="mb-8">
                                {/* Tab Navigation */}
                                <div className="flex space-x-4 border-b border-gray-200 mb-6">
                                    {appointments.map((appointment, index) => (
                                        <button
                                            key={appointment.id}
                                            onClick={() => setCurrentAppointmentIndex(index)}
                                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                                currentAppointmentIndex === index
                                                    ? 'border-blue-600 text-blue-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                        >
                                            {appointment.sampleName || `Appointment ${index + 1}`}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-3">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                            </svg>
                                            Appointment {currentAppointmentIndex + 1}
                                        </h3>
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                                            {appointments[currentAppointmentIndex].preferredDate}
                                        </span>
                                    </div>

                                    {/* Sample Details */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                                        <h4 className="text-base font-medium text-gray-900 mb-4 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            Sample Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Sample Name</p>
                                                <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].sampleName}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Quantity</p>
                                                <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].quantity}</p>
                                            </div>
                                            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                                                <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].sampleDescription}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Selected Services */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                                        <h4 className="text-base font-medium text-gray-900 mb-4 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Selected Services
                                        </h4>
                                        <div className="space-y-3">
                                            {appointments[currentAppointmentIndex].selectedServices.map((serviceId) => {
                                                const service = Object.values(servicesData)
                                                    .flatMap(category => category.categories)
                                                    .flatMap(category => category.services)
                                                    .find(s => s.id === serviceId);
                                                return service ? (
                                                    <div key={serviceId} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                                                        <span className="text-base text-gray-900">{service.name}</span>
                                                        <span className="text-base font-medium text-blue-600">{service.price}</span>
                                                    </div>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>

                                    {/* Shelf Life Details */}
                                    {isShelfLifeSelected() && (
                                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                                            <h4 className="text-base font-medium text-gray-900 mb-4 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Shelf Life Details
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Objective of Study</p>
                                                    <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].objectiveOfStudy}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Product Name</p>
                                                    <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].productName}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Net Weight</p>
                                                    <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].netWeight}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Brand Name</p>
                                                    <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].brandName}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Existing Market</p>
                                                    <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].existingMarket}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Production Type</p>
                                                    <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].productionType}</p>
                                                </div>
                                                <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Method of Preservation</p>
                                                    <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].methodOfPreservation}</p>
                                                </div>
                                                <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Product Ingredients</p>
                                                    <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].productIngredients}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Packaging Material</p>
                                                    <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].packagingMaterial}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Target Shelf Life</p>
                                                    <p className="text-base text-gray-900">{appointments[currentAppointmentIndex].targetShelfLife}</p>
                                                </div>
                                                <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Mode of Deterioration</p>
                                                    <ul className="mt-2 space-y-2">
                                                        {appointments[currentAppointmentIndex].modeOfDeterioration.map((mode, idx) => (
                                                            <li key={idx} className="flex items-center gap-2 text-base text-gray-900">
                                                                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                                {mode}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-700 mb-3">Uploaded Files</p>
                                                    <div className="space-y-3">
                                                        {appointments[currentAppointmentIndex].existingPermitsFile && (
                                                            <div className="flex items-center gap-2 text-base text-gray-900">
                                                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                Permits: {appointments[currentAppointmentIndex].existingPermitsFile.name}
                                                            </div>
                                                        )}
                                                        {appointments[currentAppointmentIndex].productImageFile && (
                                                            <div className="flex items-center gap-2 text-base text-gray-900">
                                                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                Product Image: {appointments[currentAppointmentIndex].productImageFile.name}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Total Amount */}
                            <div className="bg-blue-600 rounded-xl p-6 mt-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-white">Total Amount</h3>
                                    <span className="text-3xl font-bold text-white">
                                        ₱{appointments.reduce((total, appointment) => {
                                            const servicesTotal = appointment.selectedServices.reduce((sum, serviceId) => {
                                                const service = Object.values(servicesData)
                                                    .flatMap(category => category.categories)
                                                    .flatMap(category => category.services)
                                                    .find(s => s.id === serviceId);
                                                if (service) {
                                                    const price = parseFloat(service.price.replace('₱', '').replace(',', ''));
                                                    return sum + price;
                                                }
                                                return sum;
                                            }, 0);

                                            const shelfLifeTotal = Object.entries(appointment.shelfLifeServices)
                                                .filter(([_, selected]) => selected)
                                                .length * 2500;

                                            return total + servicesTotal + shelfLifeTotal;
                                        }, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <button
                                    type="button"
                                    onClick={handlePreviousStep}
                                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    {isShelfLifeSelected() ? 'Back to Shelf Life Details' : 'Back to Sample Details'}
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Appointment'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Appointment</h3>
                            <p className="text-gray-600 mb-8">
                                Are you sure you want to delete this appointment? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDeleteAppointment}
                                    className="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 