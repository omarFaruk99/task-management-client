"use client";

import { usersAPI } from "@/services/api";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    usersAPI
      .getAllUsers()
      .then((res) => setUsers(res.data || []))
      .catch((err) =>
        setError(err?.response?.data?.message || "Failed to load users")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="p-6 text-center text-gray-500">Loading users…</div>;
  if (error)
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  if (!users.length)
    return <div className="p-6 text-center text-gray-600">No users found.</div>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((u) => (
          <article
            key={u._id}
            className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-medium">
                {u.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <div className="text-lg font-medium text-gray-800">
                  {u.name}
                </div>
                <div className="text-sm text-gray-500">{u.email}</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <div>
                Age:{" "}
                <span className="font-medium text-gray-800">
                  {u.age ?? "—"}
                </span>
              </div>
              <div className="mt-1">
                Created:{" "}
                <span className="font-medium text-gray-700">
                  {u.createdAt ? new Date(u.createdAt).toLocaleString() : "—"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
