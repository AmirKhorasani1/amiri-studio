import axios from "axios";

const api = axios.create({
  // Keep API requests on the same host as the frontend.
  // Vite proxies /api to the local Express server during development.
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// قبل از هر request، اگه توکن ادمین تو localStorage بود، خودکار اضافه‌ش کن
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const startConversation = (data) => api.post("/conversations", data);
export const getConversation = (id) => api.get(`/conversations/${id}`);
export const getAllConversations = (status) =>
  api.get("/conversations", { params: status ? { status } : {} });
export const sendMessage = (id, text, sender = "visitor") =>
  api.post(`/conversations/${id}/messages`, { text, sender });
export const updateConversationStatus = (id, status) =>
  api.patch(`/conversations/${id}/status`, { status });

export default api;
