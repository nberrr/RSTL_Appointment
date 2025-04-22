'use client';

import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'; // Use solid icon

// Helper component for inline error messages
const InlineError = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center mt-1.5 px-2 py-1 rounded-md bg-yellow-50 border border-yellow-200">
      <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500 mr-1.5 flex-shrink-0" aria-hidden="true" />
      <p className="text-xs font-medium text-yellow-800">{message}</p>
    </div>
  );
};

export default function ContactInformation({ 
  contactInfo, 
  onContactInfoChange, 
  errors, 
  onNext,
  disabled = false
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onContactInfoChange(name, value);
  };
  
  const getInputClasses = (fieldName) => {
    const baseClasses = "block w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors";
    
    if (errors[fieldName]) {
      return `${baseClasses} border-red-400 bg-red-50 text-red-800 disabled:opacity-75`;
    }
    
    return `${baseClasses} border-gray-300 bg-white disabled:opacity-75 disabled:bg-gray-100`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={contactInfo.clientName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={getInputClasses("clientName")}
            disabled={disabled}
          />
          <InlineError message={errors.clientName} />
        </div>
        
        <div>
          <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={contactInfo.emailAddress}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={getInputClasses("emailAddress")}
            disabled={disabled}
          />
          <InlineError message={errors.emailAddress} />
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={contactInfo.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className={getInputClasses("phoneNumber")}
            disabled={disabled}
          />
          <InlineError message={errors.phoneNumber} />
        </div>
        
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
            Organization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={contactInfo.organization}
            onChange={handleChange}
            placeholder="Enter your organization name"
            className={getInputClasses("organization")}
            disabled={disabled}
          />
          <InlineError message={errors.organization} />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          Continue to Sample Details
        </button>
      </div>
    </div>
  );
} 