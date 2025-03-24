export default function MicrobiologyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Microbiology Department</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Testing Services</h2>
          <p className="text-gray-600">Schedule microbiological testing and view test results.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Lab Status</h2>
          <p className="text-gray-600">Check laboratory equipment status and maintenance schedules.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Reports</h2>
          <p className="text-gray-600">Access test reports and certificates.</p>
        </div>
      </div>
    </div>
  );
} 