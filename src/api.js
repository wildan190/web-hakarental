// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://ghost-theta-ng-jamaica.trycloudflare.com /api",
});

export default api;
