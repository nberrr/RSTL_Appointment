'use client';

export default function SampleDetails({ 
  appointment, 
  onChange, 
  errors = {},
  hasAttemptedSubmit,
  disabled = false
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  
  const getInputClasses = (fieldName) => {
    const baseClasses = "block w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors";
    
    if (hasAttemptedSubmit && errors[fieldName]) {
      return `${baseClasses} border-red-400 bg-red-50 text-red-800 disabled:opacity-75`;
    }
    
    return `${baseClasses} border-gray-300 bg-white disabled:opacity-75 disabled:bg-gray-100`;
  };

  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-3">Sample Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sampleName" className="block text-sm font-medium text-gray-700 mb-1">
            Sample Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="sampleName"
            name="sampleName"
            value={appointment.sampleName}
            onChange={handleChange}
            placeholder="Enter the sample name"
            className={getInputClasses("sampleName")}
            disabled={disabled}
          />
          {hasAttemptedSubmit && errors.sampleName && (
            <p className="mt-1 text-sm text-red-600">{errors.sampleName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="sampleType" className="block text-sm font-medium text-gray-700 mb-1">
            Sample Type
          </label>
          <select
            id="sampleType"
            name="sampleType"
            value={appointment.sampleType}
            onChange={handleChange}
            className={getInputClasses("sampleType")}
            disabled={disabled}
          >
            <option value="">Select sample type</option>
            <option value="Food">Food</option>
            <option value="Water">Water</option>
            <option value="Soil">Soil</option>
            <option value="Chemical">Chemical</option>
            <option value="Plant Tissue">Plant Tissue</option>
            <option value="Biological Material">Biological Material</option>
            <option value="Packaging Material">Packaging Material</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={appointment.quantity}
            onChange={handleChange}
            placeholder="Enter quantity (e.g., 2 liters, 500g)"
            className={getInputClasses("quantity")}
            disabled={disabled}
          />
          {hasAttemptedSubmit && errors.quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Date <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="preferredDate"
            name="preferredDate"
            value={appointment.preferredDate}
            disabled={true}
            className={`${getInputClasses("preferredDate")} cursor-not-allowed bg-gray-50`}
          />
          {hasAttemptedSubmit && errors.preferredDate && (
            <p className="mt-1 text-sm text-red-600">{errors.preferredDate}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Select a date from the calendar above</p>
        </div>
      </div>
      
      <div>
        <label htmlFor="sampleDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Sample Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="sampleDescription"
          name="sampleDescription"
          value={appointment.sampleDescription}
          onChange={handleChange}
          rows={4}
          placeholder="Provide a detailed description of the sample including relevant characteristics"
          className={getInputClasses("sampleDescription")}
          disabled={disabled}
        />
        {hasAttemptedSubmit && errors.sampleDescription && (
          <p className="mt-1 text-sm text-red-600">{errors.sampleDescription}</p>
        )}
      </div>
    </div>
  );
} 