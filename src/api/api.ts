import axios from "axios";

const API_URL = "http://172.20.10.4:8000"; // твой backend

export const api = axios.create({
  baseURL: API_URL,
});

// 👉 автоматом подставляет токен
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
