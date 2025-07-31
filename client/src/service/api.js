import axios from 'axios';
import tokenService from './token.service';
const baseURL = import.meta.env.VITE_BASE_URL;

const instant = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// add interceptors for request object
instant.interceptors.request.use(
    (config) => {
        const token = tokenService.getlocalAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instant;
