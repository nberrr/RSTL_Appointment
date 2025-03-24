export default function MetrologyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Metrology Department</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calibration Services</h2>
          <p className="text-gray-600">Schedule calibration appointments and view calibration history.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Equipment Status</h2>
          <p className="text-gray-600">Check the status of calibration equipment and maintenance schedules.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Reports</h2>
          <p className="text-gray-600">Access calibration reportssss and certificates.</p>
        </div>
      </div>
    </div>
  );
} 