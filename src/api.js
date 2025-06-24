// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://portions-kg-relations-coaching.trycloudflare.com/api",
});

export default api;
