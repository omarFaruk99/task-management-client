"use client";

import Link from "next/link";
import Header from "../components/layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <Header />
      <main className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
            Welcome to Task Manager
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Organize your tasks, manage your team, and boost productivity.
          </p>
          <div className="flex flex-col gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-lg bg-gray-100 text-indigo-700 font-semibold text-lg hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 rounded-lg bg-gray-100 text-indigo-700 font-semibold text-lg hover:bg-gray-200 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
