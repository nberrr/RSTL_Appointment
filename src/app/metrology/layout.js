"use client";

import { usePathname } from 'next/navigation';

export default function MetrologyLayout({ children }) {
  const pathname = usePathname();
  
  // Check if the current path is an admin dashboard path
  const isAdminDashboard = pathname.includes('/dashboard');
  
  if (isAdminDashboard) {
    return (
      <div className="min-h-screen bg-white">
        {children}
      </div>
    );
  }
  
  // For regular metrology pages, use the standard layout from root
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
} 