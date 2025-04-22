'use client';

import { useState, useEffect } from 'react';

export default function ContactInformation({ 
  contactInfo, 
  onContactInfoChange, 
  errors, 
  hasAttemptedSubmit,
  onNext,
  disabled = false
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onContactInfoChange(name, value);
  };
  
  const getInputClasses = (fieldName) => {
    const baseClasses = "block w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors";
    
    if (hasAttemptedSubmit && errors[fieldName]) {
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
          {hasAttemptedSubmit && errors.clientName && (
            <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>
          )}
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
          {hasAttemptedSubmit && errors.emailAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.emailAddress}</p>
          )}
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
          {hasAttemptedSubmit && errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
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
          {hasAttemptedSubmit && errors.organization && (
            <p className="mt-1 text-sm text-red-600">{errors.organization}</p>
          )}
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