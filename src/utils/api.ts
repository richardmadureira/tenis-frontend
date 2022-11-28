import axios from 'axios';
import { handleDates } from '.';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

api.interceptors.response.use(originalResponse => {
    handleDates(originalResponse.data);
    return originalResponse;
});

export default api;