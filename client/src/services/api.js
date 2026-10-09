import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });

export const sendOtp = (name, mobile) => api.post("/auth/send-otp", { name, mobile });
export const verifyOtp = (mobile, otp) => api.post("/auth/verify-otp", { mobile, otp });
export const getUsers = (token) => api.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } });
