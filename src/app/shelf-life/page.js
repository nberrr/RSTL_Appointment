export default function ShelfLifePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shelf Life Department</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shelf Life Studies</h2>
          <p className="text-gray-600">Schedule shelf life studies and view study results.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Storage Conditions</h2>
          <p className="text-gray-600">Monitor storage conditions and environmental parameters.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Reports</h2>
          <p className="text-gray-600">Access study reports and certificates.</p>
        </div>
      </div>
    </div>
  );
} 