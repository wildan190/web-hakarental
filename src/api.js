// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://referring-constitutional-maple-desktops.trycloudflare.com/api",
});

export default api;
