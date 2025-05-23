// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://formation-keyboard-employer-drug.trycloudflare.com/api",
});

export default api;
