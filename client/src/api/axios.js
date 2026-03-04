import axios from "axios";

const baseURL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not set");
}

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Attach JWT for admin APIs
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Request failed";
    return Promise.reject(new Error(message));
  }
);

export default api;
