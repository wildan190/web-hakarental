// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: " https://frederick-oh-peterson-inquiry.trycloudflare.com/api",
});

export default api;
