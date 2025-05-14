// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://mobility-hiking-installation-go.trycloudflare.com/api",
});

export default api;
