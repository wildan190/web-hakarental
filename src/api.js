// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://efficiently-providence-inherited-operations.trycloudflare.com/api",
});

export default api;
