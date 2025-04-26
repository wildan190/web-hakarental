// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://granted-aids-florist-hd.trycloudflare.com/api",
});

export default api;
