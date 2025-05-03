// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://connecting-clinics-closely-jewelry.trycloudflare.com/api",
});

export default api;
