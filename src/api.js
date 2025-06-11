// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://poll-success-nj-vegetation.trycloudflare.com/api",
});

export default api;
