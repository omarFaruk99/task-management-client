"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/layout/Header";
import { usersAPI } from "@/services/api";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getProfile();
      setUserProfile(response.data);
    } catch (err) {
      setError("Failed to fetch profile");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
              Profile
            </h1>
            {loading ? (
              <div className="text-center text-gray-500 py-10">
                Loading profile...
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
                {error}
              </div>
            ) : userProfile ? (
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-4xl font-bold mb-2">
                    {userProfile.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="text-xl font-semibold text-gray-800">
                    {userProfile.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {userProfile.email}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div>
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      User ID
                    </div>
                    <div className="font-mono text-sm text-gray-700 break-all">
                      {userProfile._id}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Age
                    </div>
                    <div className="text-sm text-gray-700">
                      {userProfile.age ?? "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Created
                    </div>
                    <div className="text-sm text-gray-700">
                      {userProfile.createdAt
                        ? new Date(userProfile.createdAt).toLocaleString()
                        : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Updated
                    </div>
                    <div className="text-sm text-gray-700">
                      {userProfile.updatedAt
                        ? new Date(userProfile.updatedAt).toLocaleString()
                        : "—"}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                No profile data found.
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
