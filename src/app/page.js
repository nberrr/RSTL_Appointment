"use client";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">RSTL Appointment Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metrology Card */}
        <a href="/metrology" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Metrology</h2>
            <p className="text-gray-600">Schedule calibration appointments and manage equipment.</p>
          </div>
        </a>

        {/* Microbiology Card */}
        <a href="/microbiology" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Microbiology</h2>
            <p className="text-gray-600">Schedule microbiological testing and view results.</p>
          </div>
        </a>

        {/* Chemistry Card */}
        <a href="/chemistry" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Chemistry</h2>
            <p className="text-gray-600">Schedule chemical analysis and access reports.</p>
          </div>
        </a>

        {/* Shelf Life Card */}
        <a href="/shelf-life" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">Shelf Life</h2>
            <p className="text-gray-600">Schedule shelf life studies and monitor conditions.</p>
          </div>
        </a>
      </div>
    </div>
  );
} 