import axios from 'axios';

import { API_BASE_URL } from '../constants/config';

const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000
});

// API Request interceptor
service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        // Do something with request error here
        Promise.reject(error);
    }
);

// API response interceptor
service.interceptors.response.use((response) => {
    return response.data;
});

export default service;
