'use client';
import { useState } from 'react';

export default function ManagerRegistration() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    contactNumber: '',
    contactEmail: '',
    companyAddress: '',
    truckLicensePlates: [''],
    businessPermit: null,
    orCrDocuments: [],
    additionalNotes: '',
    terms: false
  });

  const [licensePlates, setLicensePlates] = useState(['']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const removeOrCrDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      orCrDocuments: prev.orCrDocuments.filter((_, i) => i !== index)
    }));
  };

  const addLicensePlate = () => {
    setLicensePlates(prev => [...prev, '']);
  };

  const removeLicensePlate = (index) => {
    setLicensePlates(prev => prev.filter((_, i) => i !== index));
  };

  const handleLicensePlateChange = (index, value) => {
    const newPlates = [...licensePlates];
    newPlates[index] = value;
    setLicensePlates(newPlates);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, truckLicensePlates: licensePlates });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 justify-center">
            <svg className="w-5 h-5 text-[#2243B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h1 className="text-xl font-semibold text-[#2243B0]">Company Registration</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Please provide your company details to complete the registration
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Form Header */}
          <div className="bg-[#2243B0] rounded-t-lg p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="text-white font-medium">Company Registration Request</h2>
            </div>
            <p className="text-sm text-white/80 ml-7">Please provide your details to complete the company registration</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column - Company Information */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-5 h-5 text-[#2243B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-sm font-medium text-gray-900">Company Information</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700">Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Enter contact person name"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700">Contact Number</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="09-XXX-XXXX-XXX"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700">Contact Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      placeholder="Enter contact email"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700">Company Address</label>
                    <input
                      type="text"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      placeholder="Enter company address"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Required Documents */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-5 h-5 text-[#2243B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-sm font-medium text-gray-900">Required Documents</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700">Business Permit Document</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#2243B0] hover:text-blue-500">
                            <span>Upload files</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'businessPermit')} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF or Word up to 5MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Truck Information Section */}
            <div className="mt-8 border-t pt-8">
              <div className="flex items-center gap-2 mb-4 justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#2243B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="text-sm font-medium text-gray-900">Truck Information</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 ml-7">Add details for each truck that will be registered for metrology services</p>
                </div>
                <button
                  type="button"
                  onClick={addLicensePlate}
                  className="text-[#2243B0] border border-[#2243B0] hover:bg-blue-50 px-3 py-1.5 rounded-md text-sm flex items-center gap-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Truck
                </button>
              </div>

              <div className="space-y-6">
                {licensePlates.map((plate, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#2243B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Truck Entry {index + 1}
                      </h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeLicensePlate(index)}
                          className="text-red-600 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors flex-shrink-0 border border-red-200"
                          title="Delete truck entry"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          License Plate Number
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={plate}
                          onChange={(e) => handleLicensePlateChange(index, e.target.value)}
                          placeholder="Enter plate number (e.g., ABC 123)"
                          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          OR/CR Document
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id={`file-upload-${index}`}
                            onChange={(e) => handleFileChange(e, `orCrDocument-${index}`)}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.xls,.xlsx,.txt,.csv"
                          />
                          <label
                            htmlFor={`file-upload-${index}`}
                            className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50 group"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-[#2243B0] group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                              <span className="text-sm text-gray-500 group-hover:text-gray-600">Click to upload OR/CR</span>
                            </div>
                            <span className="text-xs text-gray-400 group-hover:text-gray-500">PDF, Word, or Image</span>
                          </label>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Maximum file size: 5MB</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {licensePlates.length === 0 && (
                <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">No trucks added yet. Click "Add Truck" to begin.</p>
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div className="mt-6">
              <label className="block text-sm text-gray-700">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional Infos."
              />
            </div>

            {/* Terms and Submit */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
                  className="mt-1 h-4 w-4 text-[#2243B0] border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-[#2243B0] hover:underline">Terms of Service</a> and <a href="#" className="text-[#2243B0] hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2243B0] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 

