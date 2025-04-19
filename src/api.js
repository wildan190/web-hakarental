// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://cells-notifications-avatar-sublime.trycloudflare.com/api",
});

export default api;
