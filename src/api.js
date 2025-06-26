// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://old-powerpoint-mambo-intake.trycloudflare.co/api",
});

export default api;
