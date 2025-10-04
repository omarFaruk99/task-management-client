"use client";

import { useEffect, useState } from "react";

export default function TaskFilter({ onFilterChange, currentFilters }) {
  const [filters, setFilters] = useState({
    status: currentFilters?.status || "",
    dueDate: currentFilters?.dueDate || "",
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // keep local state in sync if parent provides new filters
    setFilters({
      status: currentFilters?.status || "",
      dueDate: currentFilters?.dueDate || "",
    });
  }, [currentFilters]);

  const pushChange = (newFilters) => {
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    pushChange(newFilters);
  };

  const clearFilters = () => {
    const cleared = { status: "", dueDate: "" };
    pushChange(cleared);
  };

  const hasActive = filters.status || filters.dueDate;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          <span className="text-sm text-gray-500 hidden sm:inline">
            refine your task list
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasActive && (
            <button
              onClick={clearFilters}
              className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
              aria-label="Clear filters"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Clear
            </button>
          )}

          <button
            onClick={() => setOpen((s) => !s)}
            className="inline-flex items-center text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-50"
            aria-expanded={open}
          >
            <svg
              className={`w-4 h-4 mr-1 transition-transform ${
                open ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
            {open ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status chips */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>

              <div className="flex flex-wrap gap-2">
                {[
                  { key: "", label: "All" },
                  { key: "pending", label: "Pending" },
                  { key: "in-progress", label: "In Progress" },
                  { key: "completed", label: "Completed" },
                ].map((s) => {
                  const active = filters.status === s.key;
                  return (
                    <button
                      key={s.key || "all"}
                      onClick={() => handleFilterChange("status", s.key)}
                      className={`text-sm px-3 py-1 rounded-full transition ${
                        active
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      aria-pressed={active}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Due date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dueDate"
                  value={filters.dueDate || ""}
                  onChange={(e) =>
                    handleFilterChange("dueDate", e.target.value)
                  }
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="absolute right-2 top-2 text-gray-400 pointer-events-none">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 10h10M7 6h10M5 3v18h14V3H5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile clear / apply area */}
            <div className="flex items-end justify-end">
              <div className="w-full">
                <button
                  onClick={clearFilters}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm bg-white border border-gray-200 hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Active filter badges */}
          {hasActive && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.status && (
                <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs">
                  <strong className="sr-only">Status:</strong>
                  Status: {filters.status}
                  <button
                    onClick={() => handleFilterChange("status", "")}
                    className="ml-2 text-indigo-500 hover:text-indigo-700"
                    aria-label="Remove status filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {filters.dueDate && (
                <span className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-2 py-1 rounded-full text-xs">
                  <strong className="sr-only">Due date:</strong>
                  Due: {new Date(filters.dueDate).toLocaleDateString()}
                  <button
                    onClick={() => handleFilterChange("dueDate", "")}
                    className="ml-2 text-green-600 hover:text-green-800"
                    aria-label="Remove due date filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
