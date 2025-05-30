// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://carlo-nevada-introduced-jun.trycloudflare.com/api",
});

export default api;
