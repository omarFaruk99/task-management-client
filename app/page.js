import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive header for home page */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Welcome to Task Manager!
          </h2>
          <p className="text-gray-600 mb-6">
            Manage your tasks efficiently with our simple and intuitive
            interface.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Link
              href="/auth/login"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors text-center"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors text-center"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
