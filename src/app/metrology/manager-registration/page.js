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
    if (fieldName === 'orCrDocuments') {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        orCrDocuments: [...prev.orCrDocuments, ...files]
      }));
    } else {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
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
    <div className="min-h-screen bg-white">
      <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#2243B0]">Company Registration</h1>
          <p className="mt-2 text-sm text-gray-600">
            Please provide your company details to complete the registration
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column */}
              <div>
                <div className="mb-6">
                  <h2 className="flex items-center text-lg font-medium text-[#2243B0] mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Company Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className=" color-[#2243B0] block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      placeholder="Enter contact person name"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      placeholder="09-XXX-XXXX-XXX"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      placeholder="Enter contact email"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Address</label>
                    <input
                      type="text"
                      name="companyAddress"
                      placeholder="Enter company address"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-6">
                  <h2 className="flex items-center text-lg font-medium text-[#2243B0] mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Truck Information
                  </h2>
                </div>

                <div className="space-y-4">
                  {licensePlates.map((plate, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Truck License Plate {index + 1}
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            value={plate}
                            onChange={(e) => handleLicensePlateChange(index, e.target.value)}
                            placeholder="Enter plate number"
                            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => index === licensePlates.length - 1 ? addLicensePlate() : removeLicensePlate(index)}
                            className={`ml-2 p-2 rounded-md ${
                              index === licensePlates.length - 1
                                ? 'text-blue-600 hover:text-blue-700'
                                : 'text-red-600 hover:text-red-700'
                            }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                  index === licensePlates.length - 1
                                    ? "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    : "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                }
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h2 className="flex items-center text-lg font-medium text-[#2243B0] mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Required Documents
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business Permit Document</label>
                      <div className="mt-1 flex">
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, 'businessPermit')}
                          className="hidden"
                          id="businessPermit"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <label
                          htmlFor="businessPermit"
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-500 cursor-pointer hover:bg-gray-50"
                        >
                          {formData.businessPermit ? formData.businessPermit.name : 'Business Permit'}
                        </label>
                        <button
                          type="button"
                          className="ml-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Upload
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">OR/CR Documents</label>
                      <div className="mt-1 flex">
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, 'orCrDocuments')}
                          className="hidden"
                          id="orCrDocuments"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          multiple
                        />
                        <label
                          htmlFor="orCrDocuments"
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-500 cursor-pointer hover:bg-gray-50"
                        >
                          Select OR/CR Documents
                        </label>
                        <button
                          type="button"
                          className="ml-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Upload
                        </button>
                      </div>
                      {formData.orCrDocuments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {formData.orCrDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                              <span className="text-sm text-gray-600">{doc.name}</span>
                              <button
                                type="button"
                                onClick={() => removeOrCrDocument(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="Additional Infos."
                      rows={4}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start">
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
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

