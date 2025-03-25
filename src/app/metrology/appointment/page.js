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

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
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

        days.push(
            <button
            key={day}
            onClick={() => setSelectedDate(date)}
            className={`h-8 text-sm leading-loose rounded-full transition-colors
                ${isSelected ? 'bg-blue-600 text-white' : ''}
                ${isToday && !isSelected ? 'bg-blue-100 text-blue-600' : ''}
                ${!isSelected && !isToday ? 'hover:bg-gray-100' : ''}
            `}
            >
            {day}
            </button>
        );
        }

        return days;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-600">Metrology Appointment</h1>
            <p className="mt-2 text-sm text-gray-600">
                Schedule testing services for your samples across our specialized laboratories
            </p>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h2 className="text-lg font-medium">Contact Information</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">Please provide your contact details for this testing request</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name of Representative / Customer
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Contact Number
                    </label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sex</label>
                        <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                        >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Plate Number</label>
                        <input
                        type="text"
                        name="plateNumber"
                        value={formData.plateNumber}
                        onChange={handleChange}
                        placeholder="XXX-000"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Company / School / University
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter organization name"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
                    <div className="mt-1 bg-white border border-gray-300 rounded-md shadow-sm">
                        <div className="px-4 py-2 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-1 text-gray-400 hover:text-gray-500"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </button>
                        <span className="text-sm font-medium text-gray-900">
                            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </span>
                        <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-1 text-gray-400 hover:text-gray-500"
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>
                        </div>
                        <div className="border-t border-gray-200">
                        <div className="grid grid-cols-7 gap-px text-xs text-center text-gray-500 bg-gray-50">
                            {days.map(day => (
                            <div key={day} className="py-2">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-px text-sm text-center">
                            {renderCalendar()}
                        </div>
                        </div>
                    </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Type of Test</label>
                    <select
                        name="typeOfTest"
                        value={formData.typeOfTest}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                    >
                        <option value="Volume Standard Test">Volume Standard Test</option>
                        <option value="Other Test">Other Test</option>
                    </select>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Liters</label>
                    <div className="mt-1 relative">
                        <input
                        type="number"
                        name="numberOfLiters"
                        value={formData.numberOfLiters}
                        onChange={handleChange}
                        placeholder="Enter number of liters"
                        max="80000"
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">L</span>
                        </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Maximum: 80,000 liters</p>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Name of Samples</label>
                    <input
                        type="text"
                        name="nameOfSamples"
                        value={formData.nameOfSamples}
                        onChange={handleChange}
                        placeholder="Name of sample..."
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Brief sample description</label>
                    <textarea
                        name="sampleDescription"
                        value={formData.sampleDescription}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Description..."
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    </div>
                </div>
                </div>

                {/* Terms and Back/Submit buttons */}
                <div className="pt-6">
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={formData.terms}
                        onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        required
                    />
                    </div>
                    <div className="ml-3">
                    <label htmlFor="terms" className="text-sm text-gray-700">
                        I accept{' '}
                        <a href="#" className="text-blue-600 hover:underline">Terms of Service and Privacy Policy</a>
                    </label>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                    >
                    <ChevronLeftIcon className="w-5 h-5 mr-1" />
                    Back
                    </button>
                    <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    Submit Appointment
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
    } 