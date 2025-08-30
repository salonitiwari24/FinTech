// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle, FaBell, FaSearch, FaCog } from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide navbar on landing page
  if (pathname === "/") {
    return null;
  }

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Expenses", href: "/expenses" },
    { name: "Savings", href: "/savings" },
    { name: "Risks", href: "/risks" },
    { name: "Investments", href: "/investments" },
    { name: "AI Predictions", href: "/predictions" },
  ];

  return (
    <nav className="professional-nav sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Search */}
          <div className="flex items-center flex-1">
            <div className="hidden md:block flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions, budgets..."
                  className="input-professional pl-10 pr-3 w-full"
                />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`professional-nav-link ${
                    pathname === link.href ? "active" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section - Profile, Notifications */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-600 hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              aria-label="Notifications"
            >
              <FaBell className="h-5 w-5" />
            </button>

            {/* Settings */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-600 hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              aria-label="Settings"
            >
              <FaCog className="h-5 w-5" />
            </button>

            {/* Profile */}
            <Link 
              href="/profile" 
              className="flex items-center space-x-2 p-2 rounded-full text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <FaUserCircle className="h-8 w-8" />
              <span className="hidden lg:block text-sm font-medium text-gray-700">
                My Account
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="p-2 rounded-md text-gray-600 hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-b from-primary to-secondary border-t-2 border-primary-dark">
            {/* Search on mobile */}
            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-white" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-professional pl-10 pr-3 w-full bg-white/20 text-white placeholder-white/70 border-white/30"
                />
              </div>
            </div>
            
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`professional-nav-link block text-white hover:bg-white/20 ${
                  pathname === link.href ? "bg-white/20" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}