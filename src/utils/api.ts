import axios from 'axios';
import { handleDates } from '.';

const api = axios.create({
    baseURL: import.meta.env.VITE_URL_API
});

api.interceptors.response.use(originalResponse => {
    handleDates(originalResponse.data);
    return originalResponse;
});

export default api;