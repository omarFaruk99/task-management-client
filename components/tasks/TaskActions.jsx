"use client";

import { tasksAPI } from "@/services/api";
import { useState } from "react";

export default function TaskActions({ task, onTaskUpdated, onTaskDeleted }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      setIsLoading(true);
      await tasksAPI.updateTask(task._id, { status: newStatus });
      if (onTaskUpdated) onTaskUpdated();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await tasksAPI.deleteTask(task._id);
      if (onTaskDeleted) onTaskDeleted();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex space-x-2 mt-3">
        {/* Status Change Buttons */}
        {task.status !== "completed" && (
          <button
            onClick={() => handleStatusChange("completed")}
            disabled={isLoading}
            className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "..." : "Complete"}
          </button>
        )}

        {task.status !== "in-progress" && task.status !== "completed" && (
          <button
            onClick={() => handleStatusChange("in-progress")}
            disabled={isLoading}
            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "..." : "Start"}
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={() => setShowDeleteConfirm(true)}
          disabled={isLoading}
          className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{task.title}"? This action cannot
              be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
