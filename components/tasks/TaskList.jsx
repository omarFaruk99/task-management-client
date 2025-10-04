"use client";

import TaskActions from "@/components/tasks/TaskActions";
import TaskFilter from "@/components/tasks/TaskFilter";
import { tasksAPI } from "@/services/api";
import { useEffect, useState } from "react";

export default function TaskList({ refreshKey }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  useEffect(() => {
    applyFilters();
  }, [tasks, filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAllTasks();
      setTasks(response.data);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = tasks;

    // Apply status filter
    if (filters.status) {
      result = result.filter((task) => task.status === filters.status);
    }

    // Apply due date filter
    if (filters.dueDate) {
      const filterDate = new Date(filters.dueDate).toDateString();
      result = result.filter((task) => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate).toDateString();
        return taskDate === filterDate;
      });
    }

    setFilteredTasks(result);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    fetchTasks();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Task Filter Component */}
      <TaskFilter
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Your Tasks</h3>
        <span className="text-sm text-gray-600">
          {filteredTasks.length} of {tasks.length} task
          {tasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          {tasks.length === 0
            ? "No tasks found. Create your first task!"
            : "No tasks match your filters. Try different criteria."}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <h4 className="font-medium text-gray-800">{task.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{task.description}</p>

              <div className="flex justify-between items-center mt-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.status}
                </span>

                {task.dueDate && (
                  <span className="text-xs text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>

              <TaskActions
                task={task}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
