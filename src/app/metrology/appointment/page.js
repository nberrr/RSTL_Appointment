'use client';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function MetrologyAppointment() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        sex: '',
        plateNumber: '',
        companyName: '',
        sampleDescription: '',
        numberOfLiters: '',
        typeOfTest: 'Volume Standard Test',
        nameOfSamples: '',
        terms: false
    });

    const [errors, setErrors] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState({
        success: true,
        message: '',
        appointmentId: null
    });

    const validateForm = () => {
        const newErrors = {};

        // Contact Information validation
        if (!formData.name) newErrors.name = 'Please enter full name';
        if (!formData.email) newErrors.email = 'Please enter email address';
        if (!formData.contactNumber) newErrors.contactNumber = 'Please enter contact number';
        if (!formData.plateNumber) newErrors.plateNumber = 'Please enter plate number';
        if (!formData.companyName) newErrors.companyName = 'Please enter organization name';

        // Test Details validation
        if (!selectedDate) newErrors.appointmentDate = 'Please select an appointment date';
        if (!formData.numberOfLiters) newErrors.numberOfLiters = 'Please enter number of liters';
        if (!formData.nameOfSamples) newErrors.nameOfSamples = 'Please enter name of samples';
        if (!formData.sampleDescription) newErrors.sampleDescription = 'Please enter sample description';

        // Terms validation
        if (!formData.terms) newErrors.terms = 'Please agree to the Terms of Service and Privacy Policy';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'numberOfLiters') {
            const numValue = parseInt(value) || 0;
            if (numValue <= 80000) {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formDataToSubmit = {
                ...formData,
                selectedDate: selectedDate ? selectedDate.toISOString() : null,
            };
            
            try {
                setIsSubmitting(true);
                const response = await fetch('/api/appointments/metrology', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataToSubmit),
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    setSubmissionStatus({
                        success: true,
                        message: 'Your appointment has been scheduled successfully!',
                        appointmentId: data.appointmentId
                    });
                    // Reset form
                    setFormData({
                        name: '',
                        email: '',
                        contactNumber: '',
                        sex: '',
                        plateNumber: '',
                        companyName: '',
                        sampleDescription: '',
                        numberOfLiters: '',
                        typeOfTest: 'Volume Standard Test',
                        nameOfSamples: '',
                        terms: false
                    });
                    setSelectedDate(null);
                } else {
                    // Show error message
                    setSubmissionStatus({
                        success: false,
                        message: data.message || 'Failed to schedule appointment. Please try again.'
                    });
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                setSubmissionStatus({
                    success: false,
                    message: 'Network error. Please check your connection and try again.'
                });
            } finally {
                setIsSubmitting(false);
            }
        }
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

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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
        const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday

        days.push(
            <button
            key={day}
            onClick={() => !isWeekend && setSelectedDate(date)}
            disabled={isWeekend}
            className={`h-8 text-xs sm:text-sm leading-loose rounded-full transition-colors
                ${isSelected ? 'bg-blue-600 text-white' : ''}
                ${isToday && !isSelected ? 'bg-blue-100 text-blue-600' : ''}
                ${isWeekend ? 'text-red-400 cursor-not-allowed' : ''}
                ${!isSelected && !isToday && !isWeekend ? 'hover:bg-gray-100 text-gray-900' : ''}
            `}
            >
            {day}
            </button>
        );
        }

        return days;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
            <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h1 className="text-xl sm:text-[1.5rem] font-semibold">Metrology Appointment</h1>
                </div>
                <p className="text-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                    Schedule testing services for your samples across our specialized laboratories
                </p>

                {/* Main Form */}
                <div className="bg-blue-600 rounded-t-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h2 className="text-sm sm:text-base text-white font-medium">Appointment Request Form</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 ml-6 sm:ml-7">Please provide your details to schedule a metrology testing appointment</p>
                </div>

                <div className="bg-white rounded-b-lg shadow-sm p-4 sm:p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-4 sm:gap-y-6">
                        {/* Left Column - Contact Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4 sm:mb-6">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h3 className="text-sm font-medium text-gray-900">Contact Information</h3>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-700">
                                        Name of Representative / Customer
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        placeholder="Enter contact number"
                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                    {errors.contactNumber && (
                                        <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">
                                        Plate Number
                                    </label>
                                    <input
                                        type="text"
                                        name="plateNumber"
                                        value={formData.plateNumber}
                                        onChange={handleChange}
                                        placeholder="XXX-000"
                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.plateNumber ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                    {errors.plateNumber && (
                                        <p className="mt-1 text-sm text-red-600">{errors.plateNumber}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">
                                        Company / Organization
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="Enter organization name"
                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                    {errors.companyName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                                    )}
                                </div>

                                <div className="bg-blue-50 border border-blue-100 rounded-md p-3 sm:p-4">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium text-blue-800">Important Note</span>
                                    </div>
                                    <p className="mt-2 text-xs sm:text-sm text-blue-600">
                                        Please ensure all contact information is accurate. You will receive appointment confirmation and updates via email.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Test Details */}
                        <div>
                            <div className="flex items-center gap-2 mb-4 sm:mb-6">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="text-sm font-medium text-gray-900">Test Details</h3>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-700">Appointment Date</label>
                                    <div className={`mt-1 bg-white border ${errors.appointmentDate ? 'border-red-500' : 'border-gray-300'} rounded-md overflow-hidden`}>
                                        <div className="px-3 sm:px-4 py-2 flex items-center justify-between bg-white">
                                            <button
                                                type="button"
                                                onClick={handlePrevMonth}
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                            >
                                                <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                            </button>
                                            <span className="text-xs sm:text-sm font-medium">
                                                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={handleNextMonth}
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                            >
                                                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                            </button>
                                        </div>
                                        <div className="border-t border-gray-200">
                                            <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500">
                                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                                    <div key={i} className="py-1 sm:py-2">{day}</div>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-7 text-xs sm:text-sm">
                                                {renderCalendar()}
                                            </div>
                                        </div>
                                        <div className="px-3 sm:px-4 py-2 border-t border-gray-200 bg-gray-50">
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                                                {selectedDate && (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                        <span className="text-gray-600">Selected Date</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-100 rounded-full"></div>
                                                    <span className="text-gray-600">Today</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                                    <span className="text-gray-600">Weekend/Holiday</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.appointmentDate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.appointmentDate}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Type of Test</label>
                                    <select
                                        name="typeOfTest"
                                        value={formData.typeOfTest}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="Volume Standard Test">Volume Standard Test</option>
                                        <option value="Other Test">Other Test</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Number of Liters</label>
                                    <div className="mt-1 relative">
                                        <input
                                            type="number"
                                            name="numberOfLiters"
                                            value={formData.numberOfLiters}
                                            onChange={handleChange}
                                            placeholder="Enter number of liters"
                                            max="80000"
                                            className={`block w-full px-3 py-2 bg-white border ${errors.numberOfLiters ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8`}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">L</span>
                                        </div>
                                    </div>
                                    {errors.numberOfLiters && (
                                        <p className="mt-1 text-sm text-red-600">{errors.numberOfLiters}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">Maximum: 80,000 liters</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Name of Samples</label>
                                    <input
                                        type="text"
                                        name="nameOfSamples"
                                        value={formData.nameOfSamples}
                                        onChange={handleChange}
                                        placeholder="Name of sample..."
                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.nameOfSamples ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                    {errors.nameOfSamples && (
                                        <p className="mt-1 text-sm text-red-600">{errors.nameOfSamples}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Brief sample description</label>
                                    <textarea
                                        name="sampleDescription"
                                        value={formData.sampleDescription}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Description..."
                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.sampleDescription ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                    {errors.sampleDescription && (
                                        <p className="mt-1 text-sm text-red-600">{errors.sampleDescription}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Terms and Submit Button */}
                        <div className="col-span-1 lg:col-span-2 space-y-4 sm:space-y-6 mt-2 sm:mt-4">
                            <div className="flex items-start">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={formData.terms}
                                    onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
                                    className={`mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${errors.terms ? 'border-red-500' : ''}`}
                                />
                                <label htmlFor="terms" className="ml-2 text-xs sm:text-sm text-gray-600">
                                    I accept <a href="#" className="text-blue-600 hover:underline">Terms of Service and Privacy Policy</a>
                                </label>
                            </div>
                            {errors.terms && (
                                <p className="text-sm text-red-600">{errors.terms}</p>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Appointment'}
                                </button>
                            </div>
                        </div>
                    </form>
                    
                    {/* Success/Error Message */}
                    {submissionStatus.message && (
                        <div className={`mt-6 p-4 rounded-md ${submissionStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    {submissionStatus.success ? (
                                        <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <h3 className={`text-sm font-medium ${submissionStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                                        {submissionStatus.success ? 'Success!' : 'Error'}
                                    </h3>
                                    <div className={`mt-1 text-sm ${submissionStatus.success ? 'text-green-700' : 'text-red-700'}`}>
                                        <p>{submissionStatus.message}</p>
                                        {submissionStatus.success && submissionStatus.appointmentId && (
                                            <p className="mt-1">Appointment ID: {submissionStatus.appointmentId}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 