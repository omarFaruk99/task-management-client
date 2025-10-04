import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  register: (userData) => api.post("/users/register", userData),
  login: (credentials) => api.post("/users/login", credentials),
};

// Users API methods
export const usersAPI = {
  getProfile: () => api.get("/users/profile"),
  getAllUsers: () => api.get("/users"),
};

// Tasks API methods
export const tasksAPI = {
  getAllTasks: (params = {}) => api.get("/tasks", { params }),
  createTask: (taskData) => api.post("/tasks", taskData),
  updateTask: (id, updates) => api.put(`/tasks/${id}`, updates),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;
