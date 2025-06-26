// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://old-powerpoint-mambo-intake.trycloudflare.com/api",
});

export default api;
