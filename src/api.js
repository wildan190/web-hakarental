// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://advisors-government-auction-tub.trycloudflare.com/api",
});

export default api;
