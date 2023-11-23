// src/services/api.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"; // Default URL as a fallback

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const apiClient = {
  login: (email: string, password: string) => {
    return axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
  },
  logout: () => {
    return axios.post(`${API_BASE_URL}/api/auth/logout`);
  },
  getLoginStatus: () => {
    return axios.get(`${API_BASE_URL}/me`);
  },
  googleAuth: () => {
    return axios.post(`${API_BASE_URL}/api/auth/google`);
  },
  // Updated register function
  register: (email: string, password: string, name: string) => {
    return axios.post(`${API_BASE_URL}/api/auth/register`, {
      email,
      password,
      name,
    });
  },
};
