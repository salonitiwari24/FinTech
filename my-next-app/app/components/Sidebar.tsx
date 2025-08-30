// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaChartBar, FaMoneyBillWave, FaPiggyBank, FaExclamationTriangle, FaUserCog, FaHome, FaChartLine, FaRobot, FaTimes, FaBars } from "react-icons/fa";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Hide sidebar on landing page
  if (pathname === "/") {
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: FaHome, description: "Overview of your finances" },
    { name: "Expenses", href: "/expenses", icon: FaMoneyBillWave, description: "Track your spending" },
    { name: "Savings", href: "/savings", icon: FaPiggyBank, description: "Manage your savings goals" },
    { name: "Risks", href: "/risks", icon: FaExclamationTriangle, description: "Monitor financial risks" },
    { name: "Investments", href: "/investments", icon: FaChartLine, description: "Investment portfolio" },
    { name: "AI Predictions", href: "/predictions", icon: FaRobot, description: "AI-powered insights" },
    { name: "Profile", href: "/profile", icon: FaUserCog, description: "Account settings" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md shadow-lg border-2 border-primary-dark"
        >
          {isMobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        transition-transform duration-300 ease-in-out
        w-64 professional-sidebar
        flex flex-col
      `}>
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b-2 border-border-color bg-gradient-to-r from-primary to-secondary">
          <div className="text-center">
            <div className="mb-2">
              <Image 
                src="/logo.svg" 
                alt="FinCopilot Logo" 
                width={120} 
                height={36}
                className="filter brightness-0 invert"
              />
            </div>
            <div className="text-xs text-white/80 mt-1 font-medium">AI-Powered Finance</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`
                professional-sidebar-item flex items-center group
                ${pathname === item.href ? "active" : ""}
              `}
            >
              <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-500">
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t-2 border-border-color bg-gradient-to-r from-secondary to-primary">
          <div className="text-center">
            <div className="text-sm text-white/80 mb-3 font-medium">Need assistance?</div>
            <button className="btn-outline w-full text-sm bg-white text-primary hover:bg-primary hover:text-white">
              Contact Support
            </button>
            <div className="mt-3 text-xs text-white/80">
              <div>📞 1-800-FINANCE</div>
              <div>✉️ support@fincopilot.com</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}