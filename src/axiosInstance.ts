import axios from "axios";

export const PrivateAPI = axios.create({
    baseURL: "http://localhost:8000",
});

export const PublicAPI = axios.create({
    baseURL: "http://localhost:8000",
});