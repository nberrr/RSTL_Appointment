'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/layout/AdminLayout';
import { FaFlask, FaRuler, FaBacteria, FaBook, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Taskbar from '@/components/shared/Taskbar';

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [stats, setStats] = useState({
    metrology: { appointments: 0, pending: 0, completed: 0 },
    chemistry: { appointments: 0, pending: 0, completed: 0 },
    microbiology: { appointments: 0, pending: 0, completed: 0 },
    shelfLife: { appointments: 0, pending: 0, completed: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [selectedPeriod]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/dashboard/stats?period=${selectedPeriod}`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      id: 'metrology',
      name: 'Metrology',
      description: 'Volume calibration and measurement services',
      icon: <FaRuler className="w-8 h-8" />,
      href: '/metrology/dashboard',
      color: 'bg-blue-500',
      stats: stats.metrology
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      description: 'Chemical analysis and testing services',
      icon: <FaFlask className="w-8 h-8" />,
      href: '/chemistry/dashboard',
      color: 'bg-purple-500',
      stats: stats.chemistry
    },
    {
      id: 'microbiology',
      name: 'Microbiology',
      description: 'Microbiological testing and analysis',
      icon: <FaBacteria className="w-8 h-8" />,
      href: '/microbiology/dashboard',
      color: 'bg-green-500',
      stats: stats.microbiology
    },
    {
      id: 'shelfLife',
      name: 'Shelf Life',
      description: 'Product shelf life testing and analysis',
      icon: <FaClock className="w-8 h-8" />,
      href: '/shelf-life/dashboard',
      color: 'bg-teal-500',
      stats: stats.shelfLife
    }
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Laboratory Services Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Select a laboratory service to view its dashboard
            </p>
          </div>

          {/* Taskbar */}
          <Taskbar actions={[{ label: 'Inquiries Sheet', href: '/admin/dashboard/inquiries' }]} />

          {/* Time Period Selector */}
          <div className="mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex space-x-4">
                {['today', 'week', 'month'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      selectedPeriod === period
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.id} href={service.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden h-full cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <div className={`${service.color} p-4 rounded-lg`}>
                        <div className="text-white">{service.icon}</div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      {loading ? (
                        <div className="flex justify-center">
                          <div className="animate-pulse flex space-x-4">
                            <div className="h-8 w-8 bg-gray-200 rounded"></div>
                            <div className="h-8 w-8 bg-gray-200 rounded"></div>
                            <div className="h-8 w-8 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-semibold text-gray-900">
                              {service.stats?.appointments || 0}
                            </p>
                            <p className="text-sm text-gray-500">Total</p>
                          </div>
                          <div>
                            <p className="text-2xl font-semibold text-yellow-500">
                              {service.stats?.pending || 0}
                            </p>
                            <p className="text-sm text-gray-500">Pending</p>
                          </div>
                          <div>
                            <p className="text-2xl font-semibold text-green-500">
                              {service.stats?.completed || 0}
                            </p>
                            <p className="text-sm text-gray-500">Completed</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 