import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

//default base url defined if VITE_API_URL is not provided
const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

//creating axios instance with base config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl, // use apiUrl as fallback
})

api.interceptors.request.use(
    (config) => {
      // Check if the request URL is the register route and do not add the Authorization header
      if (config.url && config.url.includes('/auth-app/register/')) {
        delete config.headers.Authorization;
      } else {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default api