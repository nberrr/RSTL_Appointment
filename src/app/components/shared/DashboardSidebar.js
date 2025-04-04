"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGripHorizontal, FaRegFile, FaCog, FaHourglassHalf } from "react-icons/fa";
import { FaFlask, FaComments } from "react-icons/fa6"; // Icons for extra tabs

export default function DashboardSidebar() {
  const pathname = usePathname();

  // Identify the base path for each lab (Metrology, Chemistry, Microbiology)
  let basePath = "/metrology"; // Default path
  if (pathname.includes("/chemistry")) basePath = "/chemistry";
  if (pathname.includes("/microbiology")) basePath = "/microbiology";

  // Default navigation items for all labs
  let navItems = [
    { id: "dashboard", label: "Overview", icon: <FaGripHorizontal className="h-7 w-7" />, href: `${basePath}/dashboard` },
    { id: "calendar", label: "Chemistry", icon: <FaFlask className="h-7 w-7" />, href: `${basePath}/dashboard/calendar` },
  ];

  // Add extra tabs only for Chemistry & Microbiology (AFTER Calendar)
  if (basePath === "/chemistry" || basePath === "/microbiology") {
    navItems.push(
      { id: "shelf-life", label: "Shelf Life", icon: <FaHourglassHalf className="h-7 w-7" />, href: `${basePath}/dashboard/shelf-life` },
      { id: "consultancy", label: "Consultancy", icon: <FaComments className="h-7 w-7" />, href: `${basePath}/dashboard/consultancy` }
    );
  }

  // Continue with remaining default items
  navItems.push(
    { id: "reports", label: "Reports", icon: <FaRegFile className="h-7 w-7" />, href: `${basePath}/dashboard/reports` },
    { id: "services", label: "Manage Services", icon: <FaCog className="h-7 w-7" />, href: `${basePath}/dashboard/services` }
  );

  return (
    <aside className="bg-white w-16 shadow-md h-full flex-shrink-0">
      <div className="p-4 flex flex-col items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <div key={item.id} className="relative group w-full flex justify-center">
              <Link
                href={item.href}
                className={`mb-6 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-200"
                }`}
              >
                {item.icon}
              </Link>

              {/* Tooltip */}
              <span className="absolute left-full ml-3 top-1/2 -translate-y-6 bg-gray-500 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-10">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
