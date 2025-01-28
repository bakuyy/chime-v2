import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

//default base url defined if VITE_API_URL is not provided
const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

//creating axios instance with base config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl, // use apiUrl as fallback
})

api.interceptors.request.use(
    //before requests are sent, interceptors check for a token in our local storage
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}` //if token exists, it adds to Authorization header as Bearer token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error) //rejects
  }
)

export default api