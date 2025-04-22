"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function DashboardNav() {
  const [notifications, setNotifications] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const pathname = usePathname();

  // Dynamically determine the management name based on pathname
  const getManagementTitle = () => {
    if (pathname.includes("/metrology")) return "Metrology Appointment Management";
    if (pathname.includes("/chemistry")) return "Chemistry Appointment Management";
    if (pathname.includes("/microbiology")) return "Microbiology Appointment Management";
    if (pathname.includes("/shelf-life")) return "Shelf Life Appointment Management";
    return "Dashboard"; // Default title if none match
  };

  useEffect(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    setDateTime(new Date().toLocaleDateString("en-US", options));

    const timer = setInterval(() => {
      setDateTime(new Date().toLocaleDateString("en-US", options));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
      <div className="dashboard-nav bg-white shadow-md h-20" style={{ height: "65px" }}>
        <div className=" px-4 flex flex-auto justify-between items-center w-full h-full">
          <div className="flex items-center space-x-4">
            <div className="w-[40px] h-[40px] overflow-hidden rounded">
              <Image src="/dost-logo.png" alt="DOST Logo" width={40} height={40} />
            </div>
            <h1 className="text-xl font-bold">{getManagementTitle()}</h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="font-semibold">Philippine Standard Time</div>
              <div className="text-sm whitespace-nowrap font-mono text-gray-600">{dateTime}</div>
            </div>

            <button
              className="  relative p-2 rounded-full hover:bg-gray-100"
              onClick={() => setNotifications(!notifications)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
