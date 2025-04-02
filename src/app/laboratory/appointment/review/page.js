'use client';

export default function AppointmentReview() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Review Header */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">Review</h1>
                            <p className="text-sm text-gray-600">Please review your contact details for this testing request</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-base font-medium text-gray-900 mb-4">Summary</h2>

                <div className="space-y-6">
                    {/* Contact and Schedule Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h3 className="text-sm font-medium text-gray-900">Contact Information</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Name:</span>
                                    <span className="col-span-2 text-gray-900">John Doe</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Organization:</span>
                                    <span className="col-span-2 text-gray-900">Acme Research Labs</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Email:</span>
                                    <span className="col-span-2 text-gray-900">john.doe@acmelabs.com</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Phone:</span>
                                    <span className="col-span-2 text-gray-900">+1 (555) 123-4567</span>
                                </div>
                            </div>
                        </div>

                        {/* Scheduled Information */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-sm font-medium text-gray-900">Scheduled Information</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Date:</span>
                                    <span className="col-span-2 text-gray-900">March 22, 2025</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Time:</span>
                                    <span className="col-span-2 text-gray-900">10:30 AM</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Location:</span>
                                    <span className="col-span-2 text-gray-900">Main Laboratory, Building C</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Duration:</span>
                                    <span className="col-span-2 text-gray-900">Approximately 2 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Samples & Services */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            <h3 className="text-sm font-medium text-gray-900">Samples & Services</h3>
                        </div>

                        {/* Sample A */}
                        <div className="mb-6">
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Sample Name:</span>
                                    <span className="col-span-2 text-gray-900">Water Sample A</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Quantity:</span>
                                    <span className="col-span-2 text-gray-900">3 containers (500ml each)</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Sample Type:</span>
                                    <span className="col-span-2 text-gray-900">Environmental Water</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Tests:</span>
                                    <span className="col-span-2 text-gray-900">pH, Metals, Bacteria</span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                <span className="text-gray-500">Description:</span>
                                <p className="mt-1">Water samples collected from the north branch of Green River for environmental monitoring purposes. Samples were collected on March 15, 2025.</p>
                            </div>
                        </div>

                        {/* Sample B */}
                        <div>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Sample Name:</span>
                                    <span className="col-span-2 text-gray-900">Soil Sample B</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Quantity:</span>
                                    <span className="col-span-2 text-gray-900">2 containers (250g each)</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Sample Type:</span>
                                    <span className="col-span-2 text-gray-900">Agricultural Soil</span>
                                </div>
                                <div className="grid grid-cols-3 text-sm">
                                    <span className="text-gray-500">Tests:</span>
                                    <span className="col-span-2 text-gray-900">Nutrient Analysis, Pesticides</span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                <span className="text-gray-500">Description:</span>
                                <p className="mt-1">Soil samples from the eastern field of the Johnson Farm property. Samples were collected at 10cm depth on March 15, 2025.</p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-sm font-medium text-gray-900">Pricing</h3>
                        </div>

                        <div className="space-y-2">
                            <div className="grid grid-cols-2 text-sm">
                                <span className="text-gray-600">Base Testing Fees (Water Sample)</span>
                                <span className="text-right text-gray-900">$120.00</span>
                            </div>
                            <div className="grid grid-cols-2 text-sm">
                                <span className="text-gray-600">Base Testing Fees (Soil Sample)</span>
                                <span className="text-right text-gray-900">$95.00</span>
                            </div>
                            <div className="grid grid-cols-2 text-sm">
                                <span className="text-gray-600">Additional Tests (Pesticides)</span>
                                <span className="text-right text-gray-900">$75.00</span>
                            </div>
                            <div className="grid grid-cols-2 text-sm">
                                <span className="text-gray-600">Rush Processing Fee</span>
                                <span className="text-right text-gray-900">$50.00</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 mt-2">
                                <div className="grid grid-cols-2 text-sm font-medium">
                                    <span className="text-gray-900">Total Estimated Cost:</span>
                                    <span className="text-right text-gray-900">$340.00</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 italic mt-3">Final pricing may vary based on actual testing requirements.</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4">
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Edit Request
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Confirm Appointment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 