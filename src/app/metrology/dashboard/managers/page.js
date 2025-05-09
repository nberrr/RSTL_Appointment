'use client';
import { useEffect, useState } from 'react';
import DashboardNav from '@/components/layout/DashboardNav';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default function ManageManagers() {
  const [companies, setCompanies] = useState([]);
  const [trucksByCompany, setTrucksByCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/companies');
        const data = await res.json();
        if (data.success) {
          setCompanies(data.data || []);
          // Fetch trucks for each company
          const trucksMap = {};
          await Promise.all(
            (data.data || []).map(async (company) => {
              const trucksRes = await fetch(`/api/trucks?company_id=${company.id}`);
              const trucksData = await trucksRes.json();
              if (trucksData.success) {
                trucksMap[company.id] = trucksData.data || [];
              } else {
                trucksMap[company.id] = [];
              }
            })
          );
          setTrucksByCompany(trucksMap);
        } else {
          setError(data.message || 'Failed to load companies');
        }
      } catch (err) {
        setError(err.message || 'Failed to load companies');
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <DashboardNav />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 bg-gray-100 p-4 flex flex-col">
          <div className="w-full max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Managers</h1>
              <p className="text-gray-500 text-sm">View, verify, and manage registered companies and their managers for metrology services.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Person</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Business Permit</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Trucks & OR/CR Documents</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Verified</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-sm">Loading...</td></tr>
                    ) : error ? (
                      <tr><td colSpan={7} className="px-6 py-8 text-center text-red-500 text-sm">{error}</td></tr>
                    ) : companies.length === 0 ? (
                      <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400 text-sm">No companies found.</td></tr>
                    ) : (
                      companies.map(company => (
                        <tr key={company.id} className="hover:bg-blue-50 hover:scale-[1.01] hover:shadow transition-all duration-150 group">
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{company.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{company.contact_person}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{company.contact_email}</td>
                          <td className="px-6 py-4">
                            {company.business_permit ? (
                              <a href={company.business_permit} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">View</a>
                            ) : (
                              <span className="text-gray-400 text-sm">No document</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {trucksByCompany[company.id] && trucksByCompany[company.id].length > 0 ? (
                              <ul className="space-y-1">
                                {trucksByCompany[company.id].map(truck => (
                                  <li key={truck.id} className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-gray-700">{truck.license_plate}</span>
                                    {truck.orcr_document ? (
                                      <a href={truck.orcr_document} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">OR/CR</a>
                                    ) : (
                                      <span className="text-gray-400 text-xs">No OR/CR</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-gray-400 text-xs">No trucks</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {company.verified ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Verified</span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {!company.verified && (
                              <button className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm hover:bg-green-700 transition">Verify</button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 