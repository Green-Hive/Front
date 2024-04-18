// src/services/api.ts
import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";
//"https://apitest-production-e7e6.up.railway.app"; // Default URL as a fallback

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
    return axios.get(`${API_BASE_URL}/api/auth/me`);
  },

  requestGoogleAuth: () => {
    return axios.post(`${API_BASE_URL}/api/auth/google/`);
  },
  getHives: () => {
    return axios.get(`${API_BASE_URL}/api/hives`);
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
