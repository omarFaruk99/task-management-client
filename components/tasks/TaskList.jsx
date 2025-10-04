"use client";

import TaskActions from "@/components/tasks/TaskActions";
import TaskFilter from "@/components/tasks/TaskFilter";
import { tasksAPI } from "@/services/api";
import { useEffect, useState } from "react";

export default function TaskList({ refreshKey, compact }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAllTasks();
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = tasks;

    if (filters.status) {
      result = result.filter((task) => task.status === filters.status);
    }

    if (filters.dueDate) {
      const filterDate = new Date(filters.dueDate).toDateString();
      result = result.filter((task) => {
        if (!task.dueDate) return false;
        return new Date(task.dueDate).toDateString() === filterDate;
      });
    }

    setFilteredTasks(result);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleTaskUpdated = () => fetchTasks();
  const handleTaskDeleted = () => fetchTasks();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="space-y-4">
        <TaskFilter
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />
        <div className="text-center py-8 text-gray-600">
          {tasks.length === 0
            ? "No tasks found. Create your first task!"
            : "No tasks match your filters. Try different criteria."}
        </div>
      </div>
    );
  }

  const priorityBadge = (status) => {
    if (!status) return "bg-slate-100 text-slate-700";
    const s = status.toLowerCase();
    if (s === "completed") return "bg-green-100 text-green-800";
    if (s === "in-progress") return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="space-y-4">
      <TaskFilter
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Your Tasks</h3>
        <span className="text-sm text-gray-600">
          {filteredTasks.length} of {tasks.length} task
          {tasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div
        className={
          compact
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            : "grid gap-4"
        }
      >
        {filteredTasks.map((task) => (
          <article
            key={task._id || task.id}
            className="relative flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            aria-labelledby={`task-${task._id}-title`}
          >
            {/* Status color bar */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
                task.status === "completed"
                  ? "bg-green-500"
                  : task.status === "in-progress"
                  ? "bg-blue-500"
                  : "bg-yellow-500"
              }`}
              aria-hidden
            />

            {/* Card content */}
            <div className="flex flex-col gap-2 ml-4">
              <h4
                id={`task-${task._id}-title`}
                className="text-lg font-bold text-indigo-700 mb-1 truncate"
              >
                {task.title || "Untitled"}
              </h4>
              <p className="text-sm text-gray-600 mb-2 truncate whitespace-nowrap">
                {task.description
                  ? task.description.length > 60
                    ? task.description.slice(0, 60) + "…"
                    : task.description
                  : "No description"}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityBadge(
                    task.status
                  )}`}
                >
                  {task.status || "—"}
                </span>
                {task.dueDate && (
                  <span className="text-xs text-gray-400">
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Assigned by section */}
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center justify-center w-9 h-9 text-base font-bold rounded-full border bg-indigo-100 text-indigo-700 shadow">
                  {task.user?.name
                    ? task.user.name.charAt(0).toUpperCase()
                    : "—"}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-700 font-semibold">
                    Assigned by: {task.user?.name ?? "Unknown"}
                  </span>
                  {task.user?.email && (
                    <span className="text-xs text-gray-400">
                      {task.user.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-400 mt-2">
                Created:{" "}
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleString()
                  : "—"}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4">
              <TaskActions
                task={task}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
