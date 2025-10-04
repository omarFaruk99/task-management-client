"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
              Task Manager
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Profile
            </Link>
            <Link
              href="/users"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Users
            </Link>
            <span className="ml-4 px-3 py-1 bg-gray-100 rounded text-gray-600 text-sm">
              {user?.name ? `Welcome, ${user.name}` : "Welcome"}
            </span>
            {user && (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 py-4 rounded-b-xl shadow">
            <div className="flex flex-col gap-3 px-2">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-indigo-600 font-medium transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-indigo-600 font-medium transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/users"
                className="text-gray-700 hover:text-indigo-600 font-medium transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Users
              </Link>
              <span className="px-3 py-1 bg-gray-100 rounded text-gray-600 text-sm">
                {user?.name ? `Welcome, ${user.name}` : "Welcome"}
              </span>
              {user && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
