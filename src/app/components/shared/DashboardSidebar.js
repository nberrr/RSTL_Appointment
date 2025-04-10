"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronLeft } from 'lucide-react';
import {
  LayoutGrid,
  ScrollText,
  FileText,
  Settings,
  MessageSquare,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  let basePath = "/metrology";
  if (pathname.includes("/chemistry")) basePath = "/chemistry";
  if (pathname.includes("/microbiology")) basePath = "/microbiology";
  if (pathname.includes("/shelf-life")) basePath = "/shelf-life";

  const isShelfLife = pathname.includes("/shelf-life");

  const navItems = [
    {
      id: "dashboard",
      label: "Overview",
      icon: <LayoutGrid size={20} />,
      href: `${basePath}/dashboard`,
    },
    ...(basePath === "/metrology"
      ? [
          {
            id: "calendar",
            label: "Appointments",
            icon: <ScrollText size={20} />,
            href: `${basePath}/dashboard/calendar`,
          },
          {
            id: "reports",
            label: "Reports",
            icon: <FileText size={20} />,
            href: `${basePath}/dashboard/reports`,
          },
        ]
      : isShelfLife
      ? [
          {
            id: "calendar",
            label: "Calendar",
            icon: <ScrollText size={20} />,
            href: `${basePath}/dashboard/calendar`,
          },
          {
            id: "reports",
            label: "Reports",
            icon: <FileText size={20} />,
            isDropdown: true,
            subItems: [
              { id: "reports-tests", label: "Tests", href: `${basePath}/dashboard/reports/tests` },
              { id: "reports-consultancy", label: "Consultancy", href: `${basePath}/dashboard/reports/consultancy` },
            ],
          },
        ]
      : [
          {
            id: "calendar",
            label: basePath === "/chemistry" ? "Chemistry" : "Microbiology",
            icon: <ScrollText size={20} />,
            href: `${basePath}/dashboard/calendar`,
          },
          {
            id: "consultancy",
            label: "Consultancy",
            icon: <MessageSquare size={20} />,
            href: `${basePath}/dashboard/consultancy`,
          },
          {
            id: "reports",
            label: "Reports",
            icon: <FileText size={20} />,
            isDropdown: true,
            subItems: [
              { id: "reports-tests", label: "Tests", href: `${basePath}/dashboard/reports/tests` },
              { id: "reports-consultancy", label: "Consultancy", href: `${basePath}/dashboard/reports/consultancy` },
            ],
          },
        ]),

    !isShelfLife && {
      id: "services",
      label: "Manage Services",
      icon: <Settings size={20} />,
      href: `${basePath}/dashboard/services`,
    },
  ].filter(Boolean);

  return (
    <aside className={`bg-white border-r border-gray-100 h-full transition-all duration-300 ease-in-out ${isCollapsed ? "w-[60px]" : "w-[240px]"}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="h-16 flex items-center px-4 border-b border-gray-100">
          <span className={`text-base font-medium text-gray-900 ${isCollapsed ? 'hidden' : 'block'}`}>Dashboard</span>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto p-1 text-gray-400 hover:text-gray-600"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <div className="px-3 space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                             (item.subItems && item.subItems.some(sub => pathname === sub.href)) ||
                             (pathname.startsWith(item.href + '/') && item.href !== `${basePath}/dashboard`);

              return (
                <div key={item.id} className="relative group">
                  {item.isDropdown ? (
                    <>
                      <button
                        onClick={() => setIsReportsOpen(!isReportsOpen)}
                        className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-blue-500 text-white" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex-shrink-0">{item.icon}</div>
                        {!isCollapsed && (
                          <>
                            <span className="ml-3 text-[15px]">{item.label}</span>
                            <ChevronLeft className={`ml-auto w-4 h-4 transition-transform duration-200 ${isReportsOpen ? '-rotate-90' : '90'}`} />
                          </>
                        )}
                      </button>

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          {item.label}
                        </div>
                      )}

                      {/* Dropdown items */}
                      {isReportsOpen && !isCollapsed && (
                        <div className="mt-0.5 ml-7 space-y-0.5">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.href}
                              className={`block px-3 py-2 text-[15px] rounded-md transition-colors ${
                                pathname === subItem.href
                                  ? "text-blue-600"
                                  : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-blue-500 text-white" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex-shrink-0">{item.icon}</div>
                        {!isCollapsed && <span className="ml-3 text-[15px]">{item.label}</span>}
                      </Link>

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          {item.label}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
