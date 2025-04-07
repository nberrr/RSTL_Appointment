'use client';
import { useState } from 'react';
import Link from "next/link";

export default function ShelfLifePage() {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState('Services');

  const toggleQuestion = (index) => {
    if (openQuestion === index) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(index);
    }
  };

  const faqQuestions = [
    {
      question: "What types of calibration services do you offer?",
      answer: "We provide comprehensive calibration services for various measuring instruments, including dimensional, electrical, temperature, pressure, and mass calibration. All our services comply with ISO/IEC 17025 standards.",
      category: "Services",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      )
    },
    {
      question: "How long does the calibration process take?",
      answer: "Standard calibration typically takes 3-5 business days, depending on the instrument type and workload. We also offer expedited services for urgent requirements at an additional cost.",
      category: "Process",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      )
    },
    {
      question: "What documentation do I receive after calibration?",
      answer: "You'll receive a detailed calibration certificate that includes measurement data, traceability information, and uncertainty values. All certificates are ISO 17025 compliant and recognized internationally.",
      category: "Certification",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      )
    },
    {
      question: "Do you provide on-site calibration services?",
      answer: "Yes, we offer on-site calibration for certain types of equipment when moving them is impractical or could affect their calibration. Contact us to discuss your specific needs and requirements.",
      category: "Services",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      )
    },
    {
      question: "How often should I calibrate my instruments?",
      answer: "Calibration frequency depends on factors like usage, environment, and accuracy requirements. We can help you establish an appropriate calibration interval based on your specific needs and industry standards.",
      category: "Process",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      )
    }
  ];

  const tabs = ['Services', 'Process', 'Certification', 'Support'];
  const filteredQuestions = faqQuestions.filter(faq => faq.category === activeTab);

  return (
    <div>
      <div className="max-w-full mx-auto pt-12">
        <div className="max-w-[100rem] mx-auto bg-[#F2F7FF] flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side - Text content */}
          <div className="max-w-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Shelf Life  Testing Services</h1>
          <p className="text-gray-600 text-lg mb-8">
            Lorem ipsum dolor sit amet. Et quasi veniam et dicta aperiam non nemo illum ut exercitationem quod. Eum ipsum quidem rem rerum neque qui enim molestiae non illum harum non beatae voluptas sed temporibus quisquam est nemo.
          </p>
          <div className="flex gap-4">
                {/* Button with Link */}
                <Link href="/laboratory/appointment">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Get Scheduled
                  </button>
                </Link>
              </div>
        </div>

        {/* Right side - Image */}
        <div className="relative w-full md:w-1/2 h-[400px] bg-gray-100 rounded-lg overflow-hidden">
          <img
            src="/chem1.jpg"
            alt="Microbiology Testing Laboratory"
            className="w-full h-full object-cover"
          />
          {/* Decorative overlay */}
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
        </div>
      </div>

        {/* How It Works Section */}
        <div className="max-w-[76rem] mx-auto mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes laboratory testing simple and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-gray-400 text-sm mb-2">01</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule</h3>
              <p className="text-gray-600 text-sm">
                Book your appointment online or by phone
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-gray-400 text-sm mb-2">02</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sample Submission</h3>
              <p className="text-gray-600 text-sm">
                Drop off or ship your samples to our lab
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="text-gray-400 text-sm mb-2">03</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Testing</h3>
              <p className="text-gray-600 text-sm">
                Our experts analyze your samples with precision
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-gray-400 text-sm mb-2">04</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Results</h3>
              <p className="text-gray-600 text-sm">
                Receive detailed reports and analysis
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
              <Link href="/metrology/appointment">
                <button className="bg-[#2563EB] text-white px-6 py-3 rounded-md font-medium flex items-center hover:bg-[#395490] transition-colors">
                  Schedule Your Test Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>
        </div>

        {/* Why Choose Our Laboratory Services Section */}
        <div className="bg-white py-24">
          <div className="max-w-[96rem] mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 px-6">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Why Choose Our Laboratory Services
                </h2>
                <p className="text-gray-600 mb-8">
                  We combine cutting-edge technology with expert analysis to deliver accurate, reliable results for all your testing needs.
                </p>

                <div className="space-y-6">
                  {/* Fast Turnaround Times */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Fast Turnaround Times</h3>
                      <p className="text-gray-600">Get your results quickly with our efficient testing processes</p>
                    </div>
                  </div>

                  {/* Accredited Facilities */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Accredited Facilities</h3>
                      <p className="text-gray-600">ISO 17025 accredited laboratories with certified professionals</p>
                    </div>
                  </div>

                  {/* Precision & Accuracy */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Precision & Accuracy</h3>
                      <p className="text-gray-600">State-of-the-art equipment and rigorous quality control</p>
                    </div>
                  </div>

                  {/* Expert Consultation */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Expert Consultation</h3>
                      <p className="text-gray-600">Access to scientists and specialists for result interpretation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side image */}
              <div className="w-full lg:w-1/2">
                <div className="relative h-[500px] rounded-lg overflow-hidden">
                  <img
                    src="/shelf-life.jpg"
                    alt="Laboratory Equipment"
                    className="w-full h-full object-cover"
                  />
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

         {/* FAQ Section */}
         <div className="max-w-[96rem] mx-auto mt-24">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
                      <p className="text-gray-600">
                        Common questions about our metrology services.
                        Can't find what you're looking for? <a href="#" className="text-blue-600 hover:underline"></a>
                      </p>
                    </div>

                    {/* FAQ Questions */}
                    <div className="max-w-[80rem] mx-auto space-y-4">
                      {faqQuestions.map((faq, index) => (
                        <div key={index} className="border rounded-lg hover:bg-gray-50">
                          <button
                            onClick={() => toggleQuestion(index)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {faq.icon}
                              </svg>
                              <span className="text-gray-900">{faq.question}</span>
                            </div>
                            <svg
                              className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                                openQuestion === index ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <div
                            className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                              openQuestion === index ? 'max-h-40 pb-4' : 'max-h-0'
                            }`}
                          >
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                      {faqQuestions.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No questions available for this category.</p>
                        </div>
                      )}
                    </div>
                  </div>

        {/* Footer */}
        <footer className="bg-[#1e3a8a] text-white mt-24">
          <div className="max-w-[98rem] mx-auto px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Column 1 - DOST Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <img 
                    src="/dost-logo.png" 
                    alt="DOST Logo" 
                    className="h-12 w-12"
                  />
                  <div>
                    <div className="font-semibold">DOST V</div>
                    <div className="text-sm text-gray-300">Regional Standards & Testing Laboratories</div>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  The Department of Science and Technology Region V (DOST V) provides scientific and technological services to support the development of industries, communities, and government agencies in Bicol Region.
                </p>
                <p className="text-sm text-gray-300">
                  DOST V Regional office Regional<br />
                  Government Center Site Rawis, Legazpi<br />
                  City 4500 Albay, Philippines
                </p>
              </div>

              {/* Column 2 - Our Services */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Our Services</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li><a href="/metrology" className="hover:text-white">Metrology Testing</a></li>
                  <li><a href="/microbiology" className="hover:text-white">Microbiology Testing</a></li>
                  <li><a href="/chemical" className="hover:text-white">Chemical Testing</a></li>
                  <li><a href="/shelf-life" className="hover:text-white">Shelf Life</a></li>
                  <li><a href="/research" className="hover:text-white">Research Consultancy</a></li>
                </ul>
              </div>

              {/* Column 3 - Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Contact</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>Department of Science and Technology</p>
                  <p>Regional Standard and Testing Laboratories</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Email: email@gmail.com
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Phone: 09123412332
                  </div>
                </div>
              </div>

              {/* Column 4 - Connect With Us */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Connect With Us</h3>
                <div className="flex gap-4 mb-6">
                  <a href="#" className="hover:text-gray-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-gray-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-gray-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.995 17.176c-.198.47-.812.862-1.702.862H8.707c-.89 0-1.504-.392-1.702-.862a2.438 2.438 0 01-.131-.593l-.09-.77-.09-.77a2.438 2.438 0 01.131-.592c.198-.47.812-.863 1.702-.863h6.586c.89 0 1.504.393 1.702.863.088.209.132.423.131.592l.09.77.09.77c.001.17-.043.384-.131.593z"/>
                    </svg>
                  </a>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Office Hours</h4>
                  <p className="text-sm text-gray-300">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-sm text-gray-300">Saturday, Sunday and Holidays: Closed</p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-16 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
              © 2025 Department of Science and Technology V. All right reserved.
            </div>
          </div>  
        </footer>
      </div>
  </div>
  );
} 

