import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Add token automatically to every request
// interceptors ده وسيط بينك وبين اي ركويست
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("clinic_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
