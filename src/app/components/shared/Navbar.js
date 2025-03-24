"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname.startsWith(path) ? 'bg-gray-100' : '';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo/Home Link */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">RSTL</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/metrology"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/metrology')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Metrology
              </Link>
              <Link
                href="/microbiology"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/microbiology')
                    ? 'border-green-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Microbiology
              </Link>
              <Link
                href="/chemistry"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/chemistry')
                    ? 'border-purple-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Chemistry
              </Link>
              <Link
                href="/shelf-life"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/shelf-life')
                    ? 'border-orange-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Shelf Life
              </Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center">
            <Link
              href="/admin"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/admin')
                  ? 'border-gray-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 