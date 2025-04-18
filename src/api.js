// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://fast-llama-evenly.ngrok-free.app/api",
});

export default api;
