import axios from "axios";

const baseURL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not set");
}

function isAdminRequest(url = "") {
  const normalizedUrl = String(url || "");

  if (!normalizedUrl) {
    return false;
  }

  if (normalizedUrl.startsWith("http://") || normalizedUrl.startsWith("https://")) {
    try {
      return new URL(normalizedUrl).pathname.startsWith("/api/admin");
    } catch {
      return false;
    }
  }

  return normalizedUrl.startsWith("/api/admin") || normalizedUrl.startsWith("api/admin");
}

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  if (isAdminRequest(config.url)) {
    config.withCredentials = true;
  }

  // Let the browser set multipart boundaries for FormData payloads.
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

// Normalize API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && isAdminRequest(error?.config?.url)) {
      if (window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Request failed";
    return Promise.reject(new Error(message));
  }
);

export default api;
