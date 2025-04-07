"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaGripHorizontal, FaRegFile, FaCog, FaHourglassHalf, FaTruck, FaVial, FaMicroscope } from "react-icons/fa";
import { FaFlask, FaComments, FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  // Identify the base path for each lab
  let basePath = "/metrology"; // Default path
  if (pathname.includes("/chemistry")) basePath = "/chemistry";
  if (pathname.includes("/microbiology")) basePath = "/microbiology";

  // Default navigation items for all labs
  let navItems = [
    { id: "dashboard", label: "Overview", icon: <FaGripHorizontal className="h-7 w-7" />, href: `${basePath}/dashboard` },
  ];

  // Add lab-specific calendar/appointments item
  if (basePath === "/metrology") {
    navItems.push({
      id: "calendar",
      label: "Appointments",
      icon: <FaTruck className="h-7 w-7" />,
      href: `${basePath}/dashboard/calendar`
    });
    // Add single reports tab for metrology
    navItems.push(
      { id: "reports", label: "Reports", icon: <FaRegFile className="h-7 w-7" />, href: `${basePath}/dashboard/reports` }
    );
  } else {
    // For Chemistry and Microbiology
    navItems.push({
      id: "calendar",
      label: basePath === "/chemistry" ? "Chemistry" : "Microbiology",
      icon: <FaFlask className="h-7 w-7" />,
      href: `${basePath}/dashboard/calendar`
    });
    
    // Add shelf life and consultancy tabs
    navItems.push(
      { id: "shelf-life", label: "Shelf Life", icon: <FaHourglassHalf className="h-7 w-7" />, href: `${basePath}/dashboard/shelf-life` },
      { id: "consultancy", label: "Consultancy", icon: <FaComments className="h-7 w-7" />, href: `${basePath}/dashboard/consultancy` }
    );

    // Add reports dropdown for Chemistry/Microbiology
    navItems.push({
      id: "reports",
      label: "Reports",
      icon: <FaRegFile className="h-7 w-7" />,
      isDropdown: true,
      subItems: [
        { 
          id: "reports-tests",
          label: "Tests",
          href: `${basePath}/dashboard/reports/tests`
        },
        { 
          id: "reports-shelf-life",
          label: "Shelf Life",
          href: `${basePath}/dashboard/reports/shelf-life`
        },
        { 
          id: "reports-consultancy",
          label: "Consultancy",
          href: `${basePath}/dashboard/reports/consultancy`
        }
      ]
    });
  }

  // Add manage services for all labs
  navItems.push(
    { id: "services", label: "Manage Services", icon: <FaCog className="h-7 w-7" />, href: `${basePath}/dashboard/services` }
  );

  return (
    <aside className="bg-white w-16 shadow-md h-full flex-shrink-0">
      <div className="p-4 flex flex-col items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
                         (item.subItems && item.subItems.some(subItem => pathname === subItem.href)) ||
                         pathname.startsWith(item.href + '/');

          return (
            <div key={item.id} className="relative group w-full flex flex-col items-center">
              {item.isDropdown ? (
                <button
                  onClick={() => setIsReportsOpen(!isReportsOpen)}
                  className={`mb-2 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                    isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-200"
                  }`}
                >
                  {item.icon}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`mb-6 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                    isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-200"
                  }`}
                >
                  {item.icon}
                </Link>
              )}

              {/* Tooltip */}
              <span className="absolute left-full ml-3 top-1/2 -translate-y-6 bg-gray-500 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-10">
                {item.label}
              </span>

              {/* Dropdown Menu */}
              {item.isDropdown && isReportsOpen && (
                <div className="absolute left-full ml-3 top-0 bg-white rounded-lg shadow-lg py-2 min-w-[140px] z-20">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.href}
                      className={`block px-4 py-2 text-sm ${
                        pathname === subItem.href
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
