"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/layout/Header";
import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import { useState } from "react";

export default function DashboardPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const openCreate = () => setIsCreateOpen(true);
  const closeCreate = () => setIsCreateOpen(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Use the new responsive Header */}
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Top bar with Create button */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <button
              onClick={openCreate}
              className="px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Create Task
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            {/* compact cards, refresh on creation */}
            <TaskList refreshKey={refreshTrigger} compact />
          </div>
        </main>

        {/* Modal for creating a task */}
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-40"
              onClick={closeCreate}
            />
            <div className="relative w-full max-w-md mx-4 sm:mx-0 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="text-lg font-medium">Create Task</h2>
                <button
                  onClick={closeCreate}
                  aria-label="Close"
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <TaskForm
                  onTaskCreated={() => {
                    handleTaskCreated();
                    closeCreate();
                  }}
                  onClose={closeCreate}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
