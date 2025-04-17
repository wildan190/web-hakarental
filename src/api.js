// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://frankly-perfect-swan.ngrok-free.app/api",
});

export default api;
