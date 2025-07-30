// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://teeth-heroes-responsibilities-lamb.trycloudflare.com/api",
});

export default api;
