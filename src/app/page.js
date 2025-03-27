"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('metrology');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[650px] bg-gradient-to-r from-blue-900 to-blue-800">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Laboratory Background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Left side - Logo and Title */}
              <div className="mb-8 md:mb-0">
                <div className="flex items-center mb-4">
                  <Image
                    src="/dost-logo.png"
                    alt="DOST Logo"
                    width={60}
                    height={60}
                    className="mr-4"
                  />
                  <h1 className="text-5xl font-bold text-white">DOST-V</h1>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Appointment Portal</h2>
                <p className="text-lg text-white">Regional Standards & Testing Laboratories</p>
              </div>

              {/* Right side - Text and Buttons */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-[40rem]">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Lorem ipsum dolor sit amet, Et quasi veniam et dicta
                </h3>
            <p className="text-gray-200 mb-8">
                  Lorem ipsum dolor sit amet. Et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod. Eum ipsum quidem rem rerum neque qui enim molestiae non illum harum non beatae voluptas sed temporibus quisquam est nemo.
            </p>
                <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/metrology/appointment"
                    className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Get Scheduled
              </Link>
              <Link
                href="/metrology/manager-registration"
                    className="bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-blue-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                I'm a Manager
              </Link>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Laboratory Testing Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title and Description */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Laboratory Testing Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our state-of-the-art laboratory offers comprehensive testing services across metrology, chemical analysis, and microbiological testing to meet your research and compliance needs.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Service Type Tabs */}
          <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg">
              <button
                onClick={() => handleTabChange('metrology')}
                className={`px-6 py-3 font-medium rounded-l-lg flex items-center transition-colors ${
                  activeTab === 'metrology'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Metrology
              </button>
              <button
                onClick={() => handleTabChange('chemical')}
                className={`px-6 py-3 font-medium flex items-center transition-colors ${
                  activeTab === 'chemical'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Chemical
              </button>
              <button
                onClick={() => handleTabChange('microbiological')}
                className={`px-6 py-3 font-medium rounded-r-lg flex items-center transition-colors ${
                  activeTab === 'microbiological'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Microbiological
              </button>
            </div>
          </div>

          {/* Content Sections */}
          {activeTab === 'metrology' && (
            <div className="bg-blue-50 rounded-xl p-8 mb-12">
              {/* Existing Metrology content */}
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900">Metrology Laboratory Services</h2>
              </div>
              <p className="text-gray-600 mb-8">
                Our metrology laboratory provides precise calibration and measurement services for a wide range of instruments and equipment, ensuring accuracy and reliability in your measurements.
              </p>

              {/* Service Categories */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                  Weight Calibration
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                  Thermometry
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                  Pressure Standards
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                  Volume Standards
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                  Length Standards
                </button>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Test Weight Calibration */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Test Weight Calibration</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Precision calibration of test weights for various materials and ranges</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Test Weight (stainless steel)</span>
                      <span className="text-gray-900 font-medium">₱500.00 - ₱1,000.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Test Weight (other materials)</span>
                      <span className="text-gray-900 font-medium">₱400.00 - ₱700.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Non-Automatic Weighing Instrument (NAWI)</span>
                      <span className="text-gray-900 font-medium">₱1,000.00 - ₱1,200.00</span>
                    </div>
                  </div>
                </div>

                {/* Thermometry Standards */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Thermometry Standards</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Calibration of temperature measurement devices across various ranges</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Thermometer -30°C to 250°C (five test points)</span>
                      <span className="text-gray-900 font-medium">₱1,700.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Freezer -30°C to -5°C (one test point)</span>
                      <span className="text-gray-900 font-medium">₱1,100.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IR Thermometer 50°C to 250°C</span>
                      <span className="text-gray-900 font-medium">₱1,700.00</span>
                    </div>
                  </div>
                </div>

                {/* Pressure Standards */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Pressure Standards</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Calibration of pressure measurement instruments for accurate readings</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hydraulic Pressure Gauge (Oil)</span>
                      <span className="text-gray-900 font-medium">₱900.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sphygmomanometer</span>
                      <span className="text-gray-900 font-medium">₱700.00</span>
                    </div>
                  </div>
                </div>

                {/* Volume Standards */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Volume Standards</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Calibration of volume measurement devices for precise liquid measurements</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Test Measure (Volumetric Method)</span>
                      <span className="text-gray-900 font-medium">₱500.00 - ₱1,000.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tank Truck</span>
                      <span className="text-gray-900 font-medium">₱1,000.00 - ₱6,000.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fuel Dispensing Pump (2 nozzles)</span>
                      <span className="text-gray-900 font-medium">₱1,400.00</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Request Service
                  </button>
                </div>

                {/* Length Standards */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Length Standards</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Calibration of length measurement tools for dimensional accuracy</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Caliper (&gt; to 200 mm)</span>
                      <span className="text-gray-900 font-medium">₱1,225.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Steel Rule</span>
                      <span className="text-gray-900 font-medium">₱600.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Micrometer</span>
                      <span className="text-gray-900 font-medium">₱700.00</span>
                    </div>
                  </div>
                </div>

                {/* Electrical Standards */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Electrical Standards</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Instruments for accurate readings</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Voltmeter</span>
                      <span className="text-gray-900 font-medium">₱2,250.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Multimeter</span>
                      <span className="text-gray-900 font-medium">₱2,000.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ohmmeter</span>
                      <span className="text-gray-900 font-medium">₱700.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testing Schedule Info */}
              <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Testing Schedule</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Calibration/Testing: MON-FRI, 8AM-5PM
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Results available within 3-5 business days
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Bring engine and chassis number (stencil)
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'chemical' && (
            <div className="bg-green-50 rounded-xl p-8 mb-12">
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900">Chemical Testing Services</h2>
              </div>
              <p className="text-gray-600 mb-8">
                Our chemical laboratory offers comprehensive analytical services for food, water, and environmental samples, providing accurate and reliable results for research and regulatory compliance.
              </p>

              {/* Service Categories with Dropdowns */}
              <div className="space-y-4">
                {/* Food Analysis */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setExpandedCategory(expandedCategory === 'food' ? null : 'food')}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Food Analysis</h3>
                        <p className="text-sm text-gray-600">Comprehensive testing of food samples for various parameters</p>
                      </div>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedCategory === 'food' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedCategory === 'food' && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Alcohol (by volume or ethanol liquor)</span>
                          <span className="text-gray-900 font-medium">₱900.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Ash</span>
                          <span className="text-gray-900 font-medium">₱500.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Brix Reading</span>
                          <span className="text-gray-900 font-medium">₱300.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Crude Fiber</span>
                          <span className="text-gray-900 font-medium">₱1,380.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Dietary Fiber</span>
                          <span className="text-gray-900 font-medium">₱5,000.00</span>
                        </div>
                      </div>
                      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Request Test
                      </button>
                    </div>
                  )}
                </div>

                {/* Water and Wastewater Analysis */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setExpandedCategory(expandedCategory === 'water' ? null : 'water')}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Water and Wastewater Analysis</h3>
                        <p className="text-sm text-gray-600">Testing of water samples for various chemical parameters</p>
                      </div>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedCategory === 'water' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedCategory === 'water' && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">BOD (Biochemical Oxygen Demand)</span>
                          <span className="text-gray-900 font-medium">₱1,200.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">COD (Chemical Oxygen Demand)</span>
                          <span className="text-gray-900 font-medium">₱900.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">pH Level</span>
                          <span className="text-gray-900 font-medium">₱300.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Dissolved Solids</span>
                          <span className="text-gray-900 font-medium">₱500.00</span>
                        </div>
                      </div>
                      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Request Test
                      </button>
                    </div>
                  )}
                </div>

                {/* Nutrition Facts Analysis */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setExpandedCategory(expandedCategory === 'nutrition' ? null : 'nutrition')}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Nutrition Facts Analysis</h3>
                        <p className="text-sm text-gray-600">Comprehensive nutritional analysis for food products</p>
                      </div>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedCategory === 'nutrition' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedCategory === 'nutrition' && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Protein Content</span>
                          <span className="text-gray-900 font-medium">₱1,500.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Fat</span>
                          <span className="text-gray-900 font-medium">₱1,200.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Carbohydrates</span>
                          <span className="text-gray-900 font-medium">₱1,200.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Calories</span>
                          <span className="text-gray-900 font-medium">₱800.00</span>
                        </div>
                      </div>
                      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Request Test
                      </button>
                    </div>
                  )}
                </div>

                {/* Plant and Plant Extracts */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setExpandedCategory(expandedCategory === 'plant' ? null : 'plant')}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Plant and Plant Extracts</h3>
                        <p className="text-sm text-gray-600">Analysis of plant materials and extracts</p>
                      </div>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedCategory === 'plant' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedCategory === 'plant' && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Essential Oil Content</span>
                          <span className="text-gray-900 font-medium">₱2,000.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Alkaloid Analysis</span>
                          <span className="text-gray-900 font-medium">₱2,500.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Moisture Content</span>
                          <span className="text-gray-900 font-medium">₱500.00</span>
                        </div>
                      </div>
                      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Request Test
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Testing Schedule Info */}
              <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Testing Schedule</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Chemical Tests: MON-WED, before 2PM
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Water samples for BOD: WED only, before 10AM
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Samples accepted on confirmed dates only
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'microbiological' && (
            <div className="bg-purple-50 rounded-xl p-8 mb-12">
              {/* Existing Microbiological content */}
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900">Microbiological Testing Services</h2>
              </div>
              <p className="text-gray-600 mb-8">
                Our microbiology laboratory provides testing services to identify and quantify microorganisms in various samples, ensuring product safety and regulatory compliance.
              </p>

              {/* Service Categories */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors">
                  Food Safety
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors">
                  Water Analysis
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors">
                  Pathogen Detection
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors">
                  Sterility Testing
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors">
                  Shelf-life Studies
                </button>
              </div>

              {/* Tests Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Food Microbiological Tests */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Food Microbiological Tests</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Aerobic Plate Count, Conventional</span>
                      <span className="text-gray-900 font-medium">₱550.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Coliform Count, Conventional</span>
                      <span className="text-gray-900 font-medium">₱550.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Commercial Sterility Test</span>
                      <span className="text-gray-900 font-medium">₱2,000.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Salmonella Detection, PetriFilm</span>
                      <span className="text-gray-900 font-medium">₱1,000.00</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                    Request Food Testing
                  </button>
                </div>

                {/* Water Microbiological Tests */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Microbiological Tests</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Heterotrophic Plate Count</span>
                      <span className="text-gray-900 font-medium">₱550.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">MPN of Total Coliform</span>
                      <span className="text-gray-900 font-medium">₱550.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Confirmed test for E. coli</span>
                      <span className="text-gray-900 font-medium">₱1,000.00</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                    Request Water Testing
                  </button>
                </div>
              </div>

              {/* Testing Schedule Info */}
              <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Testing Schedule</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Microbiological Tests: MON-WED, before 2PM
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Salmonella Detection: MON-TUE, before 2PM
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Yeast and Mold Count: WED, before 2PM
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
            Regional Standards & Testing Laboratories
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Lorem ipsum dolor sit amet. Et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metrology Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/metrology-test.jpg"
                  alt="Metrology Testing"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Metrology Tests
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem
                </h3>
                <p className="text-gray-500 mb-6">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem eos internos dolore quo nostrum nihil.Et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <Link
                    href="/metrology"
                    className="text-blue-600 font-medium flex items-center hover:text-blue-700"
                  >
                    Learn More
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                href="/metrology/manager-registration"
                    className="bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center hover:bg-blue-800 transition-colors"
              >
                    I'm a Manager
              </Link>
                </div>
              </div>
            </div>

            {/* Chemical Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/chemical-test.jpg"
                  alt="Chemical Testing"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Chemical Tests
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem
                </h3>
                <p className="text-gray-500 mb-6">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem eos internos dolore quo nostrum nihil.Et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <Link
                    href="/chemistry"
                    className="text-blue-600 font-medium flex items-center hover:text-blue-700"
                  >
                    Learn More
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Microbiological Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/microbiology-test.jpg"
                  alt="Microbiological Testing"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Microbiological Tests
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem
                </h3>
                <p className="text-gray-500 mb-6">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem eos internos dolore quo nostrum nihil.Et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <Link
                    href="/microbiology"
                    className="text-blue-600 font-medium flex items-center hover:text-blue-700"
                  >
                    Learn More
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Shelf Life Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/shelf-life.jpg"
                  alt="Shelf Life Testing"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Shelf Life Tests
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem
                </h3>
                <p className="text-gray-500 mb-6">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem eos internos dolore quo nostrum nihil.Et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <Link
                    href="/shelf-life"
                    className="text-blue-600 font-medium flex items-center hover:text-blue-700"
                  >
                    Learn More
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />    
                    </svg>  
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ready to get started section */}
      <div className="py-12 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-start">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Ready to get started?</h2>
                <p className="text-gray-600 mb-6">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem eos internos dolore quo nostrum
                  nihil.Et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod.
                </p>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Lorem ipsum dolor sit amet
                  </div>
                </div>
              </div>
              <Link
                href="/pricing"
                className="flex items-center text-blue-600 font-medium hover:text-blue-700"
              >
                View Pricing
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Research Consultation Section */}
      <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header with Research Excellence Badge */}
              <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 rounded-full mb-4">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <span className="text-blue-600 text-sm font-medium">Research Excellence</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Expert Research Consultation</h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                      Get personalized guidance from our team of experienced researchers and scientists
                  </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Column - Image and Description */}
                  <div className="relative">
                      <div className="bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-2xl overflow-hidden">
                          <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-600 to-blue-800">
                              <div className="absolute inset-0 flex flex-col justify-center text-white p-8">
                                  <h3 className="text-2xl font-semibold mb-4">Advancing Research Together</h3>
                                  <p className="text-white/90 mb-6">
                                      Our consultation services bridge the gap between academic knowledge and practical application, helping you achieve breakthrough results in your research.
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Academic Research</span>
                                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Industry R&D</span>
                                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Method Development</span>
                                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Data Analysis</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="bg-white border-2 border-blue-500 py-10 px-10 rounded-2xl shadow-md mt-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            How Our Consultation Helps You
                          </h3>
                          <p className="text-gray-700">
                            Our research consultation services provide expert guidance tailored to your specific needs, whether you're a student working on a thesis, a researcher developing new methodologies, or an industry professional seeking innovation.
                          </p>
                        </div>


                  </div>

                  {/* Right Column - Features */}
                  <div className="space-y-8">
                      <div className="grid sm:grid-cols-2 gap-6">
                          {/* Academic Excellence */}
                          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                  </svg>
                              </div>
                              <h4 className="text-lg font-medium text-gray-900 mb-2">Academic Excellence</h4>
                              <p className="text-gray-600 text-sm mb-3">Specialized guidance for thesis, dissertation, and academic research projects.</p>
                              <div className="flex items-center text-sm text-blue-600">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Expert methodology review
                              </div>
                          </div>

                          {/* Technical Expertise */}
                          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                  </svg>
                              </div>
                              <h4 className="text-lg font-medium text-gray-900 mb-2">Technical Expertise</h4>
                              <p className="text-gray-600 text-sm mb-3">Access to specialized knowledge in chemical, physical, and biological sciences.</p>
                              <div className="flex items-center text-sm text-blue-600">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Advanced analytical techniques
                              </div>
                          </div>

                          {/* Publication Support */}
                          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                              </div>
                              <h4 className="text-lg font-medium text-gray-900 mb-2">Publication Support</h4>
                              <p className="text-gray-600 text-sm mb-3">Guidance on preparing research for publication in peer-reviewed journals.</p>
                              <div className="flex items-center text-sm text-blue-600">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Manuscript review and feedback
                              </div>
                          </div>

                          {/* Customized Solutions */}
                          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                  </svg>
                              </div>
                              <h4 className="text-lg font-medium text-gray-900 mb-2">Customized Solutions</h4>
                              <p className="text-gray-600 text-sm mb-3">Tailored research approaches designed to address your specific challenges.</p>
                              <div className="flex items-center text-sm text-blue-600">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Personalized research plans
                              </div>
                          </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 mt-8">
                          <a href="/research-consultation" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                              Schedule a Consultation
                              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* OneLab Information Section */}
      <div className="py-16 bg-white">
          <div className="w-full h-[200px] flex items-center bg-[#00ADF1] px-10">
              {/* Image on the left */}
              <div className="relative w-[300px] h-[150px] rounded-lg overflow-hidden">
                <img
                  src="/onelab-white.jpg"
                  alt="Onelabbanner"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>


      <div className="w-100% bg-[#DBEAFE] h-[55px] flex items-center justify-center">
            <p className="text-sm font-semibold text-blue-600 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              DOST V is a member of OneLab
            </p>
          </div>
      </div>
      <div className="bg-white">
        <div className="max-w-[98rem] bg-blue mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* What is OneLab Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-center mb-6">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900">What is OneLab?</h3>
              </div>
              <p className="text-gray-600 mb-4">
                OneLab is a network of laboratories that provides testing, calibration, and research services across the Philippines. It brings together various laboratories under the Department of Science and Technology (DOST) to offer a unified and accessible platform for scientific services.
              </p>
              <p className="text-gray-600">
                Through OneLab, clients can access a wide range of laboratory services without having to visit multiple facilities. This integrated approach streamlines the process of availing scientific testing and calibration services, making it more efficient and convenient for businesses, researchers, and the general public.
              </p>
            </div>

            {/* How does it work Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-center mb-6">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900">How does it work?</h3>
              </div>
              <p className="text-gray-600 mb-4">
                OneLab simplifies the process of accessing laboratory services through a unified system. Clients can submit samples to any OneLab member laboratory, and these samples will be routed to the appropriate testing facility within the network.
              </p>
              <p className="text-gray-600 mb-6">
                This collaborative approach eliminates the need for clients to identify and visit multiple laboratories for different testing requirements. The OneLab system handles the logistics, ensuring that samples reach the right laboratory with the necessary expertise and equipment.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    1
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Submit Request</p>
                    <p className="text-sm text-gray-600">Submit your sample at any OneLab member laboratory</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    2
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Sample Processing</p>
                    <p className="text-sm text-gray-600">Samples are routed to the appropriate testing facility</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    3
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Testing</p>
                    <p className="text-sm text-gray-600">Expert analysis using state-of-the-art equipment</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    4
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Results</p>
                    <p className="text-sm text-gray-600">Receive comprehensive test results and analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-blue-50 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Testing Services</h4>
                <p className="text-gray-600 text-center">Comprehensive analytical testing for food, water, materials, and more.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-blue-50 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Calibration</h4>
                <p className="text-gray-600 text-center">Precision calibration for instruments and measurement devices.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-blue-50 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Research Support</h4>
                <p className="text-gray-600 text-center">Scientific research assistance and collaborative opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* RSTL Services Procedure Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              How to Avail Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to access our laboratory testing and calibration services. We're here to make the process as smooth as possible for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Industrial/Commercial Testing */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">PROCEDURE FOR AVAILING OF RSTL SERVICES</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Sample Submission</h4>
                    <p className="mt-1 text-gray-600">Submit your sample at any OneLab member laboratory along with a completed request form.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Assessment and Payment</h4>
                    <p className="mt-1 text-gray-600">Laboratory staff will assess your testing requirements and provide a quotation. Payment must be made before testing begins.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Testing Process</h4>
                    <p className="mt-1 text-gray-600">Your samples will be tested according to standard procedures. If specialized testing is required, your sample may be referred to another OneLab member.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Results and Certification</h4>
                    <p className="mt-1 text-gray-600">Once testing is complete, you will receive a comprehensive report with your results. Digital copies are available upon request.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research and Development Testing */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">PROCEDURE FOR AVAILING OF RSTL SERVICES</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Research Proposal Submission</h4>
                    <p className="mt-1 text-gray-600">Submit your research proposal along with the testing requirements. Academic institutions may qualify for special rates.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Consultation and Planning</h4>
                    <p className="mt-1 text-gray-600">Meet with our laboratory experts to discuss your research needs and develop a testing plan that aligns with your objectives.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Sample Submission and Testing</h4>
                    <p className="mt-1 text-gray-600">Submit your samples according to the agreed schedule. Multiple testing phases may be arranged based on your research timeline.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Data Analysis and Reporting</h4>
                    <p className="mt-1 text-gray-600">Receive comprehensive test results with optional data analysis support from our research specialists.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* DOST V Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/dost-logo.png"
                  alt="DOST V Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <div>
                  <h3 className="font-bold">DOST V</h3>
                  <p className="text-sm">Regional Standards & Testing Laboratories</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                The Department of Science and Technology Region V (DOST V) provides scientific and technological services to support the development of industries, communities, and government agencies in Bicol Region.
              </p>
              <div className="flex items-center text-sm text-gray-300">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                DOST V Regional office Regional Government Center Site Rawis, Legazpi City 4500 Albay, Philippines
              </div>
            </div>

            {/* Our Services */}
            <div>
              <h3 className="font-bold mb-4">Our Services</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Metrology Testing</li>
                <li>Microbiology Testing</li>
                <li>Chemical Testing</li>
                <li>Shelf Life</li>
                <li>Research Consultancy</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Department of Science and Technology</p>
                <p>Regional Standard and Testing Laboratories</p>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Email: email@gmail.com
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone: 09123412332
                </div>
              </div>
            </div>

            {/* Connect With Us */}
            <div>
              <h3 className="font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-white hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
              <div className="text-sm text-gray-300">
                <h4 className="font-semibold mb-2">Office Hours</h4>
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Saturday, Sunday and Holidays: Closed</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            ©2025 Department of Science and Technology V. All right reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 