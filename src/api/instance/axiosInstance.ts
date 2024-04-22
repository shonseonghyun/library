import axios from "axios";

export const PrivateAPI = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true, 
    headers:{
        "Content-Type": "application/json",
    }
});

export const PublicAPI = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true, 
    headers:{
        "Content-Type": "application/json",
    }
});