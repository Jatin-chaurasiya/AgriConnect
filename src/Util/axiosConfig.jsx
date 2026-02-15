import axios from "axios";
import { BASE_URL } from "./Util/apiEndPoints";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const excludeEndpoints = ["/auth/login", "/auth/register"];

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      config.url?.startsWith(endpoint)
    );

    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem("token");

      if (accessToken && accessToken !== "null" && accessToken !== "undefined") {
        if (isTokenExpired(accessToken)) {
          localStorage.removeItem("token");
          window.location.replace("/auth/login");
          return Promise.reject(new Error("Token expired"));
        }

        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.replace("/auth/login");
          break;

        case 403:
          console.error("Access forbidden:", data?.error || data?.message);
          break;

        case 404:
          console.error("Resource not found:", error.config?.url);
          break;

        case 500:
          console.error("Server error:", data?.error || data?.message);
          break;

        default:
          console.error("API Error:", data?.error || error.message);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    } else if (error.message === "Network Error") {
      console.error("Network error. Check your connection.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
