// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://constitutes-different-wondering-picking.trycloudflare.com/api",
});

export default api;
