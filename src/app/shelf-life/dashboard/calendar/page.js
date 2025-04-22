"use client";

import { useState } from "react";
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AdminLayout from "@/components/layout/AdminLayout";

const dummyAppointments = [
  {
    productName: "Organic Fruit Juice",
    company: "Natural Foods Inc.",
    requestDate: "4/1/2025",
    testingPeriod: "3 months",
    started: "dd --- yyyy",
    estEnd: "dd --- yyyy",
    status: "Pending",
    serviceType: "Accelerated Shelf Life Testing",
    // Contact Information
    contactPerson: "John Smith",
    email: "john.smith@naturalfoods.com",
    contactNo: "+1 (555) 123-4567",
    // Product Details
    productDescription: "A blend of organic fruits including apples, oranges, and berries. No added sugars or preservatives. Cold-pressed and bottled fresh.",
    quantity: "100 bottles",
    // Additional fields for modal
    objective: "Determine shelf life under ambient conditions",
    methodOfPreservation: "Pasteurization, Natural preservatives",
    productIngredients: "Organic apple juice, Organic orange juice, Citric acid, Ascorbic acid",
    netWeight: "500ml",
    companyAddress: "123 Organic Way, Green Valley, CA 94123",
    brandName: "Nature's Best",
    existingMarket: "US, Canada",
    productionType: "Company produced",
    packagingMaterial: "Glass bottle with plastic cap",
    targetShelfLife: "12 months at ambient temperature",
    modeOfDeterioration: [
      "Color change",
      "Flavor loss",
      "Microbial growth",
      "Vitamin degradation",
      "Sedimentation"
    ],
    existingPermits: "FDA, USDA Organic"
  },
  {
    productName: "Vitamin Supplement",
    company: "HealthPlus Co.",
    requestDate: "3/28/2025",
    testingPeriod: "6 months",
    started: "29 Mar 2025",
    estEnd: "29 Sep 2025",
    status: "In Progress",
    serviceType: "Real-Time Shelf Life Testing",
    // Contact Information
    contactPerson: "Sarah Johnson",
    email: "sarah.j@healthplus.com",
    contactNo: "+1 (555) 234-5678",
    // Product Details 
    productDescription: "Daily multivitamin supplement formulated with essential vitamins and minerals. Suitable for adults aged 18-65.",
    quantity: "500 bottles",
    objective: "Evaluate vitamin stability and potency",
    methodOfPreservation: "Hermetic sealing, Desiccant",
    productIngredients: "Vitamins A, B, C, D, E, Minerals, Binding agents",
    netWeight: "60 tablets",
    companyAddress: "456 Health Street, Wellness City, NY 10001",
    brandName: "VitaPlus",
    existingMarket: "US, EU",
    productionType: "Company produced",
    packagingMaterial: "HDPE bottle with child-resistant cap",
    targetShelfLife: "24 months at room temperature",
    modeOfDeterioration: [
      "Vitamin degradation",
      "Moisture absorption",
      "Color change",
      "Tablet hardness change"
    ],
    existingPermits: "FDA, GMP Certified"
  },
  {
    productName: "Protein Bar",
    company: "FitLife Products",
    requestDate: "3/25/2025",
    testingPeriod: "4 months",
    started: "dd --- yyyy",
    estEnd: "dd --- yyyy",
    status: "Declined",
    serviceType: "Accelerated Shelf Life Testing",
    // Contact Information
    contactPerson: "Mike Wilson",
    email: "mike.w@fitlife.com",
    contactNo: "+1 (555) 345-6789",
    // Product Details
    productDescription: "High-protein nutrition bar made with natural ingredients. Perfect for pre or post-workout nutrition.",
    quantity: "200 boxes (12 bars each)",
    objective: "Assess texture and nutritional stability",
    methodOfPreservation: "Modified atmosphere packaging",
    productIngredients: "Whey protein, Nuts, Dates, Natural flavors",
    netWeight: "60g",
    companyAddress: "789 Fitness Ave, Sport City, CA 90210",
    brandName: "PowerFit",
    existingMarket: "US",
    productionType: "Company produced",
    packagingMaterial: "Metallized film wrapper",
    targetShelfLife: "12 months at ambient temperature",
    modeOfDeterioration: [
      "Texture change",
      "Rancidity",
      "Protein degradation",
      "Moisture migration"
    ],
    existingPermits: "FDA, HACCP"
  },
  {
    productName: "Canned Vegetables",
    company: "Green Valley Foods",
    requestDate: "3/30/2025",
    testingPeriod: "12 months",
    started: "dd --- yyyy",
    estEnd: "dd --- yyyy",
    status: "Pending",
    serviceType: "Real-Time Shelf Life Testing",
    // Contact Information
    contactPerson: "Emily Chen",
    email: "emily.c@greenvalley.com",
    contactNo: "+1 (555) 456-7890",
    // Product Details
    productDescription: "Mixed vegetables preserved in brine. Includes carrots, peas, corn, and green beans. Sourced from local organic farms.",
    quantity: "300 cans",
    objective: "Verify commercial sterility and quality retention",
    methodOfPreservation: "Thermal processing, Hermetic sealing",
    productIngredients: "Mixed vegetables, Water, Salt",
    netWeight: "400g",
    companyAddress: "321 Valley Road, Green City, OR 97201",
    brandName: "Valley Fresh",
    existingMarket: "US, Canada, Mexico",
    productionType: "Company produced",
    packagingMaterial: "Tin-free steel can with easy-open lid",
    targetShelfLife: "24 months at ambient temperature",
    modeOfDeterioration: [
      "Color change",
      "Texture softening",
      "Nutrient loss",
      "Flavor changes"
    ],
    existingPermits: "FDA, FSSC 22000"
  },
  {
    productName: "Dairy-Free Yogurt",
    company: "Plant Based Foods Ltd.",
    requestDate: "3/29/2025",
    testingPeriod: "2 months",
    started: "29 Mar 2025",
    estEnd: "29 May 2025",
    status: "Completed",
    serviceType: "Accelerated Shelf Life Testing",
    // Contact Information
    contactPerson: "Lisa Brown",
    email: "lisa.b@plantbased.com",
    contactNo: "+1 (555) 567-8901",
    // Product Details
    productDescription: "Coconut-based probiotic yogurt alternative. Rich in live cultures and fortified with calcium.",
    quantity: "150 cases (24 units each)",
    objective: "Evaluate probiotic viability and texture stability",
    methodOfPreservation: "Cold chain, Live cultures",
    productIngredients: "Coconut milk, Probiotics, Natural flavors, Pectin",
    netWeight: "150g",
    companyAddress: "567 Plant Street, Vegan Valley, CA 94110",
    brandName: "CocoYo",
    existingMarket: "US West Coast",
    productionType: "Company produced",
    packagingMaterial: "PP container with foil seal",
    targetShelfLife: "45 days at refrigerated temperature",
    modeOfDeterioration: [
      "pH change",
      "Probiotic die-off",
      "Texture separation",
      "Off-flavors"
    ],
    existingPermits: "FDA, Organic Certified"
  }
];

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: "px-2 py-1 text-xs rounded-full inline-flex items-center bg-yellow-50 text-yellow-800 flex items-center gap-1 before:w-1.5 before:h-1.5 before:bg-yellow-500 before:rounded-full",
    "In Progress": "px-2 py-1 text-xs rounded-full inline-flex items-center bg-blue-50 text-blue-800 flex items-center   before:rounded-full",
    Declined: "px-2 py-1 text-xs rounded-full inline-flex items-center bg-red-50 text-red-800 flex items-center   before:rounded-full",
    Completed: "px-2 py-1 text-xs rounded-full inline-flex items-center bg-green-50 text-green-800 flex items-center   before:rounded-full",
    Failed: "px-2 py-1 text-xs rounded-full inline-flex items-center bg-red-100 text-red-900 flex items-center   before:rounded-full",
    Cancelled: "px-2 py-1 text-xs rounded-full inline-flex items-center bg-gray-50 text-gray-800 flex items-center   before:rounded-full"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm border ${statusStyles[status]}`}>
      {status === "In Progress" && (
        <span className="inline-block "></span>
      )}
      {status === "Pending" && (
        <span className="inline-block"></span>
      )}
      {status}
    </span>
  );
};

const DateEditModal = ({ isOpen, onClose, product, onSave }) => {
  const [startDate, setStartDate] = useState(product?.started || "");
  const [endDate, setEndDate] = useState(product?.estEnd || "");

  if (!isOpen || !product) return null;

  const calculateDuration = (start, end) => {
    if (!start || !end || start === "dd --- yyyy" || end === "dd --- yyyy") return "";
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const weeks = Math.floor((diffDays % 30) / 7);
    const days = diffDays % 7;
    
    const parts = [];
    
    if (years > 0) {
      parts.push(`${years} year${years > 1 ? 's' : ''}`);
    }
    if (months > 0) {
      parts.push(`${months} month${months > 1 ? 's' : ''}`);
    }
    if (weeks > 0) {
      parts.push(`${weeks} week${weeks > 1 ? 's' : ''}`);
    }
    if (days > 0) {
      parts.push(`${days} day${days > 1 ? 's' : ''}`);
    }
    
    return parts.join(', ') || '0 days';
  };

  const handleSave = () => {
    const duration = calculateDuration(startDate, endDate);
    onSave({
      started: startDate,
      estEnd: endDate,
      testingPeriod: duration
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Test Dates</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">Update test start and estimated completion dates</p>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Product</h3>
          <p className="text-gray-700">{product.productName}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Test Started Date</label>
            <input
              type="date"
              value={startDate !== "dd --- yyyy" ? startDate : ""}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estimated Completion Date</label>
            <input
              type="date"
              value={endDate !== "dd --- yyyy" ? endDate : ""}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Testing Period</label>
            <p className="text-sm text-gray-700">{calculateDuration(startDate, endDate) || "Not set"}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const ActionButtons = ({ status, appointment, onDateEdit, onAccept, onDecline, onCancel, onViewDetails }) => {
  if (status === "Pending") {
    return (
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => onAccept(appointment)}
          className="p-2 text-green-600 hover:bg-green-50 rounded-full"
          title="Accept appointment"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
        <button 
          onClick={() => onDecline(appointment)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          title="Decline appointment"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button 
          onClick={() => onViewDetails(appointment)}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
          title="View details"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    );
  }

  if (status === "In Progress") {
    return (
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => onDateEdit(appointment)}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
          title="Edit test dates"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <button 
          onClick={() => onCancel(appointment)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          title="Cancel test"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button 
          onClick={() => onViewDetails(appointment)}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
          title="View details"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => onViewDetails(appointment)}
      className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
      title="View details"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  );
};

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-4 w-full max-w-5xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white pb-4 mb-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-gray-900">{product.productName}</h2>
                <StatusBadge status={product.status} />
              </div>
              <p className="text-gray-600">{product.company}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="bg-white border border-blue-100 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
                <h3 className="text-sm font-semibold text-blue-900">Contact Information</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">Contact Person</label>
                  <p className="text-sm text-gray-900 mt-1">{product.contactPerson}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Email</label>
                  <p className="text-sm text-gray-900 mt-1">{product.email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Contact Number</label>
                  <p className="text-sm text-gray-900 mt-1">{product.contactNo}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Company Address</label>
                  <p className="text-sm text-gray-900 mt-1">{product.companyAddress}</p>
                </div>
              </div>
            </div>

            {/* Test Status */}
            <div className="bg-white border border-purple-100 rounded-lg overflow-hidden">
              <div className="bg-purple-50 px-4 py-2 border-b border-purple-100">
                <h3 className="text-sm font-semibold text-purple-900">Test Status</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">Service Type</label>
                  <p className="text-sm text-gray-900 mt-1">{product.serviceType}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Request Date</label>
                  <p className="text-sm text-gray-900 mt-1">{product.requestDate}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Testing Period</label>
                  <p className="text-sm text-gray-900 mt-1">{product.testingPeriod}</p>
                </div>
                {product.status === "In Progress" && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Started</label>
                      <p className="text-sm text-gray-900 mt-1">{product.started}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Est. End</label>
                      <p className="text-sm text-gray-900 mt-1">{product.estEnd}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            <div className="bg-white border border-green-100 rounded-lg overflow-hidden">
              <div className="bg-green-50 px-4 py-2 border-b border-green-100">
                <h3 className="text-sm font-semibold text-green-900">Product Information</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">Brand Name</label>
                  <p className="text-sm text-gray-900 mt-1">{product.brandName}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Net Weight</label>
                  <p className="text-sm text-gray-900 mt-1">{product.netWeight}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Quantity for Testing</label>
                  <p className="text-sm text-gray-900 mt-1">{product.quantity}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Description</label>
                  <p className="text-sm text-gray-900 mt-1">{product.productDescription}</p>
                </div>
              </div>
            </div>

            {/* Test Details */}
            <div className="bg-white border border-amber-100 rounded-lg overflow-hidden">
              <div className="bg-amber-50 px-4 py-2 border-b border-amber-100">
                <h3 className="text-sm font-semibold text-amber-900">Test Details</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">Objective</label>
                  <p className="text-sm text-gray-900 mt-1">{product.objective}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Target Shelf Life</label>
                  <p className="text-sm text-gray-900 mt-1">{product.targetShelfLife}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Method of Preservation</label>
                  <p className="text-sm text-gray-900 mt-1">{product.methodOfPreservation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Technical Details</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">Packaging Material</label>
                  <p className="text-sm text-gray-900 mt-1">{product.packagingMaterial}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Production Type</label>
                  <p className="text-sm text-gray-900 mt-1">{product.productionType}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Existing Market</label>
                  <p className="text-sm text-gray-900 mt-1">{product.existingMarket}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Existing Permits</label>
                  <p className="text-sm text-gray-900 mt-1">{product.existingPermits}</p>
                </div>
              </div>
            </div>

            {/* Mode of Deterioration */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Mode of Deterioration</h3>
              </div>
              <div className="p-4">
                <ul className="list-disc pl-5 text-sm text-gray-900 space-y-1">
                  {product.modeOfDeterioration.map((mode, index) => (
                    <li key={index}>{mode}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Full Width Section */}
          <div className="col-span-full">
            {/* Ingredients */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Product Ingredients</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-900">{product.productIngredients}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DateInput = ({ value, onChange, disabled }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-32 px-2 py-1 rounded border ${
        disabled 
          ? 'bg-gray-50 text-gray-500' 
          : 'border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
      }`}
    />
  );
};

export default function ShelfLifePage() {
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDateEditModalOpen, setIsDateEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null
  });

  const showConfirmation = (title, message, onConfirm) => {
    setConfirmationModal({
      isOpen: true,
      title,
      message,
      onConfirm
    });
  };

  const handleAccept = (appointment) => {
    showConfirmation(
      "Accept Appointment",
      `Are you sure you want to accept the shelf life testing appointment for ${appointment.productName}?`,
      () => {
        const newAppointments = appointments.map(app => {
          if (app.productName === appointment.productName) {
            return {
              ...app,
              status: "In Progress",
              started: "dd --- yyyy",
              estEnd: "dd --- yyyy"
            };
          }
          return app;
        });
        setAppointments(newAppointments);
        const updatedAppointment = newAppointments.find(app => app.productName === appointment.productName);
        setSelectedAppointment(updatedAppointment);
        setIsDateEditModalOpen(true);
      }
    );
  };

  const handleDecline = (appointment) => {
    showConfirmation(
      "Decline Appointment",
      `Are you sure you want to decline the shelf life testing appointment for ${appointment.productName}?`,
      () => {
        const newAppointments = appointments.map(app => {
          if (app.productName === appointment.productName) {
            return {
              ...app,
              status: "Declined"
            };
          }
          return app;
        });
        setAppointments(newAppointments);
      }
    );
  };

  const handleCancel = (appointment) => {
    const newStatus = appointment.status === "In Progress" ? "Cancelled" : "Declined";
    const message = appointment.status === "In Progress" 
      ? `Are you sure you want to cancel the shelf life test for ${appointment.productName}? This action cannot be undone.`
      : `Are you sure you want to decline the shelf life testing appointment for ${appointment.productName}?`;
    const title = appointment.status === "In Progress" ? "Cancel Test" : "Decline Appointment";

    showConfirmation(
      title,
      message,
      () => {
        const newAppointments = appointments.map(app => {
          if (app.productName === appointment.productName) {
            return {
              ...app,
              status: newStatus,
              // Reset dates only if cancelling an in-progress test
              ...(appointment.status === "In Progress" && {
                started: "dd --- yyyy",
                estEnd: "dd --- yyyy"
              })
            };
          }
          return app;
        });
        setAppointments(newAppointments);
      }
    );
  };

  const handleDateEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDateEditModalOpen(true);
  };

  const handleDateSave = (dates) => {
    const newAppointments = appointments.map(appointment => {
      if (appointment.productName === selectedAppointment.productName) {
        return {
          ...appointment,
          ...dates
        };
      }
      return appointment;
    });
    setAppointments(newAppointments);
  };

  const handleRowClick = (appointment) => {
    setSelectedProduct(appointment);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="h-screen flex flex-col">
        <DashboardNav/>
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar/>
          <main className="flex-1 bg-gray-100 p-5">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
              {/* Left Sidebar */}
              <div className="space-y-4">
                {/* Calendar Card */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <div className="text-center mb-4">
                      <h3 className="text-base font-medium">April 2025</h3>
                    </div>
                    <div className="grid grid-cols-7 text-sm">
                      <div className="text-center p-2">Su</div>
                      <div className="text-center p-2">Mo</div>
                      <div className="text-center p-2">Tu</div>
                      <div className="text-center p-2">We</div>
                      <div className="text-center p-2">Th</div>
                      <div className="text-center p-2">Fr</div>
                      <div className="text-center p-2">Sa</div>
                      <div className="text-center p-2 text-gray-400">31</div>
                      {Array.from({ length: 30 }, (_, i) => (
                        <div
                          key={i + 1}
                          className={`text-center p-2 ${
                            [1, 2, 3, 6, 7, 13, 14, 21, 22, 24, 25, 29].includes(i + 1)
                              ? "text-green-700 bg-green-50"
                              : [4, 8, 9, 15, 16, 20, 23, 28, 30].includes(i + 1)
                              ? "text-red-700 bg-red-50"
                              : ""
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testing Status */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <h2 className="text-base font-medium mb-3">Testing Status</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                      <span className="text-sm font-medium">
                        {appointments.filter(app => app.status === "Pending").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                        <span className="text-sm">In Progress</span>
                      </div>
                      <span className="text-sm font-medium">
                        {appointments.filter(app => app.status === "In Progress").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                        <span className="text-sm">Completed</span>
                      </div>
                      <span className="text-sm font-medium">
                        {appointments.filter(app => app.status === "Completed").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-400 mr-2"></div>
                        <span className="text-sm">Declined</span>
                      </div>
                      <span className="text-sm font-medium">
                        {appointments.filter(app => app.status === "Declined").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                        <span className="text-sm">Cancelled</span>
                      </div>
                      <span className="text-sm font-medium">
                        {appointments.filter(app => app.status === "Cancelled").length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h1 className="text-xl font-semibold">Shelf Life Testing Appointments</h1>
                      <p className="text-sm text-gray-500">Manage product shelf life testing requests</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="relative flex-1 max-w-lg">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>All Status</option>
                        <option>Oldest</option>
                        <option>Newest</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Declined</option>
                      </select>
                     
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Weight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.map((appointment, index) => (
                        <tr 
                          key={index}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {appointment.contactPerson}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {appointment.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.company}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.netWeight}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.requestDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={appointment.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <ActionButtons 
                              status={appointment.status} 
                              appointment={appointment}
                              onDateEdit={handleDateEdit}
                              onAccept={handleAccept}
                              onDecline={handleDecline}
                              onCancel={handleCancel}
                              onViewDetails={handleRowClick}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <ProductDetailsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              product={selectedProduct}
            />

            <DateEditModal
              isOpen={isDateEditModalOpen}
              onClose={() => setIsDateEditModalOpen(false)}
              product={selectedAppointment}
              onSave={handleDateSave}
            />

            <ConfirmationModal
              isOpen={confirmationModal.isOpen}
              onClose={() => setConfirmationModal({ ...confirmationModal, isOpen: false })}
              onConfirm={confirmationModal.onConfirm}
              title={confirmationModal.title}
              message={confirmationModal.message}
            />
          </main>
        </div>
      </div>
    </AdminLayout>
  );
} 