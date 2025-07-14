import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_RAPIDAPI_URL,
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": process.env.EXPO_PUBLIC_RAPIDAPI_KEY,
    "x-rapidapi-host": process.env.EXPO_PUBLIC_RAPIDAPI_HOST,
  },
});

export default api;
