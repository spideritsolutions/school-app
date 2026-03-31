import axios from "axios";
import { ReactReduxContext } from "react-redux";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  } 

  return config;
});

// export const loginUser = (credentials: any) => API.post('/auth/login', credentials);
export default API;