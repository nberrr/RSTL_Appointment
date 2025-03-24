"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px] bg-blue-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Laboratory Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold text-white mb-2">DOST-V</h1>
            <h2 className="text-3xl font-semibold text-white mb-2">Appointment Portal</h2>
            <p className="text-xl text-white mb-4">Regional Standards & Testing Laboratories</p>
            <p className="text-gray-200 mb-8">
              Lorem ipsum dolor sit amet. Et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod. Eum ipsum quidem rem natus neque qui illum natum non beatae voluptas sed temporibus quibusdam est nemo.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/schedule"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Get Scheduled
              </Link>
              <Link
                href="/manager"
                className="bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center"
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

      {/* Services Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
            Regional Standards & Testing Laboratories
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Lorem ipsum dolor sit amet. Et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    I'm a Manager
                  </button>
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
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          </div>
        </div>
      </div>

      {/* Ready to get started section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Research Consultancy section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet. Ab ullam dolorem eos internos dolore quo nostrum
              nihil et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="09-XXX-XXXX-XXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      School / University
                    </label>
                    <input
                      type="text"
                      id="institution"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your institution"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="researchType" className="block text-sm font-medium text-gray-700 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Type of Research
                      </label>
                      <select
                        id="researchType"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select type</option>
                        <option value="chemical">Chemical</option>
                        <option value="microbiological">Microbiological</option>
                        <option value="metrology">Metrology</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="yearLevel" className="block text-sm font-medium text-gray-700 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Year Level
                      </label>
                      <input
                        type="text"
                        id="yearLevel"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter year level"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="researchTitle" className="block text-sm font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Research Title
                    </label>
                    <input
                      type="text"
                      id="researchTitle"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your research title"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Appointment */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule Appointment
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      id="appointmentDate"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg h-64">
                    {/* Calendar placeholder */}
                    <p className="text-center text-gray-500 mt-24">Calendar</p>
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      Brief Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Briefly describe your research and consultational needs"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Make an appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 