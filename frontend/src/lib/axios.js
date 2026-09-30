import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api`,
})

api.interceptors.request.use((config) => {
    const storedAuth = localStorage.getItem('notes_auth');
    if (storedAuth) {
        const { token } = JSON.parse(storedAuth);
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const requestUrl = error.config?.url || '';
        if (error.response?.status === 401 && !requestUrl.includes('/auth/login') && !requestUrl.includes('/auth/signup')) {
            localStorage.removeItem('notes_auth');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;