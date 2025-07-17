// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://passion-trip-desperate-convention.trycloudflare.com/api",
});

export default api;
