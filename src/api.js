// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://kentucky-dimension-puzzle-beverages.trycloudflare.com/api",
});

export default api;
