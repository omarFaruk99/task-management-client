"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/layout/Header";
import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import { useState } from "react";

export default function DashboardPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Use the new responsive Header */}
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <TaskForm onTaskCreated={handleTaskCreated} />

          <div className="bg-white rounded-lg shadow p-6">
            {/* Pass refreshTrigger as refreshKey instead of key */}
            <TaskList refreshKey={refreshTrigger} />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
