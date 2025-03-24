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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/metrology-test.jpg"
                  alt="Metrology Testing"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Metrology Tests
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem non internos dolore quis nostrum ullus.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <Link
                    href="/metrology"
                    className="text-blue-600 font-medium flex items-center hover:text-blue-700"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm font-medium">
                    I'm a Manager
                  </button>
                </div>
              </div>
            </div>

            {/* Chemical Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/chemical-test.jpg"
                  alt="Chemical Testing"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Chemical Tests
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem non internos dolore quis nostrum ullus.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <Link
                    href="/chemistry"
                    className="text-blue-600 font-medium flex items-center hover:text-blue-700"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm font-medium">
                    I'm a Manager
                  </button>
                </div>
              </div>
            </div>

            {/* Microbiological Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/microbiology-test.jpg"
                  alt="Microbiological Testing"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Microbiological Tests
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet. Ab ullam dolorem non internos dolore quis nostrum ullus.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <Link
                    href="/microbiology"
                    className="text-blue-600 font-medium flex items-center hover:text-blue-700"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm font-medium">
                    I'm a Manager
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 