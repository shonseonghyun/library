import axios from "axios";

export const PrivateAPI = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true, 
    headers:{
        "Content-Type": "application/json",
    }
});

export const PublicAPI = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true, 
    headers:{
        "Content-Type": "application/json",
    }
});

PrivateAPI.interceptors.request.use(
    (config) => {
        let accessToken =localStorage.getItem("accessToken");
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
);