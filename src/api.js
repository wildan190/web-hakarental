// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: " https://searching-say-officer-bufing.trycloudflare.com/api",
});

export default api;
