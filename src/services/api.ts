// src/services/api.ts
import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
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
  createUser: (name: string, email: string, password: string) => {
    return axios.post(`${API_BASE_URL}/api/users`, { name, email, password });
  },
  createHive: (name: string, description: string, userId: string) => {
    return axios.post(`${API_BASE_URL}/api/hives`, { name, description, userId });
  },
  getUsers: () => {
    return axios.get(`${API_BASE_URL}/api/users`);
  },
  getUser: (id: string) => {
    return axios.get(`${API_BASE_URL}/api/users/${id}`);
  },
  getUserHive: (userId: string) => {
    return axios.get(`${API_BASE_URL}/api/hives/userHive/${userId}`);
  },
  getAllHiveData: (hiveId: string) => {
    return axios.get(`${API_BASE_URL}/api/hives/data/all/${hiveId}`);
  },
  giveAccessToHive: (hiveId: string) => {
    return axios.patch(`${API_BASE_URL}/api/hives/${hiveId}/giveAccess`);
  },
  removeAccessToHive: (hiveId: string) => {
    return axios.patch(`${API_BASE_URL}/api/hives/${hiveId}/removeAccess`);
  },
  getUserAccessibleHives: (userId: string) => {
    return axios.get(`${API_BASE_URL}/api/hives/${userId}/accessible`);
  }, 
  requestGoogleAuth: () => {
    return axios.post(`${API_BASE_URL}/api/auth/google/`);
  },
  getHives: () => {
    return axios.get(`${API_BASE_URL}/api/hives`);
  },
  linkHiveToUser: (hiveId: string, userId: string) => {
    return axios.post(`${API_BASE_URL}/api/hives/${hiveId}/${userId}`);
  },
  deleteHive: (id: string) => {
    return axios.delete(`${API_BASE_URL}/api/hives/${id}`);
  },
  // Updated register function
  register: (email: string, password: string, name: string) => {
    return axios.post(`${API_BASE_URL}/api/auth/register`, {
      email,
      password,
      name,
    });
  },
  getAllAlertsFromHiveId: (hiveId:string) => {
    return axios.get(`${API_BASE_URL}/api/hives/alert/all/${hiveId}`);
  },
  deleteOneAlert: (id: string) => {
    return axios.delete(`${API_BASE_URL}/api/hives/alert/${id}`);
  },
  deleteAllAlerts: (hiveId: string) => {
    return axios.delete(`${API_BASE_URL}/api/hives/alert/all/${hiveId}`);
  },
};
