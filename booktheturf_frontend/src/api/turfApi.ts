import axios from "axios";

const turfApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Add JWT token to every request if available
turfApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("booktheturf_admin_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default turfApi;
