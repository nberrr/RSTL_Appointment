'use client';

import { useState } from 'react';
import { PlusIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';

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

export default function ShelfLifeDetails({ 
  appointment, 
  onChange,
  onAddMode,
  onRemoveMode,
  onModeChange,
  onFileChange,
  errors = {},
  disabled = false
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  
  const getInputClasses = (fieldName) => {
    const baseClasses = "block w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors";
    
    if (errors[fieldName]) {
      return `${baseClasses} border-red-400 bg-red-50 text-red-800 disabled:opacity-50`;
    }
    
    return `${baseClasses} border-gray-300 bg-white disabled:opacity-50`;
  };

  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-3">Shelf Life Study Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="objectiveOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
            Objective of Study <span className="text-red-500">*</span>
          </label>
          <textarea
            id="objectiveOfStudy"
            name="objectiveOfStudy"
            value={appointment.objectiveOfStudy}
            onChange={handleChange}
            rows={3}
            placeholder="Describe the main objective of your shelf life study"
            className={getInputClasses("objectiveOfStudy")}
            disabled={disabled}
          />
          <InlineError message={errors.objectiveOfStudy} />
        </div>
        
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={appointment.productName}
            onChange={handleChange}
            placeholder="Enter the product name"
            className={getInputClasses("productName")}
            disabled={disabled}
          />
          <InlineError message={errors.productName} />
        </div>
        
        <div>
          <label htmlFor="netWeight" className="block text-sm font-medium text-gray-700 mb-1">
            Net Weight <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="netWeight"
            name="netWeight"
            value={appointment.netWeight}
            onChange={handleChange}
            placeholder="Enter net weight (e.g., 500g, 1kg)"
            className={getInputClasses("netWeight")}
            disabled={disabled}
          />
          <InlineError message={errors.netWeight} />
        </div>
        
        <div>
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">
            Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            value={appointment.brandName}
            onChange={handleChange}
            placeholder="Enter the brand name"
            className={getInputClasses("brandName")}
            disabled={disabled}
          />
        </div>
        
        <div>
          <label htmlFor="existingMarket" className="block text-sm font-medium text-gray-700 mb-1">
            Existing Market
          </label>
          <select
            id="existingMarket"
            name="existingMarket"
            value={appointment.existingMarket}
            onChange={handleChange}
            className={getInputClasses("existingMarket")}
            disabled={disabled}
          >
            <option value="">Select market type</option>
            <option value="Local">Local</option>
            <option value="National">National</option>
            <option value="International">International</option>
            <option value="New Product">New Product (No Market Yet)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="productionType" className="block text-sm font-medium text-gray-700 mb-1">
            Production Type
          </label>
          <select
            id="productionType"
            name="productionType"
            value={appointment.productionType}
            onChange={handleChange}
            className={getInputClasses("productionType")}
            disabled={disabled}
          >
            <option value="">Select production type</option>
            <option value="Industrial">Industrial</option>
            <option value="Small Scale">Small Scale</option>
            <option value="Homemade">Homemade</option>
            <option value="Prototype">Prototype</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="methodOfPreservation" className="block text-sm font-medium text-gray-700 mb-1">
            Method of Preservation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="methodOfPreservation"
            name="methodOfPreservation"
            value={appointment.methodOfPreservation}
            onChange={handleChange}
            placeholder="e.g., Refrigeration, Canning, Pasteurization"
            className={getInputClasses("methodOfPreservation")}
            disabled={disabled}
          />
          <InlineError message={errors.methodOfPreservation} />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="productIngredients" className="block text-sm font-medium text-gray-700 mb-1">
            Product Ingredients <span className="text-red-500">*</span>
          </label>
          <textarea
            id="productIngredients"
            name="productIngredients"
            value={appointment.productIngredients}
            onChange={handleChange}
            rows={3}
            placeholder="List all ingredients in the product"
            className={getInputClasses("productIngredients")}
            disabled={disabled}
          />
          <InlineError message={errors.productIngredients} />
        </div>
        
        <div>
          <label htmlFor="packagingMaterial" className="block text-sm font-medium text-gray-700 mb-1">
            Packaging Material <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="packagingMaterial"
            name="packagingMaterial"
            value={appointment.packagingMaterial}
            onChange={handleChange}
            placeholder="e.g., PET Bottles, Glass Jars, Aluminum Foil"
            className={getInputClasses("packagingMaterial")}
            disabled={disabled}
          />
          <InlineError message={errors.packagingMaterial} />
        </div>
        
        <div>
          <label htmlFor="targetShelfLife" className="block text-sm font-medium text-gray-700 mb-1">
            Target Shelf Life <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="targetShelfLife"
            name="targetShelfLife"
            value={appointment.targetShelfLife}
            onChange={handleChange}
            placeholder="e.g., 6 months, 1 year, 2 years"
            className={getInputClasses("targetShelfLife")}
            disabled={disabled}
          />
          <InlineError message={errors.targetShelfLife} />
        </div>
      </div>
      
      {/* Mode of Deterioration */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Mode of Deterioration <span className="text-red-500">*</span>
        </label>
        
        {appointment.modeOfDeterioration.map((mode, index) => (
          <div key={index} className="flex items-center gap-3 mb-3">
            <input
              type="text"
              value={mode}
              onChange={(e) => onModeChange(index, e.target.value)}
              placeholder={`Mode of deterioration ${index + 1}`}
              className={getInputClasses("modeOfDeterioration")}
              disabled={disabled}
            />
            
            {index > 0 && (
              <button
                type="button"
                onClick={() => onRemoveMode(index)}
                className="p-2 text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={disabled}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={onAddMode}
          className="mt-2 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          <PlusIcon className="h-4 w-4 mr-1" /> Add Another Mode
        </button>
        <InlineError message={errors.modeOfDeterioration} />
      </div>
      
      {/* File Uploads */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Existing FDA Permits (if any)
        </label>
        <input
          type="file"
          onChange={onFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          disabled={disabled}
        />
        <p className="mt-1 text-xs text-gray-500">Accepted file types: PDF, Word, JPEG, PNG (max 5MB)</p>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certificate of Analysis (if available)
        </label>
        <input
          type="file"
          onChange={onFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          disabled={disabled}
        />
        <p className="mt-1 text-xs text-gray-500">Accepted file types: PDF, Word, JPEG, PNG (max 5MB)</p>
      </div>
    </div>
  );
} 