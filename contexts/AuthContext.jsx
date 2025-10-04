"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create context for authentication
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  // State for user data and authentication status
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    // Get token from localStorage when app loads
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  // Login function - saves token and user data
  const login = (userData, authToken) => {
    // Set state
    setUser(userData);
    setToken(authToken);

    // Store in localStorage for persistence
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function - clears authentication data
  const logout = () => {
    // Clear state
    setUser(null);
    setToken(null);

    // Remove from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Value to provide to consumers
  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
