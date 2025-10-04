"use client";

import { useState } from "react";

export default function TaskFilter({ onFilterChange, currentFilters }) {
  const [filters, setFilters] = useState({
    status: currentFilters?.status || "",
    dueDate: currentFilters?.dueDate || "",
  });

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { status: "", dueDate: "" };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.status || filters.dueDate;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Tasks</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Due Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={filters.dueDate}
            onChange={(e) => handleFilterChange("dueDate", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors w-full"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Badge */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.status && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              Status: {filters.status}
            </span>
          )}
          {filters.dueDate && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              Due: {new Date(filters.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
