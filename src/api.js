// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://ranch-consciousness-cm-teacher.trycloudflare.com/api",
});

export default api;
