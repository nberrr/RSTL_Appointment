"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardNav() {
  const [notifications, setNotifications] = useState(false);
  
  const currentDate = new Date();
  const options = { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <nav className="dashboard-nav bg-white px-6 py-3 flex justify-between items-center border-b">
      <div className="flex items-center space-x-4">
        <Image 
          src="/logo.png" 
          alt="RSTL Logo" 
          width={40} 
          height={40}
          className="rounded"
        />
        <h1 className="text-xl font-bold text-gray-700">Metrology Appointment Management</h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <div className="font-semibold">Philippine Standard Time</div>
          <div className="text-sm text-gray-600">{formattedDate}</div>
        </div>
        
        <button 
          className="relative p-2 rounded-full hover:bg-gray-100" 
          onClick={() => setNotifications(!notifications)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Notification indicator */}
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </nav>
  );
} 